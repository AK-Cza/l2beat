import { bugless } from './bugless'
import { dcamonster } from './dcamonster'
import { degen } from './degen'
import { deri } from './deri'
import { mxc } from './mxc'
import { orb3 } from './orb3'
import { popapex } from './popapex'
import { rari } from './rari'
import { stack } from './stack'
import { syndicateframe } from './syndicateframe'
import { Layer3 } from './types'
import { teva } from './teva'
import { xai } from './xai'
import { zklinknova } from './zkLinkNova'

export * from './types'

export const layer3s: Layer3[] = [
  bugless,
  degen,
  dcamonster,
  deri,
  rari,
  zklinknova,
  teva,
  xai,
  orb3,
  popapex,
  stack,
  syndicateframe,
  mxc,
]
