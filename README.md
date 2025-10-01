# 🚀 Elysia + Bun + Prisma + MySQL (Docker Ready)

โปรเจกต์นี้ใช้ **Elysia Framework** ทำงานบน **Bun runtime** พร้อมกับ **Prisma ORM** เชื่อมต่อกับ **MySQL Database**  
รองรับการใช้งาน **Docker** และ **Docker Compose** สำหรับการพัฒนาและ Deploy ได้ทันที

---

## 📦 Getting Started

สร้างโปรเจกต์ใหม่ด้วยคำสั่ง:

```bash
bun create elysia ./elysia-example
```

## Development

เริ่มต้นเซิร์ฟเวอร์สำหรับการพัฒนา:

```bash
bun run dev
```

เปิดเบราว์เซอร์ไปที่ 👉 http://localhost:3000/docs

# Prisma + MySQL with Bun

โปรเจกต์นี้ใช้ **Prisma ORM** เชื่อมต่อกับ **MySQL Database** และจัดการ Schema, Migration และ Generate Types สำหรับใช้งานในแอปพลิเคชัน

---

## ⚙️ การตั้งค่า Database

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ และเพิ่มค่าเชื่อมต่อ **MySQL**:

```env
DATABASE_URL="mysql://root:mysecretpassword@localhost:3306/docs"
```

### 🛠 Prisma Commands

# init prisma

```sh
bun x prisma@latest init --datasource-provider=mysql
```

# generate types

```sh
bun x prisma generate
```

# Sync Schema (db push)

```sh
bun x prisma db push
```

# Reset Database

```sh
bun x prisma migrate reset
```

# เปิด Prisma Studio

```sh
bun x prisma studio
```

### 🐳 Docker Workflow

# Build docker image

```sh
docker build -t exam-scheduling .
```

# build docker image via docker compose

```sh
docker compose build
```

# Start app container via docker compose

```sh
docker compose up -d
```

# Start Database services

```sh
docker compose -f compose.services.yaml up -d
```

# Start Caddy services

```sh
docker compose -f compose.caddy.yaml up -d
```

# 🔑 Env Setup for Docker Compose
หากใช้ PostgreSQL สำหรับ Docker Compose ให้แก้ค่าใน .env:

```sh
DATABASE_URL="postgresql://<user>:<password>@<postgres uri>:5432/docs"
```