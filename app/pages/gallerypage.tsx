import { BlitzPage, Image, useQuery } from "blitz"
import { ReactComponent as ContactSvg } from "../../public/contact.svg"
import { ReactComponent as Look } from "../../public/search.svg"

import Layout from "app/core/layouts/Layout"
import getGalleries from "app/galleries/queries/getGalleries"
import { useRecoilState } from "recoil"
import { photoUrl, showPhoto } from "utils/global"

const GalleryPage: BlitzPage = () => {
  const [{ galleries }, { refetch }] = useQuery(getGalleries, {
    orderBy: { id: "asc" },
  })

  const [currentShowPhoto, setShowPhoto] = useRecoilState(showPhoto)
  const [currentUrl, setCurrentUrl] = useRecoilState(photoUrl)

  return (
    <div className="gallerypage">
      <section className="container">
        <div className="wrapper">
          {galleries.map((img) => (
            <div className="image">
              <Image
                src={img.img}
                layout="fill"
                // objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div
                className="look-wrapper"
                onClick={() => {
                  setShowPhoto(true)
                  setCurrentUrl(img.img)
                }}
              >
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

GalleryPage.suppressFirstRenderFlicker = true
GalleryPage.getLayout = (page) => <Layout title="İletişim">{page}</Layout>

export default GalleryPage
