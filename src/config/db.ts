import mongoose from "mongoose";

const ConnectDBMOngo = async():Promise<void>=>{
    const mongoURL='mongodb://localhost:27017/proyecto';

    try{
       await mongoose.connect(mongoURL);
       console.log("Conexion con mongo")
    }catch(error){
        console.log("Error al conectarse a MONGO",error);

    }
}
export default ConnectDBMOngo