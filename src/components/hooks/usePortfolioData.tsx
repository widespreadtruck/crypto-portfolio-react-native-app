import { useState, useEffect, useCallback } from "react"
import axios from "axios"

interface Portfolio {
  [key: string]: {
    [key: string]: {
      [key: string]: Chain
    }
  }
}

interface Chain {
  key: string
  protocolPositions: {
    WALLET: {
      assets: Asset[]
    }
  }
}

interface Asset {
  imgLarge: string
  balance: number
  name: string
  chainKey: string
  symbol: string
  imgSmall: string
  decimal: number
  chainContract: string
  latestPrice: string | number
  assetValue: string | number
  price: number
}

const usePortfolioData = (): Portfolio | null => {
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/wallet")
      setPortfolioData(response.data.assetByProtocols)
    } catch (err: any) {
      console.log(`An error occurred: ${err.message}`)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return portfolioData
}

export default usePortfolioData
