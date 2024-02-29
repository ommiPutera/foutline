import {type ActionFunction} from '@remix-run/node'

import {getUser} from '~/utils/session.server.ts'

import {PageIndex} from './page-index.tsx'
import {createPost} from './queries.ts'
import {
  previewTemp1,
  previewTemp2,
  t_empty,
  full_time_job,
} from './resource.tsx'

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
      preview = previewTemp1
      break
    case 'full_time_job':
      content = full_time_job
      preview = previewTemp2
      break
  }

  return await createPost({
    title: 'tanpa judul',
    authorId: user.id,
    isPublished: true,
    content,
    preview,
    type: 'MONTHLY_PLANNING',
    redirectTo: '/monthly/',
  })
}

export {PageIndex as default}
