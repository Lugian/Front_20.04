const url = "http://localhost:3000"
var data = []


function carregar() {
    fetch(url + '/vendedores', { method: 'GET' })
        .then(resp => resp.json())
        .then(resp => {
            data = resp
            listar()
        })
        .catch(err => alert(err));
}


function listar(){
    const main = document.querySelector('body')

    data.forEach(e => {
        let model = document.createElement('div')
        model.className = 'model'

        let emodel = document.createElement('div')
        emodel.className = 'emodel'
        emodel.classList.add('card')

        let edit = document.createElement('button')
        edit.setAttribute('id', 'edit')
        edit.onclick = function () {emodel.classList.remove('card')}

        let p1 = document.createElement('p')
        p1.innerHTML = e.id

        let p2 = document.createElement('p')
        p2.innerHTML = e.nome

        let p3 = document.createElement('p')
        p3.innerHTML = e.matricula

        let close = document.createElement('button')
        close.setAttribute('id', 'eclose')
        close.onclick = function() {emodel.classList.add('card')}

        let inputnome = document.createElement('input')
        inputnome.setAttribute('placeholder', 'Nome')

        let update = document.createElement('button')
        update.setAttribute('id', 'update')
        update.innerHTML = 'Atualizar'
        update.onclick = function() {

            const body = {
                "nome": inputnome.value,
    
            }
        
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            };
        
            options.body = JSON.stringify(body)
        
            fetch(url + '/vendedor/' + e.id, options)
                .then(resp => resp.status)
                .then(resp => {
                    if (resp == 201) window.location.reload()
                    else{
                        alert('burrao')
                    }
                })

        }
        
        emodel.appendChild(close)
        emodel.appendChild(inputnome)
        emodel.appendChild(update)

        model.appendChild(edit)
        model.appendChild(p1)
        model.appendChild(p2)
        model.appendChild(p3)
        model.appendChild(emodel)


        main.appendChild(model)


        
    })
}




