let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-tasks');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.style.backgroundColor = task.color;
    taskDiv.innerHTML = `
      <h3>${task.name}</h3>
      <p><strong>Type:</strong> ${task.type}</p>
      <p>${task.description}</p>
      <div class="task-actions">
        <button onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">🗑️ Delete</button>
      </div>
    `;
    taskList.appendChild(taskDiv);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = {
    name: document.getElementById('task-name').value,
    type: document.getElementById('task-type').value,
    description: document.getElementById('task-desc').value,
    color: document.getElementById('task-color').value,
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();
  form.reset();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('task-name').value = task.name;
  document.getElementById('task-type').value = task.type;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-color').value = task.color;

  deleteTask(index);
}

clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all tasks?')) {
    tasks = [];
    saveTasks();
    displayTasks();
  }
});

displayTasks();
