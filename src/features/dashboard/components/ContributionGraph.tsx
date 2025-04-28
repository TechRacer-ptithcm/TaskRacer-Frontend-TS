import { Fragment } from "react";
import * as d3 from "d3";

export default function ContributionGraph() {
  const year = 2025;
  const startDate = new Date(year, 0, 1);

  const sampleData = Array.from({ length: 365 }, (_, i) => {
    const d = new Date(year, 0, 1);
    d.setDate(d.getDate() + i);
    return {
      date: d,
      value: Math.floor(Math.random() * 5),
    };
  });

  const dataMap = new Map(
    sampleData.map((d) => [d3.timeFormat("%Y-%m-%d")(d.date), d.value]),
  );

  const getColor = (value?: number): string => {
    if (!value) return "bg-gray-200";
    if (value < 2) return "bg-green-200";
    if (value < 4) return "bg-green-400";
    return "bg-green-600";
  };

  return (
    <div className="mt-15 rounded-3xl bg-white p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Contribution Calendar - {year}
      </h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[40px_repeat(53,1fr)] gap-1">
          <div></div>
          {Array.from({ length: 53 }).map((_, i) => (
            <div key={i} className="text-center text-xs text-gray-400">
              {i % 4 === 0
                ? d3.timeFormat("%b")(d3.timeWeek.offset(startDate, i))
                : ""}
            </div>
          ))}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, dayIdx) => (
              <Fragment key={day}>
                <div className="pr-2 text-right text-xs text-gray-400">
                  {day}
                </div>
                {Array.from({ length: 53 }).map((_, weekIdx) => {
                  const date = d3.timeWeek.offset(startDate, weekIdx);
                  date.setDate(date.getDate() + dayIdx);
                  if (date.getFullYear() !== year)
                    return <div key={weekIdx}></div>;
                  const key = d3.timeFormat("%Y-%m-%d")(date);
                  const value = dataMap.get(key);
                  return (
                    <div
                      key={weekIdx}
                      className={`h-4 w-4 rounded ${getColor(value)}`}
                      title={`${key}: ${value || 0}`}
                    ></div>
                  );
                })}
              </Fragment>
            ),
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Less</span>
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-gray-200"></div>
            <div className="h-4 w-4 rounded bg-green-200"></div>
            <div className="h-4 w-4 rounded bg-green-400"></div>
            <div className="h-4 w-4 rounded bg-green-600"></div>
          </div>
          <span className="text-sm text-gray-500">More</span>
        </div>
      </div>
    </div>
  );
}
