import React, { Suspense, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { cards } from "app/core/components/common/cards"
import { ReactComponent as RightArrow } from "../../public/right-arrow.svg"
import { ReactComponent as LeftArrow } from "../../public/left-arrow.svg"
import { ReactComponent as MoreArrow } from "../../public/more-arrow.svg"
import { AnimatePresence, motion } from "framer-motion"
import { wrap } from "@popmotion/popcorn"
import Gallery from "app/core/components/common/Gallery"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logoutMutation] = useMutation(logout)

//     </div>
//   )
// }

//   if (currentUser) {
//     return (
//       <>
//         <button
//           className="button small"
//           onClick={async () => {
//             await logoutMutation()
//           }}
//         >
//           Logout
//         </button>
//         <div>
//           User id: <code>{currentUser.id}</code>
//           <br />
//           User role: <code>{currentUser.role}</code>
//         </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <Link href={Routes.SignupPage()}>
//           <a className="button small">
//             <strong>Sign Up</strong>
//           </a>
//         </Link>
//         <Link href={Routes.LoginPage()}>
//           <a className="button small">
//             <strong>Login</strong>
//           </a>
//         </Link>
//       </>
//     )
//   }
// }

const Home: BlitzPage = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const [newCards, setnewCards] = useState<any>([])

  useEffect(() => {
    setnewCards(cards)
  }, [])

  const imageIndex = wrap(0, cards.length, page)

  const paginate = (newDirection) => {
    console.log(page, newDirection)

    setPage([page + newDirection, newDirection])
  }

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
      console.log(seconds)
      setPage([page + 1, 1])
    }, 6000)
    return () => clearInterval(interval)
  }, [page])

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="home">
      <motion.section
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x)

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1)
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1)
          }
        }}
        className="hero"
      >
        {newCards.length > 0 && (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              className="hero-container"
            >
              <div className="hero-text-wrapper">
                <h1 className="hero-title">{newCards[imageIndex]?.title}</h1>
                <h3 className="hero-subtitle">{newCards[imageIndex]?.subtitle}</h3>
                <p className="hero-body">{newCards[imageIndex]?.body}</p>
              </div>
              <div className="carousel">
                <Image
                  src={newCards[imageIndex]?.img}
                  layout="fill"
                  objectPosition="bottom center"
                  objectFit="cover"
                  alt="logo"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="dots-sliderButtons">
          <div className="buttons-wrapper">
            <motion.span
              onClick={() => {
                paginate(-1)
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="slider-button"
            >
              <RightArrow />
            </motion.span>
            <motion.span
              onClick={() => {
                paginate(1)
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="slider-button"
            >
              <LeftArrow />
            </motion.span>
          </div>
          <div className="dots-wrapper">
            {newCards.map((card, index) => {
              return (
                <motion.span
                  key={index}
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.4 }}
                  onClick={() => setPage([index, 1])}
                  className={"dot " + (imageIndex === index ? " active" : "")}
                ></motion.span>
              )
            })}
          </div>
        </div>
      </motion.section>
      <section className="about-work">
        <div className="container">
          <div className="about-work-wrapper">
            <div className="image">
              <Image
                src="/about-work-1.jpg"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
            </div>
            <div className="text-wrapper">
              <h1 className="about-work-title">Lorem ipsum dolor sit.</h1>
              <h3 className="about-work-subtitle">Lorem ipsum dolor sit amet.</h3>
              <p className="about-work-body">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, maxime maiores
                praesentium nobis nostrum est. Consequuntur ad consequatur ipsum dignissimos
                eveniet, temporibus doloremque corrupti est quibusdam non harum quos quia odio,
                aspernatur, minus asperiores libero dolores! Perspiciatis officiis, impedit
                inventore commodi harum quaerat beatae nulla soluta minima laborum voluptas est
                omnis. Ducimus, odio esse. Nam corrupti ad odit, ab magni cupiditate similique sint
                optio velit cumque. Officia sint impedit, molestiae sunt velit reprehenderit,
                doloribus at fugiat cupiditate veritatis fuga, consequatur eum debitis labore
                obcaecati eveniet et officiis aliquid consequuntur atque? Recusandae quas a suscipit
                sint ab ipsam odio et sed.
              </p>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="more-button-wrapper"
              >
                <span className="more-button">Devam Et</span>
                <span className="icon-wrapper">
                  <MoreArrow />
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-work">
        <div className="container">
          <div className="feature-work-wrapper">
            <div className="text-wrapper">
              <h1 className="feature-work-title">Lorem ipsum dolor sit.</h1>
              <h3 className="feature-work-subtitle">Lorem ipsum dolor sit amet.</h3>
              <p className="feature-work-body">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, maxime maiores
                praesentium nobis nostrum est. Consequuntur ad consequatur ipsum dignissimos
                eveniet, temporibus doloremque corrupti est quibusdam non harum quos quia odio,
                aspernatur, minus asperiores libero dolores! Perspiciatis officiis, impedit
                inventore commodi harum quaerat beatae nulla soluta minima laborum voluptas est
                omnis. Ducimus, odio esse. Nam corrupti ad odit, ab magni cupiditate similique sint
                optio velit cumque. Officia sint impedit, molestiae sunt velit reprehenderit,
                doloribus at fugiat cupiditate veritatis fuga, consequatur eum debitis labore
                obcaecati eveniet et officiis aliquid consequuntur atque? Recusandae quas a suscipit
                sint ab ipsam odio et sed.
              </p>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="more-button-wrapper"
              >
                <span className="more-button">Devam Et</span>
                <span className="icon-wrapper">
                  <MoreArrow />
                </span>
              </motion.div>
            </div>
            <div className="image">
              <Image
                src="/about-work-1.jpg"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </section>
      <Gallery />
    </div>
  )
}
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Anasayfa">{page}</Layout>

export default Home
