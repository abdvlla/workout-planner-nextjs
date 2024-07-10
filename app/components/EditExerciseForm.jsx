"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/supabaseClient";
import { SuccessToast } from "../utils/SuccessToast";
import { ErrorToast } from "../utils/ErrorToast";

const EditExerciseForm = ({ id }) => {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching exercise:", error);
      } else {
        setFormData(data);
      }
    };

    fetchExerciseData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const subcategoryMapping = {
    Chest: ["Upper Chest", "Middle Chest", "Lower Chest"],
    Back: ["Upper Back", "Lats"],
    Legs: ["Quadriceps", "Hamstrings", "Calves", "Glutes"],
    Shoulders: ["Front Deltoid", "Side Deltoid", "Rear Deltoid"],
    Arms: ["Biceps", "Triceps"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("exercises")
      .update(formData)
      .eq("id", id);

    if (error) {
      console.error("Error updating exercise:", error);
      ErrorToast("Failed to update exercise.");
    } else {
      router.push("/exercises");
      SuccessToast("Exercise updated successfully!");
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <form
      className="form-control max-w-xs flex justify-center mx-auto h-screen"
      onSubmit={handleSubmit}
    >
      <div className="label">
        <span className="label-text">Name of exercise</span>
      </div>
      <input
        type="text"
        name="name"
        className="input input-bordered max-w-xs"
        value={formData.name || ""}
        onChange={handleChange}
      />

      <div className="label">
        <span className="label-text">Muscle group</span>
      </div>
      <select
        name="category"
        className="select select-bordered w-full max-w-xs"
        value={formData.category || ""}
        onChange={handleChange}
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

      {formData.category && (
        <>
          <div className="label">
            <span className="label-text">Part of muscle group</span>
          </div>
          <select
            name="subcategory"
            value={formData.subcategory || ""}
            onChange={handleChange}
            className="select select-bordered w-full max-w-xs"
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
        </>
      )}

      <div className="label">
        <span className="label-text">Description</span>
      </div>
      <textarea
        id="description"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Describe the exercise"
        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
      ></textarea>

      <button type="submit" className="btn btn-success mt-2 mx-auto">
        Update
      </button>
    </form>
  );
};

export default EditExerciseForm;
