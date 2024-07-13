"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/supabaseClient";
import { SuccessToast } from "../utils/SuccessToast";
import { ErrorToast } from "../utils/ErrorToast";
import EditIcon from "./icons/EditIcon";
import Select from "react-select";

const EditExerciseDialog = ({ exercise, fetchData }) => {
  const [formData, setFormData] = useState({
    ...exercise,
    subcategories: (exercise.subcategories || []).map((sub) => ({
      value: sub,
      label: sub,
    })),
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [actionMeta.name]: selectedOptions,
    }));
  };

  const subcategoryMapping = useMemo(
    () => ({
      Chest: ["Upper Chest", "Middle Chest", "Lower Chest"],
      Back: [
        "Upper Lats",
        "Middle Lats",
        "Lower Lats",
        "Rear Deltoid",
        "Traps",
        "Rhomboid",
        "Teres Major",
      ],
      Legs: ["Quadriceps", "Hamstrings", "Calves", "Glutes"],
      Shoulders: ["Front Deltoid", "Side Deltoid", "Rear Deltoid"],
      Arms: ["Biceps", "Triceps", "Forearms"],
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, subcategories, description } = formData;

    const { error } = await supabase
      .from("exercises")
      .update({
        name,
        category,
        subcategories: subcategories.map((sub) => sub.value),
        description,
      })
      .eq("id", exercise.id);

    if (error) {
      console.error("Error updating exercise:", error);
      ErrorToast("Failed to update exercise.");
    } else {
      SuccessToast("Exercise updated successfully!");
      fetchData();
      router.push("/exercises");
    }
  };

  const categoryOptions = Object.keys(subcategoryMapping).map((cat) => ({
    value: cat,
    label: cat,
  }));
  const subcategoryOptions = formData.category
    ? subcategoryMapping[formData.category].map((sub) => ({
        value: sub,
        label: sub,
      }))
    : [];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <EditIcon />
          Edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-950 bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-50 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className=" font-semibold m-0 text-[17px]">
            Edit exercise
          </Dialog.Title>
          <Dialog.Description className=" font-normal mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to the selected exercise here. Click save when you are
            done.
          </Dialog.Description>
          <form
            className="form-control max-w-xs flex justify-center mx-auto"
            onSubmit={handleSubmit}
          >
            <fieldset className="mb-[10px]">
              <span className="label-text  text-[15px] font-semibold">
                Name of exercise
              </span>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="input input-bordered max-w-xs  w-full"
              />
            </fieldset>
            <fieldset className="mb-[10px]">
              <span className="label-text  text-[15px] font-semibold">
                Muscle group
              </span>
              <Select
                name="category"
                value={categoryOptions.find(
                  (option) => option.value === formData.category
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: { name: "category", value: selectedOption.value },
                  })
                }
                options={categoryOptions}
                placeholder="Select category"
                className=" w-full"
                classNamePrefix="select"
              />
            </fieldset>
            {formData.category && (
              <fieldset className="mb-[10px] gap-5">
                <span className=" font-semibold w-[90px] text-right text-[15px]">
                  Part of muscle group
                </span>
                <Select
                  isMulti
                  name="subcategories"
                  value={formData.subcategories}
                  onChange={handleSelectChange}
                  options={subcategoryOptions}
                  className="basic-multi-select w-full"
                  classNamePrefix="select"
                />
              </fieldset>
            )}
            <fieldset className="mb-[10px] gap-5">
              <label
                className=" font-semibold w-[90px] text-right text-[15px]"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Describe the exercise"
                className="textarea textarea-bordered  textarea-sm w-full max-w-xs"
              ></textarea>
            </fieldset>
            <div className="mt-1 flex justify-end">
              <button
                type="submit"
                className="btn btn-success bg-green-500 text-white mx-auto "
              >
                Save changes
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className=" hover:bg-gray-200 focus:shadow-gray-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditExerciseDialog;
