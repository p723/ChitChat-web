import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice'
import activate from './activateSlice'
import tab from './tabSlice'

export default configureStore({
  reducer: {
    auth,
    activate,
    tab,
  }
})