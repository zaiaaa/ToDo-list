const simpleTask = document.getElementById('simpleTask')
const newSimpleTask = document.getElementById('newTask')
const taskSpace = document.getElementById('taskSpace')
const localStorageKey = 'to-do-list' 

simpleTask.addEventListener("click", () => {
    newSimpleTask.innerHTML = 
    `<h1>Digite sua tarefa simples pra hoje: <h1>
        <input type="text" id="simpleTaskText">
        <button id="submitButton" onclick="NewSimpleTask()" type="button">+</button>
    `
    newSimpleTask.classList.toggle('close')
    simpleTask.classList.toggle('click')
})

function iniciarCronometro(){
        let cronometro = setInterval(() => {
        let dataAtual = new Date();
        let horaAtual = dataAtual.getHours()
        let minutos = dataAtual.getMinutes();
        let segundos = dataAtual.getSeconds();
        const cronometroDiv = document.getElementById('cronometro')    
        let horaRestante = 23 - horaAtual
        
        let minutosRestante = 59 - minutos
        
        let segundosRestante = 59 - segundos

        if(minutosRestante < 10){
            minutosRestante = '0' + minutosRestante
        }
        if(segundosRestante < 10){
            segundosRestante = '0' + segundosRestante
        }
        if(horaRestante < 10){
            horaRestante = '0' + horaRestante
        }

        cronometroDiv.innerHTML = `<p class="timeRemain">Tempo restante: <b>${horaRestante}:${minutosRestante}:${segundosRestante}</b></p>`
        if(horaAtual == 0 && minutos==0 && segundos==0){
            alert("O dia se acabou e suas tarefas não foram finalizadas")
        }
    }, 0, 1000)
}

function NewSimpleTask(){
    let inputSimpleTask = document.getElementById('simpleTaskText')
    let valor = inputSimpleTask.value
    if(!valor){
        alert("Sem tarefa")
    }else{
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: inputSimpleTask.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        iniciarCronometro()
        showValues()
    }

    let deixarInputVazio = inputSimpleTask.value = ""
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")    
    taskSpace.innerHTML = ''

    for (let i = 0; i < values.length; i++) {
        const valuesJson = values[i];
        iniciarCronometro()      
        taskSpace.innerHTML += `
        <div class='cardTask'>
            <div id='tasks'>
                Tarefa pra hoje: <br><h2>${valuesJson['name']}</h2>
                <button type='button' id='finalizar' onclick='removeItem("${valuesJson['name']}")'><i class='fa-solid fa-check'></i></button>
            </div>
        </div>
        `
    }
}
showValues()

function removeItem(data){
    
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")    
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}






















