import React, { FC, useEffect, useState, useMemo } from "react"
import type { PropsWithChildren } from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from "react-native"

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen"

import {
  convertToCurrency,
  removeSpaces,
  convertBalances,
} from "./Utils/Utils"
import axios from "axios"
import portfolioData from "./0xef7f2e81ea14538858d962df34eb1bfda83da395.json"



interface Error {
  message: string
}

export interface PortfolioSummaryTypes {
  updatedWalletInfo: WalletAssetInfoTypes
  convertedToCurrencyTotalWalletValue: string
}

export interface WalletAssetInfoTypes {
  [key: string]: {
    symbol: string
    name: string
    imgLarge: string
    chainKey: string
    balance: any
    imgSmall: string
    decimal: number
    chainContract: string
    latestPrice: string | number
    assetValue: string | number
    fullStringBalance: null | string
    fourDecimalsStringBalance: null | string
    convertedToCurrencyTotalWalletValue: string
  }
}


export interface Chain {
  color: any
  imgLarge: any
  imgSmall: any
  key: any
  name: any
  protocolPositions: any
  totalClosedPnl: any
  totalCostBasis: any
  totalOpenPnl: any
  value: any
}

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark"

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [error, setError] = useState<Error | null>(null)
  const [portfolioSummary, setPortfolioSummary] =
    useState<any>({
      updatedWalletInfo: {},
      convertedToCurrencyTotalWalletValue: "$0.00",
    })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getWalletInformation = useMemo(() => {
    if (!portfolioData) return

    const walletAssetInfo: WalletAssetInfoTypes = {}

    Object.values(portfolioData.assetByProtocols.wallet.chains).forEach(
      (chain: any) => {
        chain.protocolPositions.WALLET.assets.forEach((asset: any) => {
          if (!walletAssetInfo[asset.symbol]) {
            walletAssetInfo[asset.symbol] = {
              symbol: removeSpaces(asset.symbol),
              name: asset.name,
              imgLarge: asset.imgLarge,
              chainKey: chain.key,
              balance: asset.balance,
              imgSmall: asset.imgSmall,
              decimal: asset.decimal,
              chainContract: asset.chainContract,
              fullStringBalance: null,
              fourDecimalsStringBalance: null,
              latestPrice: "N/A",
              assetValue: "N/A",
              convertedToCurrencyTotalWalletValue: "",
            }
          } else {
            walletAssetInfo[asset.symbol].balance += asset.balance
          }
        })
      }
    )
    // return walletAssetInfo
    return Object.values(walletAssetInfo)
  }, [portfolioData])

  useEffect(() => {
    setPortfolioSummary(getWalletInformation)
    setIsLoading(false)
  }, [getWalletInformation])

  console.log("portfolioSummary", portfolioSummary[3])

  return (
    <>
      {isLoading ? null : (
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View style={backgroundStyle}>
            {/* <Header /> */}
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}
            >
              <FlatList
                data={portfolioSummary}
                renderItem={({ item }) => (
                  // <Text>
                  //   {item.symbol}
                  // </Text>
                  <Text className="text-2xl font-bold text-blue-500">
                    {item.symbol}
                  </Text>
                )}
              />
              {/* <Section title="Step One">
                Edit <Text style={styles.highlight}>App.tsx</Text> to change this
                screen and then come back to see your edits.
              </Section>
              <Section title="See Your Changes">
                <ReloadInstructions />
              </Section>
              <Section title="Debug">
                <DebugInstructions />
              </Section>
              <Section title="Learn More">
                Read the docs to discover what to do next:
              </Section> */}
              {/* <LearnMoreLinks /> */}
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  )
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App
