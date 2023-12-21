
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slice'



export default configureStore({
    devTools : true,
    reducer: {
        baseData : dataReducer
    },
})
