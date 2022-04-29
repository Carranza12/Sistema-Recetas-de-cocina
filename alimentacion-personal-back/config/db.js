const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI="mongodb+srv://carranza12:iw64NeU2p0P3nxX2@cluster0.ha2ol.mongodb.net/dbapi?retryWrites=true&w=majority"
module.exports = () => {
  const connect = () => {
    mongoose.connect(
      DB_URI,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log("hubo un error");
        } else {
          console.log("conexion exitosa!");
        }
      }
    );
  };
  connect();
};
