# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/docs with your browser to see the result.

# Prisma + MySQL with Bun

โปรเจกต์นี้ใช้ **Prisma ORM** เชื่อมต่อกับ **MySQL Database** และจัดการ Schema, Migration และ Generate Types สำหรับใช้งานในแอปพลิเคชัน

---

## ⚙️ การตั้งค่า Database

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ และเพิ่มค่าเชื่อมต่อ **MySQL**:

```env
DATABASE_URL="mysql://root:mysecretpassword@localhost:3306/docs"
```

# Prisma

init prisma

```sh
bun x prisma@latest init --datasource-provider=mysql
```

generate types

```sh
bun x prisma generate
```

```sh
bun x prisma db push
```

```sh
bun x prisma migrate reset
```

```sh
bun x prisma studio
```

# Build docker image

```sh
docker build -t minio-file-manager .
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

# Env Setup for Docker compose

```sh
DATABASE_URL="postgresql://<user>:<password>@<postgres uri>:5432/docs"
```
