const input = document.querySelector('#newtask')
const enterIcon = document.querySelector('.enter__button')
const taskList = document.querySelector('.tasks__list')
const completedTasklist = document.querySelector('.completed-tasks__list')


input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      enterIcon.click();
    }
});

enterIcon.addEventListener('click', () =>{
    const newTask = input.value
    addTaskToList(newTask)
    input.value = ''
})

//Adding new tasks:
const addTaskToList = (task) => {
    const taskLi = document.createElement('li')
    taskList.appendChild(taskLi)
    taskLi.classList.add('tasks__item')

    const labelTask = document.createElement('label')
    taskLi.appendChild(labelTask)
    labelTask.classList.add('tasks__item--label')

    const textTask = document.createElement('span')
    labelTask.appendChild(textTask)
    textTask.classList.add('label-text')
    textTask.innerHTML = `${task}`
}


window.addEventListener('click', (e) => {
    console.log(e.target.classList)
    if(e.target.classList.contains('tasks__item')){
        completedTasklist.appendChild(e.target)
        e.target.classList.remove('tasks__item');
        e.target.classList.toggle('checked')
        e.target.classList.add('completed-tasks__item')
    } else if(e.target.classList.contains('checked')){
        taskList.appendChild(e.target)
        e.target.classList.remove('completed-tasks__item');
        e.target.classList.toggle('checked')
        e.target.classList.add('tasks__item')
    }

})