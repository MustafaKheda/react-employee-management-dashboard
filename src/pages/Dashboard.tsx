import EmployeeStats from "../component/EmployeeStats";
import Header from "../component/Header";
import { useEmployees } from "../context/EmployeeContext";

export default function Employees() {
  const { employees } = useEmployees();

  return (
    <>
      <Header />
      <div className="p-6 bg-[#F7F9FC] min-h-[calc(100vh-65px)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2937]">
              Employees
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Employees / Employees List
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-md
                           bg-[#22B8A7] hover:bg-[#179E91]
                           text-white font-medium transition">
            + Add Employee
          </button>
        </div>
        <EmployeeStats total={employees.length} active={employees.filter(emp => emp.active).length} inactive={employees.filter(emp => !emp.active).length} />
        <div className="border-t border-[#E5E7EB] my-6" />
        {/* Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg">
          {/* Card Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-[#1F2937]">
                Employees List
              </h2>
            </div>

            {/* Search */}
            <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className=" pl-3 text-sm outline-none"
              />
              <button className="px-3 py-2 bg-[#22B8A7] text-white">
                🔍
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead className="bg-[#F1F5F9] text-[#374151]">
              <tr>
                <th className="p-3 text-left font-medium">Employee Name</th>
                <th className="p-3 text-left font-medium">Gender</th>
                <th className="p-3 text-left font-medium">DOB</th>
                <th className="p-3 text-left font-medium">State</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map(emp => (
                <tr
                  key={emp.id}
                  className="border-t border-[#E5E7EB] hover:bg-[#F9FAFB]"
                >
                  {/* Name */}
                  <td className="p-3 text-[#1F2937] font-medium">
                    {emp.name}
                  </td>

                  <td className="p-3">{emp.gender}</td>
                  <td className="p-3">{emp.dob}</td>
                  <td className="p-3">{emp.state}</td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium
                      ${emp.active
                          ? "bg-[#E6F7F4] text-[#22B8A7]"
                          : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {emp.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3 text-right">
                    <button className="w-8 h-8 rounded-full
                                     hover:bg-gray-100 flex
                                     items-center justify-center">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-[#6B7280]"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
