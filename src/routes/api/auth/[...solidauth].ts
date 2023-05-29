import { SolidAuth, type SolidAuthConfig } from '@solid-auth/next'
import GitHub from '@auth/core/providers/github'
import { AdapterUser } from '@auth/core/adapters'
import { PrismaClient } from '@prisma/client'

const initUser = async ({ id, name, email }: AdapterUser) => {
  const prisma = new PrismaClient()
  try {
    const exists = await prisma.user.findUnique({ where: { id } })

    if (exists != null) {
      return
    }

    const payload: any = { id, name, email }

    await prisma.user.create({
      data: payload as any,
    })
  } catch (err: any) {
    console.warn(err)
  }
}

export const authOpts: SolidAuthConfig = {
  debug: false,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        initUser(user as AdapterUser)
      }
      return Promise.resolve(token)
    },
    session: async ({ session, token }: any) => {
      return Promise.resolve({ ...session, user_id: token.sub })
    },
  },
}

export const { GET, POST } = SolidAuth(authOpts)
