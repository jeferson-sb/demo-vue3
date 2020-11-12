import useSWRV from 'swrv'

export default function useSWRFetch(url, options) {
  const fetcher = async (key) => {
    try {
      const response = await fetch(key)
      const json = await response.json()
      return json
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const { data, error, isValidating, mutate } = useSWRV(url, fetcher, options)

  return { data, error, isValidating, mutate }
}
