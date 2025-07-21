// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate Name
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('name-error');
    if (name === '') {
        nameError.classList.add('show');
        isValid = false;
    } else {
        nameError.classList.remove('show');
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailError.textContent = 'Please enter your email';
        emailError.classList.add('show');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        isValid = false;
    } else {
        emailError.classList.remove('show');
    }
    
    // Validate Message
    const message = document.getElementById('message').value.trim();
    const messageError = document.getElementById('message-error');
    if (message === '') {
        messageError.classList.add('show');
        isValid = false;
    } else {
        messageError.classList.remove('show');
    }
    
    if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
    }
});

// To-Do List Functionality
document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    
    // Load saved todos from localStorage
    loadTodos();
    
    // Add new todo
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todoItem = createTodoItem(todoText);
            todoList.appendChild(todoItem);
            todoInput.value = '';
            saveTodos();
        }
    }
    
    function createTodoItem(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = text;
        
        const todoActions = document.createElement('div');
        todoActions.className = 'todo-actions';
        
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTodos();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTodos();
        });
        
        todoActions.appendChild(completeBtn);
        todoActions.appendChild(deleteBtn);
        
        li.appendChild(todoText);
        li.appendChild(todoActions);
        
        return li;
    }
    
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            const todos = JSON.parse(savedTodos);
            todos.forEach(todo => {
                const todoItem = createTodoItem(todo.text);
                if (todo.completed) {
                    todoItem.classList.add('completed');
                }
                todoList.appendChild(todoItem);
            });
        }
    }
});