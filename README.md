# 🏗️ **Acquisitions**

> A modern backend architecture showcasing clean engineering practices, robust CI/CD automation, and cloud-ready deployment using Docker and GitHub Actions.

This repository demonstrates full-cycle backend development — from RESTful API design and authentication to automated testing, containerization, and continuous integration pipelines.  
It’s structured to serve as both a **production-ready backend template** and a **portfolio development piece**.

---

## 🚀 **Highlights**

- ⚙️ **Modular Node.js + Express API** with scalable architecture
- 🧩 **MVC pattern** using controllers, middleware, and models
- 🧠 **Drizzle ORM** for type-safe and elegant database access
- 🧰 **Comprehensive CI/CD pipelines** via GitHub Actions
- 🧪 **Automated testing** powered by Jest & Supertest
- 🧹 **Code quality enforcement** using ESLint + Prettier
- 🐳 **Dockerized environment** for consistent dev and production builds
- ☁️ **DockerHub integration** for seamless image deployment
- 🔒 **Security-focused middleware** with Helmet, JWT & Zod validation
- 🧾 **Documentation-first approach** with clear prerequisites and setup guides

---

## 🛠️ **Tech Stack**

### 🧩 **Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0081CB?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-00599C?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

- **Node.js + Express.js** — Production-ready REST API foundation
- **Drizzle ORM** — Type-safe SQL toolkit for PostgreSQL or MySQL
- **JWT (jsonwebtoken)** — Secure token-based authentication
- **bcrypt** — Hashes and verifies passwords securely
- **Zod** — Schema validation for requests (e.g. sign-up, login forms)

---

### 🧰 **Utilities & Middleware**

![Winston](https://img.shields.io/badge/Winston-005571?style=for-the-badge&logo=logstash&logoColor=white)
![Helmet](https://img.shields.io/badge/Helmet-000000?style=for-the-badge&logo=securityscorecard&logoColor=white)
![Morgan](https://img.shields.io/badge/Morgan-00C7B7?style=for-the-badge)
![CORS](https://img.shields.io/badge/CORS-FF6F00?style=for-the-badge)
![Cookie Parser](https://img.shields.io/badge/Cookie--Parser-FFCA28?style=for-the-badge)

- **Winston** — Configurable logging with transport support
- **Helmet** — HTTP header hardening for security
- **Morgan** — Request logging middleware
- **CORS** — Cross-Origin Resource Sharing support
- **cookie-parser** — Cookie handling for authentication and sessions

---

### 🧪 **Testing & Quality**

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logo=testinglibrary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

- **Jest** — Unit and integration testing framework
- **Supertest** — HTTP assertions for testing API endpoints
- **ESLint + Prettier** — Code linting and consistent formatting

---

### ☁️ **DevOps / Deployment**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-384D54?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![DockerHub](https://img.shields.io/badge/DockerHub-0db7ed?style=for-the-badge&logo=docker&logoColor=white)

- **Docker** — Containerization for environment consistency
- **Docker Compose** — Dev & Prod configuration separation
- **GitHub Actions** — Automated CI/CD pipelines
- **DockerHub** — Continuous delivery for container images

---

## 🧾 **CI/CD Overview (GitHub Actions)**

### **Workflows**

- **`lint-and-format.yml`** — ESLint + Prettier checks for consistent code style
- **`tests.yml`** — Runs Jest + Supertest tests and publishes coverage
- **`docker-build-and-push.yml`** — Builds the Docker image and pushes to DockerHub

---

### **Stages**

| Stage | Tooling | Outcome |
|--------|----------|----------|
| **Lint & Format** | ESLint, Prettier | Enforced code quality & style |
| **Test & Coverage** | Jest, Supertest | Regressions caught early, coverage tracked |
| **Build & Package** | Docker | Reproducible, portable image |
| **Publish** | DockerHub | Image available for deployments |

---

## 🧩 **Architecture & Best Practices**

- **Clean layering**: routes → controllers → services → models
- **Validation**: Zod-based schemas for safe request parsing
- **Security**: Helmet, JWT auth middleware, CORS, cookie-parser
- **Logging**: Winston logger with transports and log levels
- **Config & Observability**: Environment-based configuration and centralized logging
- **Migrations**: Drizzle SQL + metadata tracking (`drizzle/`)
- **Developer ergonomics**: ESLint, Prettier, shell scripts for dev/prod workflows
- **Scalability**: Modular service layer and reusable middleware

---

## 🛠️ **Packages Used**

| Package | Purpose |
|----------|----------|
| **express** | Core web framework |
| **drizzle-orm** | Type-safe database ORM |
| **jsonwebtoken (JWT)** | Auth middleware for token validation |
| **bcrypt** | Secure password hashing |
| **zod** | Validation schema for signup/login |
| **helmet** | Security headers |
| **morgan** | HTTP request logger |
| **cors** | Cross-origin resource sharing |
| **cookie-parser** | Cookie parsing & management |
| **winston** | Structured logging |
| **jest** | Testing framework |
| **supertest** | API endpoint testing |

### **Local Deployment** ###
Follow **`Prerequisites.md`**
