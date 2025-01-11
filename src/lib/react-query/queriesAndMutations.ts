import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  getCarById,
  getCars,
  getContactById,
  getModels,
} from "../../utils/actions";

export const useGetCars = (model: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CARS],
    queryFn: () => getCars(model),
  });
};
export const useGetModels = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MODELS],
    queryFn: () => getModels(),
  });
};
export const useGetCarById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CAR_BY_ID, id],
    queryFn: () => getCarById(id),
    enabled: !!id,
  });
};

export const useGetContactById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONTACT_BY_ID, id],
    queryFn: () => getContactById(id),
    enabled: !!id,
  });
};
