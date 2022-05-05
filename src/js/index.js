const input = document.querySelector('#newtask')
const enterIcon = document.querySelector('[enter]')
const taskList = document.querySelector('.tasks__list')
const completedTasklist = document.querySelector('.completed-tasks__list')
const container = document.querySelector('.container')
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
    if(input.value !== ''){
        const newTask = input.value
        addTaskToList(newTask)
        saveList(newTask)
        input.value = ''
        if(modal.classList.contains('modal-on')){
            disableModal()
        }
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
    sortList('.tasks__item')
}

//toggling tasks between completed or not
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('tasks__item')){
        updateCompleted(e.target.children[0].innerHTML)
        insertCompletedClasses(e.target)
        sortList('.completed-tasks__item')

    } else if(e.target.classList.contains('checked')){
        updateUncompleted(e.target.children[0].innerHTML)
        removeCompletedClasses(e.target)
        sortList('.tasks__item')
    }
})

//Remove Checked classes
const removeCompletedClasses = (target) => {
    taskList.appendChild(target)
    target.classList.remove('completed-tasks__item');
    target.classList.toggle('checked')
    target.classList.add('tasks__item')
}
//Add checked classes
const insertCompletedClasses= (target) => {
    completedTasklist.appendChild(target)
    target.classList.remove('tasks__item');
    target.classList.toggle('checked')
    target.classList.add('completed-tasks__item')
}


//List Database
let originalList = []
let countTask = 0
const saveList = (newTask) => {
    originalList = [
        ...originalList, {
        task: newTask,
        id: countTask,
        completed: false
        }
    ]
    countTask++
}
const updateCompleted = (task) => {
    const index = originalList.findIndex(x => x.task === task)
    originalList[index].completed = true
}
const updateUncompleted = (task) => {
    const index = originalList.findIndex(x => x.task === task)
    originalList[index].completed = false
}


// sort tasks
const sortList = (listToBeSorted) => {
    const orderTasks = []
    const items = document.querySelectorAll(listToBeSorted) //li's
    for (let i = 0; i< items.length; i++) { //push every li text to array orderTasks
        orderTasks.push(items[i].children[0].innerHTML)
    }
    orderTasks.sort((a,b)=> (a.localeCompare(b))) // sort every text in orderTasks
    for (let i = 0; i < items.length; i++) { // change li's texts based on orderTasks
        items[i].children[0].innerText = orderTasks[i]
    }
}
//

//modal functionallity

plusButton.addEventListener('click', () =>{
    if (plusButton.classList.contains('clicked')) {
        disableModal()
    } else {
        EnableModal()
        input.focus()
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