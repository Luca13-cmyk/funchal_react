import { rent_fee } from "@/constants";
import { CarProps } from "@/types";
import { differenceInDays } from "date-fns";

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export const formatToBrl = (number: number) => {
  const formattedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formattedNumber;
};

export const calculatePriceTotal = (
  endDate: Date,
  startDate: Date,
  car: CarProps
) => {
  if (!endDate || !startDate) return formatToBrl(car.price);

  const difference_days = differenceInDays(endDate, startDate);

  const priceTotalwithFee = car.price * difference_days * rent_fee;

  const priceTotalFormatted = formatToBrl(priceTotalwithFee);

  return priceTotalFormatted;
};
export const handleScroll = () => {
  const nextSection = document.getElementById("discover");

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
