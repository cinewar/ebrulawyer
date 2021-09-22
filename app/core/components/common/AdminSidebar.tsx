import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Image } from "blitz"
import { Link } from "blitz"
import { useEffect, useState } from "react"
import { ReactComponent as PhotosSvg } from "../../../../public/cards.svg"
import { ReactComponent as AboutUsSvg } from "../../../../public/admin-about-us-icon.svg"
import { ReactComponent as FeaturesSvg } from "../../../../public/admin-features-icon.svg"
import { ReactComponent as ReferencesSvg } from "../../../../public/admin-references-icon.svg"
import { ReactComponent as ContactUsSvg } from "../../../../public/admin-contactus-icon.svg"
import { motion } from "framer-motion"
import { useRecoilState } from "recoil"
import { sideState } from "../../../../utils/global"

const Sidebar: BlitzPage = () => {
  const router = useRouter()

  const pathItems = router.pathname.split("/")

  const lastItemOfPath = pathItems[pathItems.length - 1]
  console.log(lastItemOfPath)

  const sidebarVariants = {
    hover: { width: 230 },
  }

  const [name, setName] = useState("Ebru Sevinç")
  const words = name.split(" ")

  const [firstLetters, setFirstLetters] = useState("")

  useEffect(() => {
    words.forEach((e) => {
      setFirstLetters((prev) => prev + e.charAt(0))
    })
  }, [])

  const [buttonHover, setButtonHover] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarState, setSidebarState] = useRecoilState(sideState)
  const [sidebarclass, setSidebarclass] = useState("sidebar-wrapper-closed")
  useEffect(() => {
    if (sidebarState) {
      setSidebarclass("sidebar-wrapper-open")
      setSidebarOpen(true)
    } else {
      setSidebarclass("sidebar-wrapper-closed")
      setSidebarOpen(false)
    }
  }, [sidebarState])
  return (
    <motion.div
      variants={sidebarVariants}
      whileHover={sidebarState ? "" : "hover"}
      onMouseEnter={() => {
        if (!sidebarState) {
          setSidebarclass("sidebar-wrapper-open")
          setSidebarOpen(true)
        }
      }}
      onMouseLeave={() => {
        if (!sidebarState) {
          setSidebarclass("sidebar-wrapper-closed")
          setSidebarOpen(false)
        }
      }}
      className={`${sidebarclass} ` + (sidebarState ? " open" : "")}
    >
      <div className="image">
        <Image
          src="/profile-photo.jpeg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="profile image"
        />
      </div>
      <div className="name">{sidebarOpen ? name : firstLetters}</div>
      <div className="button-wrapper">
        <Link href="/admin">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={"button " + (lastItemOfPath === "admin" ? "active" : "")}
          >
            <span className="button-text">Slidelar</span>
            <div className="logo">
              {/* <Image
                src={
                  buttonHover
                    ? true
                      ? '/images/photos-active.svg'
                      : '/images/photos-nonactive.svg'
                    : '/images/photos.svg'
                }
                layout='fill'
                objectFit='cover'
                objectPosition='bottom center'
                alt='About us section image'
              /> */}
              <PhotosSvg />
            </div>
          </motion.a>
        </Link>
        <Link href="/admin/features">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={"button " + (lastItemOfPath === "features" ? "active" : "")}
          >
            <span className="button-text">İçerikler</span>
            <div className="logo">
              <FeaturesSvg />
            </div>
          </motion.a>
        </Link>
        <Link href="/admin/aboutus">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={"button " + (lastItemOfPath === "aboutus" ? "active" : "")}
          >
            <span className="button-text">Hakkımızda</span>
            <div className="logo">
              <AboutUsSvg />
            </div>
          </motion.a>
        </Link>
        <Link href="/admin/references">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) => {
              setButtonHover(true)
            }}
            onMouseLeave={() => setButtonHover(false)}
            className={"button " + (lastItemOfPath === "references" ? "active" : "")}
          >
            <span className="button-text">Referanslar</span>
            <div className="logo">
              <ReferencesSvg />
            </div>
          </motion.a>
        </Link>
        <Link href="/admin/contactus">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) => {
              setButtonHover(true)
            }}
            onMouseLeave={() => setButtonHover(false)}
            className={"button " + (lastItemOfPath === "contactus" ? "active" : "")}
          >
            <span className="button-text">İletişim</span>
            <div className="logo">
              <ContactUsSvg />
            </div>
          </motion.a>
        </Link>
      </div>
    </motion.div>
  )
}

export default Sidebar
