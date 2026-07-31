# Daily Focus

A simple mobile-first React app for tracking daily tasks and building a consistent routine.

## Features

- Track daily progress
- Mark tasks as complete
- Add new focus tasks
- View a daily streak
- Responsive mobile and desktop layout

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

For Windows PowerShell systems where `npm.ps1` is blocked, use:

```powershell
npm.cmd install
npm.cmd run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Docker

Build the image:

```bash
docker build -t daily-focus .
```

Run the container:

```bash
docker run --rm -p 8080:80 daily-focus
```

Open `http://localhost:8080` in your browser.

## Deploy to ECS

The workflow in [.github/workflows/deploy-ecs.yml](.github/workflows/deploy-ecs.yml) builds the Docker image, pushes it to ECR, and deploys a new task definition revision to ECS.

Create these GitHub repository variables under **Settings > Secrets and variables > Actions > Variables**:

| Variable | Value |
| --- | --- |
| `AWS_REGION` | AWS region, for example `us-east-1` |
| `ECR_REPOSITORY` | Existing ECR repository name |
| `ECS_CLUSTER` | ECS cluster name |
| `ECS_SERVICE` | ECS service name |
| `ECS_TASK_DEFINITION` | Existing ECS task-definition family or ARN |
| `ECS_CONTAINER_NAME` | Container name inside the task definition |

Create this GitHub repository secret under **Secrets**:

| Secret | Value |
| --- | --- |
| `AWS_ROLE_TO_ASSUME` | ARN of an AWS IAM role trusted by GitHub Actions OIDC |

The IAM role needs permission to push to ECR and register, describe, and deploy ECS task definitions. The ECS service and task definition should already exist, and the task definition container name must match `ECS_CONTAINER_NAME`.

After setup, push to `main` or run **Deploy to Amazon ECS** manually from the repository Actions tab.
