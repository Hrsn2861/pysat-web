import axios from 'axios'

// surcess handle and err Handle (Something like Lambda func)
export async function myPost (url, data, sucHandle, errHandle) {
  let params = new URLSearchParams()

  for (var i in data) {
    params.append(i, data[i])
  }
  await axios.post(url, params).then(res => { sucHandle(res) }).catch(err => { errHandle(err) })
}

export async function myGet (url, data, sucHandle, errHandle) {
  await axios.get(url, {params: data}).then(res => { sucHandle(res) }).catch(err => { errHandle(err) })
}
