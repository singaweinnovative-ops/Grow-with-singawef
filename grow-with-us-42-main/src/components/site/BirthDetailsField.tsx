import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { dobFromSaId, ageFromDob } from "@/lib/sa-id";

const inputClass =
  "rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold";

export function BirthDetailsField({
  onChange,
  required = true,
}: {
  onChange: (info: { dob: Date | null; age: number | null }) => void;
  required?: boolean;
}) {
  const [mode, setMode] = useState<"id" | "dob">("id");
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState<Date | undefined>();

  const idDob = mode === "id" ? dobFromSaId(idNumber) : null;
  const effectiveDob = mode === "id" ? idDob : (dob ?? null);
  const age = effectiveDob ? ageFromDob(effectiveDob) : null;
  const idLooksComplete = idNumber.replace(/\D/g, "").length === 13;

  useEffect(() => {
    onChange({ dob: effectiveDob, age });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveDob?.getTime(), age]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-4">
        <span className="eyebrow text-clay">Date of birth</span>
        <div className="flex gap-1 rounded-sm border border-border p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode("id")}
            className={`rounded-sm px-2.5 py-1 transition-colors ${
              mode === "id" ? "bg-ink text-cream" : "text-muted-foreground hover:text-clay"
            }`}
          >
            Use my ID number
          </button>
          <button
            type="button"
            onClick={() => setMode("dob")}
            className={`rounded-sm px-2.5 py-1 transition-colors ${
              mode === "dob" ? "bg-ink text-cream" : "text-muted-foreground hover:text-clay"
            }`}
          >
            Pick a date
          </button>
        </div>
      </div>

      {mode === "id" ? (
        <div>
          <input
            required={required}
            inputMode="numeric"
            name="idNumber"
            placeholder="13-digit South African ID number"
            maxLength={13}
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value.replace(/[^0-9]/g, ""))}
            className={`${inputClass} w-full`}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {idLooksComplete && idDob
              ? `Date of birth read as ${idDob.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })} (age ${ageFromDob(idDob)}). We only use this to confirm your date of birth.`
              : idLooksComplete && !idDob
                ? "That doesn't look like a valid South African ID number — check the digits, or pick a date instead."
                : "We read your date of birth straight from your ID number — nothing else is stored from it."}
          </p>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`${inputClass} flex w-full items-center justify-between text-left`}
            >
              {dob
                ? dob.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
                : "Select your date of birth"}
              <CalendarIcon className="size-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dob}
              onSelect={setDob}
              captionLayout="dropdown"
              startMonth={new Date(1940, 0)}
              endMonth={new Date()}
              disabled={{ after: new Date() }}
              defaultMonth={dob ?? new Date(2008, 0)}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
