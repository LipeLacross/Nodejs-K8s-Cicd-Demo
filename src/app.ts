import express, { Request, Response } from 'express';

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

const app = express();
app.use(express.json());

let tarefas: Tarefa[] = [];

// Listar tarefas
app.get('/tarefas', (req: Request, res: Response) => res.json(tarefas));

// Criar nova tarefa
app.post('/tarefas', (req: Request, res: Response) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório' });
  const novaTarefa: Tarefa = { id: Date.now(), titulo, concluida: false };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Marcar como concluída
app.put('/tarefas/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  tarefa.concluida = true;
  res.json(tarefa);
});

// Deletar tarefa
app.delete('/tarefas/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API de tarefas rodando na porta ${PORT}`));
