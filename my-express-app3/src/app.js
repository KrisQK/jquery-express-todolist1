import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import { protect } from "./middlewares/auth.middleware.js"; // ✅ 引入 protect

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// 🔹 这里让所有 `/api/users` 路由都经过 `protect`，但 `/register` 和 `/login` 例外
app.use(
    "/api/users",
    (req, res, next) => {
        if (req.path === "/register" || req.path === "/login") {
            return next(); // 🔹 注册 & 登录不需要 JWT
        }
        protect(req, res, next); // 🔹 其他请求都需要 JWT
    },
    userRoutes
);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Server Error",
    });
});

export default app;
