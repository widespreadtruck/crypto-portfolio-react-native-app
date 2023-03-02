import { Decimal } from "decimal.js"
import { WalletAssetInfoTypes } from '../pages/WalletPage/WalletPage'

export const convertToDecimals = (num: number, decimal: number) => {
  // mathematically correctly convert and round numbers using "decimal.js"
  const decimalNum = new Decimal(num)
  // multiplies the decimalNum by 10 raised to the power of decimal, 
  // rounds the result down to the nearest whole number using .floor(),
  // and divides the result by 10 raised to the power of decimal
  const result = decimalNum
    .mul(new Decimal(10).pow(decimal))
    .floor()
    .div(new Decimal(10).pow(decimal))
    .toString()

    // removes extra zeros
  const parts = result.split(".")
  if (parts.length === 2) {
    const decimalPart = parts[1].replace(/0+$/, "")
    if (decimalPart.length > 0) {
      return `${parts[0]}.${decimalPart}`
    } else {
      return parts[0]
    }
  }
  return result
}

  export const convertToCurrency = (num: any, decimals: number | null) => {
    // converts a number i.e. 2.355226 to a string format i.e $2.355226
    const balance = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: decimals || 2,
    })
    return balance.format(num)
  }

  export const removeSpaces = (str: string) => {
    return str.replace(/\s+/g, "")
  }

  export const convertBalances = (obj: WalletAssetInfoTypes) => {
    // this function converts scientific nums to regular nums
    // by using "convertToDecimals" 
    for (let token in obj) {
      //get a full balance as a regular number as a string
      obj[token].fullStringBalance = convertToDecimals(
        obj[token].balance,
        obj[token].decimal
      )
      // get the balance rounded up to 4 decimals
      // or if there is less decimals, to the right number of decimals
      if (obj[token].decimal >= 4) {
        obj[token].fourDecimalsStringBalance = convertToDecimals(
          obj[token].balance,
          4
        )
      } else {
        obj[token].fourDecimalsStringBalance = convertToDecimals(
          obj[token].balance,
          obj[token].decimal
        )
      }
    }
    return obj
  }
  