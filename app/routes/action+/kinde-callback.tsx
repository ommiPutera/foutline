import {type LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from 'react-router'
import {emitter} from '~/utils/emitter.server.ts'
import {
  commitSession,
  destroySession,
  findUser,
  getSessionManager,
  kindeClient,
  sessionIdKey,
} from '~/utils/session.server.ts'
import {createSession, createWelcomeCard} from '~/utils/prisma.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session, signUp} = await getSessionManager(request)
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
      const user = await signUp({
        fullName: kindeUser.given_name + ' ' + kindeUser.family_name,
        email: kindeUser.email,
        username: kindeUser.given_name,
        kindeId: kindeUser.id,
        request: request,
      })

      const userSession = await createSession({userId: user?.id})
      const post = await createWelcomeCard(user?.id, user?.fullName)

      session.set(sessionIdKey, userSession.id)
      return redirect('/note/' + post.id, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      })
    }

    if (!user) {
      return redirect('/', {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      })
    }

    const userSession = await createSession({userId: user.id})
    session.set(sessionIdKey, userSession.id)
    emitter.emit('kinde-callback')
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  } catch (err) {
    emitter.emit('kinde-callback')
    return redirect('/', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    })
  }
}

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const { sessionManager, session } = await getSessionManager(request)
//   try {
//     await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url))
//     const kindeUser = await kindeClient.getUser(sessionManager)
//     if (
//       typeof kindeUser.family_name !== 'string' ||
//       typeof kindeUser.given_name !== 'string' ||
//       typeof kindeUser.email !== 'string' ||
//       typeof kindeUser.id !== 'string'
//     ) {
//       throw new Error('Something went wrong')
//     }

//     const user = await findUser(kindeUser.email)
//     // if (kindeUser.id !== user?.kindeId) {
//     //   await signUp({
//     //     fullName: kindeUser.given_name + ' ' + kindeUser.family_name,
//     //     email: kindeUser.email,
//     //     username: kindeUser.given_name,
//     //     kindeId: kindeUser.id,
//     //   })
//     //   emitter.emit('kinde-callback')
//     //   return redirect('/', {
//     //     headers: {
//     //       'Set-Cookie': await sessionStorage.commitSession(session),
//     //     },
//     //   })
//     // }

//     if (!user) return redirect('/')
//     await signIn(user.id, request)
//     emitter.emit('kinde-callback')
//     return redirect('/', {
//       headers: {
//         'Set-Cookie': await commitSession(session),
//       },
//     })
//   } catch (err) {
//     emitter.emit('kinde-callback')
//     return redirect('/')
//   }
// }
