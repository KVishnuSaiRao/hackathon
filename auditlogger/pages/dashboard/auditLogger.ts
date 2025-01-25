import axios from 'axios';
export const getSessions = async () => {
  return await axios
.get(
      `http://192.168.1.17:3001/api/logger/sessions`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export const getPages = async (sessionId: string) => {
  return await axios
.get(
      `http://192.168.1.17:3001/api/logger/sessions/${sessionId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export const getLogDetails = async (sessionId: string,pageId:string) => {
  return await axios
.get(
      `http://192.168.1.17:3001/api/logger/${sessionId}/pages/${pageId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
