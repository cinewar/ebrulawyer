import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteGallery = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteGallery), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const gallery = await db.gallery.deleteMany({ where: { id } })

  return gallery
})
