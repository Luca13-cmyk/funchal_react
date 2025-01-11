import { useNavigate, useParams } from "react-router-dom";
import { urlFor } from "../../lib/client";
import { useGetCarById } from "../../lib/react-query/queriesAndMutations";
import ContactForm from "../../components/ContactForm";
import { ProgressPage } from "../../components/ProgressPage";

const Car = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
    return;
  }

  const { isLoading, data: car } = useGetCarById(id);

  return isLoading ? (
    <ProgressPage />
  ) : !car ? (
    <div className="home__error-container">
      <h2 className="text-black text-xl font-bold">Oops, sem resultados</h2>
    </div>
  ) : (
    <div className="mt-12 padding-x padding-y max-width">
      <div className="flex flex-col w-full justify-between items-center border-2 border-gray-50 md:shadow-sm p-4">
        <h3 className="hero__subtitle">{car.name}</h3>
        <div className="relative w-full h-40 my-3 flex object-contain justify-center items-center">
          <img
            src={urlFor(car.imgUrl).url()}
            alt={car.name}
            className="object-contain rounded-md w-64 object-center "
          />
        </div>
      </div>

      <ContactForm car={car} />
    </div>
  );
};

export default Car;
