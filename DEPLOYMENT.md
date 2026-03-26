# Deployment Guide: CatchUp App (Local)

This guide outlines how to run your **CatchUp** application (Frontend & Backend) locally using Docker Compose.

## 1. Prerequisites

Ensure the following are installed on your machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- Git (to clone the repository)

Verify your installation:

```bash
docker --version
docker compose version
```

---

## 2. Environment Variables Checklist

Before running the application, configure the required environment variables.

### Backend (`BE/.env`)

Create a `.env` file inside the `BE/` directory:

```bash
# BE/.env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
ENV=development
AWS_DYNAMODB_ENDPOINT=http://host.docker.internal:4566
```

> **Note:** For local development on Mac/Windows, `AWS_DYNAMODB_ENDPOINT` should be `http://host.docker.internal:4566` to allow the Docker container to connect to LocalStack on your host machine.

> **Note:** For local development, `NODE_ENV` and `ENV` are set to `development`.

### Frontend Build Argument

This variable is baked into the frontend JS bundle at build time.

- **`NEXT_PUBLIC_API_BASE_URL`**: Should point to your local backend.
  - _Default_: `http://localhost:5000`

---

## 3. Local Deployment Steps

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd catchup
```

### Step 2: Create the Backend `.env` File

```bash
echo "AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
ENV=development
AWS_DYNAMODB_ENDPOINT=http://host.docker.internal:4566" > ./BE/.env
```

### Step 3: Build and Start the Services

Run the following command from the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000 docker compose up -d --build
```

> **What this does:**
>
> - Builds the frontend image with `NEXT_PUBLIC_API_BASE_URL` baked in at build time.
> - Starts both the frontend and backend containers in detached mode (`-d`).

### Step 4: Access the Application

Once containers are running:

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

---

## 4. Common Commands

```bash
# View running containers
docker ps

# Follow logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend

# Stop all services
docker compose down

# Rebuild after code changes
docker compose up -d --build

# Remove containers and volumes (full reset)
docker compose down -v
```

---

## 5. Stopping the Application

```bash
# Stop containers (preserves volumes/data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
