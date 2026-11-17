
import { useEffect, useRef, useState } from 'react'
import { clientApi } from '../api/clientApi'
import { useAxios } from '../hooks/useAxios'
import type { User, Task, PaginatedResponse } from '../types'

type Props = {
  user: User
  onTasksCountChange: (count: number) => void
}

export function UserTasks({ user, onTasksCountChange }: Props) {
  const [filter, setFilter] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const responsesRef = useRef(0)

  const url = `/users/${user.id}/tasks?page=1&limit=20`

  const { data, error, isLoading, refetch } =
    useAxios<PaginatedResponse<Task>>(url)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    responsesRef.current += 1
    onTasksCountChange(data.data.length)
  }, [data, onTasksCountChange])

  const handleFilter = () => {
    setFilter(inputRef.current?.value ?? '')
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    setFilter('')
    inputRef.current?.focus()
  }

  const handleShowResponses = () => {
    console.log(
      'Respostas de tarefas recebidas:',
      responsesRef.current
    )
    alert(`Respostas recebidas: ${responsesRef.current}`)
  }

  const handleToggleTask = async (task: Task) => {
    if (isSaving) {
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      await clientApi.put(`/users/${user.id}/tasks/${task.id}`, {
        is_done: !task.is_done,
      })

      refetch()
    } catch {
      setSaveError('Não foi possível atualizar a tarefa.')
    } finally {
      setIsSaving(false)
    }
  }

  const filteredTasks = data?.data.filter((task) =>
    task.name.toLowerCase().includes(filter.toLowerCase())
  ) ?? []

  return (
    <section>
      <h2>Tarefas de {user.name}</h2>

      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar tarefa"
          onChange={handleFilter}
        />

        <button type="button" onClick={handleClear}>
          Limpar
        </button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {error && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={refetch}>
            Tentar de novo
          </button>
        </div>
      )}

      {saveError && <p>{saveError}</p>}

      {isSaving && <p>Salvando...</p>}

      {!isLoading && !error && data && (
        <ul>
          {filteredTasks.map((task) => {
            const handleClick = () => {
              void handleToggleTask(task)
            }

            return (
              <li key={task.id}>
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={isSaving}
                >
                  {task.is_done ? 'Concluída' : 'Pendente'}
                  {' - '}
                  {task.name}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <button type="button" onClick={handleShowResponses}>
        Mostrar respostas recebidas
      </button>
    </section>
  )
}
