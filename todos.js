// get todos from localstorage(it gives us a todos but its an string and we should convert it to an object)
let todos = localStorage.getItem("todos")
//try parse data or null

try{
    todos = JSON.parse(todos) //we use JSON.parse to convert todos from string to object
    todos = todos.length ? todos : null
} catch(e) {
    todos = null
}

//set default value if todos == null
if (!todos) {
    todos = [
    {content:"shopping", status: true},
        {content: "watch videos", status: true},
       {content:  "like videos", status: true},
    ]
    localStorage.setItem("todos",JSON.stringify(todos))
}
// func to create or update todos list in ui
function createTodos(todos){
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""

    // create list tag for each todo
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ?  "initial" : "line-through"
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "media/delete.png"
        deleteBtn.alt = "delete icon"
        deleteBtn.className = "float-right"

        //append content and deleteBtn to li
        li.append(content)
        li.append(deleteBtn)
        
        // append li to todosList
        todosList.append(li)
        
        //add deleteBtn functionality
        deleteBtn.addEventListener("click", e =>{
            todos.splice(index, 1)
            localStorage.setItem("todos",JSON.stringify(todos))
            createTodos(todos)
        })

        //add complete functionality
        content.addEventListener("click", e =>{
            todos[index].status = !todos[index].status
            localStorage.setItem("todos",JSON.stringify(todos))
            createTodos(todos)
        })
        
    });
}




createTodos(todos)

//action add & search

let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")
Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        action.addEventListener("click" , e => {
            formWrapper.innerHTML = `
                    <form id="add">
						<input class="form-control" name="add" placeholder="Add todo ...">	
					</form>` //its a "backtick" watch out :D
        })
    } else if (action.dataset.action == "search") {
        action.addEventListener("click" , e => {
            formWrapper.innerHTML = `
            <form id="search">
						<input class="form-control" name="search" placeholder="search todos ...">	
					</form>`//its a "backtick" watch out :D
        })
    }
})