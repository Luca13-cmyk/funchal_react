import { InfoProps } from "@/types";
import { wpp_link } from "../constants";
import { handleScroll } from "../utils";
import CustomButton from "./CustomButton";
import { ArrowBigDownDash, Phone, Smartphone } from "lucide-react";

const Hero = ({ info }: { info: InfoProps }) => {
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">{info.intro}</h1>

        <p className="hero__subtitle">{info.intro_sub}</p>
        <br />
        <hr />
        <p className="hero__subtitle">
          <small className="">
            <b>Endereço:</b> {info.address} <br />
            <b>Telefone:</b> {info.phone}
          </small>
        </p>
        <div className="flex flw-row gap-2">
          <CustomButton
            title="Explorar"
            containerStyles="bg-primary-blue text-white rounded-full mt-10 md:hover:scale-105 transition-all ease-out duration-300"
            lucideIcon={<ArrowBigDownDash />}
            handleClick={handleScroll}
          />
          <a href={`${wpp_link(info.wpp)}`}>
            <CustomButton
              title="Whatsapp"
              containerStyles="bg-green-200 text-black rounded-full mt-10 md:hover:scale-105 transition-all ease-out duration-300"
              lucideIcon={<Smartphone />}
              handleClick={() => {}}
            />
          </a>
        </div>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <img
            src="/hero.png"
            alt="hero"
            className="object-contain absolute inset-0 h-full w-full "
          />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
