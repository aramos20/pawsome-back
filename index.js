//index.js -> is the entry point of the application, it is the file that will be executed by Node.js.
import app from "./src/app.js";
import connectDB from "./src/config/dbConfig.js";

const start = async () => {
  // Conectar a la base de datos
  await connectDB();
  // Iniciar el servidor

  //TODO: traer la variable de port del .env y ponerla en el app.listen para que no sea una string a mano si no la variable
  app.listen({ port: 3002 }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  });
};

start();
