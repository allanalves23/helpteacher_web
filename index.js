const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000



app.use(bodyParser.json({limit: '5mb'}))

//Database control

const {dbLocal, dbProduction} = require('./database')
const knex_config = {

    client: 'mysql',
    connection: dbLocal,
    pool: {
        min: 2,
        max: 10,
    },
    acquireConnectionTimeout: 10000
}

const knex = require('knex')(knex_config)
const file = require('./links')





// View Control

app.get('/login', async (req, res) => {
    res.sendFile(file.login, {root: __dirname})
})

app.get('/', async (req, res) => {
    res.sendFile(file.index, {root: __dirname})
})

app.get('/js/scripts.js', (req, res) => {
    res.sendFile(file.js, {root: __dirname})
})

app.get('/css/style.css', (req, res) => {
    res.sendFile(file.css, {root: __dirname})
})

app.get('/disciplines', (req, res) => {
    res.sendFile(file.discipline, {root: __dirname})
})

app.get('/disciplines/new', (req, res) => {
    res.sendFile(file.formDisciplineNew, {root: __dirname})
})

app.get('/acting-areas', (req, res) => {
    res.sendFile(file.actingArea, {root: __dirname})
})

app.get('/acting-areas/new', (req, res) => {
    res.sendFile(file.formActingAreaNew, {root: __dirname})
})

app.get('/graduations', (req, res) => {
    res.sendFile(file.graduation, {root: __dirname})
})

app.get('/graduations/new', (req, res) => {
    res.sendFile(file.formGraduationsNew, {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile(file.about, {root: __dirname})
})








// Data management


//LOGIN

app.post('/signIn', (req, res) => {
    const key = {...req.body}
    try {
        if(key.password === 'apsmobile2019'){
            return res.status(204).send()
        }else{
            return res.status(401).send()
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})



//TEACHERS
const limit = 50
app.route('/teachers')
    .get((req, res) => {
        knex.select('*').from('Teacher').whereNotNull('costHour').where(builder => builder.whereNull('deleted').orWhere('deleted',false)).limit(limit).orderBy('id','desc').then(resp => {
            resp.forEach(teacher => {
                teacher.deleted = teacher.deleted ? 'Sim' : 'Não'
            })
            res.json({teachers: resp})
        }).catch(error => {
            res.status(500).send('Ocorreu um erro ao obter os dados. Erro: '+error)
        })
    })
    .delete(async (req, res) => {
        const id = req.query.id
        const teacher = {
            deleted: true
        }
        try{
            await knex('Teacher').update(teacher).where('id',id)
            return res.status(204).send()

        }catch(error){
            return resp.status(500).send()
        }
    })



//STUDENTS
app.route('/students')
    .get((req, res) => {
        knex.select('*').from('Student').where(builder => builder.whereNull('deleted').orWhere('deleted', false)).orderBy('id','desc').limit(limit).then(resp => {
            resp.forEach(student => {
                student.deleted = student.deleted ? 'Sim' : 'Não'
            })
            res.json({students: resp})
        }).catch(error => res.status(500).send('Ocorreu um erro ao obter os dados. Erro: '+error))
    })
    .delete(async (req, res) => {
        const id = req.query.id
        const student = {
            deleted: true
        }
        try{
            await knex('Student').update(student).where('id',id)
            return res.status(204).send()

        }catch(error){
            return resp.status(500).send()
        }
    })


//DISCIPLINES
app.route('/disciplines/data')
    .get((req, res) => {
        knex.select('Discipline.id','Discipline.description as discipline', 'Teacher.name','Acting Area.description as actingArea', 'Discipline.deleted').from('Discipline')
        .innerJoin('Teacher', 'Discipline.idTeacher','Teacher.id')
        .innerJoin(`Acting Area`, 'Discipline.idActingArea' ,'Acting Area.id')
        .where(builder => builder.whereNull('Discipline.deleted').orWhere('Discipline.deleted', false)).orderBy('id','desc').limit(limit).then(resp => {
            resp.forEach(discipline => {
                discipline.deleted = discipline.deleted ? 'Sim' : 'Não'
            })
            res.json({disciplines: resp})
        }).catch(error => res.status(500).send('Ocorreu um erro ao obter os dados. Erro: '+error))
    })
    .post((req, res) => {
        const discipline = {...req.body}
        try {
            
            validateInput(discipline.description, 'Descrição não informada')
            validateInput(discipline.idTeacher, 'Professor não informado')
            validateInput(discipline.idActingArea, 'Área de atuação não informada')

            discipline.description = discipline.description.toUpperCase()

            knex('Discipline').insert(discipline).then()
            
            return res.status(204).send()
        } catch (error) {
            return res.status(400).send(error)
        }
    })
    .delete(async (req, res) => {
        const id = req.query.id
        const discipline = {
            deleted: true
        }
        try{
            await knex('Discipline').update(discipline).where('id',id)
            return res.status(204).send()

        }catch(error){
            return resp.status(500).send()
        }
    })




//ACTING AREAS
app.route('/acting-area/data')
    .get((req, res) => {
        knex.select('*').from('Acting Area')
        .where(builder => builder.whereNull('deleted').orWhere('deleted', false)).orderBy('id','desc').limit(limit).then(resp => {
            resp.forEach(actingarea => {
                actingarea.deleted = actingarea.deleted ? 'Sim' : 'Não'
            })
            res.json({acting: resp})
        }).catch(error => res.status(500).send('Ocorreu um erro ao obter os dados. Erro: '+error))
    })
    .post((req, res) => {
        const area = {...req.body}
        try {
            
            validateInput(area.description, 'Descrição não informada')

            area.description = area.description.toUpperCase()

            knex('Acting Area').insert(area).then()
            
            return res.status(204).send()
        } catch (error) {
            return res.status(400).send(error)
        }
    })
    .delete(async (req, res) => {
        const id = req.query.id
        const acting = {
            deleted: true
        }
        try{
            await knex('Acting Area').update(acting).where('id',id)
            return res.status(204).send()

        }catch(error){
            return resp.status(500).send()
        }
    })





    //ACTING AREAS
app.route('/graduations/data')
    .get((req, res) => {
        knex.select('Graduation.id', 'Graduation.description as description', 'Graduation.conclusion', 'Graduation.deleted', 'Teacher.name', 'Teacher.email').from('Graduation')
        .innerJoin('Teacher', 'Graduation.idTeacher', 'Teacher.id')
        .where(builder => builder.whereNull('Graduation.deleted').orWhere('Graduation.deleted', false)).orderBy('Graduation.id','desc').limit(limit).then(resp => {
            resp.forEach(graduation => {
                graduation.conclusion = graduation.conclusion || 'NÃO CONCLUÍDO'
                graduation.deleted = graduation.deleted ? 'Sim' : 'Não'
            })
            res.json({graduation: resp})
        }).catch(error => res.status(500).send('Ocorreu um erro ao obter os dados. Erro: '+error))
    })
    .post((req, res) => {
        const graduation = {...req.body}
        try {
            
            validateInput(graduation.description, 'Descrição não informada')
            validateInput(graduation.idTeacher, 'Professor não informado')

            graduation.description = graduation.description.toUpperCase()

            if(graduation.conclusion){
                const aux = graduation.conclusion.split('/')
                graduation.conclusion = `${aux[2]+'-'+aux[1]+'-'+aux[0]}`
            }else{
                delete graduation.conclusion
            }
            
            knex('Graduation').insert(graduation).then()
            
            return res.status(204).send()
        } catch (error) {
            return res.status(400).send(error)
        }
    })
    .delete(async (req, res) => {
        const id = req.query.id
        const graduation = {
            deleted: true
        }
        try{
            await knex('Graduation').update(graduation).where('id',id)
            return res.status(204).send()

        }catch(error){
            return resp.status(500).send()
        }
    })


    const validateInput = (data, msg) =>{
        if(!data) throw msg
        if(Array.isArray(data) && data.length === 0 ) throw msg
        if(typeof data === 'string' && !data.trim()) throw msg
    }

app.listen(port, () => console.log(`Servidor executando na porta ${port}`))
