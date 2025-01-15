import { useSearchParams } from "react-router-dom";
import CustomFilter from "../../components/CustomFilter";
import Hero from "../../components/Hero";

import { CarProps } from "../../types";

import CarCard from "../../components/CarCard";
import {
  useGetCars,
  useGetModels,
} from "../../lib/react-query/queriesAndMutations";
import { handleScroll } from "../../utils";
import { useEffect } from "react";
import { ProgressPage } from "../../components/ProgressPage";

const Home = () => {
  const [searchParams] = useSearchParams();

  const model = searchParams.get("model");

  const params = { model: model || null };

  const { isLoading: isCarsLoading, data: allCars } = useGetCars(params.model);
  const { isLoading: isModelsLoading, data: allModels } = useGetModels();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  useEffect(() => {
    if (!isCarsLoading) {
      const handler = setTimeout(() => {
        handleScroll();
      }, 200);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [isCarsLoading, model]);

  return isCarsLoading ? (
    <ProgressPage />
  ) : (
    <div>
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Catálogo de carros</h1>
          <p>Explore os carros</p>
        </div>
        <div className="home__filters">
          <div className="home__filter-container">
            {isModelsLoading ? (
              <>
                <div className="w-28 h-8 rounded-lg animate-pulse bg-slate-400"></div>
              </>
            ) : (
              <CustomFilter
                title="model"
                options={allModels}
                model={model ?? ""}
              />
            )}
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: CarProps) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            /> */}
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Oops, sem resultados
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
