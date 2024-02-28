import axios from "axios";
import { API_URL, PASSWORD } from "../config";
import md5 from "md5";
import { dateToYYYYMMDD } from "../utils/dateToYYYYMMDD";


export const getItems = (offset: number, limit: number) => {
  const data = {
    action: "get_ids",
    params: { offset, limit },
  };

  const headers = {
    "X-Auth": md5(`${PASSWORD}_${dateToYYYYMMDD(new Date())}`),
  };
  return axios.post(API_URL, data, { headers }).then((response) => {
    const ids = response.data.result;
    return axios.post(
      API_URL,
      {
        action: "get_items",
        params: { ids },
      },
      { headers }
    );
  });
};
