import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  LineChart,
  Line,
} from "recharts";
// import SelectInput from "../InputFields/SelectInput";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { Fixedbox } from "../InputFields/Fixedbox";


export default function ViolationTrackerGraph() {
  const [period, setPeriod] = useState("Weekly");

  // Sample data sets
  const dataSets = {
    Weekly: [
      { day: "Mon", violations: 280 },
      { day: "Tue", violations: 320 },
      { day: "Wed", violations: 210 },
      { day: "Thur", violations: 460, high: true },
      { day: "Fri", violations: 400 },
      { day: "Sat", violations: 270 },
      { day: "Sun", violations: 120 },
    ],
    Daily: [
      { day: "8AM", violations: 50 },
      { day: "10AM", violations: 120 },
      { day: "12PM", violations: 90 },
      { day: "2PM", violations: 150 },
      { day: "4PM", violations: 70 },
      { day: "6PM", violations: 200 },
      { day: "8PM", violations: 80 },
    ],
    Monthly: [
      { day: "Week 1", violations: 600, high: true },
      { day: "Week 2", violations: 450 },
      { day: "Week 3", violations: 700, high: true },
      { day: "Week 4", violations: 500, high: true },
    ],
      Yearly: [
    { day: "Jan", violations: 320 },
    { day: "Feb", violations: 280 },
    { day: "Mar", violations: 450, high: true },
    { day: "Apr", violations: 390 },
    { day: "May", violations: 520, high: true },
    { day: "Jun", violations: 410 },
    { day: "Jul", violations: 610, high: true },
    { day: "Aug", violations: 480 },
    { day: "Sep", violations: 350 },
    { day: "Oct", violations: 570, high: true },
    { day: "Nov", violations: 430 },
    { day: "Dec", violations: 680, high: true },
  ],
  };

  const data = dataSets[period];

  const isHighViolation = (violations) => violations > 450;

  return (
    <>
      <div className="space">
        <div className="border rounded-lg p-4">

        <div className="flex justify-between items-center mb-2">
           <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Violation Tracker graphs</h2>
          <div style={{width:'200px'}}>
            <FormControl fullWidth size="small" >
              <InputLabel>Violation Tracker</InputLabel>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                label="Violation Tracker"
                MenuProps={Fixedbox}
              >

                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} style={{ paddingRight: '0px' }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip wrapperStyle={{ backgroundColor: '#286578', }}  cursor={{ stroke: 'red', strokeWidth: 1 }}/>
              <Legend iconType={'circle'} />
              <Line
                type="monotone"
                activeDot={true}
                animationDuration={3000}
              dataKey="violations"
              fill="#286578"
              label={{ position: "bottom", fill: "#286578", fontSize: '10px' }}
                barSize={50}

            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={isHighViolation(entry.violations) ? "#e11616" : "#cbd5e1"}
                />
              ))}
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
        </div>
    </>
  );
}
