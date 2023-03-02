import { useState, useEffect, useCallback } from "react"
import axios from "axios"

// interface Portfolio {
//   [key: string]: {
//     [key: string]: {
//       [key: string]: Chain
//     }
//   }
// }

// interface Chain {
//   key: string
//   protocolPositions: {
//     WALLET: {
//       assets: Asset[]
//     }
//   }
// }

// interface Asset {
//   balance: number
//   name: string
//   chainKey: string
//   symbol: string
//   imgSmall: string
//   decimal: number
//   chainContract: string
//   latestPrice: string | number
//   assetValue: string | number
//   price: number
// }

const useChainImages = (): any => {
  const [imagesData, setImagesData] = useState<any>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/wallet")
      const chains = response.data.assetByProtocols.wallet.chains
      const chainImagesObj: any = {}
      Object.values(chains).forEach((chain: any) => {
        // console.log('chain', chain)
        if (!chainImagesObj[chain.key]) {
            chainImagesObj[chain.key] = {
              name: chain.name,
              key: chain.key,
              imgLarge: chain.imgLarge,
            }

        } 
      })
    //   console.log("chainImagesObj", chainImagesObj)
      setImagesData(chainImagesObj)
    } catch (err: any) {
      console.log(`An error occurred: ${err.message}`)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return imagesData
}

export default useChainImages
