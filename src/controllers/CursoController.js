const Curso = require("../models/Curso")

//ex:2
class CursoController {
    async listar(req, res){
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
    }
}
module.exports = new CursoController()