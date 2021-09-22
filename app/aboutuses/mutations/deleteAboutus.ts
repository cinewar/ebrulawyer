import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAboutus = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteAboutus), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const aboutus = await db.aboutus.deleteMany({ where: { id } })

  return aboutus
})
