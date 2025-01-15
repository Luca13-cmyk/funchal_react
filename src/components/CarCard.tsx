"use client";

import { useState } from "react";

import { formatToBrl } from "@/utils";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../lib/client";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();

  const { _id, available, imgUrl, model, name, price } = car;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="car-card group cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(true);
      }}
    >
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {name} {model.name}
        </h2>
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          R$
        </span>
        {formatToBrl(price).replace("R$", "")}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /dia
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <img
          src={urlFor(imgUrl).url()}
          alt={name}
          className="object-contain rounded-md"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          {/* <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div> */}
          <div className="car-card__icon">
            {available && (
              <>
                <Check color="green" />
                <p className="car-card__icon-text">{available}</p>
              </>
            )}
          </div>
          {/* <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div> */}
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="Reserve agora"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={(e: any) => {
              e.stopPropagation();
              navigate(`/car/${_id}`);
            }}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
