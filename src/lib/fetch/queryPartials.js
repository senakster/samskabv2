import { groq } from 'next-sanity'
export const docReferencePathQuery = groq`
  _type == "frontpage" => {
    'path': "/"
  },

  _type == "page" => {
    'path': slug.current,
    defined(parent->slug.current) => {
      'path': parent->slug.current + "/" + slug.current
    },
    defined(parent->parent->slug.current) => {
      'path': parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current
    }
  }
`
export const portableTextQuery = groq`
text[] {
  ...,
  markDefs[] {
    ...,
    _type == 'internalLink' => {
      ...,
      ...reference->{
        ${docReferencePathQuery}
      }
    },
  },
}`
export const heroQuery = groq`
hero {
  ...,
  image {
    ...,
    asset->,
  }
}
`

export const sectionsQuery = groq`
sections[]{
  ...,

  // Text Block
  _type == 'textSection' => {
    ${portableTextQuery},
  },

  // TextImage
  _type == 'textImage' => {
    ...,
    textSection {
      ${portableTextQuery},
    },
    image {
      ...,
      asset->,
    },
  },

  // MainImage
  _type == 'mainImage' => {
    ...,
    asset->
  },
}
`
