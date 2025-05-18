import { useState, useEffect, useCallback } from 'react'

interface User {
  id: number
  name: string
  email?: string
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users')
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <ul>
      {users.map(({ id, name, email }) => (
        <li key={id}>
          <strong>{name}</strong> {email && <em>({email})</em>}
        </li>
      ))}
    </ul>
  )
}

export default UserList