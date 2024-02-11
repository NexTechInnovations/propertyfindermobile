import axios from "axios";
import { useQuery } from "react-query";
import { endpoints, queryKeys } from "../../constants";

import { Property } from "../../types/property";
import api from "../../services/api";

const fetchProperties = async ({
  externalIDs,
}: {
  externalIDs?: string[];
}): Promise<Property[]> => {
  const options = {
    params: {
      locationExternalIDs: externalIDs?.join(",") || "5002,6020",
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

export const useSearchPropertiesQuery = ({
  externalIDs,
}: {
  externalIDs?: string[] | undefined;
}) => {
  const { user } = useUser();
  const queryInfo = useQuery(queryKeys.searchProperties, () =>
    fetchProperties({ externalIDs })
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
