import { BlitzPage, dynamic } from "blitz"
import React, { useEffect, useState } from "react"
import AdminLayout from "app/core/layouts/AdminLayout"
import Main from "app/core/components/common/admin-aboutus/Main"

const AboutUs: BlitzPage = () => {
  return (
    <div className="admin-aboutus-page">
      <div className="main">
        <Main />
      </div>
    </div>
  )
}

AboutUs.suppressFirstRenderFlicker = true
AboutUs.getLayout = (page) => <AdminLayout title="Hakkımızda">{page}</AdminLayout>
AboutUs.authenticate = true

export default AboutUs
