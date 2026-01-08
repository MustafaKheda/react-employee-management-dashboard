import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Employee } from "../types/employee";
import { v4 as uuid } from "uuid";

/* -------------------- TYPES -------------------- */

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (data: Omit<Employee, "id">) => void;
    updateEmployee: (id: string, data: Partial<Employee>) => void;
    deleteEmployee: (id: string) => void;
}

/* -------------------- CONTEXT -------------------- */

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const STORAGE_KEY = "employees";

/* -------------------- PROVIDER -------------------- */

export const EmployeeProvider = ({ children }: PropsWithChildren) => {
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    /* ✅ Persist to localStorage */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }, [employees]);

    const addEmployee = (data: Omit<Employee, "id">) => {
        setEmployees(prev => [...prev, { ...data, id: uuid() }]);
    };

    const updateEmployee = (id: string, data: Partial<Employee>) => {
        setEmployees(prev =>
            prev.map(emp => (emp.id === id ? { ...emp, ...data } : emp))
        );
    };

    const deleteEmployee = (id: string) => {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
    };

    return (
        <EmployeeContext.Provider
            value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};

/* -------------------- HOOK -------------------- */

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error("useEmployees must be used within an EmployeeProvider");
    }
    return context;
};
