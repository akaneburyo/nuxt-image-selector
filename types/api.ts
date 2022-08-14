export type Image = {
  id: string
  raw?: File
  order: number
  previewUrl: string
}

export type PostOrdersRequest = {
  images: Omit<Image, 'raw' | 'previewUrl'>[]
}

export type PostNewImageRequestKeys = 'id' | 'raw'
export interface PostNewImageRequest extends FormData {
  append(name: PostNewImageRequestKeys, value: string | File): void
}

// json
export type DeleteImageRequest = {
  id: string
}
