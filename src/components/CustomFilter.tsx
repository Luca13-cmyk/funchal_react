import { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@/types";

import { updateSearchParams } from "../utils";
import { ModelProps } from "../types";
import { Button } from "./ui/button";

export default function CustomFilter({
  title,
  options,
  model,
}: CustomFilterProps) {
  const [selected, setSelected] = useState(options?.[0]); // State for storing the selected option

  // update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (e: { _id: string; name: string }) => {
    console.log(e);
    const newPathName = updateSearchParams(title, e.name.toLowerCase());

    window.location.href = newPathName;
  };

  return (
    <div className="w-fit flex flex-row gap-4">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Update the selected option in state
          handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
        }}
      >
        <div className="relative w-fit z-10">
          {/* Button for the listbox */}
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{model ? model : "Todos"}</span>
            <img
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron_up-down"
            />
          </Listbox.Button>
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {/* Map over the options and display them as listbox options */}
              {options?.map((option: ModelProps) => (
                <Listbox.Option
                  key={option._id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <Button
        title="Limpar"
        variant={"outline"}
        onClick={() => {
          const url = new URL(window.location.href);
          url.search = "";
          window.location.href = url.toString();
        }}
      >
        Limpar
      </Button>
    </div>
  );
}
