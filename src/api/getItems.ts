import axios from "axios";
import { API_URL, AUTH_TOKEN, RESERVE_LIMIT } from "../config";
import { IGood } from "../types/goods";

export const getItems = (offset: number, limit: number) => {
  const data = {
    action: "get_ids",
    params: { offset, limit: limit + RESERVE_LIMIT },
  };

  const headers = {
    "X-Auth": AUTH_TOKEN,
  };
  let ids: string[] = [];

  return axios
    .post(API_URL, data, { headers })
    .then((response) => {
      const rawIds = response.data.result;

      //убираем дубли из массива айди товаров
      ids = [...new Set(rawIds)].slice(0, limit) as string[];

      return axios.post(
        API_URL,
        {
          action: "get_items",
          params: { ids },
        },
        { headers }
      );
    })
    .then((response) => {
      //убираем дубли айди в записях товаров
      const itemsMap = new Map();
      (response.data.result as IGood[]).forEach((item) => {
        if (!itemsMap.has(item.id)) itemsMap.set(item.id, item);
      });
      return ids.map((id) => itemsMap.get(id));
    });
};
