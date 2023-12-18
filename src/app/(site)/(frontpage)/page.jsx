import getMetaObject from '@/lib/getMetaObject'
import getFrontpageData from '@/lib/fetch/getFrontpageData'
import { Hero } from '@/components/sections'
import ContentBlocks from '@/components/global/ContentBlocks'

export async function generateMetadata() {
  const data = await getFrontpageData()
  return getMetaObject(data?.seo)
}

export default async function Home() {
  const data = await getFrontpageData()

  return (
    <main>
      {data?.hero && <Hero data={data.hero} />}
      {data?.contentBlocks && <ContentBlocks blocks={data.contentBlocks} />}
    </main>
  )
}
