"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/supabaseClient";
import { SuccessToast } from "../utils/SuccessToast";
import { ErrorToast } from "../utils/ErrorToast";
import EditIcon from "./icons/EditIcon";

const EditExerciseDialog = ({ exercise, fetchData }) => {
  const [formData, setFormData] = useState(exercise);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const subcategoryMapping = useMemo(
    () => ({
      Chest: ["Upper Chest", "Middle Chest", "Lower Chest"],
      Back: ["Upper Back", "Lats"],
      Legs: ["Quadriceps", "Hamstrings", "Calves", "Glutes"],
      Shoulders: ["Front Deltoid", "Side Deltoid", "Rear Deltoid"],
      Arms: ["Biceps", "Triceps"],
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("exercises")
      .update(formData)
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
          <Dialog.Title className="text-base-100 font-semibold m-0 text-[17px]">
            Edit exercise
          </Dialog.Title>
          <Dialog.Description className="text-base-100 font-normal mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to the selected exercise here. Click save when you are
            done.
          </Dialog.Description>
          <form
            className="form-control max-w-xs flex justify-center mx-auto"
            onSubmit={handleSubmit}
          >
            <fieldset className="mb-[10px]">
              <span className="label-text text-base-100 text-[15px] font-semibold">
                Name of exercise
              </span>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="input input-bordered max-w-xs text-gray-200 w-full"
              />
            </fieldset>
            <fieldset className="mb-[10px]">
              <span className="label-text text-base-100 text-[15px] font-semibold">
                Muscle group
              </span>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="select select-bordered text-gray-200 max-w-xs w-full"
              >
                <option disabled value="">
                  Muscle group
                </option>
                <option>Chest</option>
                <option>Back</option>
                <option>Legs</option>
                <option>Shoulders</option>
                <option>Arms</option>
              </select>
            </fieldset>
            {formData.category && (
              <fieldset className="mb-[10px] gap-5">
                <label className="text-base-100 font-semibold w-[90px] text-right text-[15px]">
                  Part of muscle group
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory || ""}
                  onChange={handleChange}
                  className="select select-bordered text-gray-200 max-w-xs w-full"
                >
                  <option disabled value="">
                    Muscle
                  </option>
                  {subcategoryMapping[formData.category].map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </fieldset>
            )}
            <fieldset className="mb-[10px] gap-5">
              <label
                className="text-base-100 font-semibold w-[90px] text-right text-[15px]"
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
                className="textarea textarea-bordered text-gray-200 textarea-sm w-full max-w-xs"
              ></textarea>
            </fieldset>
            <div className="mt-1 flex justify-end">
              <button
                type="submit"
                className="btn btn-success text-white mx-auto "
              >
                Save changes
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-base-100 hover:bg-gray-200 focus:shadow-gray-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
