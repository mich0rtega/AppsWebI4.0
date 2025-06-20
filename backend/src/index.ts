import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import { connect } from 'http2';
import ConnectDBMOngo from './config/db';

const app = express(); //creando objeto del servidor express

const PORT = 3000; //Numero de puerto

app.use(express.json()); //Request de tipo json
app.use(morgan('dev')); //usar morgan en el entono de desarrollo

//Ruta principal
app.use('/api/auth',authRoutes);

ConnectDBMOngo().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});
