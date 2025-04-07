"use client";

import { useState } from "react";

import { formatToBrl } from "@/utils";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

import { Car } from "lucide-react";
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
      className="car-card group cursor-pointer md:hover:scale-110 transition-all ease-out duration-300"
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

      <div className="relative w-full h-48 my-3 object-contain">
        <img
          src={urlFor(imgUrl).url()}
          alt={name}
          className="object-contain rounded-xl h-48 mx-auto"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="car-card__icon">
            {available && (
              <>
                <Car color="black" />
                <p className="car-card__icon-text text-black">{available}</p>
              </>
            )}
          </div>
        </div>
        <div className="car-card__btn-container flex-col">
          <CustomButton
            title="Pré-reserve agora"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue hover:bg-primary-blue/90"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={(e: any) => {
              e.stopPropagation();
              navigate(`/car/${_id}`);
            }}
          />
          <CustomButton
            title="Mostrar detalhes"
            containerStyles="w-full py-[2px] rounded-full bg-transparent"
            textStyles="text-[14px] leading-[17px] font-bold hover:text-primary-blue"
            rightIcon="/right-arrow.svg"
            handleClick={(e: any) => {
              e.stopPropagation();
              setIsOpen(true);
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
