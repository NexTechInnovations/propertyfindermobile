import axios from "axios";
import { useQuery } from "react-query";
import { endpoints, queryKeys } from "../../constants";

import { Property } from "../../types/property";
import { useUser } from "../useUser";
import api from "../../services/api";

// const fetchProperties = async (boundingBox?: number[]): Promise<Property[]> => {
//   if (!boundingBox) return [];

//   const response = await axios.post(`${endpoints.getPropertiesByBoundingBox}`, {
//     latLow: boundingBox[0],
//     latHigh: boundingBox[1],
//     lngLow: boundingBox[2],
//     lngHigh: boundingBox[3],
//   });

//   const data: Property[] = response.data;
//   return data;
// };

// export const useSearchPropertiesQuery = (boundingBox: number[]) => {
//   const { user } = useUser();
//   const queryInfo = useQuery(
//     queryKeys.searchProperties,
//     () => fetchProperties(boundingBox),
//     {
//       enabled: false,
//     }
//   );

//   const data = queryInfo?.data;
//   if (data)
//     for (let property of data) {
//       property.liked = false;
//       if (user?.savedProperties?.includes(property.ID)) property.liked = true;
//     }

//   return {
//     ...queryInfo,
//     data,
//   };
// };

const fetchProperties2 = async (): Promise<Property[]> => {
  const options = {
    method: "GET",
    url: "https://bayut.p.rapidapi.com/properties/list",
    params: {
      locationExternalIDs: "5002,6020",
      hitsPerPage: "10",
      page: 0,
      lang: "en",
      rentFrequency: "monthly",
      categoryExternalID: 4,
    },
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "293e0b6fc9msh8e2ecd6b6178856p1bc8bfjsn973fc9577c3e",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.hits;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchProperties = async (): Promise<Property[]> => {
  const options = {
    params: {
      locationExternalIDs: "5002,6020",
      hitsPerPage: "10",
      page: 0,
      lang: "en",
      rentFrequency: "monthly",
      categoryExternalID: 4,
    },
  };

  try {
    const response = await api.get("/properties/list", options);
    return response.data.hits;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useSearchPropertiesQuery = () => {
  const { user } = useUser();
  const queryInfo = useQuery(queryKeys.searchProperties, () =>
    fetchProperties()
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
