## 🌐 [Versão em Português do README](README.md)

# Nodejs-K8s-Cicd-Demo

REST API for task management (ToDo) developed with Node.js and Express, containerized with Docker and automated deployment in Kubernetes via CI/CD with GitHub Actions. This project demonstrates a complete application with container orchestration, high availability, and automated deployment on Oracle Kubernetes Engine (OKE).

## 🔨 Project Features

The API provides a complete task management system with the following functionalities:

- **List all tasks**: View all registered tasks (`GET /tarefas`)
- **Create new task**: Add a new task to the list (`POST /tarefas`)
- **Edit complete task**: Modify title and completion status (`PUT /tarefas/:id`)
- **Mark task as completed**: Change only the status to completed (`PATCH /tarefas/:id/concluir`)
- **Delete task**: Remove a task from the list (`DELETE /tarefas/:id`)

## ✔️ Technologies and Techniques Used

- **Node.js 18**: JavaScript runtime for backend
- **Express**: Minimalist web framework for Node.js
- **TypeScript**: JavaScript superset with static typing
- **Docker**: Application containerization with Alpine Linux
- **Kubernetes (OKE)**: Container orchestration on Oracle Cloud
- **GitHub Actions**: CI/CD pipeline for automated deployment
- **Docker Hub**: Registry for storing images

## 📁 Project Structure

```
|-- src/
    |-- app.ts: Main file with REST API and Tarefa interface
|-- k8s/
    |-- deployment.yaml: Deployment configuration with 2 replicas
    |-- service.yaml: LoadBalancer configuration for exposure
|-- Dockerfile: Multi-stage configuration for optimized build
|-- package.json: Project dependencies and scripts
|-- tsconfig.json: TypeScript compiler configuration
|-- .github/workflows/: CI/CD pipeline (if configured)
```

## 🛠️ Opening and Running the Project

To start the project locally, follow the steps below:

1. **Make sure Node.js is installed**:
   - [Node.js](https://nodejs.org/) version 18 or higher is required. Check with:
     
     ```bash
     node -v
     ```

2. **Clone the Repository**:
   ```bash
   git clone 
   cd nodejs-k8s-cicd-demo
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run in development mode**:
   ```bash
   npm run dev
   ```

5. **Or compile and run in production**:
   ```bash
   npm run build
   npm start
   ```

The API will be available at `http://localhost:3000`

### 📋 Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tarefas` | List all tasks |
| POST | `/tarefas` | Create new task |
| PUT | `/tarefas/:id` | Update complete task |
| PATCH | `/tarefas/:id/concluir` | Mark as completed |
| DELETE | `/tarefas/:id` | Remove task |

### 📝 Usage Example

```bash
# Create a new task
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Study Kubernetes"}'

# List all tasks
curl http://localhost:3000/tarefas

# Mark as completed
curl -X PATCH http://localhost:3000/tarefas/1/concluir
```

## 🌐 Deploy

### 🐳 Deploy with Docker

1. **Build the image**:
   ```bash
   docker build -t nodejs-k8s-cicd-demo .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 nodejs-k8s-cicd-demo
   ```

### ☸️ Deploy on Kubernetes

The project is configured for deployment on **Oracle Kubernetes Engine (OKE)** with:

- **2 replicas** for high availability
- **LoadBalancer** for traffic distribution
- **Resource limits**: 256Mi RAM / 200m CPU per pod
- **Resource requests**: 128Mi RAM / 100m CPU per pod

#### Manual deployment:

1. **Apply the manifests**:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

2. **Check status**:
   ```bash
   kubectl get pods -l app=nodejs-k8s-cicd-demo
   kubectl get services nodejs-k8s-cicd-demo-service
   ```

#### What Kubernetes does in the project:

- **High Availability**: 2 replicas ensure the application continues running even if one pod fails
- **Load Balancing**: Automatically distributes requests between instances
- **Auto-healing**: Restarts containers that stop working
- **Rolling Updates**: Updates the application without downtime
- **Resource Management**: Controls CPU and memory usage

### 🚀 CI/CD with GitHub Actions

The automated pipeline executes:

1. **Build & Test**: Installs dependencies and compiles TypeScript
2. **Docker Build**: Creates optimized image and pushes to Docker Hub
3. **Deploy**: Updates Kubernetes cluster with new version
4. **Verification**: Verifies if deployment was successful

#### Required configuration:

**GitHub Secrets:**
- `DOCKER_USERNAME` / `DOCKER_PASSWORD`: Docker Hub credentials
- `OKE_CLUSTER_OCID`: OKE cluster ID
- `OCI_CLI_USER` / `OCI_CLI_TENANCY`: Oracle Cloud configurations
- `OCI_CLI_FINGERPRINT` / `OCI_CLI_KEY_CONTENT`: Authentication keys
- `OCI_CLI_REGION`: Oracle Cloud region

### 📊 Monitoring

To monitor the application in production:

```bash
# View pod logs
kubectl logs -l app=nodejs-k8s-cicd-demo -f

# Check resource usage
kubectl top pods -l app=nodejs-k8s-cicd-demo

# Detailed deployment status
kubectl describe deployment nodejs-k8s-cicd-demo
```

### 🔧 Advanced Configurations

The project can be expanded with:

- **Horizontal Pod Autoscaler**: Automatically scales based on CPU/memory
- **Health Checks**: Liveness and readiness probes
- **ConfigMaps/Secrets**: Configuration and credential management
- **Ingress**: Advanced routing and SSL
- **Persistent Storage**: For data that needs to persist

**Developed to demonstrate DevOps best practices, containerization, and orchestration of Node.js applications in production environment.**

