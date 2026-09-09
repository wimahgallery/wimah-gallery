import ImageKit from "@imagekit/nodejs"

let _client: ImageKit | null = null

function getClient(): ImageKit {
  if (!_client) {
    _client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    })
  }
  return _client
}

export async function uploadImage(
  file: Buffer,
  fileName: string,
  folder = "testimonials"
) {
  const client = getClient()

  const base64 = file.toString("base64")
  const dataUrl = `data:image/jpeg;base64,${base64}`

  const response = await client.files.upload({
    file: dataUrl,
    fileName,
    folder,
    useUniqueFileName: true,
  })

  return {
    url: response.url,
    fileId: response.fileId,
    name: response.name,
  }
}

export async function deleteImage(fileId: string) {
  const client = getClient()
  await client.files.delete(fileId)
}
