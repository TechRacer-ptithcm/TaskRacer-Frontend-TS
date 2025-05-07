import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const times = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

export default function TimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [input, setInput] = useState(value);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    onChange(val);
    setInput(val);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (/^[0-9:]*$/.test(val)) {
      setInput(val);

      if (/^([01]\d|2[0-3]):[0-5]\d$/.test(val)) {
        onChange(val);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-32" ref={wrapperRef}>
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="hh:mm"
        className="h-8 w-32 text-sm"
        onFocus={(e) => {
          setOpen(true);
          e.target.select();
        }}
      />
      {open && (
        <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border bg-white shadow">
          <Command>
            <CommandGroup>
              {times.map((time) => (
                <CommandItem key={time} onSelect={() => handleSelect(time)}>
                  {time}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>
      )}
    </div>
  );
}
