import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AccountState } from '../types'

const initialState: AccountState = { address: '' }

export const accountSlice = createSlice({
  name: 'Account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountState>) => {
      state.address = action.payload.address
    },
  },
})

// Actions
export const { setAccount } = accountSlice.actions

export default accountSlice.reducer
