import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const customerData: Prisma.CustomerCreateInput[] = [
  {
    id: 1,
    email: 'nawinto99@nawinto99.io',
    name: 'Naveen Thurimerla',
    first_name: 'Naveen',
    last_name: 'Thurimerla',
    orders_count: 10,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of customerData) {
    const customer = await prisma.customer.create({
      data: u,
    })
    console.log(`Created Customer with id: ${customer.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
