import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeTable() {
  const { employees, updateEmployee, deleteEmployee } = useEmployees();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-[#F1F5F9] text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Profile</th>
            <th className="p-3">Name</th>
            <th className="p-3">Gender</th>
            <th className="p-3">DOB</th>
            <th className="p-3">State</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan={8} className="p-6 text-center text-[#6B7280]">
                No employees found
              </td>
            </tr>
          )}

          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              {/* Employee ID */}
              <td className="p-3 text-xs text-[#6B7280]">
                {emp.id.slice(0, 8)}
              </td>

              {/* Profile Image */}
              <td className="p-3">
                {emp.image ? (
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                )}
              </td>

              {/* Name */}
              <td className="p-3 text-[#1F2937] font-medium">
                {emp.name}
              </td>

              {/* Gender */}
              <td className="p-3">{emp.gender}</td>

              {/* DOB */}
              <td className="p-3">{emp.dob}</td>

              {/* State */}
              <td className="p-3">{emp.state}</td>

              {/* Active / Inactive Toggle */}
              <td className="p-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emp.active}
                    onChange={() =>
                      updateEmployee(emp.id, { active: !emp.active })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`w-10 h-5 rounded-full transition ${
                      emp.active
                        ? "bg-[#22B8A7]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full mt-0.5 ml-0.5 transition ${
                        emp.active ? "translate-x-5" : ""
                      }`}
                    />
                  </span>
                </label>
              </td>

              {/* Actions */}
              <td className="p-3 space-x-3">
                <button className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(emp.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={handlePrint}
                  className="text-[#22B8A7] hover:underline"
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
