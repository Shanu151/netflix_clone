import axios from "axios";
export const getSearchData = async (text) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.tvmaze.com/search/shows?q=${text || "all"}`,
      headers: {},
    };

    return axios.request(config);
  } catch (error) {}
};
