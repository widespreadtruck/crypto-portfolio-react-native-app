import React from "react"
import SpinnerIcon from '../../assets/SpinnerIcon'
import * as S from "./Spinner.styles"

const Spinner = (): JSX.Element => {
  return (
    <S.Container>
      <S.Spinner>
        <SpinnerIcon />
      </S.Spinner>
    </S.Container>
  )
}

export default Spinner
