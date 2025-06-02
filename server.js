import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post("/solve", async (req, res) => {
  const { a, b, c, result } = req.body;
  await db.query("INSERT INTO equations (a, b, c, result) VALUES ($1, $2, $3, $4)", [a, b, c, result]);
  res.send("Đã lưu!");
});

app.get("/history", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM equations ORDER BY id DESC LIMIT 10");
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
