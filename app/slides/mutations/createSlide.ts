import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSlide = z.object({
  title: z.string(),
  subtitle: z.string(),
  img: z.string(),
  body: z.string(),
})

export default resolver.pipe(resolver.zod(CreateSlide), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const slide = await db.slide.create({ data: input })

  return slide
})
