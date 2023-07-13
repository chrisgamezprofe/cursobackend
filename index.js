import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'; 
//*? RUTAS
import authRoute from './routes/auth.js';
import candidatosRoute from './routes/candidatos.js';
import eleccionesRoute from './routes/elecciones.js';
import { verifyToken } from './utils/verifyToken.js';



const app = express()
const port = 8800
dotenv.config()

app.use(cookieParser())
app.use(express.json())

//*TODO En la última sesión instalamos DOTENV
//*TODO En la última sesión instalamos MONGODB
const connect = async () =>{
  try {
    const myConn = await mongoose.connect(process.env.MONGO);
    console.log("Conectado a mongo DB")
  } catch (error) {
    console.log(error)
  }
}
//*TODO Hoy vamos a usar estas dependencias

app.get('/', (req, res) => {
  res.send(`${process.env.TITLE}`)
})



app.use("/api/v1/auth",authRoute);
app.use("/api/v1/candidatos",candidatosRoute);
app.use("/api/v1/elecciones",eleccionesRoute);

// *! Middleware para verificar token de autenticación en todas las rutas que requieran

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Servidor no disponible"

  return res.status(errorStatus).json({
    message:errorMessage,
    success:false,
    status:errorStatus
  })
})

app.listen(port, () => {
  connect()
  console.log(`Example app listening on port ${port}`)
})


