import {type LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from 'react-router'
import {emitter} from '~/utils/emitter.server.ts'
import {
  getSessionManager,
  kindeClient,
  sessionStorage,
  findUser,
} from '~/utils/kinde.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session, signUp, signIn} =
    await getSessionManager(request)
  try {
    await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url))
    const kindeUser = await kindeClient.getUser(sessionManager)
    if (
      typeof kindeUser.family_name !== 'string' ||
      typeof kindeUser.given_name !== 'string' ||
      typeof kindeUser.email !== 'string' ||
      typeof kindeUser.id !== 'string'
    ) {
      throw new Error('Something went wrong')
    }

    const user = await findUser(kindeUser.email)
    if (kindeUser.id !== user?.kindeId) {
      await signUp({
        fullName: kindeUser.given_name + ' ' + kindeUser.family_name,
        email: kindeUser.email,
        username: kindeUser.given_name,
        kindeId: kindeUser.id,
      })
      emitter.emit('kinde-callback')
      return redirect('/', {
        headers: {
          'Set-Cookie': await sessionStorage.commitSession(session),
        },
      })
    }

    if (!user) return redirect('/')
    await signIn({id: user.id})
    emitter.emit('kinde-callback')
    return redirect('/', {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    })
  } catch (err) {
    emitter.emit('kinde-callback')
    return redirect('/')
  }
}
