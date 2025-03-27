import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

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
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-32 justify-start">
          {value || "Chọn giờ"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="popover-content mt-2 max-h-64 overflow-y-auto p-0 max-w-32"
        align="start"
      >
        <Command>
          <CommandGroup>
            {times.map((time) => (
              <CommandItem
                key={time}
                onSelect={() => {
                  onChange(time);
                  setOpen(false);
                }}
              >
                {time}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
