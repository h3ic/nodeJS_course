import { app } from "./app.js";
import http from "http";
import mongoose from "mongoose";

import debugObj from "debug";
const debug = debugObj("expressjs-generator:server");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

mongoose.connection
    .on('error', err => {
        console.error(err);
    })
    .on('open', err => {
        console.log(`БД подключена `);
    })

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://h3ic:${process.env.PASS}@cluster0.mcm02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        server.listen(port);
        server.on("error", onError);
        server.on("listening", onListening);
        console.log(`Server started on ${port} port test`);
    }
    catch(err) {
        return console.log(err);
    }
}

main();

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
