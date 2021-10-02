import { Image, Link, useQuery, usePaginatedQuery, useRouter } from "blitz"
import { motion, AnimatePresence } from "framer-motion"
import { ReactComponent as Look } from "../../../../public/search.svg"
import { ReactComponent as Left } from "../../../../public/photo-left.svg"
import { ReactComponent as Right } from "../../../../public/photo-right.svg"
import { ReactComponent as Close } from "../../../../public/close.svg"
import { ReactComponent as MoreArrow } from "../../../../public/more-arrow.svg"
import { useState } from "react"
import getGalleries from "app/galleries/queries/getGalleries"

const ITEMS_PER_PAGE = 6

const Gallery = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ galleries, hasMore }] = usePaginatedQuery(getGalleries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  // const [{ galleries }, { refetch }] = useQuery(getGalleries, {
  //   orderBy: { id: "asc" },
  // })
  // console.log(galleries)

  const [[showPhoto, url], setShowPhoto] = useState([false, "defalult"])
  return (
    <>
      <section className="gallery">
        <div className="container">
          <div className="images-wrapper-1">
            {galleries.map((image) => (
              <div className="image">
                <Image
                  src={image.img}
                  layout="fill"
                  // objectPosition="bottom center"
                  objectFit="cover"
                  alt="logo"
                />
                <div className="look-wrapper" onClick={() => setShowPhoto([true, image.img])}>
                  <span className="look">
                    <Look />
                  </span>
                </div>
              </div>
            ))}

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
      </section>
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            onClick={(e) => {
              if (e.currentTarget === e.target) {
                setShowPhoto([false, "default"])
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
              onClick={() => setShowPhoto([false, "default"])}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              className="close"
            >
              <Close />
            </motion.span>
            <div className="image">
              <Image src={url} layout="fill" objectPosition="center" objectFit="cover" alt="logo" />
            </div>
            <motion.span whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.2 }} className="left">
              <Left />
            </motion.span>
            <motion.span whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.2 }} className="right">
              <Right />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
