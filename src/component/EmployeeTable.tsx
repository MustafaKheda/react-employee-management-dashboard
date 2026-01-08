import { useMemo, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import type { Employee } from "../types/employee";
import ActionMenu from "./common/ActionMenu";
import { StatusToggle } from "./common/StatusToggle";

export default function EmployeeTable({ openEditModal }: { openEditModal: (v: Employee, type: "EDIT" | "DELETE") => void }) {
    const { employees, updateEmployee } = useEmployees();
    /* ✅ Filter STATEs */
    const [genderFilter, setGenderFilter] = useState<"all" | "Male" | "Female" | "Other">("all");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [search, setSearch] = useState("");


    /* ✅ FILTERED DATA */
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchName = emp.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchGender =
                genderFilter === "all" || emp.gender === genderFilter;

            const matchStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && emp.active) ||
                (statusFilter === "inactive" && !emp.active);

            return matchName && matchGender && matchStatus;
        });
    }, [employees, search, genderFilter, statusFilter]);



    return (
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-x-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-medium text-[#1F2937]">
                        Employees List
                    </h2>
                </div>


                <div className="flex justify-end items-center gap-3">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 border-[#E5E7EB] border rounded-md text-sm"
                    >
                        Print List
                    </button>

                    {/* Gender Filter */}
                    <select
                        value={genderFilter}
                        onChange={e =>
                            setGenderFilter(e.target.value as any)
                        }
                        className="px-3 py-2 text-sm border border-[#E5E7EB] rounded-md"
                    >
                        <option value="all">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={e =>
                            setStatusFilter(e.target.value as any)
                        }
                        className="px-3 py-2 text-sm border border-[#E5E7EB] rounded-md"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {/* Search */}
                    <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={e => setSearch(e.target.value)}
                            className=" pl-3 text-sm outline-none"
                        />
                        <button className="px-3 py-2 bg-[#22B8A7] text-white">
                            🔍
                        </button>

                    </div>

                </div>
                {/* Search */}

            </div>

            <table className="w-full text-sm">
                <thead className="bg-[#F1F5F9] text-[#374151]">
                    <tr>
                        <th className="p-3 text-left font-medium">Employee Name</th>
                        <th className="p-3 text-left font-medium">Gender</th>
                        <th className="p-3 text-left font-medium">DOB</th>
                        <th className="p-3 text-left font-medium">State</th>
                        <th className="p-3 text-center font-medium">Status</th>
                        <th className="p-3 text-center font-medium print:hidden">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.map(emp => (
                        <tr
                            key={emp.id}
                            className="border-t border-[#E5E7EB] hover:bg-[#F9FAFB]"
                        >
                            {/* Name */}
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    {emp.image ? (
                                        <img
                                            src={emp.image}
                                            alt={emp.name}
                                            className="w-9 h-9 rounded-full border-gray-500 object-cover border"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full border border-gray-500 bg-gray-200
                      flex items-center justify-center
                      text-sm font-medium text-gray-600">
                                            {emp.name.charAt(0)}
                                        </div>
                                    )}

                                    {/* Name */}
                                    <span className="text-[#1F2937] font-medium">
                                        {emp.name}
                                    </span>
                                </div>
                            </td>

                            <td className="p-3">{emp.gender}</td>
                            <td className="p-3">{emp.dob}</td>
                            <td className="p-3">{emp.state}</td>

                            {/* Status */}
                            <td className="p-3">
                                <StatusToggle
                                    checked={emp.active}
                                    onChange={() =>
                                        updateEmployee(emp.id, { active: !emp.active })
                                    }
                                />
                            </td>

                            {/* Action */}
                            <td className="p-3 flex justify-center">
                                <ActionMenu
                                    onEdit={() => openEditModal(emp, "EDIT")}
                                    onDelete={() => openEditModal(emp, "DELETE")}
                                />
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
    );
}
