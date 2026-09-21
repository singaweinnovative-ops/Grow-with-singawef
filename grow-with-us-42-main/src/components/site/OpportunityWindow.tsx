import { formatDate, getOpportunityStatus, statusLabel } from "@/lib/opportunity-dates";

const KIND_TONE: Record<string, string> = {
  upcoming: "border-sky/40 text-sky bg-sky/10",
  open: "border-gold/50 text-clay bg-gold-soft/50",
  closed: "border-border text-muted-foreground bg-sand",
  rolling: "border-sage/40 text-sage bg-sage/10",
};

const KIND_TONE_DARK: Record<string, string> = {
  upcoming: "border-sky/40 text-sky bg-cream/5",
  open: "border-gold/50 text-gold bg-cream/5",
  closed: "border-cream/25 text-cream/60 bg-cream/5",
  rolling: "border-sage/40 text-sage bg-cream/5",
};

export function OpportunityWindow({
  opens,
  closes,
  tone = "light",
  align = "start",
}: {
  opens: string | null;
  closes: string | null;
  tone?: "light" | "dark";
  align?: "start" | "end";
}) {
  const status = getOpportunityStatus(opens, closes);
  const dark = tone === "dark";
  const badgeClass = dark ? KIND_TONE_DARK[status.kind] : KIND_TONE[status.kind];

  return (
    <div className={`flex flex-col gap-1.5 ${align === "end" ? "items-end text-right" : "items-start"}`}>
      <span
        className={`rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold whitespace-nowrap ${badgeClass}`}
      >
        {statusLabel(status)}
      </span>
      {(opens || closes) && (
        <span className={`text-[0.7rem] leading-tight ${dark ? "text-cream/60" : "text-muted-foreground"}`}>
          {opens ? `Opens ${formatDate(opens)}` : null}
          {opens && closes ? " · " : null}
          {closes ? `Closes ${formatDate(closes)}` : null}
        </span>
      )}
    </div>
  );
}
