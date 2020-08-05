import { format, formatWithOptions } from "date-fns/fp";
import { match } from "ts-pattern";

export { match };

export const formatDayOfWeekShort = format("iiiiii");

export const formatMonthLong = format("LLLL");

export const formatDateInMonth = formatWithOptions(
  {
    useAdditionalDayOfYearTokens: true
  },
  "dd"
);

export function range(length: number): number[] {
  return Array.from(Array(length).keys());
}
