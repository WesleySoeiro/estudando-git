import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    lowercase: true,
    required: [true, "O título do livro é obrigatório"],
    unique: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O ID do(a) autor(a) é obrigatório"],
  },

  editora: {
    type: String,
    lowercase: true,
    required: [true, "O título do livro é obrigatório"],
    unique: true,
    trim: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O ID do(a) autor(a) é obrigatório"],
    autopopulate: { select: "nome" },
  },
  editora: {
    type: String,
    lowercase: true,
    required: [true, "O nome da editora é obrigatório"],
    enum: {
      values: ["sextante", "classicos", "teste"],
      message: "A editora {VALUE} não é uma editora permitida",
    },
    trim: true,
  },
  preco: {
    type: Number,
    required: [true, "O preco do livro é obrigatório"],
    min: [0, "O preco do livro não pode ser negativo"],
  },
  paginas: {
    type: Number,
    required: [true, "O número de páginas do livro é obrigatório"],
    validate: {
      validator: (value) => value >= 10 && value <= 1000,
      message:
        "O livro precisa ter entre 10 e 1000 paginas - O valor fornecido foi de {VALUE} páginas",
    },
  },
});

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;
