const openModal = () => {
    const modal = document.querySelector('.modal')
    modal.classList.add('active')
}

const closeModal = () => {
    const modal = document.querySelector('.modal')
    modal.classList.remove('active')
}

const url = 'http://localhost:5500/api'


/* const saveClient = () => {
    axios.get(url)
    .then( (response) => {
        const data = response.data.users

    })
    .catch(err => console.log(err))
}
 */


// ADD USER IN BODY
const createRow = (user, index) => {
    const row = document.createElement('tr')

    row.innerHTML = `
                     <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.number}</td>
                    <td>${user.city}</td>
                    <td class="acao">
                        <button id="editar" data-index="${index}">Editar</button>
                        <button id="excluir" data-index="${index}">Excluir</button>
                    </td>  
    `
    document.getElementById('corpo-tabela').appendChild(row)
}


const updateTable = () => {
    axios.get(url)
    .then(response => {
        const data = response.data.users
        data.forEach((user, index) => {
            createRow(user, index)
        })

    })
    .catch(err => console.log(err))
}

updateTable()




// EVENTS

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('close')
    .addEventListener('click', closeModal)

/* document.getElementById('salvar')  
    .addEventListener('click', saveClient) */