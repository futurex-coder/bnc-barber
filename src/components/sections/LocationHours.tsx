import { type Location } from "@/data/site";
import { cn } from "@/lib/utils";

const DAY_INDEX: Record<string, number> = {
  Неделя: 0,
  Понеделник: 1,
  Вторник: 2,
  Сряда: 3,
  Четвъртък: 4,
  Петък: 5,
  Събота: 6,
};

export function LocationHours({ loc }: { loc: Location }) {
  const todayIdx = new Date().getUTCDay();

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Работно време на {loc.name}</caption>
      <tbody>
        {loc.hours.map((h) => {
          const isToday = DAY_INDEX[h.day] === todayIdx;
          return (
            <tr
              key={h.day}
              className={cn(
                "border-b border-hairline last:border-0",
                isToday && "text-ink",
              )}
            >
              <th
                scope="row"
                className={cn(
                  "py-2.5 text-left font-normal",
                  isToday ? "text-gold" : "text-grey",
                )}
              >
                {h.day}
                {isToday ? <span className="ml-2 text-xs">· днес</span> : null}
              </th>
              <td
                className={cn(
                  "py-2.5 text-right tabular-nums",
                  isToday ? "text-ink" : "text-ink/80",
                )}
              >
                {h.open && h.close ? `${h.open} – ${h.close}` : "Почивен ден"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
