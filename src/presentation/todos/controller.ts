import {Request,Response} from 'express'
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';



export class TodoController{
    constructor () {}


    public getTodos = async (req:Request,res:Response) => {
        const todo = await prisma.todo.findMany()
        return res.json(todo);
      }

    public getTodoById = async (req:Request,res:Response) =>{
        const Reqid = +req.params.id
        if (isNaN(Reqid))return res.status(400).json({error:'ID argument is not a number'})
        const todo = await prisma.todo.findUnique({
            where:{
                id:Reqid
            }
        })
        todo == null
        ?res.status(404).json({error:`the id: ${Reqid} not found`})
        :res.json(todo)
        
    }

    public createTodo = async (req:Request, res: Response) =>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({error});
        const todo = await prisma.todo.create({
            data: createTodoDto! 
        });
        res.json(todo);
    };

    public updateTodo = async (req:Request,res:Response) =>{
        const id = +req.params.id;
        const [error,updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        })
        if (error) return res.status(400).json({error});
        if (isNaN(id))return res.status(400).json({error:'ID argument is not a number'})
        const todo = await prisma.todo.findUnique({
                where:{
                    id:id
                }
        });
        if (!todo) return res.status(404).json({error:`Todo with od ${id} not found`})
        const {text,completedAt} = req.body;

       const updateTodo = await prisma.todo.update({
        where:{
            id:id
        },
        data: updateTodoDto!.values,
       });

        res.json(updateTodo);
    };
    public deleteTodo =async (req:Request,res:Response) =>{
        const id = +req.params.id;
        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        });
        if (!todo) return res.status(404).json({error:`Todo with od ${id} not found`})
        const deletetodo = await prisma.todo.delete({
            where:{
                id:id
            }
        })
        res.json(deletetodo)
            
    
    }
}

