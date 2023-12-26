import axios from 'axios';
import Cookies from 'js-cookie';
import combineData from '../utils/helper';
import url from './url';
import { useDispatch } from 'react-redux';


const ChatListData = async () => {
  try {
    const token = 'token 97f01da56785c362c31bbfb53a20753ac88bb724';

    Cookies.set('authToken', token);

    const response = await axios.get(`https://${url.BASE_URL}/api-auth/user/chat/`, {
      headers: { Authorization: token },
    });

    const Email = response.data?.data?.[0].email
  
    const baseData = response.data?.data?.[0].chat_users;
    let index = 0;

    // Combine users and party
    const chatUsersData =  [
      ...combineData(
        baseData?.counterparty_user,
        () => index++,
        (counterparty) => counterparty.party_name,
        (counterparty) => counterparty.users
      ),
      ...combineData(
        baseData?.bank_user,
        () => index++,
        (bank) => bank.bank_name,
        (bank) => bank.users
      ),
      ...combineData(
        baseData?.buyer_user,
        () => index++,
        (buyer) => buyer.party_name,
        (buyer) => buyer.users
      ),
    ];
    
    return [Email, chatUsersData];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default ChatListData;
