"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CartesianGrid, XAxis, YAxis, Scatter, ScatterChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartConfig, ChartContainer, ChartTooltip } from "./chart";

export const ganttChartDataGenerator = (n: number, durationInDays: number) => {
  const data = [];
  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + durationInDays * 24 * 60 * 60 * 1000,
  );

  const getRandomDate = (start: Date, end: Date) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  };

  const getRandomDuration = (minDays: number, maxDays: number) => {
    return Math.floor(Math.random() * (maxDays - minDays + 1) + minDays);
  };

  // Generate tasks
  for (let i = 0; i < n; i++) {
    const taskDuration = getRandomDuration(
      1,
      Math.max(2, Math.floor(durationInDays / 10)),
    ); // Ensure some short tasks
    let start = getRandomDate(
      startDate,
      new Date(endDate.getTime() - taskDuration * 24 * 60 * 60 * 1000),
    );
    let end = new Date(start.getTime() + taskDuration * 24 * 60 * 60 * 1000);

    // Ensure some tasks overlap
    if (i > 0 && Math.random() < 0.4) {
      const prevTask = data[data.length - 1];
      start = getRandomDate(
        new Date(prevTask.start_date),
        new Date(prevTask.end_date),
      );
      end = new Date(start.getTime() + taskDuration * 24 * 60 * 60 * 1000);

      // Adjust end date if it exceeds the project end date
      if (end > endDate) {
        end = endDate;
      }
    }

    data.push({
      id: i + 1,
      item: `Task ${i + 1}`,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    });
  }

  // sort
  data.sort(
    (a, b) =>
      new Date(a.start_date).valueOf() - new Date(b.start_date).valueOf(),
  );

  return data;
};

const chartConfig: ChartConfig = {
  item: {
    label: "Item",
    color: "hsl(var(--chart-3))",
  },
};

type DataPoint = {
  x: number;
  z: number;
  y: number;
  id: number;
  item: string;
};

export function MyGnattChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const data = ganttChartDataGenerator(20, 60);
    const parsedData = data.map((d, i) => ({
      x: new Date(d.start_date).valueOf(),
      z: new Date(d.end_date).valueOf(),
      y: i,
      id: d.id,
      item: d.item,
    }));
    setChartData(parsedData);
  }, []);

  const xDomain = useMemo(() => {
    const min = Math.min(...chartData.map((d) => d.x));
    const max = Math.max(...chartData.map((d) => d.z));
    return [min - 1000 * 60 * 60 * 24, max + 1000 * 60 * 60 * 24];
  }, [chartData]);

  const yDomain = useMemo(() => [0, chartData.length - 1], [chartData]);
  const generateTicks = () => {
    const minDate = Math.min(...chartData.map((d) => d.x));
    const maxDate = Math.max(...chartData.map((d) => d.z));
    const ticks = [];
    let currentTick = new Date(minDate);
    currentTick.setHours(0, 0, 0, 0);

    while (currentTick.valueOf() <= maxDate) {
      ticks.push(currentTick.valueOf());
      currentTick.setDate(currentTick.getDate() + 7);
    }

    return ticks;
  };

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <Card className="flex h-full w-full flex-col rounded">
      <CardHeader className="flex flex-row flex-wrap justify-between gap-2 border-b sm:gap-0">
        <div className="flex flex-col gap-1">
          <CardTitle>Gantt Chart made with recharts</CardTitle>
          <CardDescription>{chartData.length} tasks</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="my-4 h-full w-full">
        <ChartContainer config={chartConfig} className=" h-full w-full">
          <ScatterChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              ticks={generateTicks()}
              tickFormatter={formatXAxis}
              padding={{ left: 30, right: 30 }}
              style={{ userSelect: "none" }}
            />
            <YAxis
              hide
              type="number"
              dataKey="y"
              name="weight"
              domain={yDomain}
              padding={{ top: 10, bottom: 10 }}
              style={{ userSelect: "none" }}
            />
            <ChartTooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3", opacity: 0.3 }}
              wrapperStyle={{ zIndex: 100 }}
            />
            <Scatter
              data={chartData}
              fill="hsl(var(--chart-1))"
              shape={<CustomBar />}
            />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CustomBar = (props: any) => {
  const { cx, cy, fill, payload, xAxis } = props;
  const barWidth = xAxis.scale(payload.z) - xAxis.scale(payload.x);
  const barHeight = 25;

  const truncateText = (text: string, maxWidth: number) => {
    const charWidth = 5;
    const maxChars = Math.floor(maxWidth / charWidth);
    if (text.length > maxChars) {
      return text.slice(0, maxChars - 3) + "...";
    }
    return text;
  };

  const truncatedText = truncateText(payload.item, barWidth);

  return (
    <g>
      <rect
        x={cx}
        y={cy - barHeight / 2}
        width={barWidth}
        height={barHeight}
        fill={fill}
        rx={4}
        ry={4}
      />
      <text
        x={cx + 5}
        y={cy - 3}
        dy={4}
        fill="#fff"
        fontSize={10}
        textAnchor="start"
        dominantBaseline="middle"
        style={{ userSelect: "none" }}
      >
        <tspan>{truncatedText}</tspan>
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded border bg-secondary p-2 shadow">
        <p className="font-bold">{data.item}</p>
        <p>Start: {new Date(data.x).toLocaleDateString()}</p>
        <p>End: {new Date(data.z).toLocaleDateString()}</p>
      </div>
    );
  }
  return null;
};
