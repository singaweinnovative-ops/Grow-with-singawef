export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysBetween(a: Date, b: Date): number {
  const MS_PER_DAY = 86400000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / MS_PER_DAY);
}

export type OpportunityStatus =
  | { kind: "rolling" }
  | { kind: "upcoming"; days: number }
  | { kind: "open"; days: number | null }
  | { kind: "closed" };

/**
 * Where an opportunity stands today: not yet open, open and counting down,
 * closed, or rolling with no fixed window at all.
 */
export function getOpportunityStatus(
  opens: string | null,
  closes: string | null,
): OpportunityStatus {
  const today = new Date();

  if (!opens && !closes) return { kind: "rolling" };

  if (opens && today < new Date(opens)) {
    return { kind: "upcoming", days: daysBetween(today, new Date(opens)) };
  }

  if (closes) {
    const closeDate = new Date(closes);
    if (today > closeDate) return { kind: "closed" };
    return { kind: "open", days: daysBetween(today, closeDate) };
  }

  return { kind: "open", days: null };
}

/** False once an opportunity's closing date has passed — used to drop it from public listings automatically. */
export function isOpportunityActive(opens: string | null, closes: string | null): boolean {
  return getOpportunityStatus(opens, closes).kind !== "closed";
}

export function statusLabel(status: OpportunityStatus): string {
  switch (status.kind) {
    case "rolling":
      return "Rolling — no fixed deadline";
    case "upcoming":
      return status.days === 0
        ? "Opens today"
        : `Opens in ${status.days} day${status.days === 1 ? "" : "s"}`;
    case "open":
      if (status.days === null) return "Open now";
      if (status.days === 0) return "Closes today";
      return `Closes in ${status.days} day${status.days === 1 ? "" : "s"}`;
    case "closed":
      return "Closed";
  }
}
