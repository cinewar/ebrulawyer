import { Image, Link, useRouter } from "blitz"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { ReactComponent as OpenMenu } from "../../../../public/open-menu.svg"
import { ReactComponent as CloseMenu } from "../../../../public/close-menu.svg"
import { ReactComponent as LoginKey } from "../../../../public/login-key.svg"
import { dropdownMenu } from "../../../../utils/global"

const Navbar = () => {
  const router = useRouter()

  const pathItems = router.pathname.split("/")

  const navPath = pathItems[1]

  const [showDropdown, setShowDropdown] = useRecoilState(dropdownMenu)

  const dropdownVarients = {
    hidden: {
      opacity: 0,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }
  const innerVarients = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
  }

  return (
    <>
      <div className="navbar">
        <div className="nav-wrapper">
          <div className="logo">
            <Image src="/logo.svg" layout="intrinsic" width={80} height={80} alt="logo" />
          </div>
          <ul className="link-wrapper">
            <motion.li className={"link " + (navPath === "" ? " active" : "")}>
              <Link href="/">
                <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>Anasayfa</motion.div>
              </Link>
            </motion.li>
            <li className={"link " + (navPath === "about" ? " active" : "")}>
              <Link href="/about">
                <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>Hakkımızda</motion.div>
              </Link>
            </li>
            <li className={"link " + (navPath === "contact" ? " active" : "")}>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>İletişim</motion.div>
              </Link>
            </li>
          </ul>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className="login-key">
              <LoginKey />
            </motion.div>
          </Link>
          <div className="menu">
            {showDropdown ? (
              <motion.span
                style={{ display: "flex" }}
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  setShowDropdown(false)
                }}
              >
                <CloseMenu />
              </motion.span>
            ) : (
              <motion.span
                style={{ display: "flex" }}
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  setShowDropdown(true)
                }}
              >
                <OpenMenu />
              </motion.span>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showDropdown && (
          <div>
            <motion.div
              onClick={() => {
                setShowDropdown(false)
              }}
              key="parent"
              variants={dropdownVarients}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="dropNavbar-wrapper"
            >
              <motion.div key="child" variants={innerVarients} className="dropNav">
                <div className="buttons">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => router.push("/")}
                    className={navPath == "" ? "active" : ""}
                  >
                    ANASAYFA
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => router.push("/about")}
                    className={navPath == "about" ? "active" : ""}
                  >
                    HAKKIMIZDA
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => router.push("/contact")}
                    className={navPath == "contact" ? "active" : ""}
                  >
                    İLETİŞİM
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
