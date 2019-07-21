import loadImage from 'blueimp-load-image'

export default {
  // iPhoneの画像の向きを調整
  // http://blog.yuhiisk.com/archive/2018/05/27/iphone-rotate-image-bug.html
  fixImageOrientationAndSize(image) {
    return new Promise((resolve, reject) => {
      loadImage.parseMetaData(image, data => {
        const MAX_SIZE = 1000

        const options = {
          maxHeight: MAX_SIZE,
          maxWidth: MAX_SIZE,
          canvas: true
        }
        if (data.exif) {
          options.orientation = data.exif.get('Orientation')
        }
        loadImage(
          image,
          canvas => {
            const dataUri = canvas.toDataURL('image/jpeg')
            resolve(this._dataUriToBlob(dataUri))
          },
          options
        )
      })
    })
  },

  _dataUriToBlob(dataUri) {
    // 必ずJPEGでBlobに変換する
    const type = 'image/jpeg'

    const bin = atob(dataUri.split(',')[1])
    const buffer = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }

    return new Blob([buffer.buffer], { type })
  }
}
