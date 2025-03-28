let todos = [];

// Charger les tâches depuis localStorage
function loadTodos() {
    // Récupère les tâches stockées dans localStorage et les charge dans le tableau todos
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos(); 
}

// Sauvegarder les tâches dans localStorage
function saveTodos() {
    // Sauvegarde le tableau todos dans localStorage sous forme de chaîne JSON
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Ajouter une tâche
function handleAddTodo() {
    // Récupère les valeurs du formulaire
    const taskName = document.getElementById("add-todo").value;
    const dueDate = document.getElementById("dueDate").value;

    // Vérifie que le nom de la tâche et la date sont renseignés
    if (taskName && dueDate) {
        // Ajoute une nouvelle tâche au tableau todos
        todos.push({
            name: taskName,
            dueDate: dueDate,
            completed: false
        });
        saveTodos(); 
        renderTodos(); 
        // Réinitialise les champs du formulaire
        document.getElementById("add-todo").value = '';
        document.getElementById("dueDate").value = '';
    } else {
        alert("Veuillez entrer un nom de tâche et une date !");
    }
}

// Afficher toutes les tâches
function renderTodos() {
    const todoListBody = document.getElementById("todo-list-body");
    todoListBody.innerHTML = ""; // Vide le contenu de la liste pour le rafraîchir

    // Vérifie si l'option pour afficher les tâches terminées est cochée
    const showCompleted = document.getElementById("see-completed-todos").checked;
    todos.forEach((todo, index) => {
        if (showCompleted || !todo.completed) {
            const row = document.createElement("tr");

            // Crée une ligne de tableau pour chaque tâche
            row.innerHTML = `
                <td>${todo.name}</td>
                <td>${todo.dueDate}</td>
                <td>${todo.completed ? "Terminée" : ""}</td>
                <td>
                    <button onclick="markAsCompleted(${index})">Terminer</button>
                    <button onclick="editTask(${index})">Modifier</button>
                    <button onclick="deleteTask(${index})">Supprimer</button>
                </td>
            `;

            todoListBody.appendChild(row); // Ajoute la ligne au tableau
        }
    });
}

// Supprimer une tâche
function deleteTask(index) {
    todos.splice(index, 1);
    saveTodos(); 
    renderTodos(); 
}

// Marquer une tâche comme terminée
function markAsCompleted(index) {
    todos[index].completed = true;
    saveTodos(); 
    renderTodos(); 
}

// Modifier une tâche
function editTask(index) {
    // Demande de nouvelles valeurs pour la tâche
    const newName = prompt("Modifier le nom de la tâche :", todos[index].name);
    const newDate = prompt("Modifier la date de la tâche :", todos[index].dueDate);

    // Vérifie que les nouvelles valeurs sont renseignées
    if (newName && newDate) {
        todos[index].name = newName;
        todos[index].dueDate = newDate;
        saveTodos(); 
        renderTodos(); 
    }
}

// Exporter les tâches en CSV
function exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nom de la tâche,Date limite,Terminée\\n";

    // Ajoute chaque tâche au CSV
    todos.forEach(todo => {
        const row = `${todo.name},${todo.dueDate},${todo.completed ? "Oui" : "Non"}`;
        csvContent += row + "\\n";
    });

    // Crée un lien pour télécharger le fichier CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "taches.csv");
    document.body.appendChild(link); // Ajoute le lien à la page
    link.click(); 
    document.body.removeChild(link); 
}

// Charger les tâches au démarrage
window.onload = loadTodos;
