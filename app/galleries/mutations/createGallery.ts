import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateGallery = z.object({
  img: z.string(),
})

export default resolver.pipe(resolver.zod(CreateGallery), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const gallery = await db.gallery.create({ data: input })

  return gallery
})
