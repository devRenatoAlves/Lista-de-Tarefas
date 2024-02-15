const inputTarefa = document.querySelector('.input-tarefa')
const botao = document.querySelector('.btn-tarefa')
const lista = document.querySelector('.tarefas')




function limpaInput () { //Limpa o input e focaliza no input
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaLi() { //Cria uma "Li" no HTML
    const li = document.createElement('li') 
    return li
}

inputTarefa.addEventListener('keypress' , function(e) { //Formaliza o botão "enter(13)" para add tarefa
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
})

function criaTarefa (textoInput) { //Adiciona o texto do input no "Li"
    const li = criaLi()
    li.innerHTML = textoInput
    lista.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

botao.addEventListener('click' , function() {   //Acão de clicar no botao e avaliar se esta vazio o input
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
})

function criaBotaoApagar (li) { //Cria o botão de apagar
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.setAttribute('class' , 'apagar')
    botaoApagar.innerText = 'Apagar'
    li.appendChild(botaoApagar)
}

document.addEventListener ('click' , function (e) { //Apaga o tarefa, selecionado pela classe e removendo o parent
    const el = e.target

    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas () { //Salva as tarefas no localStorageJSON, CONVERTE PARA  O OBJETO PARA STRING
    const liTarefas = lista.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace ('Apagar' , '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas' , tarefasJSON)
}

function adicionaTarefasSalvas() { //Pegas as tarefas do localStorage e salva como tarefa
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()