import React, { useState } from 'react';
import type { Todo } from '../services/todoApi';
import { todoApi } from '../services/todoApi';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsLoading(true);
      const updatedTodo = await todoApi.updateTodo(todo.id, {
        completed: !todo.completed
      });
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedTodo = await todoApi.updateTodo(todo.id, {
        title,
        description
      });
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setIsLoading(true);
        await todoApi.deleteTodo(todo.id);
        onDelete(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="todo-content">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
            className="todo-title-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todo description"
            className="todo-description-input"
          />
        </div>
        <div className="todo-actions">
          <button 
            onClick={handleSave} 
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button 
            onClick={() => setIsEditing(false)} 
            disabled={isLoading}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-user">User: {todo.userId}</span>
          <span className="todo-id">ID: {todo.id}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={handleToggleComplete}
          disabled={isLoading}
          className={`btn ${todo.completed ? 'btn-success' : 'btn-outline'}`}
        >
          {todo.completed ? '✓ Completed' : 'Mark Complete'}
        </button>
        <button
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
          className="btn btn-secondary"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}; 