import axios from 'axios';

const API_BASE_URL = 'https://g02flqc27a.execute-api.us-east-1.amazonaws.com/prod';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  userId?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

class TodoApiService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Get all todos
  async getTodos(): Promise<Todo[]> {
    try {
      const response = await this.api.get('/todos');
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  // Get a specific todo by ID
  async getTodo(id: string): Promise<Todo> {
    try {
      const response = await this.api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  }

  // Create a new todo
  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    try {
      const response = await this.api.post('/todos', todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  // Update a todo
  async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
    try {
      const response = await this.api.put(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    try {
      await this.api.delete(`/todos/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}

export const todoApi = new TodoApiService(); 