const modal = document.querySelector('.modal');
const btnAddTask = document.querySelector('.btn-add-task');
const btnCancelTask = document.querySelector('.btn-cancel-task');
const iptToggleModal = document.querySelector('#ipt-toggle-modal');
let isEditing = false;
let editingTaskIndex = '';
var Data =[];

btnCancelTask.addEventListener('click', () => {
  iptToggleModal.checked = false;
  modal.reset();
  document.querySelectorAll('.task').forEach(task => {
    task.classList.remove('swipe-right');
  });
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape' && iptToggleModal.checked) {
    iptToggleModal.checked = false;
    modal.reset();
    document.querySelectorAll('.task').forEach(task => {
      task.classList.remove('swipe-right');
    });
  }

  if (evt.key === '+' && !iptToggleModal.checked) {
    document.querySelector('.overlay > p').innerText = 'Add task';
    document.querySelector('.btn-add-task').innerText = 'Add';

    iptToggleModal.checked = true;
    document.querySelectorAll('.task').forEach(task => {
      task.classList.add('swipe-right');
    });

    setTimeout(() => {
      document.querySelector('#task-title').focus();
    }, 500);
  }
});

iptToggleModal.addEventListener('change', function () {
  if (this.checked) {
    document.querySelector('.overlay > p').innerText = 'Add task';
    document.querySelector('.btn-add-task').innerText = 'Add';

    document.querySelectorAll('.task').forEach((task, index) => {
      task.classList.add('swipe-right');
      task.style.transitionDelay = index * .02 + 's';
    });
    document.querySelector('#task-title').focus();
  } else
  {
    modal.reset();
    document.querySelectorAll('.task').forEach(task => {
      task.classList.remove('swipe-right');
    });
  }
});

function editTask(evt, el) {
  const btn = el == undefined ? this : el;
  const task = btn.parentNode.parentNode.parentNode;
  let title = task.querySelector('.task-title').innerText;
  let desc = '';
  editingTaskIndex = task.dataset.index;

  if (task.querySelector('.task-description') !== null && task.querySelector('.task-description') !== undefined) {
    desc = task.querySelector('.task-description').innerText;
  }

  let priority = task.querySelector('ion-icon[aria-label="flame"]').dataset.priority;

  document.querySelector('.overlay > p').innerText = 'Edit task';
  document.querySelector('.btn-add-task').innerText = 'Save';

  document.querySelector('#task-title').value = title;
  document.querySelector('#task-title').focus();
  document.querySelector('#task-desc').value = desc;

  document.querySelectorAll('input[name="priority"]').forEach(item => {
    if (item.value == priority) {
      item.checked = true;
    }
  });

  iptToggleModal.checked = true;
  document.querySelectorAll('.task').forEach(item => {
    item.classList.add('swipe-right');
  });

  isEditing = true;
}

function completeTask(evt, el) {
  
  const btn = el == undefined ? this : el;
  const task = btn.parentNode.parentNode.parentNode;

  task.classList.toggle('-is-completed');
}

function removeTask(evt, el) {
  const btn = el == undefined ? this : el;
  console.log(btn);
  console.log(el);
  const task = btn.parentNode.parentNode.parentNode;
  console.log(task);
  let abc=task.querySelector(".task-title");
  console.log(abc.innerText);
  let taskStatus = task.querySelector('.task-status');

  taskStatus.innerText = 'Task removed';

  task.classList.add('-is-removed');

  setTimeout(() => {
    task.classList.add('swipe-right');
  }, 500);

  setTimeout(() => {
    task.parentElement.removeChild(task);
  }, 1000);
}
