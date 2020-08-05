import { bgWhite, black, blue, cyan, green, grey, magenta } from "ansi-colors";
import {
  isFuture,
  isWeekend,
  isToday,
  getDaysInMonth,
  setDate,
  getYear
} from "date-fns";

import { LEADERS } from "./leaders";
import {
  formatMonthLong,
  range,
  match,
  formatDayOfWeekShort,
  formatDateInMonth
} from "./lib";
import { TermCalOptions } from "./types";

function termCal(opts?: TermCalOptions): void {
  const $ctx = opts?.context ?? process.stdout;
  const $separator = opts?.separator ?? " ";
  const $newline = opts?.newlineBetween ?? false;
  const $year: number = opts?.year ?? getYear(new Date());

  const $leader: string[] = match(opts?.leaderStyle)
    .with("unicode", () => LEADERS.UNICODE)
    .with("arrows", () => LEADERS.ARROWS)
    .with("bars", () => LEADERS.BARS)
    .otherwise(() => ["", " ", " "]);

  range(12)
    .map(month => new Date($year, month))
    .forEach(month => {
      const dow: string[] = [];
      const day: string[] = [];
      const monthTitle = formatMonthLong(month);
      const numOfDays = getDaysInMonth(month);

      const days = range(numOfDays).map(day => setDate(month, day + 1));

      days.forEach(calDay => {
        const dayOfWeek = formatDayOfWeekShort(calDay);
        const date = formatDateInMonth(calDay);

        // Colorize Day of the Week
        if (isWeekend(calDay)) {
          dow.push(blue(dayOfWeek));
        } else {
          dow.push(green(dayOfWeek));
        }

        // Colorize Date Number
        if (isFuture(calDay)) {
          day.push(grey(date));
        } else if (isToday(calDay)) {
          day.push(bgWhite(black(date)));
        } else if (isWeekend(calDay)) {
          day.push(blue(date));
        } else {
          day.push(magenta(date));
        }
      });

      // eslint-disable-next-line prettier/prettier
      const lines = [
        cyan(monthTitle),
        dow.join($separator),
        day.join($separator)
      ];

      lines.forEach((line, i) => {
        $ctx.write($leader[i].concat(`${line}\n`));
      });

      /**
       * Emit `\n` between each month
       *
       * { newline: true }
       */
      if ($newline) {
        $ctx.write("\n");
      }
    });
}

export default termCal;
