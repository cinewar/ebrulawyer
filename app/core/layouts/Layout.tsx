import { ReactNode, Suspense } from "react"
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
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </RecoilRoot>
    </>
  )
}

export default Layout
