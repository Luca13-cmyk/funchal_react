import { infos, wpp_link } from "../constants";
import { handleScroll } from "../utils";
import CustomButton from "./CustomButton";

const Hero = () => {
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">{infos.intro}</h1>

        <p className="hero__subtitle">{infos.intro_sub}</p>
        <br />
        <hr />
        <p className="hero__subtitle">
          <small className="">
            <b>Endereço:</b> {infos.address} <br />
            <b>Telefone:</b> {infos.phone}
          </small>
        </p>
        <div className="flex flw-row gap-2">
          <CustomButton
            title="Explorar Carros"
            containerStyles="bg-primary-blue text-white rounded-full mt-10"
            handleClick={handleScroll}
          />
          <a href={`${wpp_link}`}>
            <CustomButton
              title="Whatsapp"
              containerStyles="bg-green-200 text-black rounded-full mt-10"
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
