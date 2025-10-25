const { getMessagesForUser, sendMessage } = require('../models/messageModel');

const getMessages = async (req, res) => {
  try {
    const messages = await getMessagesForUser(req.user.id);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err });
  }
};

const send = async (req, res) => {
  const { receiverId, propertyId, message } = req.body;
  try {
    const sentMessage = await sendMessage(req.user.id, receiverId, propertyId, message);
    res.status(201).json(sentMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err });
  }
};

module.exports = { getMessages, send };