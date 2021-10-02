import { BlitzPage, Image, useQuery } from "blitz"
import { ReactComponent as AboutPage1 } from "../../public/about-page-1.svg"
import Layout from "app/core/layouts/Layout"
import Gallery from "app/core/components/common/Gallery"
import getAboutuses from "app/aboutuses/queries/getAboutuses"

const About: BlitzPage = () => {
  const [{ aboutuses }] = useQuery(getAboutuses, {
    orderBy: { id: "asc" },
  })

  return (
    <div className="about">
      {aboutuses.map((item) => (
        <section className="part">
          <div className="container">
            <div className="text-part">
              <h1 className="title">{item.title}</h1>
              <h3 className="subtitle">{item.subtitle}</h3>
              <p className="body" dangerouslySetInnerHTML={{ __html: item.body }}></p>
            </div>
            <div className="image-part">
              <object>
                <AboutPage1 />
              </object>
            </div>
          </div>
        </section>
      ))}

      <Gallery />
    </div>
  )
}

About.suppressFirstRenderFlicker = true
About.getLayout = (page) => <Layout title="Hakkımızda">{page}</Layout>

export default About
