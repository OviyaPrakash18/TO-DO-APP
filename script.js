const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const taskForm = document.getElementById('task-form');
const saveTaskBtn = document.getElementById('save-task');
const cancelTaskBtn = document.getElementById('cancel-task');
const taskNameInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');

let tasks = [];

// Show task form
addTaskBtn.addEventListener('click', () => {
  taskForm.style.display = 'block';
  addTaskBtn.style.display = 'none';
});

// Hide task form
cancelTaskBtn.addEventListener('click', () => {
  taskForm.style.display = 'none';
  addTaskBtn.style.display = 'block';
  taskNameInput.value = '';
  taskDateInput.value = '';
});

// Save task
saveTaskBtn.addEventListener('click', () => {
  const taskName = taskNameInput.value.trim();
  const taskDate = taskDateInput.value;

  if (taskName === '') {
    alert('Please enter a task');
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskName,
    date: taskDate || '',
    completed: false,
  };

  tasks.push(newTask);
  renderTasks();
  
  taskNameInput.value = '';
  taskDateInput.value = '';
  taskForm.style.display = 'none';
  addTaskBtn.style.display = 'block';
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) taskElement.classList.add('completed');
    
    taskElement.innerHTML = `
      <span>${task.name}</span>
      ${task.date ? `<small>Due: ${new Date(task.date).toLocaleString()}</small>` : ''}
      <div>
        <button class="complete" onclick="markComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}

// Mark task as completed
function markComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Edit task
function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    taskNameInput.value = task.name;
    taskDateInput.value = task.date;
    taskForm.style.display = 'block';
    addTaskBtn.style.display = 'none';
    
    saveTaskBtn.onclick = () => {
      task.name = taskNameInput.value.trim();
      task.date = taskDateInput.value;
      renderTasks();
      taskForm.style.display = 'none';
      addTaskBtn.style.display = 'block';
    };
  }
}

// Delete task
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

// Initialize
renderTasks();
