
import { useEffect, useState } from 'react'
import { isCancel } from 'axios'
import { clientApi } from '../api/clientApi'

export function useAxios<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    if (url === null) {
      return () => controller.abort()
    }

    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      setData(null)

      try {
        const response = await clientApi.get<T>(url, {
          signal: controller.signal,
        })

        if (!controller.signal.aborted) {
          setData(response.data)
        }
      } catch (err) {
        if (isCancel(err) || controller.signal.aborted) {
          return
        }

        setError('Erro ao carregar os dados.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadData()

    return () => controller.abort()
  }, [url, attempt])

  const refetch = () => {
    setAttempt((previous) => previous + 1)
  }

  return { data, error, isLoading, refetch }
}
