import React from "react"
import * as S from "./AssetStats.styles"

/**
 * A section in the Asset modal displaying:
 * Total Balance, Current Price, & Purchase Price
 */
const AssetStats = ({ assetData }: { assetData: any }) => {
  return (
    <S.OtherStatsContainer>
      <S.TotalBalanceContainer>
        <p>Total Balance</p>
        <S.TotalBalanceValue>
          {assetData.totalBalance} {assetData.assetSymbol.toUpperCase()}
        </S.TotalBalanceValue>
      </S.TotalBalanceContainer>
      <S.CurrPriceContainer>
        <p>Current Price</p>
        <S.CurrPriceValue>{assetData.currPrice}</S.CurrPriceValue>
      </S.CurrPriceContainer>
      <S.CostBasisWrapper>
        <p>Purchase Price</p>
        <S.CostBasisValueOther>{assetData.purchasePrice}</S.CostBasisValueOther>
      </S.CostBasisWrapper>
    </S.OtherStatsContainer>
  )
}
export default AssetStats
