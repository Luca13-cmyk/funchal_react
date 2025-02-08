import { LucideProps } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";

export interface CarProps {
  _id: string;
  available: number;
  slug: { current: string };
  price: number;
  features: Array<string>;
  model: { name: string };
  name: string;
  imgUrl: any;
  brand: { name: string };
}

export interface InfoProps {
  wpp: string;
  phone: string;
  address: string;
  intro: string;
  intro_sub: string;
  fee: number;
}

export interface ContactProps {
  name: string;
  email: string;
  phone: string;
  car: string;
  startDate: string;
  timeStartDate: string;
  endDate: string;
  timeEndDate: string;
  priceTotal: string;
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  lucideIcon?: ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface FormValues {
  name: string;
  email: string;

  phone: string;
  car: string;
  startDate: Date | string;
  timeStartDate: string;
  endDate: Date | string;
  timeEndDate: string;
}
export interface ModelProps {
  _id: string;
  name: string;
}

export interface CustomFilterProps {
  title: string;
  options: ModelProps[] | undefined;
  model?: string;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}
