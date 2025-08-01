import React, { useState, useEffect } from 'react';
import type { Todo, CreateTodoRequest } from '../services/todoApi';
import { todoApi } from '../services/todoApi';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTodo, setNewTodo] = useState<CreateTodoRequest>({
    title: '',
    description: '',
    userId: 'user123'
  });
  const [isCreating, setIsCreating] = useState(false);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const todosData = await todoApi.getTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      alert('Please enter a title for the todo');
      return;
    }

    try {
      setIsCreating(true);
      const createdTodo = await todoApi.createTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setNewTodo({ title: '', description: '', userId: 'user123' });
      setShowCreateForm(false);
      alert('Todo created successfully! Check your email for notification.');
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleRefresh = () => {
    loadTodos();
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading todos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
        <button onClick={handleRefresh} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h1>Todo Application</h1>
        <div className="todo-actions">
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary"
          >
            {showCreateForm ? 'Cancel' : 'Add New Todo'}
          </button>
          <button 
            onClick={handleRefresh}
            className="btn btn-secondary"
          >
            Refresh
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="create-todo-form">
          <h3>Create New Todo</h3>
          <form onSubmit={handleCreateTodo}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Enter todo title"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Enter todo description"
                className="form-textarea"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                value={newTodo.userId}
                onChange={(e) => setNewTodo({ ...newTodo, userId: e.target.value })}
                placeholder="Enter user ID"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button 
                type="submit" 
                disabled={isCreating}
                className="btn btn-primary"
              >
                {isCreating ? 'Creating...' : 'Create Todo'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowCreateForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="todo-stats">
        <p>Total todos: {todos.length}</p>
        <p>Completed: {todos.filter(todo => todo.completed).length}</p>
        <p>Pending: {todos.filter(todo => !todo.completed).length}</p>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <h3>No todos yet</h3>
          <p>Create your first todo to get started!</p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            Create Your First Todo
          </button>
        </div>
      ) : (
        <div className="todos-container">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 