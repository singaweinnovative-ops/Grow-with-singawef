/**
 * South African ID numbers encode date of birth in the first 6 digits
 * (YYMMDD). There is no century digit, so we use the common convention:
 * a two-digit year greater than the current two-digit year is assumed to
 * be 1900s, otherwise 2000s.
 */
export function dobFromSaId(id: string): Date | null {
  const digits = id.replace(/\D/g, "");
  if (digits.length !== 13) return null;

  const yy = Number(digits.slice(0, 2));
  const mm = Number(digits.slice(2, 4));
  const dd = Number(digits.slice(4, 6));
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

  const currentYY = new Date().getFullYear() % 100;
  const century = yy > currentYY ? 1900 : 2000;
  const date = new Date(century + yy, mm - 1, dd);

  const valid =
    date.getFullYear() === century + yy && date.getMonth() === mm - 1 && date.getDate() === dd;
  return valid ? date : null;
}

export function ageFromDob(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}
