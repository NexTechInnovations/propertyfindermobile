import axios from "axios";
import { useQuery } from "react-query";
import { endpoints, queryKeys } from "../../constants";

import { Property } from "../../types/property";
import { useUser } from "../useUser";
import api from "../../services/api";

const fetchProperties = async (filters: any): Promise<Property[]> => {
  const options = {
    params: {
      locationExternalIDs: filters.externalIDs?.join(",") || "5002,6020",
      hitsPerPage: "10",
      page: 0,
      lang: "en",
      rentFrequency: "monthly",
      categoryExternalID: 4,
      ...filters,
    },
  };

  try {
    const response = await api.get("/properties/list", options);
    return response.data.hits;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useSearchPropertiesQuery = (filters: any) => {
  const { user } = useUser();
  const queryInfo = useQuery([queryKeys.searchProperties, filters], () =>
    fetchProperties(filters)
  );

  const data = queryInfo?.data;

  if (data) {
    for (let property of data) {
      property.liked = false;
      if (user?.savedProperties?.includes(property.id)) {
        property.liked = true;
      }
    }
  }

  return {
    ...queryInfo,
    data,
  };
};
