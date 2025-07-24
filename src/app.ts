import express, { Request, Response } from 'express';

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

const app = express();
app.use(express.json());

let tarefas: Tarefa[] = [];

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Listar tarefas
app.get('/tarefas', (req: Request, res: Response) => {
  res.json({
    total: tarefas.length,
    tarefas: tarefas
  });
});

// Criar nova tarefa
app.post('/tarefas', (req: Request, res: Response) => {
  const { titulo } = req.body;
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }

  const novaTarefa: Tarefa = {
    id: Date.now(),
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// UPDATE completo - editar título e status
app.put('/tarefas/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  if (titulo !== undefined) tarefa.titulo = titulo.trim();
  if (concluida !== undefined) tarefa.concluida = Boolean(concluida);

  res.json(tarefa);
});

// Marcar como concluída (endpoint separado)
app.patch('/tarefas/:id/concluir', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefa.concluida = true;
  res.json(tarefa);
});

// Deletar tarefa
app.delete('/tarefas/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tarefaIndex = tarefas.findIndex(t => t.id === id);

  if (tarefaIndex === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
if (typeof PORT === "number") {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API de tarefas rodando na porta ${PORT}`);
    console.log(`📊 Endpoints disponíveis:`);
    console.log(`   GET    /health - Health check`);
    console.log(`   GET    /tarefas - Listar tarefas`);
    console.log(`   POST   /tarefas - Criar tarefa`);
    console.log(`   PUT    /tarefas/:id - Atualizar tarefa`);
    console.log(`   PATCH  /tarefas/:id/concluir - Marcar como concluída`);
    console.log(`   DELETE /tarefas/:id - Deletar tarefa`);
  });
}
