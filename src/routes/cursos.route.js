const { Router, query } = require('express') // 
const Curso = require('../models/Curso')
const { auth } = require('../middleware/auth')
const CursoController = require('../controllers/CursoController')

const cursoRoutes = new Router()

cursoRoutes.post('/', auth, CursoController.atualizar)

cursoRoutes.get('/', auth, CursoController.listar)

cursoRoutes.delete('/:id', auth, CursoController.deletar)

cursoRoutes.put('/:id', auth, CursoController.cadastrar)

module.exports = cursoRoutes