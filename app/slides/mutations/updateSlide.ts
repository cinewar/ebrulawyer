import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSlide = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  img: z.string(),
  body: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSlide),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const slide = await db.slide.update({ where: { id }, data })

    return slide
  }
)
