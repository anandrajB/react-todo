import axios from 'axios';
import Cookies from 'js-cookie';
import combineData from '../utils/helper';
import url from './url';
import { useDispatch } from 'react-redux';


const ChatListData = async () => {
  try {
    const token = 'token 57536bb41bd58847058f0888e808983cd37d815c';

    Cookies.set('authToken', token);

    const response = await axios.get(`https://${url.BASE_URL}/api-auth/user/chat/`, {
      headers: { Authorization: token },
    });

    const { email: Email, party_type: PartyType , chat_users : baseData } = response.data?.data?.[0] || {};

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
    
    return [Email, PartyType ,chatUsersData];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default ChatListData;
