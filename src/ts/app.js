"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = [{
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
var _id = "";
// var
var btnAdd = document.querySelector("#btnAdd");
var modal = document.querySelector("#modal");
var libelleField = document.querySelector("#libelle");
var checkedField = document.querySelector("#check-form");
var submitBtn = document.querySelector("#submit");
var crossBtn = document.querySelector(".cross");
var todosList = document.querySelector(".todos-list");
var checkedFilter = document.querySelector("#check");
// function
var getTodoHtml = function (libelle, id, checked) {
    return "\n    <div class=\"todo ".concat(checked ? 'checked' : '', "\" id=\"").concat(id, "\">\n    <div class=\"content\">\n        ").concat(libelle, "\n    </div>\n    <div class=\"action\">\n        <span class=\"edit\">E</span>\n        <span class=\"delete\">D</span>\n    </div>\n</div>\n    ");
};
var deleteItem = function (id, element) {
    Task = Task.filter(function (it) { return it.id !== id; });
    element.remove();
};
var submit = function () {
    var libelle = libelleField.value;
    Task.push({
        id: "todo-" + Task.length,
        libelle: libelle,
        checked: checkedField.checked
    });
    insertItemIndom(Task[Task.length - 1]);
};
var updateItem = function () {
    var indice = Task.findIndex(function (it) { return it.id == _id; });
    Task[indice].libelle = libelleField.value;
    Task[indice].checked = checkedField.checked;
    var element = document.querySelector("#" + _id);
    element.querySelector(".content").textContent = libelleField.value;
    if (checkedField.checked)
        element.classList.add('checked');
    else
        element === null || element === void 0 ? void 0 : element.classList.remove('checked');
    _id = "";
};
var generateElement = function (str) {
    return document.createRange().createContextualFragment(str).firstElementChild;
};
var insertItemIndom = function (todo) {
    var _a, _b;
    var t = getTodoHtml(todo.libelle, todo.id, todo.checked);
    var element = generateElement(t);
    (_a = element.querySelector('.edit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) { return openModal(todo.id); });
    (_b = element.querySelector('.delete')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (e) { return deleteItem(todo.id, element); });
    todosList.insertAdjacentElement('beforeend', element);
};
var openModal = function (id) {
    _id = id;
    var todo = Task.filter(function (it) { return it.id == id; })[0];
    libelleField.value = todo.libelle;
    checkedField.checked = todo.checked;
    submitBtn.textContent = 'Modifier';
    modal === null || modal === void 0 ? void 0 : modal.classList.toggle('show');
};
// prepare data
Task.forEach(function (it) {
    insertItemIndom(it);
});
// add todo
btnAdd.addEventListener('click', function (e) {
    submitBtn.textContent = 'Ajouter';
    libelleField.value = "";
    checkedField.checked = false;
    modal === null || modal === void 0 ? void 0 : modal.classList.toggle('show');
});
crossBtn.addEventListener('click', function (e) {
    modal === null || modal === void 0 ? void 0 : modal.classList.toggle('show');
});
submitBtn.addEventListener('click', function (e) {
    if (libelleField.value == "") {
        alert("Le champ libelle ne doit pas etre vide!");
        return;
    }
    if (_id == "") {
        submit();
    }
    else {
        updateItem();
    }
    modal === null || modal === void 0 ? void 0 : modal.classList.toggle('show');
    libelleField.value = "";
    checkedField.checked = false;
});
// filter
checkedFilter.addEventListener("click", function (e) {
    var items = document.querySelectorAll('.todo');
    items.forEach(function (element) {
        if (checkedFilter.checked) {
            element.classList.contains('checked') ? "" : element.classList.add('invisible');
        }
        else {
            element.classList.remove('invisible');
        }
    });
});
