import { createSlice } from '@reduxjs/toolkit';

export const baseDataSlice = createSlice({
    name: 'baseResponse',
    initialState: {
      data: [],
      email: '',
      party_type : '',
    },
    reducers: {
      addData: (state, action) => {
        state.data.push(action.payload);
      },
      addEmail: (state, action) => {
        state.email = action.payload;
      },
      addPartyType: (state, action) => {
        state.party_type = action.payload;
      }
    },
  });
  

export const { addData , addEmail , addPartyType} = baseDataSlice.actions;
export default baseDataSlice.reducer