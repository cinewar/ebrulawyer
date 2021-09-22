import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAboutus = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAboutus), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const aboutus = await db.aboutus.findFirst({ where: { id } })

  if (!aboutus) throw new NotFoundError()

  return aboutus
})
