document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, '');
})



//PÁGINA PRINCIPAL

function getDataHome(){
    getTeachers()
    getStudents()
    
}





//PROFESSORES

async function getTeachers() {
    await verifyLocalStorage()
    
    const table = document.getElementById('teachers')
    
    axios('/teachers').then(res => {
        for(let i = 1; i <= res.data.teachers.length ;i++){
            let row = table.insertRow(i)
            row.innerHTML = "<td>"+res.data.teachers[i-1].id+"</td> <td>"+res.data.teachers[i-1].email+"</td> <td>"+
                res.data.teachers[i-1].name+"</td> <td>"+res.data.teachers[i-1].birthDate+"</td> <td>"+
                res.data.teachers[i-1].especiality+"</td> <td>"+res.data.teachers[i-1].state+"</td> <td>"+
                res.data.teachers[i-1].neighborhood+"</td> <td>"+
                res.data.teachers[i-1].costHour.toFixed(2).replace('.',',')+"</td> <td>"+
                res.data.teachers[i-1].deleted+
                `</td> <td><button class='btn waves-effect waves-light btn red' onclick='removeTeacher(${res.data.teachers[i-1].id})'><i class='material-icons'>delete_forever</i></button> </td>`
        }
    })
}

async function removeTeacher(id){
    await verifyLocalStorage()
    if(id){
        const resp = window.confirm(`Tem certeza que deseja remover o registro?`)
        
        if(resp){
            axios.delete(`/teachers?id=${id}`).then(() => {
                goToHome()
            }).catch(error => {
                M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ${error}`})
            })
        } 
    }else{
        M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ID não reconhecido`})
    }
    
}




//ALUNOS

async function getStudents(){
    await verifyLocalStorage()
    const table = document.getElementById('students')
    axios('/students').then(res => {
        for(let i = 1; i <= res.data.students.length ;i++){
            let row = table.insertRow(i)
            row.innerHTML = "<td>"+res.data.students[i-1].id+"</td> <td>"+res.data.students[i-1].name+"</td> <td>"+
                res.data.students[i-1].email+"</td> <td>"+res.data.students[i-1].cpf+"</td> <td>"+res.data.students[i-1].gender+"</td> <td>"+
                res.data.students[i-1].birthDate+"</td> <td>"+res.data.students[i-1].neighborhood+
                "<td>"+res.data.students[i-1].deleted+
                `</td> <td><button onclick='removeStudent(${res.data.students[i-1].id})' class='btn waves-effect waves-light btn red'><i class='material-icons'>delete_forever</i></button> </td>`
        }
    })
}

async function removeStudent(id){
    await verifyLocalStorage()
    if(id){
        const resp = window.confirm(`Tem certeza que deseja remover o registro?`)
        
        if(resp){
            axios.delete(`/students?id=${id}`).then(() => {
                goToHome()
            }).catch(error => {
                M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ${error}`})
            })
        } 
    }else{
        M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ID não reconhecido`})
    }
    
}


//DISCIPLINAS


async function getDisciplines(){
    await verifyLocalStorage()
    const table = document.getElementById('disciplines')
    axios('/disciplines/data').then(res => {
        for(let i = 1; i <= res.data.disciplines.length ;i++){
            let row = table.insertRow(i)
            row.innerHTML = "<td>"+res.data.disciplines[i-1].id+"</td> <td>"+res.data.disciplines[i-1].discipline+"</td> <td>"+
                res.data.disciplines[i-1].name+"</td> <td>"+res.data.disciplines[i-1].actingArea+"</td> <td>"+
                res.data.disciplines[i-1].deleted+`</td> <td><button onclick='removeDiscipline(${res.data.disciplines[i-1].id})' class='btn waves-effect waves-light btn red'><i class='material-icons'>delete_forever</i></button> </td>`
        }
    })
}

async function removeDiscipline(id){
    await verifyLocalStorage()
    if(id){
        const resp = window.confirm(`Tem certeza que deseja remover o registro?`)
        
        if(resp){
            axios.delete(`/disciplines/data?id=${id}`).then(() => {
                reload()
            }).catch(error => {
                M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ${error}`})
            })
        } 
    }else{
        M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ID não reconhecido`})
    }
    
}



//ÁREAS DE ATUAÇÃO


async function getActingArea(){
    await verifyLocalStorage()
    const table = document.getElementById('acting-area')
    axios('/acting-area/data').then(res => {
        for(let i = 1; i <= res.data.acting.length ;i++){
            let row = table.insertRow(i)
            row.innerHTML = "<td>"+res.data.acting[i-1].id+"</td> <td>"+res.data.acting[i-1].description+"</td> <td>"+
                res.data.acting[i-1].deleted+`</td> <td><button onclick='removeActingArea(${res.data.acting[i-1].id})' class='btn waves-effect waves-light btn red'><i class='material-icons'>delete_forever</i></button> </td>`
        }
    })
}

async function removeActingArea(id){
    await verifyLocalStorage()
    if(id){
        const resp = window.confirm(`Tem certeza que deseja remover o registro?`)
        
        if(resp){
            axios.delete(`/acting-area/data?id=${id}`).then(() => {
                reload()
            }).catch(error => {
                M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ${error}`})
            })
        } 
    }else{
        M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ID não reconhecido`})
    }
    
}



//GRADUAÇÕES


async function getGraduations(){
    await verifyLocalStorage()
    const table = document.getElementById('graduations')
    axios('/graduations/data').then(res => {
        for(let i = 1; i <= res.data.graduation.length ;i++){
            let row = table.insertRow(i)
            row.innerHTML = "<td>"+res.data.graduation[i-1].id+"</td> <td>"+res.data.graduation[i-1].description+"</td> <td>"+
                res.data.graduation[i-1].conclusion+"</td> <td>"+
                res.data.graduation[i-1].name+"</td> <td>"+
                res.data.graduation[i-1].email+"</td> <td>"+
                res.data.graduation[i-1].deleted+`</td> <td><button onclick='removeGraduation(${res.data.graduation[i-1].id})' class='btn waves-effect waves-light btn red'><i class='material-icons'>delete_forever</i></button> </td>`
        }
    })
}

async function removeGraduation(id){
    await verifyLocalStorage()
    if(id){
        const resp = window.confirm(`Tem certeza que deseja remover o registro?`)
        
        if(resp){
            axios.delete(`/graduations/data?id=${id}`).then(() => {
                reload()
            }).catch(error => {
                M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ${error}`})
            })
        } 
    }else{
        M.toast({html: `Ocorreu um erro ao remover o registro. Msg: ID não reconhecido`})
    }
    
}


function requestAccess(){
    const token = {
        password: document.getElementById('password').value
    }
    document.getElementById('password').value = ''
    axios.post('/signIn', token).then(() => {
        localStorage.setItem('aps', new Date())
        location.href = '/'
    }).catch(error => {
        const code = error.response.status || 0
        switch(code){
            case 401: {
                M.toast({html: 'Chave de acesso inválida'})
                break
            }
            case 500: {
                M.toast({html: `Ocorreu um erro. Msg: ${error}`})
                break
            }
            default: {
                M.toast({html: `Ocorreu um erro deconhecido. Msg: ${error}`})
            }
        }
    })
}


//OPERAÇÕES DE SISTEMA
function goToHome(){
    location.href="/"
}


function verifyLocalStorage(){
    if(!localStorage.getItem('aps')){
        location.href = '/login'
    }
}

function removeLocalStorage(){
    localStorage.removeItem('aps')
    reload()
}

function reload(){
    location.reload()
}