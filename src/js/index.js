const input = document.querySelector('#newtask')
const enterIcon = document.querySelector('.enter__button')
const taskList = document.querySelector('.tasks__list')
const completedTasklist = document.querySelector('.completed-tasks__list')

// elements for modal (mobile)
const plusButton = document.querySelector('.plus-button')
const modal = document.querySelector('.modal')
const inputDiv = document.querySelector('.input')
//

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      enterIcon.click();
    }
});

enterIcon.addEventListener('click', () =>{
    const newTask = input.value
    addTaskToList(newTask)
    input.value = ''
    if(modal.classList.contains('modal-on')){
        disableModal()
    }
})

//Adding new tasks:
const addTaskToList = (task) => {
    const taskLi = document.createElement('li')
    taskList.appendChild(taskLi)
    taskLi.classList.add('tasks__item')
    const textTask = document.createElement('span')
    taskLi.appendChild(textTask)
    textTask.classList.add('label-text')
    textTask.innerHTML = `${task}`
    sortList()
}

//toggling tasks between completed or not
window.addEventListener('click', (e) => {
    if(e.target.classList.contains('tasks__item')){
        completedTasklist.appendChild(e.target)
        e.target.classList.remove('tasks__item');
        e.target.classList.toggle('checked')
        e.target.classList.add('completed-tasks__item')
        sortListCompleted()
    } else if(e.target.classList.contains('checked')){
        taskList.appendChild(e.target)
        e.target.classList.remove('completed-tasks__item');
        e.target.classList.toggle('checked')
        e.target.classList.add('tasks__item')
        sortList()
    }
})

// sort tasks
const sortList = () => {
    const orderTasks = []
    const items = document.querySelectorAll('.tasks__item') //li's
    for (let i = 0; i< items.length; i++) { //push every li text to array orderTasks
        orderTasks.push(items[i].children[0].innerHTML)
    }
    orderTasks.sort((a,b)=> (a.localeCompare(b))) // sort every text in orderTasks
    for (let i = 0; i < items.length; i++) { // change li's texts based on orderTasks
        items[i].children[0].innerText = orderTasks[i]
    }
}
const sortListCompleted = () => {
    const orderTasks = []
    const items = document.querySelectorAll('.completed-tasks__item') //li's
    for (let i = 0; i< items.length; i++) { //push every li text to array orderTasks
        orderTasks.push(items[i].children[0].innerHTML)
    }
    orderTasks.sort((a,b)=> (a.localeCompare(b))) // sort every text in orderTasks
    for (let i = 0; i < items.length; i++) { // change li's texts based on orderTasks
        items[i].children[0].innerText = orderTasks[i]
    }
}

plusButton.addEventListener('click', () =>{
    if (plusButton.classList.contains('clicked')) {
        disableModal()
    } else {
        EnableModal()
    }
})

const disableModal = () => {
    plusButton.classList.remove('clicked')
    modal.classList.remove('modal-on')
    inputDiv.classList.remove('input-on')
}

const EnableModal = () => {
    plusButton.classList.add('clicked')
    modal.classList.add('modal-on')
    inputDiv.classList.add('input-on')
}