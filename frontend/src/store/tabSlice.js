import { createSlice } from '@reduxjs/toolkit'

export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
  activeTab: 1,
  },
  reducers: {
    setActiveTab: (state, action) => {
                state.activeTab = action.payload;
            }
    },
  }
)

// Action creators are generated for each case reducer function
export const { setActiveTab } = tabSlice.actions

export default tabSlice.reducer