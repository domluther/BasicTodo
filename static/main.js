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
}

async function handleToggle(id) {
  await fetch(`/todo/complete/${id}`, { method: 'PUT' });
  location.reload();
}

async function handlePriority(id) {
  await fetch(`/todo/priority/${id}`, { method: 'PUT' });
  location.reload();
}

async function handleDelete(id, taskName) {
  if (confirm(`Are you sure you want to remove ${taskName}`)) {
    await fetch(`/todo/${id}`, { method: 'DELETE' });
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
