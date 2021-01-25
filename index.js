
const form = document.querySelector('form');
const input = document.querySelector('#taskInput');
const addBtn = document.querySelector('#add-btn');
const clearBtn = document.querySelector('#clear-btn');
const tasksTable = document.querySelector('#tasksTable')
const ul = document.createElement('ul');

const storage = window.localStorage;

const allTasks = storage.getItem('tasks') ? JSON.parse(storage.getItem('tasks')) : [];
storage.setItem('tasks', JSON.stringify(allTasks));

function addTask(e) {
    e.preventDefault();
    
    if(!input.value){
        return null
    } else { 
        let newTask = {
            value: input.value,
            id: Date.now(),
        };
        
        let tempArr = JSON.parse(storage.getItem('tasks'));
        tempArr.push(newTask)
        storage.setItem('tasks', JSON.stringify(tempArr));
        input.value = '';
    }
    displayTasks();
}


function displayTasks() {
    let parsedTasks =  JSON.parse(storage.getItem('tasks'))
    
    ul.innerHTML='';
    
    parsedTasks.map(task => {
        
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        
        deleteBtn.addEventListener('click', deleteTask )
        
        li.innerHTML= task.value;
        
        deleteBtn.innerHTML = 'delete';
      
        ul.classList.add('tasks-list');
        li.classList.add('task-item');
        li.id = task.id;

        deleteBtn.classList.add('delete-btn');
        
        
        tasksTable.appendChild(ul);
        ul.append(li);
        li.append( deleteBtn)
    });
};

displayTasks();

function deleteTask() {
    
    let tasksLocal  = JSON.parse(storage.getItem('tasks'));
    let id = this.parentElement.getAttribute('id');
   
    const tempArr = tasksLocal.filter(task=> task.id != id);
    console.log(tempArr);
    storage.setItem('tasks', JSON.stringify(tempArr));
    console.log(storage);

    this.parentElement.classList.add('animation');

    setTimeout(()=>{
        var parentList = this.parentElement.parentElement;
        parentList.removeChild(this.parentElement);
    }, 500)
}

function clear() {
    storage.clear();
    allTasks.length = 0;
    console.log(storage);
    ul.innerHTML = 'you have no tasks';
}

addBtn.addEventListener('click', addTask )
clearBtn.addEventListener('click', clear )

