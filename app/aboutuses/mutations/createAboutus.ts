import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAboutus = z.object({
  title: z.string(),
  subtitle: z.string(),
  body: z.string(),
})

export default resolver.pipe(resolver.zod(CreateAboutus), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const aboutus = await db.aboutus.create({ data: input })

  return aboutus
})
