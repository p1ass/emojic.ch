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
            var dataUri = canvas.toDataURL('image/jpeg')
            // 画像を作成
            let img = new Image()
            img.src = dataUri
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
    const MIN_SIZE = 1000
    let canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const reader = new FileReader()

    const vm = this

    return new Promise((resolve, reject) => {
      image.onload = async function(event) {
        let dstWidth, dstHeight
        if (this.width > this.height) {
          dstWidth = MIN_SIZE
          dstHeight = (this.height * MIN_SIZE) / this.width
        } else {
          dstHeight = MIN_SIZE
          dstWidth = (this.width * MIN_SIZE) / this.height
        }
        canvas.width = dstWidth
        canvas.height = dstHeight
        ctx.drawImage(
          this,
          0,
          0,
          this.width,
          this.height,
          0,
          0,
          dstWidth,
          dstHeight
        )

        resolve(vm._canvasToBlob(canvas))
      }
    })
  },

  _canvasToBlob(canvas) {
    // 必ずJPEGでBlobに変換する
    var type = 'image/jpeg'

    var dataurl = canvas.toDataURL(type)
    var bin = atob(dataurl.split(',')[1])
    var buffer = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }

    return new Blob([buffer.buffer], { type: type })
  }
}
