import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users/';

const getContacts = async (token: string) => {
  const { data } = await axios.get(API_URL + 'getContacts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const getContact = async (id: string, token: string) => {
  const { data } = await axios.get(API_URL + `getContacts${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const contactsService = {
  getContacts,
  getContact,
};

export default contactsService;
