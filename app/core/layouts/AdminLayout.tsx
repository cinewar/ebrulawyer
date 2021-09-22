import { ReactNode } from "react"
import { Head, useRouter } from "blitz"
import Navbar from "app/core/components/common/Navbar"
import Footer from "app/core/components/common/Footer"
import { RecoilRoot } from "recoil"
import AdminNavbar from "../components/common/AdminNavbar"
import Sidebar from "../components/common/AdminSidebar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const AdminLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "ebru"}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <RecoilRoot>
        <div className="dashboard-page">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-part">
            <div className="admin-navbar">
              <AdminNavbar />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </RecoilRoot>
    </>
  )
}

export default AdminLayout
