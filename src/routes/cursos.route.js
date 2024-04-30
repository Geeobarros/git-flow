const { Router, query } = require('express') // 
const Curso = require('../models/Curso')

const { auth } = require('../middleware/auth')
const CursoController = require('../controllers/CursoController')

const cursoRoutes = new Router()

cursoRoutes.post('/', auth,  async (req, res) => {
    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if (!nome) {
            return res.status(400).json({ message: "O nome é obrigatório" })
        }

        if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({
                message: "A duração do curso deve ser entre 40 e 200 horas"
            })
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        })

        res.status(201).json(curso)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o curso' })
    }

})


cursoRoutes.get('/', auth, CursoController.listar)

cursoRoutes.delete('/:id', auth, (req, res) => {
    const { id } = req.params

    Curso.destroy({
        where: {
            id: id
        }
    }) // DELETE cursos from cursos where id = 1

    res.status(204).json({})
})


cursoRoutes.put('/:id', auth, async (req, res) => {
    const { id } = req.params

    const curso = await Curso.findByPk(id)

    if (!curso) {
        return res.status(404).json({ message: 'Curso não encontrado' })
    }

    curso.update(req.body)

    await curso.save()

    res.json(curso)
})

module.exports = cursoRoutes