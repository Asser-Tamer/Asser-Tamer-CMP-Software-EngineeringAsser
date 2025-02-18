function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', deleteEmployee)
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

const submitButton = document.querySelector('button[type="submit"]')
submitButton.addEventListener('click', createEmployee)

function createEmployee() {
  const name = document.getElementById('name').value
  const id = document.getElementById('id').value

  if (!name || !id) {
    return
  }

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, name: name }),
  }).then(response => {
    if (response.status === 201) {
      fetchEmployees()
    }
  })
}

function deleteEmployee() {
  const id = this.parentElement.parentElement.firstChild.textContent

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.status === 200) {
      fetchEmployees()
    }
  })
}

fetchEmployees()