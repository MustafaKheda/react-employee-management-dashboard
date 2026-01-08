export default function EmployeeStats({
    total,
    active,
    inactive,
}: {
    total: number;
    active: number;
    inactive: number;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Employees" value={total} />
            <StatCard label="Active" value={active} accent="green" />
            <StatCard label="Inactive" value={inactive} accent="gray" />
        </div>
    );
}

function StatCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: number;
    accent?: "green" | "gray";
}) {
    const accentClass =
        accent === "green"
            ? "text-[#22B8A7]"
            : accent === "gray"
                ? "text-gray-500"
                : "text-[#1F2937]";

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <p className="text-sm text-[#6B7280]">{label}</p>
            <p
                className={`font-semibold mt-2 text-3xl ${accentClass}`}
            >
                {value}
            </p>
        </div>
    );
}
