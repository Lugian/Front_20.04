const url = "http://localhost:3000"
var data = []


function carregar() {
    fetch(url + '/rvendas', { method: 'GET' })
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
        p2.innerHTML = new Date(e.data).toLocaleDateString()

        let p3 = document.createElement('p')
        p3.innerHTML = e.quantidade

        let p4 = document.createElement('p')
        p4.innerHTML = e.produto

        let p5 = document.createElement('p')
        p5.innerHTML = e.vendedor
        

        let close = document.createElement('button')
        close.setAttribute('id', 'eclose')
        close.onclick = function() {emodel.classList.add('card')}

        let inputproduto = document.createElement('input')
        inputproduto.setAttribute('placeholder', 'Produto ID')

        let inputvendedor = document.createElement('input')
        inputvendedor.setAttribute('placeholder', 'Vendedor ID')

        let inputqtd = document.createElement('input')
        inputqtd.setAttribute('placeholder', 'Quantidade')


        let update = document.createElement('button')
        update.setAttribute('id', 'update')
        update.innerHTML = 'Atualizar'
        update.onclick = function() {

            const body = {
                "produtoId": inputproduto.value,
                "vendedorId": inputvendedor.value,
                "quantidade": inputqtd.value
            }
        
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            };
        
            options.body = JSON.stringify(body)
        
            fetch(url + '/vendas/' + e.id, options)
                .then(resp => resp.status)
                .then(resp => {
                    if (resp == 201) window.location.reload()
                    else{
                        alert('burrao')
                    }
                })

        }
        
        emodel.appendChild(close)
        emodel.appendChild(inputproduto)
        emodel.appendChild(inputvendedor)
        emodel.appendChild(inputqtd)
        emodel.appendChild(update)

        model.appendChild(edit)
        model.appendChild(p1)
        model.appendChild(p2)
        model.appendChild(p3)
        model.appendChild(p4)
        model.appendChild(p5)
        model.appendChild(emodel)


        main.appendChild(model)


        
    })
}

function add(){
    const produto = document.querySelector('#produto')
    const vendedor = document.querySelector('#vendedor')
    const qtd = document.querySelector('#quantidade')

    const body = {
        "produtoId": produto.value,
        "vendedorId": vendedor.value,
        "quantidade": qtd.value
    }


    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    options.body = JSON.stringify(body)

    fetch(url + '/venda', options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201) window.location.reload()
            else{
                alert('burrao')
            }
        })

}



