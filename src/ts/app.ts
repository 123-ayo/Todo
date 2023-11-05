import { Todo } from "../models/Todo";

let Task: Todo[] = [{
    id: "todo-0",
    libelle: "elemnt 0",
    checked: false
},
{
    id: "todo-1",
    libelle: "elemnt 1",
    checked: false
}
];
let _id = "";
// var
const btnAdd = document.querySelector("#btnAdd") as HTMLButtonElement
const modal = document.querySelector("#modal")
const libelleField = document.querySelector("#libelle") as HTMLInputElement
const checkedField = document.querySelector("#check-form") as HTMLInputElement
const submitBtn = document.querySelector("#submit") as HTMLButtonElement
const crossBtn = document.querySelector(".cross") as HTMLButtonElement
const todosList = document.querySelector(".todos-list") as HTMLButtonElement
const checkedFilter = document.querySelector("#check") as HTMLInputElement

// function
const getTodoHtml = (libelle:string, id: string, checked: boolean) => {
    return `
    <div class="todo ${checked ? 'checked': ''}" id="${id}">
    <div class="content">
        ${libelle}
    </div>
    <div class="action">
        <span class="edit">E</span>
        <span class="delete">D</span>
    </div>
</div>
    `
}
const deleteItem = (id:string, element: Element) => {
    Task = Task.filter((it:Todo) => it.id !== id)
    element.remove()
}
const submit = () => {
    const libelle = libelleField.value
    Task.push({
        id: "todo-"+Task.length,
        libelle: libelle,
        checked: checkedField.checked
    });
    insertItemIndom(Task[Task.length-1])
}
const updateItem = () => {
    const indice:number = Task.findIndex((it:Todo) => it.id == _id)
    Task[indice].libelle = libelleField.value
    Task[indice].checked = checkedField.checked
    let element = document.querySelector("#"+_id) as Element
    
    (element.querySelector(".content") as Element).textContent = libelleField.value
    if (checkedField.checked) element.classList.add('checked')
    else element?.classList.remove('checked')
    _id = ""
}
const generateElement = (str:string) => {
    return document.createRange().createContextualFragment(str).firstElementChild
}
const insertItemIndom = (todo: Todo) => {
    const t = getTodoHtml(todo.libelle, todo.id,todo.checked)
    const element = generateElement(t) as Element
    element.querySelector('.edit')?.addEventListener('click', (e) => openModal(todo.id))
    element.querySelector('.delete')?.addEventListener('click', (e)=> deleteItem(todo.id, element))
    todosList.insertAdjacentElement('beforeend', element)
}
const openModal = (id:string) =>{
    _id = id
    const todo:Todo = Task.filter((it:Todo) => it.id == id)[0]
    libelleField.value = todo.libelle
    checkedField.checked = todo.checked
    submitBtn.textContent = 'Modifier'
    modal?.classList.toggle('show')
}
// prepare data
Task.forEach((it:Todo) => {
    insertItemIndom(it);
})
// add todo
btnAdd.addEventListener('click', (e) => {
    submitBtn.textContent = 'Ajouter'
    libelleField.value = ""
    checkedField.checked = false
    modal?.classList.toggle('show')
})
crossBtn.addEventListener('click', (e) => {
    modal?.classList.toggle('show')
})
submitBtn.addEventListener('click', (e) => {
    if (libelleField.value == "") {
        alert("Le champ libelle ne doit pas etre vide!")
        return
    }

    if (_id == "") {
        submit()
    }else{
        updateItem()
    }
    
    modal?.classList.toggle('show')
    libelleField.value = ""
    checkedField.checked = false
})

// filter
checkedFilter.addEventListener("click", (e) => {
    let items = document.querySelectorAll('.todo')
    items.forEach((element) => {
        if (checkedFilter.checked) {
            element.classList.contains('checked') ? "" :element.classList.add('invisible')
        }else {
            element.classList.remove('invisible')
        }
    });
})