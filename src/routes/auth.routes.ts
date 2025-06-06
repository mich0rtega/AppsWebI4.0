import { Router } from "express";
import { deleteUser, getAllUsers, getTimeToken, getUserByUsername, login, saveUser, updateToken, updateUser } from "../controllers/auth.controllers";

const router = Router();

//Utiliza el endpoint logico
//login-user y el metodo post
router.post('/login-user',login);
router.get('/getTime/:id',getTimeToken);
router.patch('/update/:id',updateToken)
router.get("/users",getAllUsers);
router.post('/user',saveUser);
router.get('/users/name/:userName',getUserByUsername);
router.patch('/users/:userId',updateUser);
router.delete('/users/:userId',deleteUser)
export default router;