import React, { useState, useEffect } from "react"
import * as S from "./AssetSymbol.styles"

/**
 * lazy load the asset symbol image
 * show a skeleton loader while the img is loading
 */
const AssetSymbol = ({ assetData }: { assetData: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = assetData.assetsInfo[0].imgLarge
    img.onload = () => {
      setImageLoaded(true)
    }
  }, [assetData.assetsInfo[0].imgLarge])

  return (
    <div>
      {imageLoaded ? (
        <S.SymbolImg>
          <S.Img alt="asset icon" src={assetData.assetsInfo[0].imgLarge} />
        </S.SymbolImg>
      ) : (
        <S.SymbolImg>
          <div className="mx-auto object-cover rounded-full ml-0 mr-0 h-full w-full bg-gray-600"></div>
        </S.SymbolImg>
      )}
    </div>
  )
}

export default AssetSymbol
