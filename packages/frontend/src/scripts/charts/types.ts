import { Milestone } from '@l2beat/config'
import { AssetType } from '@l2beat/shared-pure'
import { z } from 'zod'

export type WithoutTimestamp<T extends number[]> = T extends [
  infer _,
  ...infer Rest,
]
  ? Rest
  : never

export interface AggregateTvlChart {
  type: 'AggregateTvlChart'
  points: {
    x: number
    y: number
    date: string
    usd: number
    eth: number
    milestone?: Milestone
  }[]
}

export interface AggregateDetailedTvlChart {
  type: 'AggregateDetailedTvlChart'
  points: {
    x: number
    y: number
    parts: {
      ebv: number
      cbv: number
      nmv: number
    }
    date: string
    usd: number
    eth: number
    usdParts: {
      ebv: number
      cbv: number
      nmv: number
    }
    ethParts: {
      ebv: number
      cbv: number
      nmv: number
    }
    milestone?: Milestone
  }[]
}

export interface TokenDetailedTvlChart {
  type: 'TokenDetailedTvlChart'
  assetType: AssetType
  points: {
    x: number
    y: number
    date: string
    balance: number
    symbol: string
    usd: number
    milestone?: Milestone
  }[]
}

export interface TokenTvlChart {
  type: 'TokenTvlChart'
  points: {
    x: number
    y: number
    date: string
    balance: number
    symbol: string
    usd: number
    milestone?: Milestone
  }[]
}

export interface ActivityChart {
  type: 'ActivityChart'
  points: {
    x: number
    y: number
    y2: number
    date: string
    tps: number
    ethereumTps: number
    milestone?: Milestone
  }[]
}

const AggregateDetailedTvlChart = z.object({
  types: z.tuple([
    z.literal('timestamp'),
    z.literal('valueUsd'),
    z.literal('cbvUsd'),
    z.literal('ebvUsd'),
    z.literal('nmvUsd'),
    z.literal('valueEth'),
    z.literal('cbvEth'),
    z.literal('ebvEth'),
    z.literal('nmvEth'),
  ]),
  data: z.array(
    z.tuple([
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
    ]),
  ),
})

export type AggregateDetailedTvlResponse = z.infer<
  typeof AggregateDetailedTvlResponse
>
export const AggregateDetailedTvlResponse = z.object({
  hourly: AggregateDetailedTvlChart,
  sixHourly: AggregateDetailedTvlChart,
  daily: AggregateDetailedTvlChart,
})
const TokenTvlChart = z.object({
  types: z.tuple([z.literal('timestamp'), z.string(), z.literal('usd')]),
  data: z.array(z.tuple([z.number(), z.number(), z.number()])),
})

export type CostsChart = z.infer<typeof CostsChart>
const CostsChart = z.object({
  types: z.tuple([
    z.literal('timestamp'),
    z.literal('totalGas'),
    z.literal('totalEth'),
    z.literal('totalUsd'),
    z.literal('overheadGas'),
    z.literal('overheadEth'),
    z.literal('overheadUsd'),
    z.literal('calldataGas'),
    z.literal('calldataEth'),
    z.literal('calldataUsd'),
    z.literal('computeGas'),
    z.literal('computeEth'),
    z.literal('computeUsd'),
    z.literal('blobsGas'),
    z.literal('blobsEth'),
    z.literal('blobsUsd'),
  ]),
  data: z.array(
    z.tuple([
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z
        .number()
        .nullable()
        .transform((x) => x ?? 0),
      z
        .number()
        .nullable()
        .transform((x) => x ?? 0),
      z
        .number()
        .nullable()
        .transform((x) => x ?? 0),
    ]),
  ),
})

export type CostsResponse = z.infer<typeof CostsResponse>
export const CostsResponse = z.object({
  hourly: CostsChart,
  daily: CostsChart,
})

export type TokenTvlResponse = z.infer<typeof TokenTvlResponse>
export const TokenTvlResponse = z.object({
  hourly: TokenTvlChart,
  sixHourly: TokenTvlChart,
  daily: TokenTvlChart,
})

export type ActivityResponse = z.infer<typeof ActivityResponse>
export const ActivityResponse = z.object({
  daily: z.object({
    types: z.tuple([
      z.literal('timestamp'),
      z.literal('transactions'),
      z.literal('ethereumTransactions'),
    ]),
    data: z.array(z.tuple([z.number(), z.number(), z.number()])),
  }),
})

export type Milestones = z.infer<typeof Milestones>
export const Milestones = z.array(
  z.object({
    name: z.string(),
    link: z.string(),
    date: z.string(),
    description: z.optional(z.string()),
  }),
)
export type TokenInfo = z.infer<typeof TokenInfo>
export const TokenInfo = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('regular'),
    projectId: z.string(),
    assetId: z.string(),
    symbol: z.string(),
  }),
  z.object({
    type: z.literal('CBV'),
    projectId: z.string(),
    assetId: z.string(),
    symbol: z.string(),
  }),
  z.object({
    type: z.literal('EBV'),
    projectId: z.string(),
    assetId: z.string(),
    symbol: z.string(),
    chainId: z.number(),
  }),
  z.object({
    type: z.literal('NMV'),
    projectId: z.string(),
    assetId: z.string(),
    symbol: z.string(),
    chainId: z.number(),
  }),
])

export type ChartType = z.infer<typeof ChartType>
export const ChartType = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('scaling-tvl'),
    filteredSlugs: z.string().array().optional(),
  }),
  z.object({
    type: z.literal('scaling-detailed-tvl'),
    filteredSlugs: z.string().array().optional(),
  }),
  z.object({
    type: z.literal('scaling-activity'),
    filteredSlugs: z.string().array().optional(),
  }),
  z.object({
    type: z.literal('scaling-costs'),
  }),
  z.object({ type: z.literal('bridges-tvl'), includeCanonical: z.boolean() }),
  z.object({
    type: z.literal('project-tvl'),
    slug: z.string(),
    compareWith: z.string().array().optional(),
  }),
  z.object({
    type: z.literal('project-token-tvl'),
    info: TokenInfo,
  }),
  z.object({
    type: z.literal('project-detailed-tvl'),
    slug: z.string(),
    compareWith: z.string().array().optional(),
  }),
  z.object({
    type: z.literal('project-costs'),
    slug: z.string(),
    compareWith: z.string().array().optional(),
  }),
  z.object({
    type: z.literal('project-activity'),
    slug: z.string(),
    compareWith: z.string().array().optional(),
  }),
  z.object({ type: z.literal('storybook-fake-tvl') }),
  z.object({ type: z.literal('storybook-fake-activity') }),
  z.object({ type: z.literal('storybook-fake-detailed-tvl') }),
  z.object({ type: z.literal('storybook-fake-costs') }),
])
