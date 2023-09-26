import React from 'react'
import '../css/layout.css'
import NewSidebar from './NewSidebar'
import { Outlet } from 'react-router-dom'
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Layout = () => {

  return (
    <div id='layout-container'>
      <NewSidebar />
      <div id="dashboard-header">
        <Stack
          direction="row"
          spacing={1}
          sx={{ position: "relative", marginLeft: "24px" }}
        >
          <Avatar
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 35, height: 35 }}
          />
        </Stack>
        <MailOutlineIcon sx={{ fontSize: 30, marginLeft: "24px" }} />
        <NotificationsNoneIcon sx={{ fontSize: 30 }} />
      </div>
      <Outlet />
    </div>
  )
}

export default Layout