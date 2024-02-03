export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-gray-100  hover:text-gray-950 bg-teal-600 hover:bg-teal-50 hover:border-2 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
    >
      {label}
    </button>
  );
}
