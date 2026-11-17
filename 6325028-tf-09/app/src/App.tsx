
import { useCallback, useEffect, useState } from 'react'
import { UserList } from './components/UserList'
import { UserTasks } from './components/UserTasks'
import type { User } from './types'
import './App.css'

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [tasksCount, setTasksCount] = useState(0)

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setTasksCount(0)
  }

  const handleTasksCountChange = useCallback((count: number) => {
    setTasksCount(count)
  }, [])

  useEffect(() => {
    if (!selectedUser) {
      document.title = 'TF 09 - Usuários e Tarefas'
      return
    }

    document.title = `${selectedUser.name} · ${tasksCount} tasks`
  }, [selectedUser, tasksCount])

  return (
    <main>
      <h1>Gerenciador de Usuários e Tarefas</h1>
      <p>TF 09 — React: Referências e Efeitos</p>

      <UserList
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
      />

      {selectedUser && (
        <UserTasks
          key={selectedUser.id}
          user={selectedUser}
          onTasksCountChange={handleTasksCountChange}
        />
      )}
    </main>
  )
}

export default App
