"use client";

import React, { useState } from "react";
import { supabase } from "@/app/utils/supabase/supabaseClient";
import { SuccessToast } from "../utils/SuccessToast";
import { ErrorToast } from "../utils/ErrorToast";

const ExerciseForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const subcategoryMapping = {
    Chest: ["Upper Chest", "Middle Chest", "Lower Chest"],
    Back: ["Upper Back", "Lats"],
    Legs: ["Quadriceps", "Hamstrings", "Calves", "Glutes"],
    Shoulders: ["Front Deltoid", "Side Deltoid", "Rear Deltoid"],
    Arms: ["Biceps", "Triceps"],
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

    const { data, error } = await supabase
      .from("exercises")
      .insert([{ name, category, subcategory, description }]);
    if (error) {
      console.error("Error inserting exercise:", error);
      ErrorToast("Failed to add exercise.");
    } else {
      console.log("Exercise added:", data);
      setName("");
      setCategory("");
      setSubcategory("");
      setDescription("");
      setErrors({});
      SuccessToast("Exercise added successfully!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form-control max-w-xs flex justify-center mx-auto h-screen"
      >
        <div className="label">
          <span className="label-text">Name of exercise</span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          className="input input-bordered max-w-xs"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <div className="label">
          <span className="label-text">Muscle group</span>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled value="">
            Category
          </option>
          <option>Chest</option>
          <option>Back</option>
          <option>Legs</option>
          <option>Shoulders</option>
          <option>Arms</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category}</p>}

        {category && (
          <>
            <div className="label">
              <span className="label-text">Part of muscle group</span>
            </div>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="">
                Muscle
              </option>
              {subcategoryMapping[category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the exercise"
          className="textarea textarea-bordered textarea-sm w-full max-w-xs"
          maxLength={125}
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}

        <div className="label">
          <span className="label-text">Cover image</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />

        <button
          type="submit"
          className="btn btn-success bg-green-500 mt-4 mx-auto"
        >
          Add exercise
        </button>
      </form>
    </>
  );
};

export default ExerciseForm;
