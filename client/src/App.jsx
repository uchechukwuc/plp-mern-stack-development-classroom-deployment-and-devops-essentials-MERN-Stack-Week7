import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/todos`)
      setTodos(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch todos')
      console.error('Error fetching todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      await axios.post(`${API_URL}/api/todos`, {
        title: newTodo.trim(),
        description: '',
        priority: 'medium'
      })
      setNewTodo('')
      fetchTodos()
    } catch (err) {
      setError('Failed to add todo')
      console.error('Error adding todo:', err)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/api/todos/${id}`, {
        completed: !completed
      })
      fetchTodos()
    } catch (err) {
      setError('Failed to update todo')
      console.error('Error updating todo:', err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`)
      fetchTodos()
    } catch (err) {
      setError('Failed to delete todo')
      console.error('Error deleting todo:', err)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>MERN Todo App</h1>
        <p>A full-stack application deployed to production</p>
      </header>

      <main className="app-main">
        <div className="todo-container">
          <form onSubmit={addTodo} className="todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="todo-input"
            />
            <button type="submit" className="add-btn">Add Todo</button>
          </form>

          {error && <div className="error">{error}</div>}

          <div className="todos-list">
            {todos.length === 0 ? (
              <p className="no-todos">No todos yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id, todo.completed)}
                      className="todo-checkbox"
                    />
                    <span className="todo-title">{todo.title}</span>
                    <span className={`todo-priority priority-${todo.priority}`}>
                      {todo.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with MERN Stack | Deployed to Production</p>
      </footer>
    </div>
  )
}

export default App