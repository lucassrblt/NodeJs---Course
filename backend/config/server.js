// Module http

const app = require("../index");

const http = require("http");
const PORT = 3001;

const server = http.createServer(app);

// // Création du server avec la méthode createServer du module http
// const app = http.createServer((req, res) => {
//   // Spécifie que tout va bein au client
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   // Envoie la réponse au client
//   res.write("Je suis le server");

//   // Finalise la réponse
//   res.end();
// });

//Spécifie sur quel port le server va écouter
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
