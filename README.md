## 🌐 [English Version of README](README_EN.md)

# Nodejs-K8s-Cicd-Demo

API REST de lista de tarefas (ToDo) desenvolvida com Node.js e Express, containerizada with Docker and automated deployment in Kubernetes via CI/CD with GitHub Actions. Este projeto demonstra uma aplicação completa com orquestração de containers, alta disponibilidade e deploy automatizado no Oracle Kubernetes Engine (OKE).

## 🔨 Funcionalidades do Projeto

A API oferece um sistema completo de gerenciamento de tarefas com as seguintes funcionalidades:

- **Listar todas as tarefas**: Visualizar todas as tarefas cadastradas (`GET /tarefas`)
- **Criar nova tarefa**: Adicionar uma nova tarefa à lista (`POST /tarefas`)
- **Editar tarefa completa**: Modificar título e status de conclusão (`PUT /tarefas/:id`)
- **Marcar tarefa como concluída**: Alterar apenas o status para concluída (`PATCH /tarefas/:id/concluir`)
- **Deletar tarefa**: Remover uma tarefa da lista (`DELETE /tarefas/:id`)

## ✔️ Técnicas e Tecnologias Utilizadas

- **Node.js 18**: Runtime JavaScript para o backend
- **Express**: Framework web minimalista para Node.js
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Docker**: Containerização da aplicação com Alpine Linux
- **Kubernetes (OKE)**: Orquestração de containers na Oracle Cloud
- **GitHub Actions**: Pipeline CI/CD para deploy automatizado
- **Docker Hub**: Registry para armazenamento das imagens

## 📁 Estrutura do Projeto

```
|-- src/
    |-- app.ts: Arquivo principal com a API REST e interface Tarefa
|-- k8s/
    |-- deployment.yaml: Configuração de deployment com 2 réplicas
    |-- service.yaml: Configuração de LoadBalancer para exposição
|-- Dockerfile: Configuração multi-stage para build otimizado
|-- package.json: Dependências e scripts do projeto
|-- tsconfig.json: Configuração do compilador TypeScript
|-- .github/workflows/: Pipeline CI/CD (se configurado)
```

## 🛠️ Abrir e rodar o projeto

Para iniciar o projeto localmente, siga os passos abaixo:

1. **Certifique-se de que o Node.js está instalado**:
   - O [Node.js](https://nodejs.org/) versão 18 ou superior é necessário. Verifique com:
     
     ```bash
     node -v
     ```

2. **Clone o Repositório**:
   ```bash
   git clone 
   cd nodejs-k8s-cicd-demo
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Execute em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Ou compile e execute em produção**:
   ```bash
   npm run build
   npm start
   ```

A API estará disponível em `http://localhost:3000`

### 📋 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tarefas` | Lista todas as tarefas |
| POST | `/tarefas` | Cria nova tarefa |
| PUT | `/tarefas/:id` | Atualiza tarefa completa |
| PATCH | `/tarefas/:id/concluir` | Marca como concluída |
| DELETE | `/tarefas/:id` | Remove tarefa |

### 📝 Exemplo de uso

```bash
# Criar uma nova tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Kubernetes"}'

# Listar todas as tarefas
curl http://localhost:3000/tarefas

# Marcar como concluída
curl -X PATCH http://localhost:3000/tarefas/1/concluir
```

## 🌐 Deploy

### 🐳 Deploy com Docker

1. **Construir a imagem**:
   ```bash
   docker build -t nodejs-k8s-cicd-demo .
   ```

2. **Executar o container**:
   ```bash
   docker run -p 3000:3000 nodejs-k8s-cicd-demo
   ```

### ☸️ Deploy no Kubernetes

O projeto está configurado para deploy no **Oracle Kubernetes Engine (OKE)** com:

- **2 réplicas** para alta disponibilidade
- **LoadBalancer** para distribuição de tráfego
- **Resource limits**: 256Mi RAM / 200m CPU por pod
- **Resource requests**: 128Mi RAM / 100m CPU por pod

#### Deploy manual:

1. **Aplicar os manifests**:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

2. **Verificar o status**:
   ```bash
   kubectl get pods -l app=nodejs-k8s-cicd-demo
   kubectl get services nodejs-k8s-cicd-demo-service
   ```

#### O que o Kubernetes faz no projeto:

- **Alta Disponibilidade**: 2 réplicas garantem que a aplicação continue rodando mesmo se um pod falhar
- **Load Balancing**: Distribui requisições entre as instâncias automaticamente
- **Auto-healing**: Reinicia containers que param de funcionar
- **Rolling Updates**: Atualiza a aplicação sem downtime
- **Resource Management**: Controla uso de CPU e memória

### 🚀 CI/CD com GitHub Actions

O pipeline automatizado executa:

1. **Build & Test**: Instala dependências e compila TypeScript
2. **Docker Build**: Cria imagem otimizada e envia para Docker Hub
3. **Deploy**: Atualiza o cluster Kubernetes com a nova versão
4. **Verification**: Verifica se o deploy foi bem-sucedido

#### Configuração necessária:

**Secrets no GitHub:**
- `DOCKER_USERNAME` / `DOCKER_PASSWORD`: Credenciais Docker Hub
- `OKE_CLUSTER_OCID`: ID do cluster OKE
- `OCI_CLI_USER` / `OCI_CLI_TENANCY`: Configurações Oracle Cloud
- `OCI_CLI_FINGERPRINT` / `OCI_CLI_KEY_CONTENT`: Chaves de autenticação
- `OCI_CLI_REGION`: Região da Oracle Cloud

### 📊 Monitoramento

Para monitorar a aplicação em produção:

```bash
# Ver logs dos pods
kubectl logs -l app=nodejs-k8s-cicd-demo -f

# Verificar recursos utilizados
kubectl top pods -l app=nodejs-k8s-cicd-demo

# Status detalhado do deployment
kubectl describe deployment nodejs-k8s-cicd-demo
```

### 🔧 Configurações Avançadas

O projeto pode ser expandido com:

- **Horizontal Pod Autoscaler**: Escala automaticamente baseado em CPU/memória
- **Health Checks**: Probes de liveness e readiness
- **ConfigMaps/Secrets**: Gerenciamento de configurações e credenciais
- **Ingress**: Roteamento avançado e SSL
- **Persistent Storage**: Para dados que precisam persistir

**Desenvolvido para demonstrar boas práticas de DevOps, containerização e orquestração de aplicações Node.js em ambiente de produção.**

