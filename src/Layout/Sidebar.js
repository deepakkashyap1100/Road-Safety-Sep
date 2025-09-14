import React, { useState } from "react";
import "../assets/css/sidebar.css";
import { Box, Typography } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import img1 from "../assets/images/svg/icon1.svg";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({ open }) => {
  const { pathname } = useLocation();
  const [openSubListId, setOpenSubListId] = useState(null);

  const sidebarLink = [
    { id: 1, icon: img1, label: "Dashboard", link: "/admin", dock: true },
    { id: 2, icon: img1, label: "Station Master", link: "/admin/station-master", dock: true },
    { id: 3, icon: img1, label: "Asset Master", link: "/admin/asset-master", dock: true },
    {
      id: 4,
      icon: img1,
      label: "Accident Master",
      link: "/admin/accident-master",
      dock: false,
      subList: [
        { id: "4-1", icon: img1, path: "/admin/accident-master/accident-type", title: "Accident Type" },
        { id: "4-2", icon: img1, path: "/admin/accident-master/CauseofAccident", title: "Cause of Accident" },
        { id: "4-3", icon: img1, path: "/admin/accident-master/list", title: "Accident Master List" },
      ],
    },
  ];

  return (
    <aside className="app-sidebar text-white flex flex-col  overflow-y-auto hide-scrollbar" >
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img src="/image 12.png" alt="Logo" className="brand" />
      </div>

      {/* Sidebar links */}
      <nav className="flex-1 space-y-2 ">
        <Box className="sidebar-content">
          {sidebarLink.map((item) => (
            <React.Fragment key={item.id}>
              {item.dock ? (

                <Link
                  to={item.link}
                  onClick={() => setOpenSubListId(null)}
                  className={`sidebar-item no-underline ${
                    !open ? "collapsed" : ""
                  } ${pathname === item.link ? "active-link" : ""}`}
                >
                  <Box className="sidebar-icon">
                    <span className="text-lg">
                      <img src={item.icon} alt={item.label} />
                    </span>
                  </Box>
                  {open && (
                    <Typography variant="body1">
                      <span className="text-white">{item.label}</span>
                    </Typography>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setOpenSubListId(
                        openSubListId === item.id ? null : item.id
                      )
                    }
                    className={`sidebar-item no-underline w-full flex gap-2 items-center ${
                      !open ? "collapsed" : ""
                    } ${pathname.startsWith(item.link) ? "active-link" : ""}`}
                  >
                    <Box className="sidebar-icon">
                      <span className="text-lg">
                        <img src={item.icon} alt={item.label} />
                      </span>
                    </Box>
                    {open && (
                      <Typography variant="body1" className="flex-1">
                        <span className="text-white">{item.label}</span>
                      </Typography>
                    )}
                    {open && (
                      <span className="ml-2">
                        {openSubListId === item.id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </span>
                    )}
                  </button>

                  {/* Sub menu */}
                  {openSubListId === item.id &&
                    item.subList?.map((subItem) => (
                      <NavLink
                        key={subItem.id}
                        to={subItem.path}
                        className={`ml-4 sidebar-item no-underline ${
                          pathname === subItem.path ? "active-link" : ""
                        }`}
                      >
                        <Box className="sidebar-icon">
                          <span className="text-lg">
                            <img src={subItem.icon} alt={subItem.title} />
                          </span>
                        </Box>
                        {open && (
                          <Typography variant="body2">
                            <span className="text-white">{subItem.title}</span>
                          </Typography>
                        )}
                      </NavLink>
                    ))}
                </>
              )}
            </React.Fragment>
          ))}
        </Box>
      </nav>
    </aside>
  );
};

export default Sidebar;
