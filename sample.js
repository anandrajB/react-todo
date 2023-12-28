const response = await axios.get('https://finflo-test-v2-uikte.ondigitalocean.app/api-auth/user/chat/', {
  headers: {
    Authorization: token,
  },
});

const combinedData = [];

// Combine counterparty users
response.data?.data?.[0].chat_users.counterparty_user.forEach((counterparty, index) => {
  combinedData.push({
    id: index, // Set the id as the current index
    name: counterparty.party_name,
    users: counterparty.users,
  });
});

// Combine bank users
response.data.data[0].chat_users.bank_user.forEach((bank, index) => {
  combinedData.push({
    id: index + response.data.data[0].chat_users.counterparty_user.length, // Increment index based on previous length
    name: bank.bank_name,
    users: bank.users,
  });
});

return combinedData;
