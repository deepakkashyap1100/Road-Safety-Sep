import React, { useState } from "react";
import "../../assets/fonts/Lato/Lato-Regular.ttf";
import {
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import { ThemeColors } from "../../ThemeColors";
import "../../assets/fonts/Poppins/Poppins-Regular.ttf";
import { MdOutlinePhone } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Link } from "lucide-react";
import { Links } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "react-multi-carousel";
import TextInput from "../InputFields/InputFields";

const fleetData = [
  {
    id: 1,
    name: "Rohit Kumar",
    phone: "+91 7662262656",
    speed: 120,
    issues: ["Hypertension", "Diabetes"],
    location: "Bypass Lucknow Expressway",
    conductor: "Prince Kumar",
    vehicleNo: "UP16 AA 3456",
    depot: "Ghaziabad/Lucknow",
    routeFrom: "Ghaziabad",
    routeTo: "Kushinagar",
  },
  {
    id: 2,
    name: "Amit Singh",
    phone: "+91 9876543210",
    speed: 100,
    issues: ["Diabetes"],
    location: "Delhi Expressway",
    conductor: "Rajesh Sharma",
    vehicleNo: "DL10 BB 2345",
    depot: "Delhi/Meerut",
    routeFrom: "Delhi",
    routeTo: "Meerut",
  },
  {
    id: 3,
    name: "Suresh Yadav",
    phone: "+91 9988776655",
    speed: 130,
    issues: ["Hypertension"],
    location: "Agra Expressway",
    conductor: "Vikram Chauhan",
    vehicleNo: "UP80 CC 7890",
    depot: "Agra/Noida",
    routeFrom: "Agra",
    routeTo: "Noida",
  },
];

export default function LiveFleetTracking2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("desc");

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
             partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1024, min: 767 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,

        }
    };

  // Filter & Search Logic
  const filteredData = fleetData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issues.some((i) =>
          i.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) =>
      sortBy === "asc" ? a.speed - b.speed : b.speed - a.speed
    );

  return (
    <div className="space">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="lg:text-[30px] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Live Fleet Tracking</h2> 
        <div className="flex gap-4">
          <TextInput
            value={searchTerm}
            placeholder={"Search by keyword...2"}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: `${ThemeColors.secondColor}` }}
            size={"small"}
            InputProps={{endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon sx={{ color: `${ThemeColors.PrimaryColor}`, fontSize: 24 }} />
                  </IconButton>
                </InputAdornment>
              )}}
          />

          {/* Sort */}
          <FormControl size="small">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{
                bgcolor: '#286578',
                textTransform: "capitalize",
                fontFamily: "Lato, sans-serif ",
                color: '#ffffff'
              }}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
            >
              <MenuItem value="asc">Speed ↑</MenuItem>
              <MenuItem value="desc">Speed ↓</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Cards */}
      <div className="">
          <Carousel
          //   removeArrowOnDeviceType={["tablet", "mobile"]}
            arrows={false}
          responsive={responsive}
          // autoPlay={false}
          // autoPlaySpeed={3000}
          // transitionDuration={2000}
          //additionalTransfrom={-20}
          //  pauseOnHover={false}
          //  centerMode={false}
          containerClass=""
          itemClass="pe-md-3 px-1"
          showDots={false}
          infinite={true}
          renderDotsOutside={true}
          partialVisible={true}
          className='ps-0'
          >
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-4 border"
          >
            <h2 className="font-semibold text-[28px]">
              Over-Speeding
            </h2>
            <div>{item.speed} km/h+</div>

            {/* Profile */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <img
                  src={`https://i.pravatar.cc/40?img=${item.id}`}
                  alt={item.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600"><MdOutlinePhone className="inline" /> {item.phone}</p>
                </div>
              </div>
              <div className={`border-[${ThemeColors.PrimaryColor}] border-2 rounded-md `}>
                <IconButton >
                  <CallIcon sx={{ color: `${ThemeColors.PrimaryColor}` }} />
                </IconButton>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-3 justify-between">
              <Button variant="contained"
                sx={{
                  border: `solid 2px ${ThemeColors.PrimaryColor}`,
                  backgroundColor: 'transparent',
                  color: `${ThemeColors.PrimaryColor}`
                }}>
                <GoDotFill className="inline " fill='red' size="20" />
                DASHCAM LIVE
              </Button>
              <Button variant="contained"
                sx={{
                  color: `${ThemeColors.whiteColor}`,
                  backgroundColor: `${ThemeColors.PrimaryColor}`,
                  textTransform: 'capitalize',
                }}>

                Vehicle Status
              </Button>


            </div>

            {/* Health Issues */}
            <div className="mt-[16px] p-3 border border-gray-300 rounded-lg">
              <h6 className="text-[16px] semibold mb-1">Health Issues</h6>
              <div className="flex gap-2 flex-wrap">
                {item.issues.map((issue, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-2 py-1 rounded-md text-xs"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mt-[8px] p-3 border border-gray-300 rounded-lg">

              <div className="flex justify-between">
                <h6 className="text-[16px] semibold mb-1">Current Location</h6>

                <p className={`text-[${ThemeColors.PrimaryColor}] cursor-pointer underline`}>
                  Live Location
                </p>
              </div>
              <p className="text-gray-700 text-sm">
                {item.location}
              </p>
            </div>

            {/* Vehicle Details */}
            <div className="mt-[8px] p-3 border border-gray-300 rounded-lg">
              <h6 className="text-[16px] semibold mb-1">Vehicle Details</h6>
              <p className="text-gray-700 text-sm">Duty Conductor : {item.conductor}</p>
              <p className="text-gray-700 text-sm">Vehicle No : {item.vehicleNo}</p>
              <p className="text-gray-700 text-sm">Depot : {item.depot}</p>
            </div>
            {/* Route */}
            <div className="mt-[8px] p-3 border border-gray-300 rounded-lg">
              <h6 className="text-[16px] semibold mb-1">Route</h6>
              <div className="relative flex items-center w-full max-w-2xl">
                <div>
                  <CiLocationOn fill="red" />
                </div>
                <div className="flex-1 relative mx-2">
                  {/* Dashed Line */}
                  <div className="border-t-2 border-dashed border-gray-400 w-full"></div>
                </div>
                <div>
                  <CiLocationOn fill={`${ThemeColors.PrimaryColor}`} />
                </div>
              </div>
              <div className="flex justify-between">
                 <span className="text-gray-700 text-sm">{item.routeFrom}</span>
                  <span className="text-gray-700 text-sm">{item.routeTo}</span>
              </div>

            </div>
          </div>
        ))}
        </Carousel>
      </div>
    </div>
  );
}
