import { createSlice } from '@reduxjs/toolkit';

export const baseDataSlice = createSlice({
    name: 'baseResponse',
    initialState: {
      data: [],
      email: '',
    },
    reducers: {
      addData: (state, action) => {
        state.data.push(action.payload);
      },
      addEmail: (state, action) => {
        state.email = action.payload;
      },
    },
  });
  

export const { addData , addEmail} = baseDataSlice.actions;
export default baseDataSlice.reducer