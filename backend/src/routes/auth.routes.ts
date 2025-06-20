import { Router } from "express";
import { deleteUser, getAllUsers, getTimeToken, getUserByUsername, login, saveUser, updateToken, updateUser } from "../controllers/auth.controllers";
import { createOrder } from "../controllers/orders.controller";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";
import {
  getAllOrders,
  updateOrderToPaid,
  cancelOrder,
} from "../controllers/orders.controller";
import {
  createRole
} from "../controllers/rol.controller";
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

router.post('/orders',createOrder);

router.get("/products", getAllProducts);
router.post("/create", createProduct);
router.put("/updateprod/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);
router.get("/products/:productId", getProductById); 

router.post('/orders', createOrder);
router.get("/allorders", getAllOrders);
router.put("/orders/:id/paid", updateOrderToPaid);
router.put("/orders/:id/cancel", cancelOrder);

router.post('/rol', createRole);

export default router;