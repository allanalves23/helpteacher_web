document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, '');
});

function getDataHome(){
    getTeachers()
    getStudents()
    
}





//PROFESSORES

function getTeachers() {
    // console.log('teste')
    
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

function removeTeacher(id){
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

function getStudents(){
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

function removeStudent(id){
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


function getDisciplines(){
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

function removeDiscipline(id){
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





//OPERAÇÕES DE SISTEMA
function goToHome(){
    location.href="/"
}

function reload(){
    location.reload()
}