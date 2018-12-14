export default {
  // iPhoneの画像の向きを調整
  // http://blog.yuhiisk.com/archive/2018/05/27/iphone-rotate-image-bug.html
  fixImageOrientation(image) {
    return new Promise((resolve, reject) => {
      loadImage.parseMetaData(image, data => {
        const options = {
          canvas: true
        }
        if (data.exif) {
          options.orientation = data.exif.get('Orientation')
        }
        loadImage(
          image,
          canvas => {
            const data_uri = canvas.toDataURL('image/jpeg')
            // 画像を作成
            let img = new Image()
            img.src = data_uri
            resolve(img)
          },
          options
        )
      })
    })
  },

  // 画像のリサイズ
  // https://www.bokukoko.info/entry/2016/03/28/JavaScript_で画像をリサイズする方法
  resizeImage(image) {
    const MAX_SIZE = 2000
    let canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      image.onload = () => {
        let dst_width, dst_height

        const max_image_size = Math.max(image.width, image.height)

        // MAX_SIZEより画像が小さかったらサイズを変換しない
        if (max_image_size < MAX_SIZE) {
          dst_width = image.width
          dst_height = image.height
        } else if (image.width > image.height) {
          dst_width = MAX_SIZE
          dst_height = (image.height * MAX_SIZE) / image.width
        } else {
          dst_height = MAX_SIZE
          dst_width = (image.width * MAX_SIZE) / image.height
        }
        canvas.width = dst_width
        canvas.height = dst_height
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          dst_width,
          dst_height
        )

        resolve(this._canvasToBlob(canvas))
      }
    })
  },

  _canvasToBlob(canvas) {
    // 必ずJPEGでBlobに変換する
    const type = 'image/jpeg'

    const dataurl = canvas.toDataURL(type)
    const bin = atob(dataurl.split(',')[1])
    let buffer = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }

    return new Blob([buffer.buffer], { type: type })
  }
}
