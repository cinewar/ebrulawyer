import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetGalleriesInput
  extends Pick<Prisma.GalleryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGalleriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: galleries,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.gallery.count({ where }),
      query: (paginateArgs) => db.gallery.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      galleries,
      nextPage,
      hasMore,
      count,
    }
  }
)
