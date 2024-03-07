class Todo {
    constructor(id, text) {
      this.id = id;
      this.text = text;
      this.completed = false;
    }

    markCompleted() {
      this.completed = true;
    }
  }

  class TodoList {
    constructor() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo(todoText) {
      const newTodo = new Todo(Date.now(), todoText);
      this.todos.push(newTodo);
      this.saveToLocalStorage();
      this.renderTodos();
    }

    deleteTodo(todoId) {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
      this.saveToLocalStorage();
      this.renderTodos();
    }

    editTodo(todoId, newText) {
      const todoToUpdate = this.todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
        todoToUpdate.text = newText;
        this.saveToLocalStorage();
        this.renderTodos();
      }
    }

    renderTodos() {
      const todoBody = document.getElementById('todoBody');
      todoBody.innerHTML = '';

      this.todos.forEach(todo => {
        const row = document.createElement('tr');

        const todoCell = document.createElement('td');
        todoCell.textContent = todo.text;
        row.appendChild(todoCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = todo.completed ? 'Completed' : 'Pending';
        statusCell.classList.toggle('completed', todo.completed);
        row.appendChild(statusCell);

        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          const newText = prompt('Edit todo:', todo.text);
          if (newText !== null) {
            this.editTodo(todo.id, newText.trim());
          }
        });
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          this.deleteTodo(todo.id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        todoBody.appendChild(row);
      });
    }
    markAsDone(todoId) {
        const todoToUpdate = this.todos.find(todo => todo.id === todoId);
        if (todoToUpdate && !todoToUpdate.completed) {
          todoToUpdate.markCompleted();
          this.saveToLocalStorage();
          this.renderTodos();
        }
      }
  
  }

  const todoList = new TodoList();

  function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
      todoList.addTodo(todoText);
      todoInput.value = '';
    }
  }

  function markAsDone(todoId) {
    todoList.markAsDone(todoId);
  }

  todoList.renderTodos();