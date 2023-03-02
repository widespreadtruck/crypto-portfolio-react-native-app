import React from "react"
import * as S from "./ChainsList.styles"
import { convertToCurrency, convertToDecimals } from "../../Utils/Utils"

const ChainsList = ({ assetData }: { assetData: any }) => {
  return (
    <div>
      <ul className="mt-10 flex flex-col divide-y-0 divide-gray-600 w-full">
        {assetData.assetsInfo.map((value: any, idx: number) => (
          <S.ListElement key={`${value.symbol}_${idx}`}>
            <S.ContentWrapper className="listItem">
              <S.AssetImg>
                <S.Img alt="chain icon" src={value.chainImg} />
              </S.AssetImg>
              <S.NameAndPriceWrapper>
                <S.Name>Chain: {value.chainName}</S.Name>
                <S.LatestPrice>
                  Balance: {convertToDecimals(value.balance, value.decimal)}{" "}
                  {value.symbol.toUpperCase()}
                </S.LatestPrice>
              </S.NameAndPriceWrapper>

              <S.ValueAndBalance>
                <S.AssetValue>{value.name}</S.AssetValue>
                <S.Balance>
                  {convertToCurrency(
                    value.balance * assetData.notConvertedCurrPrice,
                    4
                  )}
                </S.Balance>
              </S.ValueAndBalance>
            </S.ContentWrapper>
          </S.ListElement>
        ))}
      </ul>
    </div>
  )
}
export default ChainsList
