import { createSlice } from '@reduxjs/toolkit'

export const stateSlice = createSlice({
  name: 'state',
  initialState: {
  dropdownState: false,
  },
  reducers: {
    setDropdownState: (state, action) => {
                state.dropdownState = action.payload;
            }
    },
  }
)

// Action creators are generated for each case reducer function
export const { setActiveTab } = tabSlice.actions

export default tabSlice.reducer