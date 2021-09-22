import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSlide = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteSlide), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const slide = await db.slide.deleteMany({ where: { id } })

  return slide
})
