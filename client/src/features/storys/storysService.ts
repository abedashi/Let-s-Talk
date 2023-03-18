import axios from 'axios';

const API_URL = 'http://localhost:3001/api/storys/';

const getStorys = async (token: string) => {
  const { data } = await axios.get(API_URL + 'get-storys', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const getStory = async (token: string) => {
  const { data } = await axios.get(API_URL + 'get-story', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

interface StoryData {
  url: string;
  content: string;
}

const addStory = async (storyData: StoryData, token: string) => {
  const { data } = await axios.post(API_URL + 'add-story', storyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const storysService = {
  getStorys,
  getStory,
  addStory,
};

export default storysService;
