import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAboutus = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  body: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateAboutus),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const aboutus = await db.aboutus.update({ where: { id }, data })

    return aboutus
  }
)
