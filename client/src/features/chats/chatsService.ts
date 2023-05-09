import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chats/';

const getChats = async (token: string) => {
  const { data } = await axios.get(API_URL + 'get-chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const getChat = async (id: string, token: string) => {
  const { data } = await axios.get(API_URL + `get-chat/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const getContacts = async (token: string) => {
  const { data } = await axios.get(API_URL + `get-contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const addChatRoom = async (contact: number, token: string) => {
  const { data } = await axios.post(
    API_URL + `add-chat-room`,
    { contact },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

const chatsService = {
  addChatRoom,
  getContacts,
  getChats,
  getChat,
};

export default chatsService;
