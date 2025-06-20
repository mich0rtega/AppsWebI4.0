import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { json } from "stream/consumers";
import { User } from "../models/User";
import { resolveSoa } from "dns";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ message: "Se requieren username y password" });
  }

  
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

 
  const accessToken = generateAccessToken(user.id);


  cache.set(user.id, accessToken, 60 * 15);

  return res.json({
    message: "Login Exitoso",
    accessToken
  });
};


export const getTimeToken = (req:Request,res:Response) => {
  //const userId="123456789";
  const {id}= req.params;
  const ttl = cache.getTtl(id);

  if (!ttl){
    return res.status(404).json({message:"Token no encontrado"})
  }
  const now=Date.now();
  const TimeToLifeSeconds = Math.floor((ttl - now)/1000);
  const expTime = dayjs(ttl).format('HH:mm:ss')

  return res.json({
    TimeToLifeSeconds,
    expTime
  })
}

export const updateToken=(req:Request,res:Response)=>{
  const {id}= req.params;
  const ttl = cache.getTtl(id);

  if (!ttl){
    return res.status(404).json({message:"Token no encontrado"})
  }
  const newTime:number = 60*15;
  cache.ttl(id,newTime); //metodo que se actualiza tiempo de vida del token
  return res.json({message:"Actualizacion con exito"});
}

export const getAllUsers=async(req:Request,res:Response)=>{
 const userList= await User.find(); //encontrar todos los registros
 return res.json(userList);
}

export const getUserByUsername = async (req:Request,res:Response)=>{
  const {userName} = req.params;

  const userByUsername = await User.find({username:userName});

   //SELECT * FROM WHERE username= userName
  if (!userByUsername){
    return res.status(404).json({message:"Usuario no existe"})
  }

  return res.json({userByUsername});
}

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password, phone, email, roles } = req.body;

    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Debe asignarse al menos un rol" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      phone,
      email,
      roles, 
    });

    const user = await newUser.save();
    return res.json({ user });
  } catch (error) {
    console.error("Error en saveUser:", error);
    return res.status(500).json({ message: "Error al guardar usuario" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { emailUser, phone, password, name, roles } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (emailUser && emailUser !== user.email) {
      const existingEmail = await User.findOne({ email: emailUser });
      if (existingEmail) {
        return res.status(409).json({ message: "El correo ya está registrado" });
      }
      user.email = emailUser;
    }

    if (password != null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;

    if (Array.isArray(roles) && roles.length > 0) {
      user.roles = roles;
    }

    const updatedUser = await user.save();
    return res.json({ updatedUser });
  } catch (error) {
    console.error("Error en updateUser:", error);
    return res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const deleteUser= async(req:Request,res:Response)=>{
  const {userId} = req.params;
  const user =await User.findById(userId);

  if (!user){
    return res.status(404).json({message: 'Usuario no encontrado'});
  }

  user.status = false;
  user.deleteDate = new Date();

  await user.save();

  return res.json({message:'Eliminacion exitosa'})
}