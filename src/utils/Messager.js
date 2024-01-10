function MessageSender(config_id, members, party_id, message, sender, subject = null) {
  return {
    type: 'SEND',
    config_id: config_id,
    members: members,
    subject: subject,
    party: party_id,
    message: [
      {
        text: message,
        sender: sender,
        is_read: [sender],
      },
    ],
  };
}

function MessageReceiver(config_id, members, page_no) {
  return {
    type: 'RECEIVE',
    config_id: config_id,
    members: members,
    page: page_no,
  };
}

export { MessageSender, MessageReceiver };
