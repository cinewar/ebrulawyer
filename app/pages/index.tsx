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
import { useQuery } from "blitz"
import getSlides from "app/slides/queries/getSlides"
import getFeatures from "app/features/queries/getFeatures"

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

  const [{ slides }] = useQuery(getSlides, {
    orderBy: { id: "asc" },
  })

  useEffect(() => {
    setnewCards(slides)
  }, [])

  const [{ features }] = useQuery(getFeatures, {
    orderBy: { id: "asc" },
  })

  const imageIndex = wrap(0, slides.length, page)

  const paginate = (newDirection) => {
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
                <h2 className="hero-subtitle">{newCards[imageIndex]?.subtitle}</h2>
                <p
                  className="hero-body"
                  dangerouslySetInnerHTML={{ __html: newCards[imageIndex]?.body }}
                ></p>
              </div>
              <div className="carousel">
                <Image
                  src={newCards[imageIndex]?.img}
                  layout="fill"
                  objectPosition="bottom center"
                  objectFit="cover"
                  alt={newCards[imageIndex]?.id}
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
      {features.map((feature) => (
        <>
          <section className="work">
            <div className="container">
              <div className="wrapper">
                <div className="image">
                  <Image
                    src={feature.img}
                    layout="fill"
                    objectPosition="bottom center"
                    objectFit="cover"
                    alt="logo"
                  />
                </div>
                <div className="text-wrapper">
                  <h1 className="title">{feature.title}</h1>
                  <h2 className="subtitle">{feature.subtitle}</h2>
                  <p className="body" dangerouslySetInnerHTML={{ __html: feature.body }}></p>
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
        </>
      ))}
      <Gallery />
    </div>
  )
}
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Anasayfa">{page}</Layout>

export default Home
