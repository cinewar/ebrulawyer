import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateGallery = z.object({
  id: z.number(),
  img: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateGallery),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const gallery = await db.gallery.update({ where: { id }, data })

    return gallery
  }
)
