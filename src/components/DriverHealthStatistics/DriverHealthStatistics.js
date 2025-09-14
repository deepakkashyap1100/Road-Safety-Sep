import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { ThemeColors } from "../../ThemeColors";
import { Fixedbox } from "../InputFields/Fixedbox";

export default function DriverHealthStatistics() {
  // Dropdown data
  const healthParameters = {
    Vision: [
      {
        name: "Glaucoma/ Peripheral Vision Loss",
        cases: 20,
        coMorbidity: 2,
        critical: 2,
        improved: 20,
        notImproved: 2,
      },
      {
        name: "Colour Blindness",
        cases: 2,
        coMorbidity: 2,
        critical: 2,
        improved: 2,
        notImproved: 2,
      },
      {
        name: "Night Blindness",
        cases: 12,
        coMorbidity: 0,
        critical: 0,
        improved: 12,
        notImproved: 0,
      },
      {
        name: "Blurred Vision",
        cases: 6,
        coMorbidity: 0,
        critical: 0,
        improved: 6,
        notImproved: 0,
      },
    ],
    Hearing: [
      {
        name: "Hearing Loss",
        cases: 15,
        coMorbidity: 3,
        critical: 1,
        improved: 10,
        notImproved: 5,
      },
    ],
  };

  // States
  const [selectedHealth, setSelectedHealth] = useState("Vision");
  const [selectedSubHealth, setSelectedSubHealth] = useState("");

  // Data filtering
  const subOptions = healthParameters[selectedHealth] || [];
  const filteredData = selectedSubHealth
    ? subOptions.filter((item) => item.name === selectedSubHealth)
    : subOptions;

  return (
    <div className="space">
      <div className="flex justify-between">

      <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Driver's Health Statistics</h2>

      <div className="flex gap-4 mb-4">
        <FormControl className="!min-w-[200px]">
          <InputLabel>Health Parameters</InputLabel>
            <Select
               MenuProps={Fixedbox}
            value={selectedHealth}
            label="Health Parameters"
            onChange={(e) => {
              setSelectedHealth(e.target.value);
              setSelectedSubHealth("");
            }}
          >
            {Object.keys(healthParameters).map((param) => (
              <MenuItem key={param} value={param}>
                {param}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="!min-w-[250px]">
          <InputLabel>Sub-Health Parameters</InputLabel>
          <Select
            value={selectedSubHealth}
            label="Sub-Health Parameters"
              onChange={(e) => setSelectedSubHealth(e.target.value)}
            MenuProps={Fixedbox}
          >
            <MenuItem value="">All</MenuItem>
            {subOptions.map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table>
          <TableHead>
            <TableRow className={`bg-[${ThemeColors.PrimaryColor}]`}>
              <TableCell className="text-white font-semibold">
                Health Parameters
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases with co-morbidity
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases report as critical cases
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases has improvements
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases has no improvements
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.cases}</TableCell>
                <TableCell>{row.coMorbidity}</TableCell>
                <TableCell>{row.critical}</TableCell>
                <TableCell>{row.improved}</TableCell>
                <TableCell>{row.notImproved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
