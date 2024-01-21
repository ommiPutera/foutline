import type { PostType } from "@prisma/client";

export function getPostType(type: PostType) {
  let typeName;
  switch (type) {
    case 'MONTHLY_PLANNING':
      typeName = 'monthly'
      break;
    case 'BASIC_NOTES':
      typeName = 'basic'
      break;
  }

  return typeName
}