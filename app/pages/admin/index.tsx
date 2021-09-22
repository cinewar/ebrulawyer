import { BlitzPage, dynamic } from "blitz"
import React, { useEffect, useState } from "react"
import AdminLayout from "app/core/layouts/AdminLayout"
import Main from "app/core/components/common/admin-sliderImage/Main"

const Dashboard: BlitzPage = () => {
  return (
    <div className="dashboard-page">
      <div className="main">
        <Main />
      </div>
    </div>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.getLayout = (page) => <AdminLayout title="Dashboard">{page}</AdminLayout>
Dashboard.authenticate = true

export default Dashboard
