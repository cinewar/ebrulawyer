import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateContact = z.object({
  id: z.number(),
  email: z.string(),
  instagram: z.string(),
  facebook: z.string(),
  phone: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateContact),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const contact = await db.contact.update({ where: { id }, data })

    return contact
  }
)
