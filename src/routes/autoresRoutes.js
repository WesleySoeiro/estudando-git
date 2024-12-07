import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginacao.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/busca", AutorController.filtrarAutores, paginar)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;
