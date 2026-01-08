import { useEffect, useRef, useState } from "react";

export  default function ActionMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        left: rect.right - 120,
      });
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(prev => !prev)}
        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
      >
        ⋮
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ top: pos.top, left: pos.left }}
          className="fixed z-50 w-28 bg-white border border-[#E5E7EB]
                     rounded-md shadow-md"
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-sm text-left hover:bg-[#F1F5F9]"
          >
            Edit
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-sm text-left
                       text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
