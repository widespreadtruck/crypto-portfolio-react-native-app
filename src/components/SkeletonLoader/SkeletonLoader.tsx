import React from "react"
import * as S from "./SkeletonLoader.styles"

/**
 * @title Skeleton Loader
 * displays a placeholder UI while loading data
 */

const SkeletonLoader = (): JSX.Element => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.FlexContainer>
          <S.FlexRow>
            <S.Circle></S.Circle>
          </S.FlexRow>

          <S.WidthThird></S.WidthThird>
        </S.FlexContainer>

        <S.HeightTwenty></S.HeightTwenty>
        <S.HeightTwenty></S.HeightTwenty>
        <S.HeightTwenty></S.HeightTwenty>
        <S.HeightTwenty></S.HeightTwenty>
        <S.HeightTwenty></S.HeightTwenty>
      </S.Wrapper>
    </S.Container>
  )
}

export default SkeletonLoader
