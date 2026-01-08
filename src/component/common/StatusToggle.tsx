export function StatusToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <>
    <div className="flex print:hidden gap-x-3  justify-center">
      <p>Inactive</p>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
        ${checked ? "bg-[#22B8A7]" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition
            ${checked ? "translate-x-6" : "translate-x-1"}`}
            />
      </button>
      <p>
        Active
      </p>
    </div>
    <span className="hidden print:inline text-sm font-medium text-black">
        {checked ? "Active" : "Inactive"}
      </span>
            </>
  );
}
