import { livros } from "../models/index.js";
import NaoEncontrado from "../erros/404.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultados !== null) {
        res.status(200).send("Livro atualizado com sucesso");
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndDelete(id);

      if (livroResultados !== null) {
        res.status(200).send("Livro excluído com sucesso");
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static filtrarLivro = async (req, res, next) => {
    try {
      const rotaQuery = req.query;
      const filtro = {};
      const minPaginas = Number(rotaQuery.minPaginas) || null;
      const maxPaginas = Number(rotaQuery.maxPaginas) || null;

      if (minPaginas || maxPaginas) {
        filtro.paginas = {};
        if (minPaginas) {
          filtro.paginas.$gte = minPaginas;
        }
        if (maxPaginas) {
          filtro.paginas.$lte = maxPaginas;
        }
      }
      console.log(filtro);

      Object.entries(rotaQuery).forEach(([chave, valor]) => {
        if (!["minPaginas", "maxPaginas"].includes(chave)) {
          filtro[chave] = new RegExp(valor, "i");
        }
      });

      const livrosResultado = livros.find(filtro);

      req.resultado = livrosResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
