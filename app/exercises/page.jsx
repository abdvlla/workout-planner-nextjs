import Link from "next/link";
import React from "react";

const Exercises = () => {
  return (
    <>
      <Link
        href="/exercises/add"
        className="btn btn-primary px-2 my-1 flex mx-auto max-w-52"
      >
        Create exercise
      </Link>
      <div role="tablist" className="tabs tabs-bordered ">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="All"
        />
        <div role="tabpanel" className="tab-content p-10">
          All
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Chest"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          Chest
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Back"
        />
        <div role="tabpanel" className="tab-content p-10">
          Back
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Legs"
        />
        <div role="tabpanel" className="tab-content p-10">
          Legs
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Shoulders"
        />
        <div role="tabpanel" className="tab-content p-10">
          Shoulders
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Arms"
        />
        <div role="tabpanel" className="tab-content p-10">
          Arms
        </div>
      </div>
    </>
  );
};

export default Exercises;
