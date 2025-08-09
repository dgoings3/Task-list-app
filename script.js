function addTask() {
    const taskInput = 
    document.getElementById('taskInput');
     const taskText = taskInput.value.trim();

if (taskText !== '') {
    const taskList = 
    document.getElementById('taskList'); 
    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        li.remove();
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';
}
}

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  const li = makeItem({ text, done: false });
  document.getElementById('taskList').appendChild(li);

  input.value = '';
  input.focus();
  saveTasks();
}

function makeItem(task) {
  const li = document.createElement('li');

  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.checked = !!task.done;

  const span = document.createElement('span');
  span.textContent = task.text;
  span.style.marginLeft = '8px';
  if (task.done) span.style.textDecoration = 'line-through';

  chk.addEventListener('change', () => {
    span.style.textDecoration = chk.checked ? 'line-through' : 'none';
    saveTasks();
  });

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.style.marginLeft = '12px';
  del.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(chk);
  li.appendChild(span);
  li.appendChild(del);
  return li;
}

function saveTasks() {
  const list = document.getElementById('taskList');
  const tasks = Array.from(list.querySelectorAll('li')).map(li => {
    return {
      text: li.querySelector('span').textContent,
      done: li.querySelector('input[type="checkbox"]').checked
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem('tasks');
  if (!raw) return;
  const tasks = JSON.parse(raw);
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(t => list.appendChild(makeItem(t)));
}
