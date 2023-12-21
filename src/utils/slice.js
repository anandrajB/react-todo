import { createSlice } from '@reduxjs/toolkit';

export const baseDataSlice = createSlice({
    name : 'baseResponse',
    initialState : [],
    reducers : {
        addData(state , action ){
            state.push(action.payload);
        }
    }
})


export const { addData } = baseDataSlice.actions;
export default baseDataSlice.reducer