import { useRouter } from "next/navigation";

const PlanCard = ({ plan }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/plans/${plan.id}`);
  };

  return (
    <div
      className="card card-compact bg-base-300 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="card-body">
        <h2 className="card-title text-black">{plan.name}</h2>
        <p className="text-gray-900">{plan.description}</p>
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-800">
            Created At: {new Date(plan.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
