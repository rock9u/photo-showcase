"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

const dates = [
  "2025-10-01 7:00:00",
  "2023-10-01 7:00:00",
  "2024-12-01 8:00:00",
  "2023-02-28 8:00:00",
  "2024-12-01 8:00:00",
  "2026-01-01 5:00:00",
  "2021-03-19 7:00:00",
  "2021-12-31 11:00:00",
  "2024-05-01 4:00:00",
  "2025-08-01 4:00:00",
  "2020-12-31 11:00:00",
];

const values = [
  "19425.00",
  "9750.00",
  "39.75",
  "5000.00",
  "900.00",
  "0.00",
  "36000.00",
  "30500.00",
  "666.00",
  "18900.00",
  "8872.00",
];
const chartData = Object.entries(
  dates
    .map((date, index) => ({
      date,
      value: Number(values[index]),
    }))
    .reduce((acc, curr) => {
      //aggrupate by year
      const year = new Date(curr.date).getFullYear().toString();
      return { ...acc, [year]: (acc[year] ?? 0) + curr.value };
    }, {}),
).map(([year, value]) => ({ year, value }));

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MyBarChart() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
