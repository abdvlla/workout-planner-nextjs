"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase/supabaseClient";
import SkeletonCard from "./SkeletonCard";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from("exercises").select();
        if (selectedCategory !== "All") {
          query = query.eq("category", selectedCategory);
        }
        const { data, error } = await query;
        if (error) throw error;
        setExercises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Link
        href="/exercises/add"
        className="btn btn-primary px-2 flex mx-auto max-w-52"
      >
        Create exercise
      </Link>
      <div
        role="tablist"
        className="tabs join join-vertical lg:join-horizontal md:join-horizontal sm:join-vertical tabs-boxed flex justify-center mt-4"
      >
        {["All", "Chest", "Back", "Legs", "Shoulders", "Arms"].map(
          (category) => (
            <a
              key={category}
              role="tab"
              className={`tab ${
                selectedCategory === category ? "tab-active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </a>
          )
        )}
      </div>

      <div
        role="tabpanel"
        className="tab-content p-4 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {loading
          ? Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)
          : exercises.map((exercise) => (
              <div key={exercise.id} className="card bg-base-200 shadow-xl">
                <div className="relative">
                  <Image
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Photo of exercise"
                    height={500}
                    width={600}
                    priority={true}
                  />
                  <div
                    tabIndex={0}
                    role="button"
                    className="dropdown absolute top-2 left-2"
                  >
                    <summary className="btn btn-sm m-1">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                      </svg>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
                    >
                      <li>
                        <a>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          Add
                        </a>
                      </li>
                      <li>
                        <a>
                          {" "}
                          <svg
                            className="feather feather-edit-3 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                          Edit
                        </a>
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

export default Exercises;
