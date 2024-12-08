import app from "./src/app.js";

const port = process.env.PORT || 3000;
const teste2 = "alterando main"


app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
