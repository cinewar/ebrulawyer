import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetFeature = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetFeature), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const feature = await db.feature.findFirst({ where: { id } })

  if (!feature) throw new NotFoundError()

  return feature
})
