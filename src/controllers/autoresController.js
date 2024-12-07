/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import { autores } from "../models/index.js";
import NaoEncontrado from "../erros/404.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const buscaAutores = autores.find();
      req.resultado = buscaAutores;
      next();
    } catch (erro) {
      console.log(erro);

      next(erro);
    }
  };

  static filtrarAutores = async (req, res, next) => {
    try {
      const id = req.query;
      const filtro = {};

      Object.entries(id).forEach(([chave, valor]) => {
        if (chave && valor.trim() !== "") {
          filtro[chave] = new RegExp(valor, "i");
        } else if (valor.trim() === "") {
          next(new NaoEncontrado(`${chave} não pode estar vazio.`));
        } else {
          next(new NaoEncontrado("Autor não encontrado"));
        }
      });

      const resultadoAutor = autores.find(filtro);
      req.resultado = resultadoAutor;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresResultado = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (autoresResultado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresResultado = await autores.findByIdAndDelete(id);

      if (autoresResultado !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
