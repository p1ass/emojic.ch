import axios from 'axios'
export default {
  async uploadImage(file) {
    const endpoint = process.env.endpoint
    const headers = { 'Content-Type': file.type, Accept: 'image/jpeg' }
    let response = undefined
    try {
      response = await axios.post(endpoint, file, {
        headers: headers,
        responseType: 'blob'
      })
    } catch (e) {
      throw new Error(e.status)
    }

    if (response.status != 200) {
      throw new Error(response.status)
    } else {
      return response.data
    }
  }
}
