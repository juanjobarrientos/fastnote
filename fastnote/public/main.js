const add = document.getElementById("add-button");
const principalContainer = document.getElementById("principal-container")
let notes;
let list;
if (JSON.parse(localStorage.getItem("notas")) == null) {
    notes = []
} else {
    notes = JSON.parse(localStorage.getItem("notas"))
}
if (JSON.parse(localStorage.getItem("lista"))== null) {
    list = []
} else {
    list = JSON.parse(localStorage.getItem("lista"))
}

let workPosition = undefined
let workValue = undefined
let resetTime = undefined

function saveNote(){
    let note = []
    let titleNote = document.getElementById("title-note").value
    let contentNote = document.getElementById("content-note").value
    let labelNote = document.getElementById("label-list").value
    note.push(titleNote)
    note.push(contentNote)
    note.push(labelNote)
    notes.push(note)

    localStorage.setItem("notas",JSON.stringify(notes))
    //console.log(notes)
    renderNotes()

}
function editNote(editElement) {
    let searched = editElement.parentNode.parentNode.childNodes[1].childNodes[1].textContent
    let position;
    let newNote=[]
    for (i in notes) {
        if (notes[i][0]==searched) {
            position = i
        }
    }
    let newTitle = document.getElementById("title-note-edit").value
    let newContent = document.getElementById("content-note-edit").value
    let newLabel = document.getElementById("label-list").value
    newNote.push(newTitle)
    newNote.push(newContent)
    newNote.push(newLabel)
    notes.splice(position,1,newNote)
    localStorage.setItem("notas",JSON.stringify(notes))
    renderNotes()
}
function renderEditNote(editElement) {
    let searched = editElement.parentNode.parentNode.childNodes[1].childNodes[1].textContent
    console.log(searched)
    let noteToEdit;
    for (i in notes) {
        if (notes[i][0]==searched) {
            noteToEdit = notes[i]
            console.log(notes[i][0])
        }
    }
    principalContainer.innerHTML = `
    <div class="holy-grail-note">
        <div class="holy-grail-note-text">
            <input type="text" value="${noteToEdit[0]}" id="title-note-edit">
            <textarea id="content-note-edit">${noteToEdit[1]}</textarea>
            <p class="notes-label-value">${noteToEdit[2]}</p>
        </div>
        <div class="holy-grail-note-options" >
            <div onClick="editNote(this)"><img src="src/guardado1.png" title="Guardar cambios"></div>
            <select id="label-list">
                <option>Sin categoria</option>
                <option>Importante</option>
                <option>Personal</option>
                <option>Trabajo</option>
                <option>Estudio</option>
            </select>
            <div onClick="renderNotes()"><img src="src/volver.png" title="Volver sin editar"></div>
        </div>
    </div>
    `;
}
function specifyNote(renderElement) {
    let searched = renderElement.closest("#render-title-note").textContent
    let noteToRender;
    for (i in notes) {
        if (notes[i][0]==searched){
            noteToRender = notes[i]
        }
    }
    principalContainer. innerHTML = `
        <div class="holy-grail-specify">
            <div class="holy-grail-specify-note">
                <p class="notes-content">${noteToRender[0]}</p>
                <p class="notes-label">${noteToRender[2]}</p>
                <hr>
                <p class="notes-body">${noteToRender[1]}</p>
            </div>
            <div class="holy-grail-note-options" >
                <div onClick="renderEditNote(this)"><img src="src/editar.png" title="Editar Nota"></div>
                <div onClick="renderNotes()"><img src="src/volver.png" title="Volver"></div>
            </div>
        </div>`;
}
function deleteNote(deleteElement) {
    console.log(deleteElement.parentNode.parentNode.childNodes[1].childNodes[1].textContent)
    let searched = deleteElement.parentNode.parentNode.childNodes[1].childNodes[1].textContent
    let noteToDelete;
    for (i in notes) {
        if (notes[i][0]==searched){
            noteToDelete = i
            console.log(noteToDelete)
        }
    }
    notes.splice(noteToDelete,1)
    localStorage.setItem("notas",JSON.stringify(notes))
    console.log(notes)
    renderNotes()
}
function renderNotes(){
    let noteRender = JSON.parse(localStorage.getItem("notas"))
    // console.log(noteRender)
    principalContainer.innerHTML=`<p class="notes-content">Notas</p>`;

    for (i in noteRender) {
        let subContainer = document.createElement("div")
        subContainer.innerHTML=`
        <div class="holy-grail-render">
            <div class="holy-grail-render-note" >
                <p id="render-title-note" onClick="specifyNote(this)">${noteRender[i][0]}<p>
            </div>
            <div class="holy-grail-render-changes">
                <div onClick="deleteNote(this)"><img src="src/delete.png" class="render-delete" ></div>
                <div onClick="renderEditNote(this)"><img src="src/editar.png" class="render-edit"></div>
            </div>
        </div>`;
        principalContainer.appendChild(subContainer)
    }  
}
function makeNote(){
    principalContainer.innerHTML = `
    <div class="holy-grail-note">
        <div class="holy-grail-note-text">
            <input type="text" placeholder="Titulo..." id="title-note">
            <textarea placeholder="Nota..." id="content-note"></textarea>
        </div>
        <div class="holy-grail-note-options" >
            <div onClick="saveNote()"><img src="src/guardado1.png" title="Guardar nota"></div>
            <select id="label-list">
                <option>Sin categoria</option>
                <option>Importante</option>
                <option>Personal</option>
                <option>Trabajo</option>
                <option>Estudio</option>
            </select>
        </div>
    </div>
    `;
}

function saveListWork() {
    let work = []
    let workText = document.getElementById("content-work").value
    work.push(workText)
    work.push(0)
    list.push(work)
    localStorage.setItem("lista",JSON.stringify(list))
    renderList()
}
function renderList() {
    let listRender = JSON.parse(localStorage.getItem("lista"))
    principalContainer.innerHTML = `<p class="notes-content">Lista de Tareas</p>`

    for (i in listRender) {
        let subContainer = document.createElement("div")
        if(listRender[i][1]==0){
            subContainer.innerHTML=`
        <div class="holy-grail-work">
            <div class="holy-grail-work-check">
                <input type="checkbox" onClick="workChecked(this)" id="checkbox-work">
            </div>
            <div class="holy-grail-work-value"><p id="work-value">${listRender[i][0]}</p></div>
            <div class="holy-grail-work-options">
                <div onClick="deleteWorkList(this)"><img src="src/delete.png" class="render-delete"></div>
                <div onClick="renderEditWorkList(this)"><img src="src/editar.png" class="render-edit"></div>
            </div>
        </div>`;
        }else{
            subContainer.innerHTML=`
        <div class="holy-grail-work work-check">
            <div class="holy-grail-work-check work-check">
                <input type="checkbox" checked=true onClick="workChecked(this)" id="checkbox-work">
            </div>
            <div class="holy-grail-work-value"><p id="work-value">${listRender[i][0]}</p></div>
            <div class="holy-grail-work-options">
                <div onClick="deleteWorkList(this)"><img src="src/delete.png" class="render-delete"></div>
                <div onClick="renderEditWorkList(this)"><img src="src/editar.png" class="render-edit"></div>
            </div>
        </div>`;
        }
        
        principalContainer.appendChild(subContainer)
    }
}
function workChecked(checkElement) {
    let searched = checkElement.parentNode.parentNode.childNodes[3].childNodes[0].textContent
    let workToCheck = checkElement.closest(".holy-grail-work")
    if (checkElement.checked) {
        workToCheck.className += " work-check"
        for (i in list){
            if (list[i][0]==searched) {
                list[i][1] = 1
            }
        }
    }else{
        workToCheck.classList.remove("work-check")
        for (i in list){
            if (list[i][0]==searched) {
                list[i][1] = 0
            }
        }
    }
    localStorage.setItem("lista",JSON.stringify(list))

}
function renderEditWorkList(editElement) {
    let searched = editElement.parentNode.parentNode.childNodes[3].childNodes[0].textContent
    let editable;
    let containerToRender = editElement.closest(".holy-grail-work")
    for (i in list){
        if (list[i][0] == searched){
            editable = list[i]
            workPosition = i
            workValue = list[i][1]
        }
    }
    containerToRender.innerHTML = `
    <div class="holy-grail-work-check">
        <input type="checkbox">
    </div>
    <div class="holy-grail-work-value"><textarea id="work-edit-content">${editable[0]}</textarea></div>
    <div class="holy-grail-work-options">
        <div onClick="editWorkList()"><img src="src/guardado1.png" class="render-save"></div>
    </div>`
}
function editWorkList() {
    let newWork = []
    let newWorkText= document.getElementById("work-edit-content").value
    newWork.push(newWorkText)
    newWork.push(workValue)
    list.splice(workPosition,1,newWork)
    localStorage.setItem("lista",JSON.stringify(list))
    workPosition = undefined
    workValue = undefined
    renderList()
}
function deleteWorkList(deleteElement) {
    let searched = deleteElement.parentNode.parentNode.childNodes[3].childNodes[0].textContent
    console.log(searched)
    let workToDelete;
    for (i in list) {
        if (list[i][0]==searched){
            workToDelete = i
            console.log(workToDelete)
        }
    }
    list.splice(workToDelete,1)
    localStorage.setItem("lista",JSON.stringify(list))
    renderList()
}
function makeListWork() {
    principalContainer.innerHTML = `
    <div class="holy-grail-list">
            <textarea placeholder="Tarea..." id="content-work"></textarea>
            <button onClick="saveListWork()">+ Agregar tarea</button>
    </div>
    `
}
function createWorkList() {
    let selector = document.getElementById("worklist-pomodoro")
    for (i in list) {
        let newOption = document.createElement("option")
        newOption.textContent = list[i][0]
        selector.appendChild(newOption)
    }
}
function renderPomodoro(){
    resetTime = document.getElementById("duration-reset").value
    let seconds = 00
    let workToDo = document.getElementById("worklist-pomodoro").value
    let minutes = document.getElementById("duration-pomodoros").value
    let subContainer = document.getElementById("pomodoro-principal")
    let pomodoroContainer = document.createElement("div")
    pomodoroContainer.setAttribute("id","pomodoro-container")
    pomodoroContainer.setAttribute("class","pomo")
    pomodoroContainer.innerHTML = `
    <p id="pomodoro-title">Tiempo de Trabajo</p>
    <div class="marco-pomodoro">
        <p class="tiempo-min" id="minutos">${minutes}</p>
        <p>:</p>
        <p class="tiempo-segs" id="segundos">${seconds}</p>
    </div>
    <p id="pomodoro-work">${workToDo}</p>
    `
    principalContainer.innerHTML = `
    <p class="initial-content">Escoja una opcion del panel para seguir</p>
    `
    subContainer.appendChild(pomodoroContainer)
    let temporizador = setInterval(() => {
        let tiempoMin = document.getElementById("minutos")
        let tiempoSegs = document.getElementById("segundos")
        tiempoSegs.innerHTML = `${seconds}`
        tiempoMin.innerHTML = `${minutes}`
        if (minutes!=0 && seconds!=0) {
            seconds = seconds - 1
        }else if(minutes==0 && seconds != 0 ){
            seconds = seconds - 1  
        }
        else if(minutes!=0 && seconds == 0) {
            minutes = minutes - 1
            seconds = 60
            seconds = seconds - 1
        }else if(minutes==0 && seconds == 0){
            clearInterval(temporizador)
            renderReset()
        }
    }, 1000);
}
function renderReset() {
    let seconds = 00
    let minutes = resetTime
    let pomodoroContainer = document.getElementById("pomodoro-container")
    pomodoroContainer.innerHTML = `
    <p id="pomodoro-title">Receso</p>
    <div class="marco-pomodoro">
        <p class="tiempo-min" id="minutos">${minutes}</p>
        <p>:</p>
        <p class="tiempo-segs" id="segundos">${seconds}</p>
    </div>
    `
    let temporizador = setInterval(() => {
        let tiempoMin = document.getElementById("minutos")
        let tiempoSegs = document.getElementById("segundos")
        tiempoSegs.innerHTML = `${seconds}`
        tiempoMin.innerHTML = `${minutes}`
        if (minutes!=0 && seconds!=0) {
            seconds = seconds - 1
        }else if(minutes==0 && seconds != 0 ){
            seconds = seconds - 1  
        }
        else if(minutes!=0 && seconds == 0) {
            minutes = minutes - 1
            seconds = 60
            seconds = seconds - 1
        }else if(minutes==0 && seconds == 0){
            clearInterval(temporizador)
            pomodoroContainer.remove()
            createPomodoro()
        }
    }, 1000);
}
function createPomodoro(){
    principalContainer.innerHTML = `
    <div>
        <div class="holy-grail-pomodoro">
            <div class="holy-grail-pomodoro-config">
                <p>Configure su pomodoro:</p>
                <label for="duration-pomodoros">Ingrese el tiempo de trabajo en minutos (Ej: 25):</label>
                <input type="number" id="duration-pomodoros" placeholder="">
                <label for="duration-reset">Ingrese el tiempo de receso en minutos (Ej: 5):</label>
                <input type="number" id="duration-reset" placeholder="">
            </div>
            <div class="holy-grail-pomodoro-works">
                <p>Seleccione una tarea a realizar:</p>
                <select id="worklist-pomodoro"></select>
            </div>
        </div>
        <div class="holy-grail-pomodoro-button">
            <button class="start-pomodoro" onClick="renderPomodoro()">+ Empezar Pomodoro</button>
        </div>
    </div>
    `
    createWorkList()
}
function renderLabels(){
    principalContainer.innerHTML = `
    <p class="notes-content">Seleccione una etiqueta:</p>
    <div class="holy-grail-label">
        <div class="holy-grail-label-value" onclick="renderLabelNotes(this)"><p id="work-value">Sin categoria</p></div>
        <div class="holy-grail-label-value" onclick="renderLabelNotes(this)"><p id="work-value">Importante</p></div>
        <div class="holy-grail-label-value" onclick="renderLabelNotes(this)"><p id="work-value">Personal</p></div>
        <div class="holy-grail-label-value" onclick="renderLabelNotes(this)"><p id="work-value">Trabajo</p></div>
        <div class="holy-grail-label-value" onclick="renderLabelNotes(this)"><p id="work-value">Estudio</p></div>
    </div>
    `
}
function renderLabelNotes(elementToRender){
    let searched = elementToRender.childNodes[0].textContent
    console.log(searched)

    let notesToRender = []

    for (i in notes) {
        if (notes[i][2]==searched) {
            notesToRender.push(notes[i])
        }
    }
    principalContainer.innerHTML= `<p class="notes-content">${searched}</p>`

    for (i in notesToRender) {
        let subContainer = document.createElement('div')
        subContainer.innerHTML = `
        <div class="holy-grail-render">
        <div class="holy-grail-render-note" >
            <p id="render-title-note" onClick="specifyNote(this)">${notesToRender[i][0]}<p>
        </div>
        <div class="holy-grail-render-changes">
            <div onClick="deleteNote(this)"><img src="src/delete.png" class="render-delete" ></div>
            <div onClick="renderEditNote(this)"><img src="src/editar.png" class="render-edit"></div>
        </div>
    </div>`;
    principalContainer.appendChild(subContainer)
    }
}

add.addEventListener("click",makeNote)