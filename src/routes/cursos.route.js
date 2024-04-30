const { Router, query } = require('express') // 
const Curso = require('../models/Curso')

const { auth } = require('../middleware/auth')

const cursoRoutes = new Router()

cursoRoutes.post('/', auth,  CursoController.cadastrar)


cursoRoutes.get('/', auth,  async (req, res) => {
    try {
        let params = {}

        // SE for passado uma paramero QUERY chamado "nome" na requisição, então
        // esse parametro "nome" é adicionado dentro da variavel params
        if (req.query.nome) {
            // o ...params, cria uma cópia do params com os chaves e valores já existentes
            params = { ...params, nome: req.query.nome }
        }

        if (req.query.duracao_horas) {
            // o ...params, cria uma cópia do params com os chaves e valores já existentes
            params = { ...params, duracao_horas: req.query.duracao_horas }
        }

        const cursos = await Curso.findAll({
            where: params
        })

        res.json(cursos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível listar todos os cursos' })
    }
})


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