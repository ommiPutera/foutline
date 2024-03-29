import {type LoaderFunctionArgs} from '@remix-run/node'
import {prisma} from '~/utils/prisma.server.ts'

export async function loader({request}: LoaderFunctionArgs) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

  try {
    await Promise.all([
      prisma.user.count(),
      fetch(`${new URL(request.url).protocol}${host}`, {method: 'HEAD'}).then(
        r => {
          if (!r.ok) return Promise.reject(r)
        },
      ),
    ])
    return new Response('OK')
  } catch (error: unknown) {
    console.error(request.url, 'healthcheck ❌', {error})
    return new Response('ERROR', {status: 500})
  }
}
