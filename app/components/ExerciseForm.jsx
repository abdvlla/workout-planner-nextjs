"use client";

import React, { useState } from "react";
import { supabase } from "@/app/utils/supabase/supabaseClient";
import { SuccessToast } from "../utils/SuccessToast";
import { ErrorToast } from "../utils/ErrorToast";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Select from "react-select";

const ExerciseForm = ({ onExerciseAdded }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const subcategoryMapping = {
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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name must be filled.";
    if (!category) newErrors.category = "Category must be filled.";
    if (!description) newErrors.description = "Description must be filled.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { data, error } = await supabase.from("exercises").insert([
      {
        name,
        category: category.value,
        subcategories: subcategories.map((sub) => sub.value), // Updated here
        description,
      },
    ]);
    if (error) {
      console.error("Error inserting exercise:", error);
      ErrorToast("Failed to add exercise.");
    } else {
      console.log("Exercise added:", data);
      setName("");
      setCategory(null);
      setSubcategories([]);
      setDescription("");
      setErrors({});
      SuccessToast("Exercise added successfully!");
      onExerciseAdded();
    }
  };

  const categoryOptions = Object.keys(subcategoryMapping).map((cat) => ({
    value: cat,
    label: cat,
  }));
  const subcategoryOptions = category
    ? subcategoryMapping[category.value].map((sub) => ({
        value: sub,
        label: sub,
      }))
    : [];

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="btn btn-primary flex mx-auto ">
            Create exercise
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-gray-950 bg-opacity-50 fixed inset-0" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-50 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className=" font-semibold m-0 text-[17px]">
              Create exercise
            </Dialog.Title>
            <Dialog.Description className=" font-normal mt-[10px] mb-5 text-[15px] leading-normal">
              Fill out the details and add an exercise here. Click save when you
              are done.
            </Dialog.Description>
            <form
              onSubmit={handleSubmit}
              className="form-control max-w-xs flex justify-center mx-auto"
            >
              <fieldset className="mb-[10px]">
                <span className="label-text  text-[15px] font-semibold">
                  Name of exercise
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered  w-full"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </fieldset>

              <fieldset className="mb-[10px]">
                <span className="label-text  text-[15px] font-semibold">
                  Muscle group
                </span>
                <Select
                  value={category}
                  onChange={setCategory}
                  options={categoryOptions}
                  placeholder="Select category"
                  className=" w-full"
                  classNamePrefix="select"
                />
                {errors.category && (
                  <p className="text-red-500">{errors.category}</p>
                )}
              </fieldset>

              {category && (
                <>
                  <fieldset className="mb-[10px]">
                    <span className="label-text  text-[15px] font-semibold">
                      Part(s) of muscle group
                    </span>
                    <Select
                      isMulti
                      value={subcategories}
                      onChange={setSubcategories}
                      options={subcategoryOptions}
                      className="basic-multi-select w-full"
                      classNamePrefix="select"
                    />
                  </fieldset>
                </>
              )}

              <fieldset className="mb-[10px]">
                <span className="label-text  text-[15px] font-semibold">
                  Brief description of exercise
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the exercise"
                  className="textarea textarea-bordered textarea-sm w-full"
                  maxLength={125}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500">{errors.description}</p>
                )}
              </fieldset>

              <fieldset className="mb-[10px]">
                <span className="label-text  text-[15px] font-semibold">
                  Cover image of exercise
                </span>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full "
                />
              </fieldset>

              <button
                type="submit"
                className="btn bg-green-500 hover:bg-green-600 mt-4"
              >
                Save
              </button>
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
    </>
  );
};

export default ExerciseForm;
