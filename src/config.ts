import md5 from "md5";
import { dateToYYYYMMDD } from "./utils/dateToYYYYMMDD";

const PASSWORD = "Valantis";

export const AUTH_TOKEN = md5(`${PASSWORD}_${dateToYYYYMMDD(new Date())}`);

export const API_URL = "http://api.valantis.store:40000/";

export const PAGE_SIZE = 50;

/** Значение запасного лимита для восстановления записей при удалении дублей */
export const RESERVE_LIMIT = 5;
