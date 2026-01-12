import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import exphbs from "express-handlebars";

// Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import adoptionsRouter from "./routes/adoptions.router.js";
import mockAdoptionsRouter from "./routes/mockAdoptions.router.js";

// Swagger
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import swaggerOptions from "./docs/swagger.config.js";

dotenv.config();

const app = express();

/* ==============================
   PATH CONFIG
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==============================
   MIDDLEWARES
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==============================
   HANDLEBARS (ONCE)
================================ */
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

/* ==============================
   ROUTES
================================ */
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/mock/adoptions", mockAdoptionsRouter);
app.use("/", viewsRouter);

/* ==============================
   SWAGGER
================================ */
const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

export default app;