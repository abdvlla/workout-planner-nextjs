export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#1f2937", // Tailwind gray-800
    borderColor: "#4b5563", // Tailwind gray-600
    color: "#e5e7eb", // Tailwind gray-200
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1f2937", // Tailwind gray-800
    color: "#e5e7eb", // Tailwind gray-200
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2563eb" : "#1f2937", // Tailwind blue-600 or gray-800
    color: "#e5e7eb", // Tailwind gray-200
    "&:hover": {
      backgroundColor: "#2563eb", // Tailwind blue-600
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#2563eb", // Tailwind blue-600
    color: "#e5e7eb", // Tailwind gray-200
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#e5e7eb", // Tailwind gray-200
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#e5e7eb", // Tailwind gray-200
    "&:hover": {
      backgroundColor: "#1d4ed8", // Tailwind blue-700
      color: "#e5e7eb", // Tailwind gray-200
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#e5e7eb", // Tailwind gray-200
  }),
};
