import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFeature = z.object({
  title: z.string(),
  subtitle: z.string(),
  body: z.string(),
  img: z.string(),
})

export default resolver.pipe(resolver.zod(CreateFeature), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const feature = await db.feature.create({ data: input })

  return feature
})
