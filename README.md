# 📨 MICROSSERVIÇO DE NOTIFICAÇÕES

## 🚀 Descrição
Este microserviço é responsável por gerenciar **notificações de usuários**, permitindo criar, listar, marcar como lidas e remover notificações.  
O serviço utiliza **Node.js + Express** e **MongoDB** como banco de dados.

---

## 🧩 Pré-requisitos
- Node.js **v22** ou superior  
- MongoDB instalado e rodando localmente (ou acesso a uma instância remota)
- Arquivo `.env` configurado conforme o exemplo abaixo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/notifications
```

---

## ⚙️ Como executar o projeto

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run start
```

Ao iniciar o servidor, você verá no terminal:
```
✅ MongoDB conectado!
🚀 Servidor rodando na porta 3000
```

---

## 📡 Rotas disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| **POST** | `/api/notifications` | Cria uma nova notificação |
| **GET** | `/api/notifications/user/:userId` | Lista notificações de um usuário (com paginação) |
| **PATCH** | `/api/notifications/:id/read` | Marca uma notificação como lida |
| **DELETE** | `/api/notifications/:id` | Remove uma notificação (soft delete) |

---

## 🧪 Testes Unitários

Os testes cobrem as rotas principais do serviço de notificações.

```bash
npm test
```

---

## 📁 Estrutura básica do projeto

```
src/
 ├── controller/
 │    └── NotificationController.js
 ├── models/
 │    └── Notification.js
 ├── routes/
 │    └── routes.js
 ├── config/
 │    └── database.js
 └── server.js
```

---

## 🧑‍💻 Exemplo de uso

### Criar notificação
```bash
POST /api/notifications
Content-Type: application/json

{
  "userId": "12345",
  "title": "Nova mensagem",
  "message": "Você recebeu uma nova mensagem no sistema."
}
```

### Marcar como lida
```bash
PATCH /api/notifications/64b7a4d51c1f8b/read
```

### Listar por usuário
```bash
GET /api/notifications/user/12345
```

### Remover notificação
```bash
DELETE /api/notifications/64b7a4d51c1f8b
```

---

## 🧠 Observação
O projeto foi desenvolvido com foco em **boas práticas**, **separação de responsabilidades** e **uso do MongoDB** com **Mongoose**.
