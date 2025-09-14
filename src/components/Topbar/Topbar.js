import React from 'react';
import { IoSearch } from "react-icons/io5";
import user from "../../assets/images/svg/user.png"
import languageIcon from "../../assets/images/svg/language.svg"
import '../../assets/css/topbar.css'
import mailIcon from "../../assets/images/svg/mailIcon.svg"
import notification from "../../assets/images/svg/notification.svg"
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { FaSearch } from "react-icons/fa";
const TopbarHeader = () => {
  return (

    <header className="app-topbar bg-white border-b border-gray-100 flex items-center py-3 px-4 justify-between shadow-md mb-3">
      <div className='flex justify-between w-full'>


        <div className="flex items-center gap-3 w-1/3">
          <div className="flex items-center w-full max-w-md rounded-[12px] overflow-hidden  bg-[#def7ff]">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow px-4 py-1  text-gray-700 outline-none bg-[#def7ff]"
            />
            <button className="bg-[#286578] hover:bg-orange-600 transition-colors  flex items-center justify-center search-btn-style">
              <IoSearch className="text-white" size={25} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 pe-lg-5">
          <div className="flex items-center space-x-1     cursor-pointer language-input">
            <img src={languageIcon} alt="translate" className="w-5 me-2" />
            <span className="text-sm text-gray-700">English</span>
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="relative hidden lg:block cursor-pointer">
            <img src={notification} alt="" />
            <span className="absolute -top-1 -right-1 bg-[#286578] text-white text-xs rounded-full px-1">1</span>
          </div>
          <div className="relative hidden lg:block cursor-pointer">
            <img src={mailIcon} alt="" />
            <span className="absolute -top-1 -right-1 bg-[#286578] text-white text-xs rounded-full px-1">5</span>
          </div>
          <div className="h-6 border-l border-gray-300 hidden lg:block"></div>
          <div className="items-center space-x-2 cursor-pointer hidden lg:flex">
            <img src={user} alt="profile" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">Hello user name</span>
              <span className="text-xs text-gray-500">Doctor</span>
            </div>
          </div>
          {/* mobile view  profile and settings icon */}
          <div className="lg:hidden cursor-pointer flex items-center">
            <div
              className="flex items-center justify-center w-6 h-6 cursor-pointer"
              data-bs-toggle="dropdown"
            >
              <MoreVertIcon
                sx={{ color: "#23538f", cursor: "pointer" }}
                className="h-100 w-100"
              />
            </div>
            {/* Dropdown Menu */}
            <div
              className="dropdown-menu border-0 rounded-3"
              style={{
                boxShadow:
                  "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
              }}
            >
              <div className="d-flex flex-column align-items-start p-3">
                <div className="items-center space-x-2 cursor-pointer flex lg:hidden mt-3 mb-2">
                  <img src={user} alt="profile" className="w-8 h-8 rounded-full" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-lg font-semibold text-gray-800">Hello user name</span>
                    <span className="text-xs text-gray-500">Doctor</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative block lg:hidden cursor-pointer mt-3 ">
                    <img src={notification} alt="notifications" />
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1">1</span>
                  </div>
                  <span className="ms-2 relative">Notifications</span>
                </div>
                <div className="flex items-center">
                  <div className="relative block lg:hidden cursor-pointer my-3">
                    <img src={mailIcon} alt="mail" />
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1">5</span>
                  </div>
                  <span className="ms-2">Mail</span>
                </div>
              </div>
            </div>
          </div>
          {/* mobile view  profile and settings icon end */}
        </div>

      </div>
    </header>
  );
};

export default TopbarHeader;




