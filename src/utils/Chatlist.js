import axios from 'axios';
import Cookies from 'js-cookie';
import combineData from './helper';

const ChatlistData = async (access_token , base_url) => {
  try {

    Cookies.set('authToken', access_token);
  
    const response = await axios.get(`https://${base_url}/api-auth/user/chat/`, {
      headers: { Authorization: access_token },
    });

    const { email: Email, party_type: PartyType, chat_users: baseData } = response.data?.data?.[0] || {};

    let index = 0;

    // Combine users and party
    const chatUsersData = [
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

    return [Email, PartyType, chatUsersData];
  } catch (error) {
    console.error('Error fetching Chatlist data:', error);
    throw error;
  }
};


export default ChatlistData;
