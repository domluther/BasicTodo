const listEle = document.querySelector('.todoList');
const randomBtn = document.querySelector('.pickRandom');

// When the list is clicked, use event bubbling to listen and respond appropriately
listEle.addEventListener('click', handleListClick);
randomBtn.addEventListener('click', pickRandomTask);

function handleListClick(e) {
  const taskId = e.target.closest('.todo').dataset.id;
  const taskName = e.target
    ?.closest('.todo')
    ?.querySelector('.todoTask')?.innerText;
  // console.log(`Interacting with task ${taskId} - ${taskName}`);

  // Guard clause - don't listen to anything else
  if (e.target.classList.contains('toggle')) handleToggle(taskId);
  if (e.target.classList.contains('delete')) handleDelete(taskId, taskName);
  if (e.target.classList.contains('priority')) handlePriority(taskId);
  if (e.target.classList.contains('todoTask')) handleEditTask(e.target, taskId);
  if (e.target.classList.contains('undoChange')) handleUndoChange();
  if (e.target.classList.contains('submitChange'))
    handleSubmitChange(e.target, taskId);
}

async function handleToggle(taskId) {
  await fetch(`/todo/complete/${taskId}`, { method: 'PUT' });
  location.reload();
}

async function handlePriority(taskId) {
  await fetch(`/todo/priority/${taskId}`, { method: 'PUT' });
  location.reload();
}

function handleEditTask(target, taskId) {
  // Read in the current value of the text
  const currentTask = target.innerText.trim();
  // Remove the span tag
  const targetParent = target.parentElement;
  targetParent.firstElementChild.remove();
  // Add the input box where the span was
  targetParent.insertAdjacentHTML(
    'afterbegin',
    `<input class="editTodo" type="text" value="${currentTask}" /> <span class="fakeButton submitChange">✅</span><span class="fakeButton undoChange">❌</span>`,
  );
}

async function handleSubmitChange(target, taskId) {
  const minLength = 3;
  const task = target.parentElement.querySelector('input').value;
  if (task.length < minLength) {
    // TODO Add some kind of validation message appear
    console.log('Too short!');
    // location.reload();
  } else {
    // Send a put request to the server with taskId and the new task name
    await fetch(`/todo/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    // Reload the page
    location.reload();
  }
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
