import { useGetContactById } from "../../lib/react-query/queriesAndMutations";

import { ProgressPage } from "../../components/ProgressPage";
import { useEffect, useState } from "react";

const YourInfo = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      setId(userInfo);
    } else {
      setId(null);
    }
  }, []);

  const { isLoading, data: contact, isError } = useGetContactById(id!);

  return isLoading ? (
    <ProgressPage />
  ) : !contact ? (
    <div className="home__error-container flex justify-center items-center h-[60vh] p-5">
      <h2 className="text-black text-xl font-bold">
        Oops, você não possui nenhuma pré-reserva no momento.
      </h2>
    </div>
  ) : isError ? (
    <div className="home__error-container flex justify-center items-center h-[60vh]">
      <h2 className="text-black text-xl font-bold">
        Oops, algo deu errado, tente novamente depois.
      </h2>
    </div>
  ) : (
    <div className="mt-24 padding-x padding-y max-width">
      <div className="flex flex-col w-full justify-center items-center border-2 border-gray-50 md:shadow-sm p-4">
        <div className="w-full">
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">
              Pré-eserva
            </h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              Informações sobre a sua pré-reserva
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Nome</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Telefone
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact?.phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Carro</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact?.car}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Retirada
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact.startDate} {contact.timeStartDate}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Devolução
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact.endDate} {contact.timeEndDate}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Preço Total
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contact.priceTotal}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInfo;
