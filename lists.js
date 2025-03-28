const LOCAL_STORAGE_KEY = "todos-lists";

// Initialiser l'application
const initializeApp = () => {
    // Initialise le stockage si les listes de tâches n'existent pas
    if (
        typeof JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) != "object" ||
        !localStorage.getItem(LOCAL_STORAGE_KEY) ||
        !localStorage.getItem(LOCAL_STORAGE_KEY).length
    ) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
};

// Récupère toutes les listes de tâches
const getAllTodosLists = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
};

// Crée un élément HTML pour une liste de tâches
const createTodosListHtmlElement = (todosList) => {
    const todosListElement = document.createElement("tr");
    todosListElement.id = `todos-list-${todosList.id}`;

    todosListElement.innerHTML = `
        <td>
            <span id="todos-list-title-${todosList.id}"><a href="/todo.html?list=${todosList.todoListId}">${todosList.title}</a></span>
        </td>
        <td>
            <span id="created-date-${todosList.id}">${todosList.createdDate}</span>
        </td>
        <td>
            <i class="material-symbols-outlined" onclick="handleDeleteTodosList(${todosList.id})">supprimer</i>
        </td>
    `;

    return todosListElement;
};

// Ajouter une nouvelle liste de tâches
const handleAddTodosList = () => {
    const id = Date.now();
    const input = document.getElementById("add-list");
    const title = input.value;
    const createdDate = new Date().toLocaleDateString();
    const todoListId = `${id}-list`;

    if (!title) {
        alert("Le titre est requis");
        return;
    }

    // Ajoute la nouvelle liste et sauvegarde
    const todosLists = getAllTodosLists();
    const newTodosList = {
        id: id,
        title,
        createdDate,
        todoListId,
    };

    todosLists.push(newTodosList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosLists));
    localStorage.setItem(todoListId, JSON.stringify([]));
    input.value = "";
    renderTodosLists();
};

// Affiche toutes les listes de tâches
const renderTodosLists = () => {
    document.getElementById("todos-lists-body").innerHTML = "";
    const todos = getAllTodosLists();
    todos.forEach((todosList) => {
        const todosListElement = createTodosListHtmlElement(todosList);
        document.getElementById("todos-lists-body").appendChild(todosListElement);
    });
};

// Supprime une liste de tâches
const handleDeleteTodosList = (id) => {
    const todoListId = `${id}-list`;
    const todosLists = getAllTodosLists();
    const updatedTodosLists = todosLists.filter((list) => list.id !== id);
    localStorage.removeItem(todoListId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodosLists));
    renderTodosLists();
};

// Ajoute un écouteur pour l'ajout de liste avec la touche "Entrée"
const addEventListeners = () => {
    document.getElementById("add-list").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleAddTodosList();
        }
    });
};

// Démarre l'application
initializeApp();
addEventListeners();
renderTodosLists();
