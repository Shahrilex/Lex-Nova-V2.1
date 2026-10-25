import { useId, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { searchLegalMatters, type LegalMatter } from "@/lib/legal-matters";
import { toFaDigits } from "@/lib/utils";

type LegalMatterPickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (matter: LegalMatter) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

export function LegalMatterPicker({
  id,
  value,
  onChange,
  onSelect,
  placeholder = "عنوان، خواسته یا موضوع شکایت/پرونده را جستجو کنید",
  className = "",
  required,
}: LegalMatterPickerProps) {
  const generatedId = useId();
  const inputId = id ?? `legal-matter-${generatedId}`;
  const listId = `${inputId}-options`;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const matches = useMemo(
    () => value.trim().length >= 2 ? searchLegalMatters(value).slice(0, 8) : [],
    [value],
  );
  const isOpen = open && matches.length > 0;

  const choose = (matter: LegalMatter) => {
    onChange(matter.title);
    onSelect?.(matter);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          id={inputId}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-activedescendant={isOpen && matches[activeIndex] ? `${listId}-${matches[activeIndex].id}` : undefined}
          autoComplete="off"
          required={required}
          value={value}
          onFocus={() => setOpen(true)}
          onChange={(event) => { onChange(event.target.value); setActiveIndex(0); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") { setOpen(false); return; }
            if (event.key === "ArrowDown" && matches.length) {
              event.preventDefault(); setOpen(true); setActiveIndex((index) => (index + 1) % matches.length);
            }
            if (event.key === "ArrowUp" && matches.length) {
              event.preventDefault(); setOpen(true); setActiveIndex((index) => (index - 1 + matches.length) % matches.length);
            }
            if (event.key === "Enter" && isOpen && matches[activeIndex]) {
              event.preventDefault(); choose(matches[activeIndex]);
            }
          }}
          placeholder={placeholder}
          className={`h-11 w-full rounded-md border border-line bg-surface py-2 pe-10 ps-10 text-sm outline-none focus:border-navy ${className}`}
        />
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
      {isOpen && (
        <ul id={listId} role="listbox" className="absolute inset-x-0 top-full z-30 mt-1 max-h-72 overflow-y-auto rounded-md border border-line bg-surface p-1 shadow-lg">
          {matches.map((matter, index) => (
            <li key={matter.id} id={`${listId}-${matter.id}`} role="option" aria-selected={activeIndex === index}>
              <button
                type="button"
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(matter)}
                className={`flex min-h-12 w-full flex-col items-start justify-center rounded px-3 py-2 text-right text-sm ${activeIndex === index ? "bg-paper text-navy" : "text-ink hover:bg-paper"}`}
              >
                <span className="font-medium">{matter.title}</span>
                <span className="mt-0.5 text-xs text-muted">{matter.category} · {matter.action_type} · {toFaDigits(matter.code)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-xs text-muted">از فهرست پیشنهادی انتخاب کنید یا عنوان دلخواه را تایپ کنید.</p>
    </div>
  );
}
