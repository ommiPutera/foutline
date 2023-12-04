import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {
  const users = [
    await prisma.user.create({
      data: {
        email: 'omiputrakarunia@gmail.com',
        username: 'Ommi',
        fullName: 'Ommi Putera',
        role: 'OWNER',
        passwordHash:
          '$2a$10$Y632TQG4s/MdTmIBjHl3..YlKO5CtiFnOmRHP6McJyyh9DPPoz/9e',
      },
    }),
  ]
  return Promise.all(users)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
