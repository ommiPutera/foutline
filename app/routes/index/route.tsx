import Landing from '~/components/landing/index.tsx'
import {type DataFunctionArgs, redirect} from '@remix-run/node'
import {getUser} from '~/utils/session.server.ts'
import type {Post} from '@prisma/client'

export type LoaderData = {
  posts: Post[] | null
}

export async function loader({request}: DataFunctionArgs) {
  const user = await getUser(request)
  if (user) return redirect('/home')
  return '/'
}

function Index() {
  return <Landing />
}

export default Index
