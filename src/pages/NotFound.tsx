import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] px-4">
      <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-8 text-center">
        {/* Error Code */}
        <h1 className="text-6xl font-bold text-[#22B8A7]">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-xl font-semibold text-[#1F2937]">
          Page not found
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-[#6B7280]">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border border-[#E5E7EB]
                       text-[#374151] hover:bg-[#F1F5F9] transition"
          >
            Go back
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-md bg-[#22B8A7] hover:bg-[#179E91]
                       text-white font-medium transition"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
