import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Account: p.createTable({
    id: p.string(),
  }),
  Check: p.createTable({
    id: p.bigint(),
    ownerId: p.string().references('Account.id'),
    owner: p.one('ownerId'),
    seed: p.string().optional(),
    isRevealed: p.boolean(),
    checksCount: p.int().optional(),
    svg: p.string().optional(),
    epoch: p.int(),
    gradient: p.int().optional(),
    colorBand: p.int().optional(),
    direction: p.int().optional(),
    speed: p.int().optional(),
    composite: p.string().optional(),
    composites: p.string().list().optional(),
    migratedAt: p.bigint(),
    revealedAt: p.bigint().optional(),
  }),
}))
