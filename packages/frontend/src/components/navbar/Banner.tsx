import React from 'react'

import { ArrowRightIcon } from '../icons'

export function Banner() {
  return (
    <a
      className="group block bg-[#00695D] px-2 py-1.5 text-center text-xs font-medium text-white sm:px-4"
      href="https://explorer.gitcoin.co/#/round/137/0xa1d52f9b5339792651861329a046dd912761e9a9/0xa1d52f9b5339792651861329a046dd912761e9a9-15"
      target="_blank"
    >
      <span className="hidden xs:inline">L2BEAT is participating in </span>
      Gitcoin Grants 20!
      <span className="ml-2 group-hover:underline">
        Donate here
        <ArrowRightIcon className="relative -top-px ml-1 inline-block size-3" />
      </span>
    </a>
  )
}
