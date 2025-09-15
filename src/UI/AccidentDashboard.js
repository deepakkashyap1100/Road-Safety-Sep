import React, { useState } from "react";
import { MdOutlinePhone } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { ThemeColors } from "../ThemeColors";


// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

const contacts = [
  {
    title: "Call Conductor",
    phone: "+91 5258596565",
    emergency: false,
  },
  {
    title: "Call Fleet In-charge",
    phone: "+91 5258596565",
    emergency: false,
  },
  {
    title: "Call Service Depot",
    phone: "+91 5258596565",
    emergency: false,
  },
  {
    title: "Off-road Driver",
    phone: "+91 5258596565",
    emergency: true,
  },
  {
    title: "Call Ambulance",
    phone: "+91 5258596565",
    emergency: true,
  },
  {
    title: "Call Police",
    phone: "+91 5258596565",
    emergency: true,
  },
];

export default function AccidentDashboard() {
  const [message, setMessage] = useState("");


  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-[680px] mx-auto">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="relative rounded-lg p-4 flex flex-col justify-between"
            style={{ backgroundColor: "#def7ff" }}
          >
            <div className="flex items-center w-full mb-2">
              <h4 className="text-md  text-gray-950">{contact.title}</h4>
              <div>
              {contact.emergency && (
                <span className="absolute right-2 top-4">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>
                </span>
              )}
              </div>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
             <MdOutlinePhone className="inline" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex justify-between gap-3 w-full">
              <button
                className="text-white text-sm px-4 py-1 rounded  w-full"
                style={{ backgroundColor: "#286578" }}
              >
                Call
              </button>
              <button className={`bg-white border-2 border-[${ThemeColors.PrimaryColor}] text-gray-600 text-sm px-2 py-1 rounded w-full flex justify-center`}>
               <TbCopy />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 mb-4 flex items-start">
        <div>
        <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2"></span>
        </div>
        <p className="text-gray-900 text-xs ">
          A red dot indicates an emergency requiring immediate help. If it's not an emergency, please use a different contact number.
        </p>
      </div>
      <div>
        <label className="block text-md font-semibold mb-2 text-gray-950">
          Report Accident Boardcast
        </label>
        <textarea
          className="w-full border rounded p-2 text-sm mb-4 resize-none"
          rows={2}
          placeholder="Write a message here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className="block w-full text-white text-lg rounded py-2 font-semibold"
          style={{ backgroundColor: "#286578" }}
        >
          Message Boardcast
        </button>
      </div>





    </div>
  );
}
