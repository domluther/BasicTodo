const listEle = document.querySelector('.todoList');

// When the list is clicked, use event bubbling to listen and respond appropriately
listEle.addEventListener('click', handleListClick);

function handleListClick(e) {
  // Guard clause - don't listen to anything else
  if (e.target.classList.contains('toggle')) console.log('toggle time');
  else if (e.target.classList.contains('delete')) console.log('delete time');
  else return;
  const taskId = e.target.closest('.todo').dataset['id'];
  const taskName = e.target
    .closest('.todo')
    .querySelector('.todoTask').innerText;
  console.log(`Interacting with task ${taskId} - ${taskName}`);
}
