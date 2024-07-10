import EditExerciseForm from "@/app/components/EditExerciseForm";

const EditExercisePage = ({ params }) => {
  const { id } = params;

  return <EditExerciseForm id={id} />;
};

export default EditExercisePage;
