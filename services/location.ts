import axios from "axios";

import { endpoints } from "../constants";
import { Location } from "../types/locationIQ";
import api from "./api";

export const getSuggestedLocations = async (text: string, limit?: number) => {
  try {
    let finalLimit = 8;
    if (limit) finalLimit = limit;

    const url = `${endpoints.autoComplete}?location=${text}&limit=${finalLimit}`;
    const { data } = await axios.get<Location[]>(url);
    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchLocations = async (text: string) => {
  try {
    const url = `${endpoints.search}?location=${text}`;
    const { data } = await axios.get<Location[]>(url);
    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const autoCompleteSearch = async (text: string) => {
  try {
    const { data } = await api.get("/auto-complete", {
      params: {
        query: text,
        hitsPerPage: "25",
        page: "0",
        lang: "en",
      },
    });
    if (data) return data.hits;
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
