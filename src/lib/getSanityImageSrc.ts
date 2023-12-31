type getSanityImageSrcProps = {
  imageObj: {
    asset: {
      url: string
    }
    hotspot: {
      x: number
      y: number
    }
  }
  width: number
  height: number
}

export default function getSanityImageSrc({
  imageObj,
  width,
  height,
}: getSanityImageSrcProps): string {
  const { hotspot, asset } = imageObj
  const hotspotParams = hotspot ? `&fp-x=${hotspot.x}&fp-y=${hotspot.y}` : ''
  const src = `${asset.url}?w=${width}&h=${height}&fit=crop&dpr=2&q=100${hotspotParams}`
  return src
}
