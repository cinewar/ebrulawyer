import { Image, Link, useQuery, useRouter } from "blitz"
import { motion, AnimatePresence } from "framer-motion"
import { ReactComponent as Look } from "../../../../public/search.svg"
import { ReactComponent as Left } from "../../../../public/photo-left.svg"
import { ReactComponent as Right } from "../../../../public/photo-right.svg"
import { ReactComponent as Close } from "../../../../public/close.svg"
import { ReactComponent as MoreArrow } from "../../../../public/more-arrow.svg"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import getGalleries from "app/galleries/queries/getGalleries"
import _ from "lodash"
import { useRecoilState } from "recoil"
import { photoUrl, showPhoto } from "utils/global"

const Gallery = () => {
  const router = useRouter()

  const [{ galleries }, { refetch }] = useQuery(getGalleries, {
    orderBy: { id: "asc" },
  })

  useEffect(() => {
    setImages(galleries.slice(0, 6))
  }, [galleries])

  const [images, setImages] = useState<any>([])

  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1)
      setImages(_.shuffle(galleries).slice(0, 6))
    }, 6000)

    return () => clearInterval(interval)
  }, [count])

  const [currentShowPhoto, setShowPhoto] = useRecoilState(showPhoto)
  const [currentUrl, setCurrentUrl] = useRecoilState(photoUrl)
  return (
    <>
      <section className="gallery">
        <div className="container">
          <div className="images-wrapper-1">
            {images.map((image, index) => (
              <motion.div
                key={count + image.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1 },
                }}
                className="image"
              >
                <Image
                  src={image.img}
                  layout="fill"
                  // objectPosition="bottom center"
                  objectFit="cover"
                  alt="logo"
                />
                <div
                  className="look-wrapper"
                  onClick={() => {
                    setShowPhoto(true)
                    setCurrentUrl(image.img)
                  }}
                >
                  <span className="look">
                    <Look />
                  </span>
                </div>
              </motion.div>
            ))}

            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="more-button-wrapper"
              onClick={() => router.push("/gallerypage")}
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
    </>
  )
}

export default Gallery
