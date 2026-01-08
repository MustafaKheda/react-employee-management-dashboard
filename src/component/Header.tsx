export default function Header() {
  return (
    <header className="bg-white border-b border-[#E5E7EB] shadow-sm ">
      <div className="max-w-[95%] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-[#22B8A7] rounded-sm" />
            <span className="font-semibold text-[#1F2937]">
              Admin Portal
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm">
            <NavItem label="Dashboard" />
            <NavItem label="Employees" active />
            <NavItem label="Reports" />
            <NavItem label="Settings" />
          </nav>
        </div>

        {/* Right: User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#374151]">
            Ronald Richards
          </span>

          <button className="w-8 h-8 rounded-full bg-[#E6F7F4]
                             text-[#22B8A7] font-medium">
            R
          </button>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`relative pb-1 transition
        ${active
          ? "text-[#22B8A7] font-medium"
          : "text-[#6B7280] hover:text-[#1F2937]"
        }`}
    >
      {label}

      {active && (
        <span className="absolute left-0 right-0 -bottom-[9px]
                         h-0.5 bg-[#22B8A7] rounded-full" />
      )}
    </button>
  );
}
