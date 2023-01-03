//유저가 값을 입력한다.
//+ 버튼을 누르면, 할일이 추가도니다
//delete 버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 생긴다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은,끝난 아이템만, 진행중ㅐㅂ은 진행중인 아이템만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all"
let check = "Check";
let filterList = [];
addButton.addEventListener("click",addTask);
console.log(tabs)
for(let i = 1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}
function addTask(){
    let taskContents ={
        id:randomID(),
        taskContent:taskInput.value,
        isComplete:false

    }
    taskList.push(taskContents)
    console.log(taskList)
    render();
}
function render(){
    let list = [];
    if(mode == "all"){
        list = taskList
    }
    else if (mode == "ing" || mode == "done"){
        list = filterList
    }
    let resultHTML=''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
        resultHTML += `<div class="task">
        <div class = "task-done">${list[i].taskContent}</div> <div>
            <button onclick= "toggleComplete('${list[i].id}')">${check}</button>
            <button onclick= "deleteTask('${list[i].id}')">Delete</button>
        </div>
     </div>`
        }
        else{

        resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div> <div>
            <button onclick= "toggleComplete('${list[i].id}')">Check</button>
            <button onclick= "deleteTask('${list[i].id}')">Delete</button>
        </div>
     </div>`
        }
    }

    document.getElementById("board").innerHTML= resultHTML;

}
function toggleComplete(id){
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            check = "Return"
            break;
        }
    }
    console.log(taskList);
    render();
}

function deleteTask(id){
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.pop(taskList[i]);
            console.log("si")

            break;
        }
    }
        render();
}
function filter(event){
    mode = event.target.id;
    if(mode == "all"){
        render();
    }
    else if(mode == "ing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
    }
    render();
}
    else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }

        }
        render();
    }
}
function randomID(){
    return '_' + Math.random().toString(36).substring(2,9);
}

addTask()
