// get todos from localstorage
let todos = localStorage.getItem("todos")
//try parse data or null
try{
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch(e) {
    todos = null
}

//set default value if todos == null
if (!todos) {
    todos = [
        "shopping",
        "watch videos",
        "like videos",
    ]
    localStorage.setItem("todos",JSON.stringify(todos))
}