import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateFeature = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  body: z.string(),
  img: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateFeature),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const feature = await db.feature.update({ where: { id }, data })

    return feature
  }
)
