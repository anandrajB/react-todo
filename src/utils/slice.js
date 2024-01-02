import { createSlice } from '@reduxjs/toolkit';

export const baseDataSlice = createSlice({
    name: 'baseResponse',
    initialState: {
      data: [],
      email: '',
      party_type : '',
      convo_list: [],
      chat_users : '',
      convo_comp : false
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
      },
      addConvoList: (state, action) => {
        state.convo_list.push(action.payload);
      },
      setChatUsers : (state, action) => {
        state.chat_users = action.payload
      },
      setConvoComp : (state, action) => {
        state.convo_comp = action.payload
      }
    },
  });
  

export const { addData , addEmail , addPartyType , addConvoList , setChatUsers ,setConvoComp} = baseDataSlice.actions;
export default baseDataSlice.reducer