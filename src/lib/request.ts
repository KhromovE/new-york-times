import axios from 'axios'

import { API_URI } from '../constants/uri'

type Method = 'GET'

type Params = Record<string, string | number | undefined>

export const request = async <T>(method: Method, url: string, params: Params): Promise<T> => {
  const key = process.env.API_KEY
  const uri = `${API_URI}/${url}?${new URLSearchParams({
    ...params,
    'api-key': key,
  })}`

  const response = await axios({
    method,
    url: uri,
  })

  return response.data
}
