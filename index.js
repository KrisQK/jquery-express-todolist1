const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 这行代码是 Express.js 提供的 中间件，用于解析 application/x-www-form-urlencoded 类型的请求体数据（主要用于表单提交）。
let tasks = []; // 存储任务的数组
let nextId = 1; // 自增 ID

// ✅ 获取所有任务
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ✅ 添加任务
app.post("/tianjia", (req, res) => {
    const { shujv } = req.body;
    console.log(shujv);
    if (!shujv) {
        return res
            .status(400)
            .json({ success: false, message: "shujv 不能为空" });
    }

    let newTask = { id: nextId++, task: shujv };
    console.log(newTask);

    tasks.push(newTask);

    res.json({
        success: true,
        id: newTask.id,
        message: "添加成功",
        data: tasks,
    });
});

// ✅ 删除任务
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "任务不存在" });
    }

    tasks.splice(index, 1); // ✅ 删除任务
    res.json({ success: true, message: "任务已删除" });
});

app.listen(3003, () => {
    console.log("服务器运行在 http://127.0.0.1:3003");
});
