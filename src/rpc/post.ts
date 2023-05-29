import { Post, PrismaClient } from '@prisma/client'
import { getSession } from '@solid-auth/next'
import { createServerAction$ } from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'

const prisma = new PrismaClient()

export const usePostRPC = () => {
  type CreatePayload = Pick<Post, 'board_name' | 'title' | 'content'>

  const createPost = createServerAction$<CreatePayload, Post>(async ({ board_name, title, content }: CreatePayload, { request }) => {
    const { user_id }: any = await getSession(request, authOpts)
    return await prisma.post.create({ data: { user_id, board_name, title, content } })
  })


  return { createPost }
}
