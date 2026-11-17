
import { useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import type { User, PaginatedResponse } from '../types'

type Props = {
  selectedUser: User | null
  onSelectUser: (user: User) => void
}

export function UserList({ selectedUser, onSelectUser }: Props) {
  const [page, setPage] = useState(1)

  const url = `/users?page=${page}&limit=5`

  const { data, error, isLoading, refetch } =
    useAxios<PaginatedResponse<User>>(url)

  const handlePrevious = () => {
    setPage((previous) => Math.max(1, previous - 1))
  }

  const handleNext = () => {
    if (data?.next === null || !data) {
      return
    }

    setPage(data.next)
  }

  return (
    <section>
      <h2>Usuários</h2>

      {isLoading && <p>Carregando...</p>}

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={refetch}>Tentar de novo</button>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          <ul>
            {data.data.map((user) => {
              const handleChoose = () => {
                onSelectUser(user)
              }

              return (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={handleChoose}
                    aria-pressed={selectedUser?.id === user.id}
                  >
                    {user.name}
                  </button>
                  <p>{user.email}</p>
                  <p>{user.job_title ?? 'Profissão não informada'}</p>
                </li>
              )
            })}
          </ul>

          <p>Página {page}</p>

          <button
            type="button"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            Anterior
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={data.next === null}
          >
            Próxima
          </button>
        </>
      )}
    </section>
  )
}
