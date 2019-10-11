import axios from 'axios'

export function myPost (url, data, sucHandle, errHandle) {
  let params = new URLSearchParams()

  for (var i in data) {
    params.append(i, data[i])
  }
  axios.post(url, params).then(res => { sucHandle(res) }).catch(err => { errHandle(err) })
}

export function myGet (url, data, sucHandle, errHandle) {
  axios.get(url, {params: data}).then(res => { sucHandle(res) }).catch(err => { errHandle(err) })
}
