import axios from "axios";

export const getAnalytics = async () => {
    try {
      return await axios.get(
        `http://192.168.1.17:3001/api/logger/analytics
 `,
        {
        //   headers: authHeader.authHeader(),
        }
      );
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };