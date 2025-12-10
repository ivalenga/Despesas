// SALVAR SALÁRIO
document.getElementById("salvarSalario").addEventListener("click", function () { 

    let salario = document.getElementById("salario").value 
    localStorage.setItem("salario", salario)
    // Salva o salário no localStorage com a chave "salario"
    exibirResumo()
    // Atualiza o resumo financeiro na tela

});

// CADASTRAR DESPESAS
document.getElementById("formdespesas").addEventListener("submit", function(event){    // Quando o formulário de despesas for enviado

    event.preventDefault()
    // Impede o formulário de recarregar a página
    var nome1 = document.getElementById("nome").value
    // Pega o nome da despesa digitado
    var data1 = document.getElementById("data").value
    // Pega a data da despesa
    var valor1 = document.getElementById("valor").value
    // Pega o valor da despesa
    var despesa = { nome: nome1, data: data1, valor: Number(valor1) }
    // Cria um objeto representando a despesa
    // TRANSFORMA DE TEXTO P/ OBJETO
    var lista_despesas = JSON.parse(localStorage.getItem('listagem')) || []
    // Pega a lista salva no localStorage e transforma em array.
    // Se não existir nada, usa um array vazio.
    lista_despesas.push(despesa)
    // Adiciona a nova despesa no array
    // TRANSFORMA DE OBJETO P/ TEXTO
    localStorage.setItem('listagem', JSON.stringify(lista_despesas))
    // Salva a nova lista no localStorage
    document.getElementById('formdespesas').reset()
    // Limpa o formulário depois de cadastrar
    exibirDespesas()
    // Atualiza a lista de despesas na tela
    exibirResumo()
    // Atualiza o resumo financeiro
})


function exibirDespesas(){
    var lista_despesas = JSON.parse(localStorage.getItem('listagem')) || []
    // Carrega a lista de despesas do localStorage
    var output = document.getElementById('output')
    // Seleciona o elemento UL onde as despesas serão exibidas
    output.innerHTML = ''
    // Limpa a lista antes de preencher novamente
    for(let i=0; i<lista_despesas.length; i++){
        // Percorre todas as despesas cadastradas
        let li = document.createElement('li')
        // Cria um item de lista <li>
        li.textContent = 'Data: ' + lista_despesas[i].data +
                         ' | Nome: ' + lista_despesas[i].nome +
                         ' | Valor: R$ ' + lista_despesas[i].valor.toFixed(2)
        // Monta o texto da despesa
        output.appendChild(li)
        // Adiciona o item de lista na UL
    }
}

function exibirResumo() {
    var salario = Number(localStorage.getItem('salario')) || 0
    // Pega o salário salvo no localStorage
    var lista_despesas = JSON.parse(localStorage.getItem('listagem')) || []
    // Pega a lista de despesas
    var total = 0
    // Variável para somar os valores
    for (let i = 0; i < lista_despesas.length; i++) {
        total = total + lista_despesas[i].valor
        // Soma todas as despesas
    }
    var saldo = salario - total
    // Calcula o saldo final
    document.getElementById("resumo").innerHTML =
        "Salário: R$ " + salario.toFixed(2) + "<br>" +
        "Total de despesas: R$ " + total.toFixed(2) + "<br>" +
        "Saldo final: R$ " + saldo.toFixed(2)
    // Mostra tudo no HTML

    //Mudar a cor
    if (saldo < 0) {
        document.getElementById("resumo").style.color = "red";
    } else {
        document.getElementById("resumo").style.color = "green";
    }

}

function apagar(){
    let salario = localStorage.getItem("salario")
    let lista = localStorage.getItem("listagem")

    if (!salario && !lista) {
        // Se os dois forem nulos → não há nada salvo
        alert("Não existem informações")
        return
    }
    // Apaga a lista e o salário do localStorage
    localStorage.removeItem("listagem")
    localStorage.removeItem("salario")

    // Limpa a lista mostrada na tela
    document.getElementById("output").innerHTML = ""

    // Limpa o resumo financeiro
    document.getElementById("resumo").innerHTML = ""

}

