import { ReactNode, Suspense } from "react"
import { Head, useRouter, Image } from "blitz"
import Navbar from "app/core/components/common/Navbar"
import Footer from "app/core/components/common/Footer"
import { RecoilRoot, useRecoilState } from "recoil"
import { AnimatePresence, motion } from "framer-motion"
import { photoUrl, showPhoto } from "utils/global"
import { ReactComponent as Close } from "../../../public/close.svg"
import Loader from "../components/common/Loader"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const [currentShowPhoto, setShowPhoto] = useRecoilState(showPhoto)
  const [currentUrl, setCurrentUrl] = useRecoilState(photoUrl)
  return (
    <>
      <Head>
        <title>{title || "ebru"}</title>
        <meta
          name="description"
          content={"Balıkesirde her türlü dava için güvenle başvuracağınız avukatınız."}
        />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Navbar />
        {children}
        <AnimatePresence>
          {currentShowPhoto && (
            <motion.div
              onClick={(e) => {
                if (e.currentTarget === e.target) {
                  setShowPhoto(false)
                }
              }}
              key="photo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.5 },
              }}
              className="show-photo-wrapper"
            >
              <motion.span
                key="close"
                onClick={() => {
                  setShowPhoto(false)
                  setCurrentUrl("default")
                }}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                className="close"
              >
                <Close />
              </motion.span>
              <div className="image">
                <Image
                  src={currentUrl}
                  layout="fill"
                  objectPosition="center"
                  objectFit="cover"
                  alt="logo"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </Suspense>
    </>
  )
}

const Inner = ({ title, children }: LayoutProps) => {
  return (
    <RecoilRoot>
      <Layout title={title} children={children} />
    </RecoilRoot>
  )
}

export default Inner
