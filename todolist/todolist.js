        let inp = document.querySelector(".one");
let div = document.querySelector(".div");

window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addtodom(task.id, task.text, task.completed));
});

inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {       
        if(inp.value.trim() !== ""){
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
            addtodom(newId, inp.value, false);
            saveTask(newId, inp.value, false);
            inp.value = "";
        } else {
            inp.value = "";          
        }
    }  
})

function saveTask(id, text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id, text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(id, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(id, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => task.id === id ? { ...task, completed } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addtodom(id, text, completed) {
    let inpdiv = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    let span = document.createElement("span");
    span.innerText = text;
    if (completed) span.style.textDecoration = "line-through";

    let delbtn = document.createElement("button");
    delbtn.innerText = "Delete";
    let editbtn = document.createElement("button");
    editbtn.innerText = "Edit";

    inpdiv.appendChild(span);
    inpdiv.appendChild(checkbox);
    inpdiv.appendChild(delbtn);
    inpdiv.appendChild(editbtn);
    div.appendChild(inpdiv);

    checkbox.addEventListener("change", () => {
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
        toggleTask(id, checkbox.checked);
    });

    delbtn.addEventListener("click", () => {
        div.removeChild(inpdiv);
        deleteTask(id);
    });

    editbtn.addEventListener("click", () => {
        let newText = prompt("Edit your item:", span.innerText);
        if (newText !== null && newText.trim() !== "") {
            span.innerText = newText;
            editTask(id, newText);
        }
    });
}