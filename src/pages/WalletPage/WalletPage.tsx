import React, { FC, useEffect, useState, useMemo } from "react"
import "../../App.css"
import axios from "axios"
import {
  convertToCurrency,
  removeSpaces,
  convertBalances,
} from "../../Utils/Utils"
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader"
import WalletAssetsList from "../../components/WalletAssetsList/WalletAssetsList"
import usePortfolioData from "../../components/hooks/usePortfolioData"
import * as S from "../../App.styles"
import withLoading from "../../HOCs/withLoading"

interface Error {
  message: string
}

export interface PortfolioSummaryTypes {
  updatedWalletInfo: WalletAssetInfoTypes
  convertedToCurrencyTotalWalletValue: string
}

export interface WalletAssetInfoTypes {
  [key: string]: {
    symbol: string
    name: string
    imgLarge: string
    chainKey: string
    balance: any
    imgSmall: string
    decimal: number
    chainContract: string
    latestPrice: string | number
    assetValue: string | number
    fullStringBalance: null | string
    fourDecimalsStringBalance: null | string
    convertedToCurrencyTotalWalletValue: string
  }
}

interface Props {
  isLoading: boolean
  setIsLoading: any
}

const WalletPage: FC<Props> = ({ isLoading, setIsLoading }) => {
  const portfolioData = usePortfolioData()

  const [error, setError] = useState<Error | null>(null)
  const [portfolioSummary, setPortfolioSummary] =
    useState<PortfolioSummaryTypes>({
      updatedWalletInfo: {},
      convertedToCurrencyTotalWalletValue: "$0.00",
    })

  const getWalletInformation = useMemo(() => {
    // this sums up all balances of the same token
    // across different chains
    // ie. ETH is on 3 diff chains, so we show ETH balance as a sum

    // Also,
    // this func adds more keys that would be used later
    // ie. fullStringBalance (non-scientific num),
    // or latestPrice, assetValue etc
    if (!portfolioData) return

    const walletAssetInfo: WalletAssetInfoTypes = {}

    Object.values(portfolioData.wallet.chains).forEach((chain) => {
      chain.protocolPositions.WALLET.assets.forEach((asset) => {
        if (!walletAssetInfo[asset.symbol]) {
          walletAssetInfo[asset.symbol] = {
            symbol: removeSpaces(asset.symbol),
            name: asset.name,
            imgLarge: asset.imgLarge,
            chainKey: chain.key,
            balance: asset.balance,
            imgSmall: asset.imgSmall,
            decimal: asset.decimal,
            chainContract: asset.chainContract,
            fullStringBalance: null,
            fourDecimalsStringBalance: null,
            latestPrice: "N/A",
            assetValue: "N/A",
            convertedToCurrencyTotalWalletValue: "",
          }
        } else {
          walletAssetInfo[asset.symbol].balance += asset.balance
        }
      })
    })
    return walletAssetInfo
  }, [portfolioData])

  useEffect(() => {
    // Check if data is already in session storage
    const savedData = sessionStorage.getItem("cachedPortfolioSummary")
    if (savedData) {
      const cachedPortfolioSummary = JSON.parse(savedData)
      setPortfolioSummary(cachedPortfolioSummary)
      // hides the loader once the data is ready
      setIsLoading(false)
    } else {
      if (portfolioData) {
        const copyWalletInfo = getWalletInformation
        if (copyWalletInfo) {
          const updatedWalletInfo = convertBalances(copyWalletInfo)

          let priceQuery = ""
          // this gets the info required to create the query for the DefiLLama price API call
          for (let asset in updatedWalletInfo) {
            priceQuery += `${updatedWalletInfo[asset].chainContract},`
          }

          axios
            .get(`/get-prices/${priceQuery}`)
            .then((response) => {
              const assetPriceData = response.data.coins
              let totalWalletValue = 0
              // add the Price data from DefiLlama to the object
              for (const key in assetPriceData) {
                const symbol = assetPriceData[key].symbol.toUpperCase()
                const price = assetPriceData[key].price
                for (const walletKey in updatedWalletInfo) {
                  // adds latest fetched asset price & calulates total basis
                  // for all assets where the live price is available from DefiLlama
                  if (walletKey.toUpperCase() === symbol) {
                    const balance = updatedWalletInfo[walletKey].balance
                    updatedWalletInfo[walletKey].latestPrice = price
                    updatedWalletInfo[walletKey].assetValue = price * balance
                    totalWalletValue = totalWalletValue + price * balance
                  }
                }
              }

              const convertedToCurrencyTotalWalletValue = convertToCurrency(
                totalWalletValue,
                2
              )
              const combinedPortfolioSummary = {
                updatedWalletInfo,
                convertedToCurrencyTotalWalletValue,
              }
              setPortfolioSummary(combinedPortfolioSummary)
              // hides the loader once the data is ready
              setIsLoading(false)
              sessionStorage.setItem(
                "cachedPortfolioSummary",
                JSON.stringify(combinedPortfolioSummary)
              )
            })
            .catch((error) => {
              setError(error)
            })
        }
      }
    }
  }, [portfolioData, getWalletInformation])

  if (isLoading) {
    return (
      <S.Container>
        {/* <Spinner /> */}
        <SkeletonLoader />
      </S.Container>
    )
  }

  if (error) {
    return (
      <S.ErrorContainer>
        <p>An error occurred: {error.message}. Please call our Support.</p>
      </S.ErrorContainer>
    )
  }

  return (
    <S.Content>
      <S.InnerWrapper className="listItem">
        <WalletAssetsList portfolioSummary={portfolioSummary} />
      </S.InnerWrapper>
    </S.Content>
  )
}

export default withLoading(WalletPage)
