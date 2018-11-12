import axios from 'axios'
export default {
  // Fileクラスで渡して、Blobで返す
  async uploadImage(file) {
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      throw new Error('400')
    }

    console.log(file)

    // エラーも一緒に返すようにする
    // https://zukucode.com/2017/08/asynct-await-ajax-error.html
    axios.interceptors.response.use(
      response => {
        return Promise.resolve({
          data: response.data
        })
      },
      error => {
        return Promise.resolve({
          error: error.response
        })
      }
    )

    const endpoint =
      'https://d65lnvm77i.execute-api.ap-northeast-1.amazonaws.com/dev/'
    const headers = { 'Content-Type': file.type, Accept: 'image/jpeg' }
    const { data, error } = await axios.post(endpoint, file, {
      headers: headers,
      responseType: 'blob'
    })
    if (error) {
      throw new Error(error.status)
    }
    return data
  }
}
