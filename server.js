import app from "./src/app.js";

const port = process.env.PORT || 3000;
const testePR = "testePR"

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
