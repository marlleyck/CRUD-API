const openModal = () => {
    const modal = document.querySelector('.modal')
    modal.classList.add('active')
}

const closeModal = () => {
    clearValues()
    retorna_original('http://127.0.0.1:5500/index.html')
    const modal = document.querySelector('.modal')
    modal.classList.remove('active')
}

const url = 'http://localhost:5500/api'

// URL

function alterar_url(nova){
    history.pushState({}, null, nova);
}


function retorna_original(url){
    history.back();
}

const urlParams = () => new URLSearchParams(window.location.search)



// ADD USER IN BODY
const clearValues = () => {
    const values = document.querySelectorAll('.inp-dados')
    values.forEach((item) => item.value = '')
}


const clearTable = () => {
    const corpo = document.getElementById('corpo-tabela')
    
    while (corpo.firstChild) {
        corpo.removeChild(corpo.lastChild)
    }
}


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
    clearTable()
    axios.get(url)
    .then(response => {
        const data = response.data.users
        data.forEach((user, index) => {
            createRow(user, index)
        })

    })
    .catch(err => console.log(err))
}


// CREATE NEW CLIENT / PUT CLIENT

const isValid = () => {
    return document.getElementById('modal-form').reportValidity()
}

const postUser = (user) => {
    axios.post(url, user)
    .then(response => alert('Usuário cadastrado!'))
    .catch(err => console.log(err))
}

const putClient = (user, id) => {
    axios.put(`${url}/${id}`, user)
    .then(response => {
        alert('Usuário atualizado!')
    })
    .catch(err => console.log(err))
}


const saveClient = () => {
    if (isValid()) {
        axios.get(url)
        .then( (response) => {
            const client = {
                name: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                number: document.getElementById('numero').value,
                city: document.getElementById('cidade').value
            }

            const set = document.getElementById('nome').dataset.new

            let urlID = window.location.href;
            urlID = urlID.split('http://127.0.0.1:5500/') ;
            urlID = urlID[1];
            
            if (set === 'new') {
                postUser(client)
                updateTable()
                closeModal()
            } else {        
                putClient(client, urlID)
                updateTable()
                closeModal()
            }

        })
        .catch(err => console.log(err))
    }
}


// EDIT AND DELETE 


const deleteClient = (index) => {

    let urlID = window.location.href;
    urlID = urlID.split('http://127.0.0.1:5500/') ;
    urlID = urlID[1];

    const response = confirm('Deseja realmente excluir o usuário?')

    if (response) {
        axios.delete(`${url}/${urlID}`)
        .then(response => {retorna_original('http://127.0.0.1:5500/index.html')})
        .catch(err => console.log(err))
    }
}

const fillFields = (user) => {
    document.getElementById('nome').value = user.name,
    document.getElementById('email').value = user.email,
    document.getElementById('numero').value = user.number,
    document.getElementById('cidade').value = user.city
}


const editClient = (index) => {
    document.getElementById('nome').dataset.new = index
    axios.get(url)
    .then(response => {
        const data = response.data.users
        const user = data[index]
        alterar_url(`http://127.0.0.1:5500/${user.id}`)
        fillFields(user)
        openModal()
    })
    .catch(err => console.log(err))
}

const editDelete = (event) => {
    const id = event.target.id
    const index = event.target.dataset.index
    
    if (id === 'editar') {
        editClient(index)
    } else if (id === 'excluir') { 
        axios.get(url)
        .then(response => {
            const data = response.data.users
            const user = data[index]
            alterar_url(`http://127.0.0.1:5500/${user.id}`)
            deleteClient(index)
            updateTable()
        })
        .catch(err => console.log(err))
    }
}



updateTable()




// EVENTS

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('cadastrarCliente')
    .addEventListener('click', () => {
        document.getElementById('nome').dataset.new = 'new'
    })

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('close')
    .addEventListener('click', closeModal)

document.getElementById('salvar')  
    .addEventListener('click', saveClient)

document.getElementById('corpo-tabela')
    .addEventListener('click', editDelete)