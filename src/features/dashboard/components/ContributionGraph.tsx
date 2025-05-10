import { Fragment, useEffect, useState } from "react";
import * as d3 from "d3";
import { getContributions } from "@/redux/dashboard/service/contribution.service.ts";

interface GraphData {
    date: string;
    minute: number;
}

export default function ContributionGraph() {
    const [data, setData] = useState<GraphData[]>([]);
    const today = new Date();
    const startDate = d3.timeMonday.floor(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    useEffect(() => {
        getContributions().then((res) => setData(res.data));
    }, []);

    const dataMap = new Map(
        data.map((item) => [
            d3.timeFormat("%Y-%m-%d")(new Date(item.date)),
            item.minute,
        ])
    );

    const getColor = (value?: number): string => {
        if (!value) return "bg-gray-200";
        if (value < 15) return "bg-green-200";
        if (value < 30) return "bg-green-400";
        return "bg-green-600";
    };

    const numWeeks = Math.ceil(d3.timeDay.count(startDate, today) / 7);

    return (
        <div className="mt-15 rounded-3xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
                Contribution Calendar: {d3.timeFormat("%b %d, %Y")(startDate)} → {d3.timeFormat("%b %d, %Y")(today)}
            </h2>
            <div className="overflow-x-auto">
                <div className={`grid grid-cols-[40px_repeat(${numWeeks},1fr)] gap-1`}>
                    <div></div>
                    {Array.from({ length: numWeeks }).map((_, i) => (
                        <div key={i} className="text-center text-xs text-gray-400">
                            {i % 4 === 0
                                ? d3.timeFormat("%b")(d3.timeMonday.offset(startDate, i))
                                : ""}
                        </div>
                    ))}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIdx) => (
                        <Fragment key={day}>
                            <div className="pr-2 text-right text-xs text-gray-400">{day}</div>
                            {Array.from({ length: numWeeks }).map((_, weekIdx) => {
                                const date = d3.timeMonday.offset(startDate, weekIdx);
                                date.setDate(date.getDate() + dayIdx);
                                if (date > today) return <div key={weekIdx}></div>;
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
                    ))}
                </div>
            </div>

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
