import {type ActionFunction} from '@remix-run/node'

import {getUser} from '~/utils/session.server.ts'

import {PageIndex} from './page-index.tsx'
import {createPost} from './queries.ts'
import {preview_t_empty, t_empty} from './resource.tsx'

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()

  const user = await getUser(request)
  if (!user) return {formError: 'invalid'}

  const {templateId} = Object.fromEntries(formData)

  if (typeof templateId !== 'string') {
    return {formError: `Form not submitted correctly.`}
  }

  let content
  let preview

  switch (templateId) {
    case 't_empty':
      content = t_empty
      preview = preview_t_empty
      break
  }

  return await createPost({
    title: 'tanpa judul',
    authorId: user.id,
    isPublished: true,
    content,
    preview,
    type: 'BASIC_NOTES',
    redirectTo: '/note/',
  })
}

export {PageIndex as default}
