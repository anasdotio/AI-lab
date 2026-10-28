import express from "express";
import rateLimit from "express-rate-limit";
const app = express();
app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: "Too many requests, please try again later." },
});

app.use(globalLimiter);

app.get("/api/hello", (req, res) => res.json({ message: "hi" }));

app.listen(3000, () => console.log("Server running on port 3000"));
