import axios from "axios";

const api_key = process.env.REACT_APP_YOUTUBE_KEY;

//youtube api key

export const getWiki = async (keyword) => {
  console.log("keyword", keyword);
  const key = keyword.split(" ").join("+");
  console.log("newkey", key);
  try {
    const { data } = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${key}`,
    );
    return {
      data: data.query.search[0].snippet,
      key: key.replaceAll("+", "_"),
    };
  } catch (err) {
    return err.message;
  }
};

export const getVideoData = async (res_num, keyword) => {
  const key = keyword.split(" ").join("+");
  console.log(key, api_key, process.env.REACT_APP_YOUTUBE_KEY);
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&max_results=${res_num}&key=${api_key}&q=what+is+${key}`,
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
