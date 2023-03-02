import React from "react"
import * as S from "./AssetItem.styles"
import ArrowIcon from "../../assets/ArrowIcon"
import { useLocation, useNavigate } from "react-router-dom"

const AssetItem = ({
  iconAddress,
  symbol,
  imgLarge,
  tokenName,
  fourDecimalsBalance,
  latestPrice,
  assetValue,
  triggerWarning,
}: {
  iconAddress: string
  imgLarge: string
  symbol: string
  tokenName: string
  fourDecimalsBalance: string
  latestPrice: string | number
  assetValue: string | number
  triggerWarning: any
}): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (symbol: string, latestPrice: string | number) => {
    // show a banner if the live Price wasn't fetched
    if (latestPrice === "N/A") {
      triggerWarning(true)
      return
    }
    // navigate to the Item modal
    navigate(`${location.pathname}/${symbol}`)
  }

  return (
    <S.ListElement onClick={() => handleClick(symbol, latestPrice)}>
      <S.ContentWrapper className="listItem">
        <S.AssetImg>
          <S.Img alt="asset icon" src={iconAddress} />
        </S.AssetImg>
        <S.NameAndPriceWrapper>
          <S.Name>{tokenName}</S.Name>
          <S.LatestPrice>{latestPrice}</S.LatestPrice>
        </S.NameAndPriceWrapper>

        <S.ValueAndBalance>
          <S.AssetValue>{assetValue}</S.AssetValue>
          <S.Balance>{fourDecimalsBalance}</S.Balance>
        </S.ValueAndBalance>

        <S.ArrowBtn>
          <ArrowIcon />
        </S.ArrowBtn>
      </S.ContentWrapper>
    </S.ListElement>
  )
}

export default AssetItem
