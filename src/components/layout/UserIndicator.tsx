import { getSession } from '@solid-auth/next'
import { createServerData$ } from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'
import { Match, Switch, createEffect } from 'solid-js'
import LoginAvatar from './LoginAvatar'
import UserAvatar from './UserAvatar'

export const useSession = () => {
  return createServerData$(
    async (_, { request }) => {
      return await getSession(request, authOpts)
    },
    { key: () => ['auth_user'] }
  )
}

const UserIndicator = () => {
  const session = useSession()

  createEffect(() => {
    const test = session()
    console.log(test)
  })

  return (
    <Switch>
      <Match when={session() == null}>
        <LoginAvatar />
      </Match>
      <Match when={session() != null}>
        <UserAvatar session={session()!} />
      </Match>
    </Switch>
  )
}

export default UserIndicator
