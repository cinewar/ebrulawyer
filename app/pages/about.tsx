import { BlitzPage, Image, useQuery } from "blitz"
import { ReactComponent as AboutPage1 } from "../../public/about-page-1.svg"
import Layout from "app/core/layouts/Layout"
import Gallery from "app/core/components/common/Gallery"

const About: BlitzPage = () => {
  return (
    <div className="about">
      <section className="hero-section">
        <div className="container">
          <div className="text-part">
            <h1 className="title">Lorem ipsum dolor</h1>
            <h3 className="subtitle">Lorem ipsum dolor sit amet adipiscing elit.</h3>
            <p className="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum,
              condimentum feugiat ullamcorper aliquet luctus. Bibendum consectetur malesuada non
              nulla amet, urna, mattis. In tortor enim elementum venenatis turpis. Mattis dui
              volutpat urna magna non tristique. Suspendisse fermentum, condimentum feugiat
              ullamcorper aliquet luctus. Bibendum consectetur malesuada non nulla amet, urna,
              mattis. In tortor enim elementum venenatis turpis.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Suspendisse fermentum, condimentum feugiat ullamcorper
              aliquet luctus. Bibendum consectetur malesuada non nulla amet, urna, mattis. In tortor
              enim elementum venenatis turpis. Mattis dui volutpat urna magna non tristique.
              Suspendisse fermentum, condimentum feugiat ullamcorper aliquet luctus.
            </p>
          </div>
          <div className="image-part">
            <object>
              <AboutPage1 />
            </object>
          </div>
        </div>
      </section>
      <section className="part-2">
        <div className="container">
          <div className="image-part">
            <AboutPage1 />
          </div>
          <div className="text-part">
            <h1 className="title">Lorem ipsum dolor</h1>
            <h3 className="subtitle">Lorem ipsum dolor sit amet adipiscing elit.</h3>
            <p className="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum,
              condimentum feugiat ullamcorper aliquet luctus. Bibendum consectetur malesuada non
              nulla amet, urna, mattis. In tortor enim elementum venenatis turpis. Mattis dui
              volutpat urna magna non tristique. Suspendisse fermentum, condimentum feugiat
              ullamcorper aliquet luctus. Bibendum consectetur malesuada non nulla amet, urna,
              mattis. In tortor enim elementum venenatis turpis.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Suspendisse fermentum, condimentum feugiat ullamcorper
              aliquet luctus. Bibendum consectetur malesuada non nulla amet, urna, mattis. In tortor
              enim elementum venenatis turpis. Mattis dui volutpat urna magna non tristique.
              Suspendisse fermentum, condimentum feugiat ullamcorper aliquet luctus.
            </p>
          </div>
        </div>
      </section>
      <section className="part-3">
        <div className="container">
          <div className="text-part">
            <h1 className="title">Lorem ipsum dolor</h1>
            <h3 className="subtitle">Lorem ipsum dolor sit amet adipiscing elit.</h3>
            <p className="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum,
              condimentum feugiat ullamcorper aliquet luctus. Bibendum consectetur malesuada non
              nulla amet, urna, mattis. In tortor enim elementum venenatis turpis. Mattis dui
              volutpat urna magna non tristique. Suspendisse fermentum, condimentum feugiat
              ullamcorper aliquet luctus. Bibendum consectetur malesuada non nulla amet, urna,
              mattis. In tortor enim elementum venenatis turpis.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Suspendisse fermentum, condimentum feugiat ullamcorper
              aliquet luctus. Bibendum consectetur malesuada non nulla amet, urna, mattis. In tortor
              enim elementum venenatis turpis. Mattis dui volutpat urna magna non tristique.
              Suspendisse fermentum, condimentum feugiat ullamcorper aliquet luctus.
            </p>
          </div>
          <div className="image-part">
            <AboutPage1 />
          </div>
        </div>
      </section>
      <Gallery />
    </div>
  )
}

About.suppressFirstRenderFlicker = true
About.getLayout = (page) => <Layout title="Hakkımızda">{page}</Layout>

export default About
