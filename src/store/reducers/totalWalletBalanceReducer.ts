import { createSlice } from "@reduxjs/toolkit"
import { saveTotalWalletBalance } from "../actions/saveTotalWalletBalance"

interface TotalWalletBalanceState {
  totalWalletBalance: string
}

const initialState: TotalWalletBalanceState = {
  totalWalletBalance: "initial",
}

const totalWalletBalanceSlice = createSlice({
  name: "totalWalletBalance",
  initialState,
  reducers: {
    [saveTotalWalletBalance.type]: (state, action) => {
      state.totalWalletBalance = action.payload
    },
  },
})

export default totalWalletBalanceSlice.reducer
