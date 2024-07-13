"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { supabase } from "@/app/utils/supabase/supabaseClient";
import Select from "react-select";
import { SuccessToast } from "@/app/utils/SuccessToast";
import { ErrorToast } from "@/app/utils/ErrorToast";
import { customStyles } from "./customSelectStyles";

const AddExerciseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("id, name");
      if (error) {
        console.error("Error fetching exercises:", error);
      } else {
        setAvailableExercises(
          data.map((exercise) => ({
            value: exercise.id,
            label: exercise.name,
          }))
        );
      }
    };

    fetchExercises();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name must be filled.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedExercises = exercises.map((exercise) => exercise.value);

    const { data, error } = await supabase
      .from("plans")
      .insert([{ name, exercises: selectedExercises, description }]);
    if (error) {
      console.error("Error inserting exercise:", error);
      ErrorToast("Failed to add plan.");
    } else {
      console.log("Plan added:", data);
      setName("");
      setDescription("");
      setExercises([]);
      setErrors({});
      SuccessToast("Plan added successfully!");
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="btn btn-primary px-2 flex mx-auto max-w-52">
            Create Plan
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-gray-950 bg-opacity-50 fixed inset-0" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-50 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-base-100 font-semibold m-0 text-[17px]">
              Create plan
            </Dialog.Title>
            <Dialog.Description className="text-base-100 font-normal mt-[10px] mb-5 text-[15px] leading-normal">
              Make a plan and add exercises here. Click save when you are done.
            </Dialog.Description>
            <form
              onSubmit={handleSubmit}
              className="form-control max-w-xs flex justify-center mx-auto"
            >
              <fieldset className="mb-[10px]">
                <span className="label-text text-base-100 text-[15px] font-semibold">
                  Name of plan
                </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered max-w-xs text-gray-200 w-full"
                />
              </fieldset>
              <fieldset className="mb-[10px]">
                <span className="label-text text-base-100 text-[15px] font-semibold">
                  Description
                </span>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input input-bordered max-w-xs text-gray-200 w-full"
                />
              </fieldset>
              <fieldset className="mb-[10px]">
                <span className="label-text text-base-100 text-[15px] font-semibold">
                  Exercises
                </span>
                <Select
                  isMulti
                  options={availableExercises}
                  value={exercises}
                  onChange={(selectedOptions) => setExercises(selectedOptions)}
                  styles={customStyles}
                  className="w-full basic-multi-select"
                  classNamePrefix="select"
                />
              </fieldset>
              <button type="submit" className="btn btn-primary mt-4">
                Save
              </button>
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
    </>
  );
};

export default AddExerciseForm;
