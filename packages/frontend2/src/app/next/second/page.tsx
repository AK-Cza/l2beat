import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { api } from '~/trpc/server'
import { HelloClient } from '../_components/hello-client'
import Link from 'next/link'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default async function Page() {
  const t = await getTranslations('Example')
  const result = await api.example.hello({ text: t('serverComponent') })

  return (
    <main className="flex flex-col h-screen items-center justify-center text-xl">
      <div>Second page</div>
      <div>{result.greeting}</div>
      <HelloClient text={t('clientComponent')} />
      <div>
        <Link href="/next/first">Go to first page</Link>
      </div>
    </main>
  )
}