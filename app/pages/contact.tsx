import { BlitzPage, Image, useQuery } from "blitz"
import { ReactComponent as ContactSvg } from "../../public/contact.svg"
import Layout from "app/core/layouts/Layout"
import Gallery from "app/core/components/common/Gallery"
import getContacts from "app/contacts/queries/getContacts"

const Contact: BlitzPage = () => {
  const [{ contacts }, { refetch }] = useQuery(getContacts, {
    orderBy: { id: "asc" },
  })
  const contact = contacts[0]
  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="container">
          <div className="text">
            <h1 className="title">BİZİMLE İLETİŞİME GEÇİN</h1>
            <div className="text-wrapper">
              <h3 className="subtitle">Tel</h3>
              <p className="body">
                <a className="body" href={`tel:${contact.phone}`}>
                  {contact.phone}
                </a>
              </p>
              <h3 className="subtitle">Email</h3>
              <p className="body">
                <a className="body" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
              <h3 className="subtitle">Instagram</h3>
              <p className="body">
                <a className="body" href={contact.instagram}>
                  {contact.instagram}
                </a>
              </p>
              <h3 className="subtitle">Facebook</h3>
              <p className="body">
                <a className="body" href={contact.facebook}>
                  {contact.facebook}
                </a>
              </p>
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
