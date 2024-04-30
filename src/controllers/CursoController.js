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

    //ex:3
    async cadastrar(req, res){
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
    }
    
    //ex:4
    async deletar(req, res){
        const id = req.params.id //DELETE FROM CURSOS WHERE ID=X
    try {
        await Curso.destroy({
            where:{
                id
            }
        })
    
        return res.status(204).json({messagem: 'deleted'})
        
    } catch (error) {
        if (!id){
            return res.status(404).json({error:"Id do curso não encontrado"})
        }
        
    }
    }

    //ex:5
    async atualizar(req, res){
        try {
            const id = req.params.id
            const curso = await Curso.findByPk(id)
        
            if(!id) {
                return res.status(404).json({mensagem: 'Curso não encontrado'})
            }
            
            curso.update(req.body)
            await curso.save()
            res.json(curso)
            
            
            
        } catch (error) {
            res.status(400).json({mensagem: 'Não foi possível atualizar o curso'})
            
        }
    }
       
}
module.exports = new CursoController()