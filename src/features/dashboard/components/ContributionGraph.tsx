import { useEffect, useState } from "react";
import * as d3 from "d3";
import { getContributions } from "@/redux/dashboard/service/contribution.service.ts";

interface GraphData {
    date: string;
    minute: number;
}

export default function ContributionGraph() {
    const [data, setData] = useState<GraphData[]>([]);
    const today = new Date();
    const startDate = d3.timeDay.offset(today, -364); // đủ 52 tuần

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
                <div className="flex justify-start">
                    <div className="w-[30px] flex flex-col justify-between h-full text-xs text-gray-400 mr-3 ">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                            <div key={i} className="h-4 min-h-[20px]">{day}</div>
                        ))}
                    </div>
                    <div className="flex gap-[4px]">
                        {Array.from({ length: numWeeks }).map((_, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-[4px]">
                                {Array.from({ length: 7 }).map((_, dayIdx) => {
                                    const date = d3.timeDay.offset(startDate, weekIdx * 7 + dayIdx);
                                    if (date > today) return <div key={dayIdx} className="h-4 w-4 rounded bg-white" />;
                                    const key = d3.timeFormat("%Y-%m-%d")(date);
                                    const value = dataMap.get(key);
                                    return (
                                        <div
                                            key={dayIdx}
                                            className={`h-4 w-4 min-w-[1rem] min-h-[1rem] rounded ${getColor(value)}`}
                                            title={`${key}: ${value || 0}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                    <div className="h-4 w-4 rounded bg-green-200" />
                    <div className="h-4 w-4 rounded bg-green-400" />
                    <div className="h-4 w-4 rounded bg-green-600" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
