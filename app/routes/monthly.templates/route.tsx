import {type ActionFunction} from '@remix-run/node'

import {getUser} from '~/utils/session.server.ts'

import {PageIndex} from './page-index.tsx'
import {createPost} from './queries.ts'
import {previewTemp1, previewTemp2, temp1, temp2} from './resource.tsx'

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
    case 'temp1':
      content = temp1
      preview = previewTemp1
      break
    case 'temp2':
      content = temp2
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
