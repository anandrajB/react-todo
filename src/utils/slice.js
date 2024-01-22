import { createSlice } from '@reduxjs/toolkit';

export const baseDataSlice = createSlice({
  name: 'baseResponse',
  initialState: {
    data: [],
    email: '',
    config_id: '',
    party_type: '',
    convo_list: [],
    chat_users: '',
    convo_comp: false,
  },
  reducers: {
    addData: (state, action) => {
      state.data = [action.payload];
    },
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addPartyType: (state, action) => {
      state.party_type = action.payload;
    },
    addConvoList: (state, action) => {
      state.convo_list = [action.payload];
    },
    setChatUsers: (state, action) => {
      state.chat_users = action.payload;
    },
    setConvoComp: (state, action) => {
      state.convo_comp = action.payload;
    },
    setConfigId: (state, action) => {
      state.config_id = action.payload;
    },
  },
});

export const { addData, addEmail, addPartyType, addConvoList, setChatUsers, setConvoComp, setConfigId } =
  baseDataSlice.actions;
export default baseDataSlice.reducer;
