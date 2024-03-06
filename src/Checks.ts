import { ponder } from '@/generated'

ponder.on('Checks:Transfer', async ({ event, context }) => {
  const { client } = context
  const { Checks } = context.contracts
  const { Check, Account } = context.db

  await Promise.all([
    await Account.upsert({ id: event.args.from }),
    await Account.upsert({ id: event.args.to }),
  ])

  const check = await client.readContract({
    abi: Checks.abi,
    address: Checks.address,
    functionName: `getCheck`,
    args: [event.args.tokenId],
  })

  await Check.upsert({
    id: event.args.tokenId,
    create: {
      ownerId: event.args.to,
      migratedAt: event.block.timestamp,
      epoch: check.stored.epoch,
      isRevealed: check.isRevealed,
    },
    update: {
      ownerId: event.args.to,
    }
  })
})

ponder.on('Checks:NewEpoch', async ({ event, context }) => {
  const { client } = context
  const { Checks } = context.contracts
  const { Check } = context.db

  const checksInEpoch = await Check.findMany({
    where: {
      epoch: Number(event.args.epoch),
    }
  })

  for (const check of checksInEpoch.items) {
    const svg = await client.readContract({
      abi: Checks.abi,
      address: Checks.address,
      functionName: `svg`,
      args: [check.id],
      blockNumber: event.args.revealBlock,
    })

    await Check.update({
      id: check.id,
      data: {
        svg
      }
    })
  }
})
