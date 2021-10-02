import { BlitzPage, dynamic } from "blitz"
import React, { useEffect, useState } from "react"
import AdminLayout from "app/core/layouts/AdminLayout"
import Main from "app/core/components/common/admin-gallery/Main"

const Gallery: BlitzPage = () => {
  return (
    <div className="gallery-page">
      <div className="main">
        <Main />
      </div>
    </div>
  )
}

Gallery.suppressFirstRenderFlicker = true
Gallery.getLayout = (page) => <AdminLayout title="İçerikler">{page}</AdminLayout>
Gallery.authenticate = true

export default Gallery
