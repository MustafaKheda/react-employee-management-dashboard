import type { Employee } from "../types/employee";

interface DeleteEmployeeProps {
  emp: Employee;
  onCancel: () => void;
  onConfirm: (id:string) => void;
}

export default function DeleteEmployee({
  emp,
  onCancel,
  onConfirm,
}: DeleteEmployeeProps) {
  return (
    <div className="p-6">
      {/* Title */}
      <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
        Delete Employee
      </h3>

      {/* Message */}
      <p className="text-sm text-[#6B7280] mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium text-[#1F2937]">
          {emp.name}
        </span>
        ? This action cannot be undone.
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-[#E5E7EB] rounded-md
                     hover:bg-[#F1F5F9]"
        >
          Cancel
        </button>

        <button
          onClick={()=>onConfirm(emp.id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700
                     text-white rounded-md font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
