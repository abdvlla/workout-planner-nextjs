"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { supabase } from "../utils/supabase/supabaseClient";
import SkeletonCard from "./SkeletonCard";
import OptionsIcon from "./icons/OptionsIcon";
import AddIcon from "./icons/AddIcon";
import dumbbellphoto from "./photos/dumbbellphoto.jpg";
import { SuccessToast } from "../utils/SuccessToast";
import { ErrorToast } from "../utils/ErrorToast";
import Searchbar from "./Search";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EditExerciseDialog = dynamic(() => import("./EditExerciseDialog"), {
  ssr: false,
});
const DeleteAlertDialog = dynamic(() => import("./DeleteAlertDialog"), {
  ssr: false,
});

const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => (
  <div
    role="tablist"
    className="tabs join join-vertical lg:join-horizontal md:join-horizontal sm:join-vertical tabs-boxed flex justify-center mt-4"
  >
    {["All", "Chest", "Back", "Legs", "Shoulders", "Arms"].map((category) => (
      <a
        key={category}
        role="tab"
        className={`tab ${selectedCategory === category ? "tab-active" : ""}`}
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </a>
    ))}
  </div>
);

const FetchExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let queryBuilder = supabase.from("exercises").select();
      if (selectedCategory !== "All") {
        queryBuilder = queryBuilder.eq("category", selectedCategory);
      }
      if (query) {
        queryBuilder = queryBuilder.ilike("name", `%${query}%`);
      }
      const { data, error } = await queryBuilder;
      if (error) throw error;
      setExercises(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (id) => {
      const { error } = await supabase.from("exercises").delete().eq("id", id);
      if (error) {
        console.error("Error deleting exercise:", error);
        ErrorToast("Failed to delete exercise.");
      } else {
        SuccessToast("Exercise deleted successfully!");
        fetchData();
      }
    },
    [fetchData]
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <Link
          href="/exercises/add"
          className="btn btn-primary px-2 flex mx-auto max-w-52"
        >
          Create exercise
        </Link>
      </div>
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Searchbar placeholder="Search exercises..." />
      <div
        role="tabpanel"
        className="tab-content p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {loading
          ? Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)
          : exercises.map((exercise) => (
              <div key={exercise.id} className="card bg-base-200 shadow-xl">
                <div className="relative">
                  <Image
                    src={dumbbellphoto}
                    alt="Photo of exercise"
                    height={500}
                    width={600}
                    priority
                  />
                  <div
                    tabIndex={0}
                    role="button"
                    className="dropdown absolute top-2 left-2"
                  >
                    <summary className="btn btn-sm m-1 ">
                      <OptionsIcon />
                    </summary>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
                    >
                      <li>
                        <Link href={""}>
                          <AddIcon />
                          Add
                        </Link>
                      </li>
                      <li>
                        <EditExerciseDialog
                          exercise={exercise}
                          fetchData={fetchData}
                        />
                      </li>
                      <li>
                        <DeleteAlertDialog
                          id={exercise.id}
                          onDelete={handleDelete}
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card-body">
                  <h2 className="card-title">{exercise.name}</h2>
                  <p>{exercise.description}</p>
                  <div>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">
                        {exercise.category}
                      </div>
                      <div className="badge badge-outline">
                        {exercise.subcategory}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default FetchExercises;
