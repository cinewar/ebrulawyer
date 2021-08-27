import { ReactNode } from "react"
import { Head } from "blitz"
import Navbar from "app/core/components/common/Navbar"
import Footer from "app/core/components/common/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "ebru"}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
