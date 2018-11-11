import axios from 'axios'

export default {
  // Fileクラスで渡して、Blobで返す
  async uploadImage(file) {
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      return false
    }

    console.log(file)

    const endpoint =
      'https://d65lnvm77i.execute-api.ap-northeast-1.amazonaws.com/dev/'
    const headers = { 'Content-Type': file.type, Accept: 'image/jpeg' }

    const res = await axios.post(endpoint, file, {
      headers: headers,
      responseType: 'arraybuffer'
    })
    if (res.status == 200) {
      // クォーテーション込の文字列になってしまってるので先頭と末尾の「'」を削除する
      return new Blob([res.data], {
        type: res.headers['content-type']
      })
    }
    return res
  }
}
