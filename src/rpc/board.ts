import { Board, PrismaClient } from '@prisma/client'
import { getSession } from '@solid-auth/next'
import { createServerAction$ } from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'

const prisma = new PrismaClient()

export const useBoardRPC = () => {
  type CreatePayload = Pick<Board, 'name' | 'description'>

  const createBoard = createServerAction$<CreatePayload, Board>(async ({ name, description }: CreatePayload, { request }) => {
    const { user_id }: any = await getSession(request, authOpts)
    return await prisma.board.create({ data: { user_id, name, description } })
  })

  const getBoards = createServerAction$<any, Board[]>(async (args, { request }) => {
    return await prisma.board.findMany()
  })

  type SearchBoardsPayload = { search: string; limit: number; page: number }

  const searchBoards = createServerAction$<SearchBoardsPayload, Board[]>(async (args: SearchBoardsPayload, { request }) => {
    const skip = args.page * args.limit

    const where = args.search && {
      OR: [
          { name: { contains: args.search }},
          { description: { contains: args.search }},
      ]
    }

    return (await prisma.board.findMany({
      where: where as any,
      skip,
      take: args.limit,
    })) as any
  })

  return { searchBoards, getBoards, createBoard }
}
