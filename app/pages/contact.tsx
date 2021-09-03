import { BlitzPage, Image, useQuery } from "blitz"
import { ReactComponent as ContactSvg } from "../../public/contact.svg"
import Layout from "app/core/layouts/Layout"
import Gallery from "app/core/components/common/Gallery"

const Contact: BlitzPage = () => {
  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="container">
          <div className="text">
            <h1 className="title">BİZİMLE İLETİŞİME GEÇİN</h1>
            <div className="text-wrapper">
              <h3 className="subtitle">Tel</h3>
              <p className="body">555 555 55 55</p>
              <h3 className="subtitle">Email</h3>
              <p className="body">ebru@gmail.com</p>
              <h3 className="subtitle">Instagram</h3>
              <p className="body">ebru@instagram.com</p>
              <h3 className="subtitle">Facebook</h3>
              <p className="body">ebru@facebook.com</p>
            </div>
          </div>
          <div className="img">
            <ContactSvg />
          </div>
        </div>
      </section>
      <Gallery />
    </div>
  )
}

Contact.suppressFirstRenderFlicker = true
Contact.getLayout = (page) => <Layout title="İletişim">{page}</Layout>

export default Contact
