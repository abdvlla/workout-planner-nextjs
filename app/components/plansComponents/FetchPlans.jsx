"use client";
import AddPlanForm from "./AddPlanForm";
import Searchbar from "../Search";
import PlanCard from "./PlanCard";
import SkeletonCard from "./SkeletonCard";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase/supabaseClient";

const FetchPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("plans").select();
      if (error) throw error;
      setPlans(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(query.toLowerCase())
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <AddPlanForm />
      <Searchbar
        placeholder={"Search plans..."}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading
          ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
          : filteredPlans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </>
  );
};

export default FetchPlans;
