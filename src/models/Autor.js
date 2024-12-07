import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      lowercase: true,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
      unique: true,
      autopopulate: true,
    },
    nacionalidade: {
      type: String,
      lowercase: true,
      required: [true, "A nacionalidade é obrigatória"],
    },
  },
  {
    versionKey: false,
  }
);

autorSchema.plugin(autopopulate);
const autores = mongoose.model("autores", autorSchema);

export default autores;
