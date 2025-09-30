import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";

const data = [
  { month: "Jan", earning: 8000 },
  { month: "Feb", earning: 12000 },
  { month: "Mar", earning: 18000 },
  { month: "Apr", earning: 25000 },
  { month: "May", earning: 21000 },
  { month: "Jun", earning: 42000 },
  { month: "Jul", earning: 37000 },
  { month: "Aug", earning: 29000 },
  { month: "Sep", earning: 35000 },
  { month: "Oct", earning: 51000 },
  { month: "Nov", earning: 18000 },
  { month: "Dec", earning: 26000 },
];

export const EarningChart = ({
  title = "Earning",
  viewOptions = ["Yearly", "Monthly"],
}) => {
  const config = {
    earning: { color: "#d9466a", label: "Earnings" },
  };

  return (
    <Card className="border-[#8A1538] overflow-hidden w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <select className="border rounded px-2 py-1 text-sm">
            {viewOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="w-full h-[380px] aspect-auto"
        >
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis width={40} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="earning" fill="#d9466a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
