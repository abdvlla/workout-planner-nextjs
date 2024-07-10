import React from "react";
import FetchExercises from "../components/FetchExercises";
import { Suspense } from "react";

const Exercises = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchExercises />
    </Suspense>
  );
};

export default Exercises;
