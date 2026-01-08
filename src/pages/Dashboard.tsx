import { useState } from "react";
import EmployeeStats from "../component/EmployeeStats";
import Header from "../component/common/Header";
import { useEmployees } from "../context/EmployeeContext";
import type { Employee } from "../types/employee";
import Modal from "../component/common/Model";
import EmployeeForm from "../component/EmployeeForm";
import EmployeeTable from "../component/EmployeeTable";
import DeleteEmployee from "../component/DeleteEmployee";

export default function Employees() {
  const { employees, deleteEmployee } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);
  const [modelType, setModelType] = useState<"EDIT" | "DELETE">("EDIT")

  const openAddModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee: Employee, type: "EDIT" | "DELETE") => {
    setModelType(type)
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setModelType("EDIT")
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id)
    closeModal()
  }

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
                           text-white font-medium transition" onClick={openAddModal}>
            + Add Employee
          </button>
        </div>
        {/* Card */}
        <EmployeeStats total={employees.length} active={employees.filter(emp => emp.active).length} inactive={employees.filter(emp => !emp.active).length} />
        <div className="border-t border-[#E5E7EB] my-6" />

        {/* Table */}
        <EmployeeTable openEditModal={openEditModal} />

      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modelType === "EDIT" ? <EmployeeForm
          employee={selectedEmployee ?? undefined}
          onClose={closeModal}
        /> :

          <DeleteEmployee emp={selectedEmployee!} onCancel={closeModal} onConfirm={handleDelete} />
        }

      </Modal>
    </>
  );
}
