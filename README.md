# 🗳️ Online Voting System

A **secure and role-based online voting application** built using **Node.js, Express.js, MongoDB, and JWT Authentication**.
This system allows **admins** to manage candidates and **voters** to cast their votes safely — ensuring each user can vote only once.

---

## 🚀 Features

* 🔐 **Authentication & Authorization**
  Secure JWT-based authentication with protected routes for voters and admins.

* 🧑‍💼 **Role Management**
  Two types of users — **Admin** (manages candidates) and **Voter** (casts one vote).

* 🧾 **Candidate Management**
  Admin can add, edit, and delete candidates through RESTful APIs.

* 🗳️ **Voting Functionality**
  Each voter can vote once; prevents duplicate or multiple votes.

* 📊 **Vote Counting**
  Displays all candidates with total votes in descending order.

* ⚙️ **Error Handling**
  Centralized error management using a custom `AppError` class and Express middleware.

---

## 🛠️ Tech Stack

| Layer              | Technologies Used                |
| ------------------ | -------------------------------- |
| **Backend**        | Node.js, Express.js              |
| **Database**       | MongoDB + Mongoose ODM           |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js |
| **Utilities**      | dotenv, cookie-parser            |
| **Testing**        | Postman API                      |

---

## 📂 Folder Structure

```
VotingApp/
├── controllers/
│   ├── candidateController.js
│   └── userController.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── user.js
│   └── candidate.js
├── routes/
│   ├── userRoutes.js
│   └── candidateRoutes.js
├── utils/
│   └── error.utils.js
├── app.js
├── server.js
└── package.json
```

---

## ⚡ Getting Started


### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Application

```bash
npm start
```

### 5️⃣ Test APIs using Postman

You can test routes like:

* `POST /api/user/signup`
* `POST /api/user/login`
* `GET /api/user/profile`
* `POST /api/candidate/add`
* `POST /api/candidate/vote/:candidateId`
* `GET /api/candidate/voteCount`

---

## 📈 Future Enhancements

* 🖥️ Add a React.js frontend
* 📧 Email notification system for voters
* 📊 Admin dashboard for analytics and live results

---

## 💡 Author

**👤 Rushikesh Sonje**
📧 *[try.rushikeshsonje37@gmail.com]
💻 [https://github.com/Rushikesh-sonje]

---

## ⭐ Show Your Support

If you found this project helpful, give it a ⭐ on GitHub to support the repository!
