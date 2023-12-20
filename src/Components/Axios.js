import axios from 'axios';
import Cookies from 'js-cookie';

const ChatListData = async () => {
  try {
    const token = 'token 33972f1252e6b082704a985b5e601a54ac2f5f7f';
    Cookies.set('authToken', token);
    const response = await axios.get('https://finflo-test-v2-uikte.ondigitalocean.app/api-auth/user/chat/', {
      headers: {
        Authorization: token,
      },
    });
    const combinedData = [];
    let index = 0;
    // combine counter party user
    response.data?.data?.[0].chat_users.counterparty_user.forEach(
        (counterparty ) => {
        combinedData.push(
            {
            id : index++,
            name : counterparty.party_name,
            users : counterparty.users,
            }
        )
        }
    )

    // Combine bank users
    response.data.data[0].chat_users.bank_user.forEach((bank ) => {
        combinedData.push({
        id : index++,
        name: bank.bank_name,
        users: bank.users
        });
    });

    return combinedData;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default ChatListData;
