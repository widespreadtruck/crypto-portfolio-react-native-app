import { configureStore } from "@reduxjs/toolkit"
import totalWalletBalanceReducer from "./reducers/totalWalletBalanceReducer"

interface WalletBalanceState {
  totalWalletBalance: string
}

export interface RootState {
  totalWalletBalance: WalletBalanceState
}

const store = configureStore({
  reducer: {
    totalWalletBalance: totalWalletBalanceReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export default store
