'use strict';

const listEle = document.querySelector('.todoList');
const randomBtn = document.querySelector('.pickRandom');

// When the list is clicked, use event bubbling to listen and respond appropriately
listEle.addEventListener('click', handleListClick);
randomBtn.addEventListener('click', pickRandomTask);

function handleListClick(e) {
  const taskId = e.target.closest('.todo').dataset['id'];
  const taskName = e.target
    .closest('.todo')
    .querySelector('.todoTask').innerText;
  console.log(`Interacting with task ${taskId} - ${taskName}`);

  // Guard clause - don't listen to anything else
  if (e.target.classList.contains('toggle')) handleToggle(taskId);
  if (e.target.classList.contains('delete')) handleDelete(taskId, taskName);
  if (e.target.classList.contains('priority')) handlePriority(taskId);
  if (e.target.classList.contains('todoTask')) handleEditTask(e.target, taskId);
  if (e.target.classList.contains('undoChange')) handleUndoChange();
}

async function handleToggle(taskId) {
  await fetch(`/todo/complete/${taskId}`, { method: 'PUT' });
  location.reload();
}

async function handlePriority(taskId) {
  await fetch(`/todo/priority/${taskId}`, { method: 'PUT' });
  location.reload();
}

async function handleEditTask(target, taskId) {
  console.log(`You want to edit the task ${taskId}`);
  console.log(target);
  const currentTask = target.innerText.trim();
  console.log(currentTask);
  // Read in the current value of the text
  // Make a new set of elemenets
  // <input class="todoTask" type="text" value=currentTask /> <button class="submitChange">✅</button><button class="undoChange">❌</button>

  // Add event listeners to submitChange + undoChange
}

async function handleSubmitChange(taskId) {
  // Send a put request to the server with taskId and the new task name
  // Reload the page
  location.reload();
}

async function handleUndoChange() {
  // Easiest option - reload page (will lose random colouring but easier than rebuilding the element)
  location.reload();
}

async function handleDelete(taskId, taskName) {
  if (confirm(`Are you sure you want to remove ${taskName}`)) {
    await fetch(`/todo/${taskId}`, { method: 'DELETE' });
    location.reload();
  } else {
    console.log('Cancelled deletion');
  }
}

async function pickRandomTask() {
  const dbRes = await fetch('/todo/random');
  const data = await dbRes.json();
  const { _id } = data.result;

  // Clean up any previous randomly selected highlighting
  document
    .querySelectorAll('li.todo')
    .forEach((ele) => ele.classList.remove('picked'));

  // Add styling to the randomly picked item
  document.querySelector(`[data-id="${_id}"]`).classList.add('picked');
}
