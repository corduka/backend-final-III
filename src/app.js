import express from "express";
import mongoose from "mongoose";
import exphbs from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerOptions from './docs/swagger.config.js'; // Adjust path if needed

const specs = swaggerJsdoc(swaggerOptions);

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Mongo connection
mongoose
  .connect("mongodb://localhost:27017/backend-final")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

app.listen(8080, () => console.log("Server running on port 8080"));
