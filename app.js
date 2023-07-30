let taskInput = document.querySelector(".input")
let submit = document.querySelector(".ADD")
let tasksDiv = document.querySelector(".tasks")

let arrOfTasks = [];

if(localStorage.getItem("tasks")){
    arrOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getTaskFromLocalStorage();




submit.onclick=function(){
    if(taskInput.value !==""){
        addTaskToArray(taskInput.value);
        taskInput.value="";
    }
}


tasksDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
        deleteItemFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    }
})


function addTaskToArray(taskText){
    const task={
        id:Date.now(),
        title:taskText,
        completed:false,
    }
    arrOfTasks.push(task);
    addElementToPageFrom(arrOfTasks);
    addTaskToLocalStorage(arrOfTasks);
}



function addElementToPageFrom(arrOfTasks){
    tasksDiv.innerHTML = "";
    arrOfTasks.forEach((task)=>{
        let div = document.createElement("div");
        div.className = "task"
        if(task.completed == true){
            div.className = "task done";
        }
        div.appendChild(document.createTextNode(task.title));
        div.setAttribute("data-id",task.id);




        let span = document.createElement("span");
        span.appendChild(document.createTextNode("x"));
        span.className = "delete"



        div.appendChild(span)
        tasksDiv.appendChild(div)
    })}




function addTaskToLocalStorage(arrOfTasks){
    let data = localStorage.setItem("tasks",JSON.stringify(arrOfTasks));
}    
function getTaskFromLocalStorage(){
    let data =localStorage.getItem("tasks");
    if(data){
        let tasks =JSON.parse(data);
        addElementToPageFrom(tasks);
    }
}



function deleteItemFromLocalStorage(dataId){
    arrOfTasks = arrOfTasks.filter((task)=>task.id != dataId )
    addTaskToLocalStorage(arrOfTasks);
}