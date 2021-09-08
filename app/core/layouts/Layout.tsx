import { ReactNode } from "react"
import { Head, useRouter } from "blitz"
import Navbar from "app/core/components/common/Navbar"
import Footer from "app/core/components/common/Footer"
import { RecoilRoot } from "recoil"

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
      <RecoilRoot>
        <Navbar />
        {children}
        <Footer />
      </RecoilRoot>
    </>
  )
}

export default Layout
