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
```"# exam-scheduling-backend" 
