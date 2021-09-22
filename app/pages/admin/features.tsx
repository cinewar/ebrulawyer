import { BlitzPage, dynamic } from "blitz"
import React, { useEffect, useState } from "react"
import AdminLayout from "app/core/layouts/AdminLayout"
import Main from "app/core/components/common/admin-features/Main"

const Features: BlitzPage = () => {
  return (
    <div className="features-page">
      <div className="main">
        <Main />
      </div>
    </div>
  )
}

Features.suppressFirstRenderFlicker = true
Features.getLayout = (page) => <AdminLayout title="İçerikler">{page}</AdminLayout>
Features.authenticate = true

export default Features
