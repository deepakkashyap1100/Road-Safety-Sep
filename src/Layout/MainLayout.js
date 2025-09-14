import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../AppLayout/DashboardLayout'

function MainLayout() {
  return (
    <>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  )
}

export default MainLayout
