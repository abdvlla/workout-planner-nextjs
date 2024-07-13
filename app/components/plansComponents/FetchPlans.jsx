"use client";
import AddPlanForm from "./AddPlanForm";
import Searchbar from "../Search";

const FetchPlans = () => {
  return (
    <>
      <AddPlanForm />
      <Searchbar placeholder={"Search plans..."} />
    </>
  );
};

export default FetchPlans;
