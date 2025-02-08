import { CarProps, FormValues, InfoProps } from "@/types";
import { differenceInDays, format } from "date-fns";
import { calculatePercentage, formatToBrl } from ".";

import { client } from "../lib/client";
import {
  CAR_BY_ID,
  CARS_QUERY,
  CONTACT_BY_ID,
  INFO_QUERY,
  MODELS_QUERY,
} from "../lib/queries";
import { SanityDocument } from "@sanity/client";
import { ContactProps, ModelProps } from "../types";

export const createContact = async (
  values: FormValues,
  car: CarProps,
  fee: number
): Promise<SanityDocument<Record<string, any>>> => {
  const difference_days =
    differenceInDays(values.endDate, values.startDate) + 1;

  const data = {
    ...values,
    endDate: format(values.endDate, "MM/dd/yyyy"),
    startDate: format(values.startDate, "MM/dd/yyyy"),
    priceTotal: formatToBrl(
      car.price * difference_days * calculatePercentage(fee)
    ),
  };

  const result = await client.create({
    _type: "contact",
    ...data,
  });

  return result;
};

export const getCars = async (model: string | null) => {
  const allCars: CarProps[] = await client.fetch(CARS_QUERY, { model });

  if (!allCars) throw Error;

  return allCars;
};
export const getInfo = async () => {
  const info: InfoProps = await client.fetch(INFO_QUERY);

  if (!info) throw Error;

  return info;
};

export const getModels = async () => {
  const allModels: ModelProps[] = await client.fetch(MODELS_QUERY);

  if (!allModels) throw Error;

  return allModels;
};

export const getCarById = async (id: string) => {
  const car: CarProps = await client.fetch(CAR_BY_ID, { id });

  if (!car) throw Error;
  return car;
};

export const getContactById = async (id: string) => {
  const contact: ContactProps = await client.fetch(CONTACT_BY_ID, { id });

  if (!contact) throw Error;
  return contact;
};
