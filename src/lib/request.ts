import axios from 'axios'

import { CancelError } from './errors'

type Method = 'GET'

type Params = Record<string, string | number | undefined>

const { CancelToken } = axios

export const createRequest = <T>(
  method: Method,
  url: string,
): { request: (params: Params) => Promise<T>; cancel: Function } => {
  let cancel: Function

  let cancelToken = new CancelToken((c) => {
    cancel = c
  })

  return {
    request: async (params): Promise<T> => {
      const key = process.env.API_KEY
      const uri = `${process.env.API_URI}/${url}?${new URLSearchParams({
        ...params,
        'api-key': key,
      })}`

      return axios({
        method,
        url: uri,
        cancelToken,
      })
        .then((response) => response.data)
        .catch((error) => {
          if (axios.isCancel(error)) {
            throw new CancelError()
          }

          throw error
        })
    },
    cancel: (): void => {
      cancel()
      cancelToken = new CancelToken((c) => {
        cancel = c
      })
    },
  }
}
