import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAboutusesInput
  extends Pick<Prisma.AboutusFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAboutusesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: aboutuses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.aboutus.count({ where }),
      query: (paginateArgs) => db.aboutus.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      aboutuses,
      nextPage,
      hasMore,
      count,
    }
  }
)
