import { BlitzPage, dynamic } from "blitz"
import React, { useEffect, useState } from "react"
import AdminLayout from "app/core/layouts/AdminLayout"
import Main from "app/core/components/common/admin-contactus/Main"

const ContactUs: BlitzPage = () => {
  return (
    <div className="contactus-page">
      <div className="main">
        <Main />
      </div>
    </div>
  )
}

ContactUs.suppressFirstRenderFlicker = true
ContactUs.getLayout = (page) => <AdminLayout title="İletişim">{page}</AdminLayout>
ContactUs.authenticate = true

export default ContactUs
