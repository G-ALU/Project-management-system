

document.addEventListener('DOMContentLoaded', () => {
    const createProjectBtn = document.getElementById('createProjectBtn');
    const deleteProjectBtn = document.getElementById('deleteProjectBtn');
    const viewOneProjectBtn = document.getElementById('viewOneProjectBtn');
    const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const projectForm = document.getElementById('projectForm');
    const projectNameInput = document.getElementById('projectName');
    const projectTableBody = document.querySelector('#projectTable tbody');

    createProjectBtn.addEventListener('click', () => {
        projectForm.style.display = 'block';
    });

    saveProjectBtn.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        if (projectName) {
            addProjectToLocalStorage(projectName);
            projectNameInput.value = '';
            projectForm.style.display = 'none';
            displayProjects();
        }
    });

    deleteProjectBtn.addEventListener('click', () => {
        const projectName = prompt('Enter the name of the project to delete:');
        if (projectName) {
            deleteProjectFromLocalStorage(projectName);
            displayProjects();
        }
    });

    viewOneProjectBtn.addEventListener('click', () => {
        const projectName = prompt('Enter the name of the project to view:');
        if (projectName) {
            displayOneProject(projectName);
        }
    });

    viewAllProjectsBtn.addEventListener('click', displayProjects);

    function addProjectToLocalStorage(projectName) {
        const projects = getProjectsFromLocalStorage();
        projects.push(projectName);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function getProjectsFromLocalStorage() {
        const projects = localStorage.getItem('projects');
        return projects ? JSON.parse(projects) : [];
    }

    function deleteProjectFromLocalStorage(projectName) {
        let projects = getProjectsFromLocalStorage();
        projects = projects.filter(project => project !== projectName);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function displayProjects() {
        const projects = getProjectsFromLocalStorage();
        projectTableBody.innerHTML = '';
        projects.forEach(project => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const actionsCell = document.createElement('td');
            nameCell.textContent = project;
            actionsCell.innerHTML = `<button onclick="deleteProject('${project}')">Delete</button>`;
            row.appendChild(nameCell);
            row.appendChild(actionsCell);
            projectTableBody.appendChild(row);
        });
    }

    function displayOneProject(projectName) {
        const projects = getProjectsFromLocalStorage();
        projectTableBody.innerHTML = '';
        projects.forEach(project => {
            if (project === projectName) {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const actionsCell = document.createElement('td');
                nameCell.textContent = project;
                actionsCell.innerHTML = `<button onclick="deleteProject('${project}')">Delete</button>`;
                row.appendChild(nameCell);
                row.appendChild(actionsCell);
                projectTableBody.appendChild(row);
            }
        });
    }

    displayProjects();
});

function deleteProject(projectName) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const updatedProjects = projects.filter(project => project !== projectName);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    document.querySelector('#projectTable tbody').innerHTML = '';
    updatedProjects.forEach(project => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const actionsCell = document.createElement('td');
        nameCell.textContent = project;
        actionsCell.innerHTML = `<button onclick="deleteProject('${project}')">Delete</button>`;
        row.appendChild(nameCell);
        row.appendChild(actionsCell);
        document.querySelector('#projectTable tbody').appendChild(row);
    });
}
