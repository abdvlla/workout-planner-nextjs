import React from "react";
import FetchPlans from "../components/plansComponents/FetchPlans";
import { Suspense } from "react";

const Plans = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchPlans />
    </Suspense>
  );
};

export default Plans;
