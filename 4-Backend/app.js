import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongo.js";
import { PORT } from "./src/config/env.js";
import usersRoutes from "./src/routes/users.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connection of DB
connectDB();

// ##########################
// ROUTES
// ##########################
import userRoutes from "./src/routes/users.routes.js";
app.use("/users", userRoutes);

// ##########################
// ERROR MIDDLEWARE
// ##########################
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
app.use(errorMiddleware);

// ##########################
// LISTEN
// ##########################
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
