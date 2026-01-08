import { useEffect, useRef, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import type { Employee, Gender } from "../types/employee";

interface Props {
    employee?: Employee;
    onClose?: () => void;
}

const STATES = ["Rajasthan", "Gujarat", "Maharashtra", "Delhi", "Karnataka"];

export default function EmployeeForm({ employee, onClose }: Props) {
    const { addEmployee, updateEmployee } = useEmployees();
    const isEdit = Boolean(employee);

    const fileInputRef = useRef<HTMLInputElement>(null);

    /* ---------------- State ---------------- */
    const [name, setName] = useState("");
    const [gender, setGender] = useState<Gender>("Male");
    const [dob, setDob] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState<string | undefined>();
    const [error, setError] = useState("");

    /* ---------------- Prefill (Edit) ---------------- */
    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setGender(employee.gender);
            setDob(employee.dob);
            setState(employee.state);
            setImage(employee.image);
        }
    }, [employee]);

    /* ---------------- Image Handler ---------------- */
    const handleImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("Only image files are allowed");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const isAtLeast18 = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        const age =
            today.getFullYear() -
            birthDate.getFullYear() -
            (today <
                new Date(
                    birthDate.setFullYear(
                        today.getFullYear()
                    )
                )
                ? 1
                : 0);

        return age >= 18;
    };

    /* ---------------- Submit ---------------- */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) return setError("Full name is required");
        if (!dob) return setError("Date of birth is required");
        if (!isAtLeast18(dob))
            return setError("Employee must be at least 18 years old");
        if (!state) return setError("State is required");

        const payload = {
            name,
            gender,
            dob,
            state,
            image,
            active: employee?.active ?? true, // default active
        };

        if (isEdit && employee) {
            updateEmployee(employee.id, payload);
        } else {
            addEmployee(payload);
        }

        onClose?.();
    };
    const getMaxDOB = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today.toISOString().split("T")[0]; // yyyy-mm-dd
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 max-w-xl"
        >
            <h2 className="text-lg font-semibold text-[#1F2937] mb-6">
                {isEdit ? "Edit Employee" : "Add Employee"}
            </h2>

            {/* ================= IMAGE UPLOAD ================= */}
            <div className="mb-6">
                <label className="block text-sm mb-2">Profile Image</label>

                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={e => {
                        e.preventDefault();
                        e.dataTransfer.files[0] &&
                            handleImage(e.dataTransfer.files[0]);
                    }}
                    onDragOver={e => e.preventDefault()}
                    className="relative flex items-center justify-center
                     w-32 h-32 rounded-full border-2 border-dashed
                     border-[#E5E7EB] cursor-pointer
                     hover:border-[#22B8A7] transition"
                >
                    {image ? (
                        <>
                            <img
                                src={image}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />

                            {/* Edit icon */}
                            <div className="absolute bottom-1 right-1 bg-white p-1
                              rounded-full shadow">
                                ✏
                            </div>
                        </>
                    ) : (
                        <p className="text-xs text-center text-[#6B7280] px-3">
                            Drag & drop or click to upload
                        </p>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e =>
                        e.target.files && handleImage(e.target.files[0])
                    }
                />
            </div>

            {/* ================= FORM FIELDS ================= */}
            <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-[#E5E7EB]
                       rounded-md focus:ring-2 focus:ring-[#22B8A7]"
                        placeholder="John Doe"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm mb-1">Gender</label>
                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value as Gender)}
                        className="w-full px-4 py-2 border border-[#E5E7EB]
                       rounded-md focus:ring-2 focus:ring-[#22B8A7]"
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* DOB */}
                <div>
                    <label className="block text-sm mb-1">Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        max={getMaxDOB()}
                        onChange={e => setDob(e.target.value)}
                        className="w-full px-4 py-2 border border-[#E5E7EB]
                       rounded-md focus:ring-2 focus:ring-[#22B8A7]"
                    />
                </div>

                {/* State */}
                <div>
                    <label className="block text-sm mb-1">State</label>
                    <select
                        value={state}
                        onChange={e => setState(e.target.value)}
                        className="w-full px-4 py-2 border border-[#E5E7EB]
                       rounded-md focus:ring-2 focus:ring-[#22B8A7]"
                    >
                        <option value="">Select state</option>
                        {STATES.map(s => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-600 mt-4">{error}</p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-[#E5E7EB] rounded-md"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-[#22B8A7] hover:bg-[#179E91]
                     text-white rounded-md font-medium"
                >
                    {isEdit ? "Update Employee" : "Add Employee"}
                </button>
            </div>
        </form>
    );
}
