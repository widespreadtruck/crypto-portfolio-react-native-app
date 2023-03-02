import React, { FC, useEffect, useState } from "react"
import usePortfolioData from "../../components/hooks/usePortfolioData"
import { useLocation } from "react-router-dom"
import * as S from "./AssetInfoModal.styles"
import Spinner from "../Spinner/Spinner"
import ChainsList from "../ChainsList/ChainsList"
import AssetStats from "../AssetStats/AssetStats"
import AssetSymbolImg from "../AssetSymbol/AssetSymbol"
import axios from "axios"
import { convertToCurrency, convertToDecimals } from "../../Utils/Utils"
import useChainImages from "../hooks/useChainImages"
import OpenPnL from "../OpenPnL/OpenPnL"
import ArrowLeft from '../../assets/ArrowLeft'
import withLoading from "../../HOCs/withLoading"

interface AssetData {
  name: string
  imgLarge: string
  assetsInfo: Array<{
    chainKey: string
    chainImg: string
    chainName: string
    symbol: string
    balance: number
    decimal: number
    price: number
  }>
  assetSymbol: string
  totalBalance: number
  purchasePrice: string
  currPrice: string
  notConvertedCurrPrice: number
  currentTotalValue: string
  totalValueAtPurchase: number
  positiveReturn: boolean | null
  openPnLPercentage: number
}

const initialAssetData: AssetData = {
  name: '',
  imgLarge: '',
  assetsInfo: [],
  assetSymbol: '',
  totalBalance: 0,
  purchasePrice: '',
  currPrice: '',
  notConvertedCurrPrice: 0,
  currentTotalValue: '',
  totalValueAtPurchase: 0,
  positiveReturn: true,
  openPnLPercentage: 0
}

interface Props {
  isLoading: boolean
  setIsLoading: any
}


/**
 * This component is a summary of an asset.
 * It contains all types of info such as Total Cost Basis,
 * Open PnL, total balance, current price (fetched from DefiLlama),
 * as well as a list of all the chains that have the asset
 */
const AssetInfoModal: FC<Props> = ({ isLoading, setIsLoading }) => {
  const portfolioData = usePortfolioData()
  const chainImages = useChainImages()
  const location = useLocation()

  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [assetData, setAssetData] = useState<AssetData>(initialAssetData)

  const getAsset = (str: string) => {
    const lastSlashIndex = str.lastIndexOf("/")
    return str.substring(lastSlashIndex + 1)
  }
  const assetSymbol = getAsset(location.pathname)

  const handleGoBack = () => {
    window.history.back()
  }

  useEffect(() => {
    if (portfolioData !== null) {
      let assetsInfo: any = []
      let assetCompleteInfo: any = {}
      let query: string = ""
      let totalBalance: number = 0
      let purchasePrice: number = 0
      let positiveReturn: boolean = false
      let openPnLPercentage: number = 0
      let decimal: number = 0
      let name: string = ""
      let imgLarge: string = ""

      Object.values(portfolioData.wallet.chains).forEach((chain) => {
        chain.protocolPositions.WALLET.assets.forEach((asset) => {
          if (asset.symbol === assetSymbol) {
            assetsInfo.push(asset)
            query = asset.chainContract
            totalBalance += asset.balance
            purchasePrice = asset.price
            decimal = asset.decimal
            name = asset.name
            imgLarge = asset.imgLarge
          }
        })
      })

      //add chain images to each asset
      if (chainImages) {
        assetsInfo.map((asset: any) => {
          Object.values(chainImages).forEach((chain: any) => {
            if (asset.chainKey === chain.key) {
              asset.chainImg = chain.imgLarge
              asset.chainName = chain.name
            }
          })
        })
      }

      if (query.length !== 0) {
        try {
          axios.get(`/get-prices/${query}`).then((res) => {
            const coin = res.data.coins

            let currPrice: number = 0
            Object.values(coin).forEach((obj: any) => {
              currPrice = obj.price
            })

            const currentTotalValue = currPrice * totalBalance
            const totalValueAtPurchase = purchasePrice * totalBalance
            const openPnL =
              ((currentTotalValue - totalValueAtPurchase) /
                totalValueAtPurchase) *
              100

            if (openPnL > 0) {
              positiveReturn = true
              openPnLPercentage = openPnL
            }
            if (openPnL < 0) {
              openPnLPercentage = Math.abs(openPnL)
            }

            const currentTotalValueToDecimals = convertToDecimals(
              currentTotalValue,
              2
            )

            assetCompleteInfo = {
              name,
              imgLarge,
              assetsInfo,
              assetSymbol,
              totalBalance: convertToDecimals(totalBalance, decimal),
              purchasePrice: convertToCurrency(purchasePrice, 4),
              currPrice: convertToCurrency(currPrice, 4),
              notConvertedCurrPrice: currPrice,
              currentTotalValue: convertToCurrency(
                currentTotalValueToDecimals,
                decimal
              ),
              totalValueAtPurchase,
              positiveReturn: openPnL === 0 ? null : positiveReturn,
              openPnLPercentage: convertToDecimals(openPnLPercentage, 2),
            }

            setAssetData(assetCompleteInfo)
            setIsLoading(false)
          })
        } catch (err: any) {
          console.log(`An error occurred: ${err.message}`)
        }
      }
    }
  }, [portfolioData, chainImages])

  if (isLoading) {
    return (
      <S.Container>
        <Spinner />
      </S.Container>
    )
  }

  return (
    <S.MainContainer>
      <S.ListItem>
        <S.ItemWrapper>
          <S.Button onClick={handleGoBack} type="button" className="group">
            <ArrowLeft />
            <S.BtnText>Back</S.BtnText>
            <span className="sr-only">Go Back button</span>
          </S.Button>
          <S.Stats>
            <S.SymbolWrapper>
              {/* lazy load the asset symbol image */}
              <AssetSymbolImg assetData={assetData} />
              <S.Symbol>{assetData.assetSymbol}</S.Symbol>
            </S.SymbolWrapper>
            {/* Total Cost Basis & Open PnL*/}
            <S.CostBasisContainer>
              <S.FlexWrapper>
                <S.CostBasisTitle>TOTAL COST BASIS</S.CostBasisTitle>
                <S.CostBasisValue>
                  {assetData.currentTotalValue}
                </S.CostBasisValue>
              </S.FlexWrapper>
              <OpenPnL assetData={assetData} />
            </S.CostBasisContainer>
          </S.Stats>
          {/* A section in the Asset modal displaying: * Total Balance, Current */}
          {/* Price, & Purchase Price */}
          <AssetStats assetData={assetData} />
          {/* Displays a list of Chains that have the asset */}
          <ChainsList assetData={assetData} />
        </S.ItemWrapper>
      </S.ListItem>
    </S.MainContainer>
  )
}

export default withLoading(AssetInfoModal)
