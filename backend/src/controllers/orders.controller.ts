// controllers/orderController.ts
import { Request, Response } from "express";
import { Orders } from "../models/Orders";
import { Product } from "../models/Product";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user_id, userCreate, status = "pending", products } = req.body;

    if (!user_id || !userCreate || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    let subtotal = 0;
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para: ${product.name}` });
      }

     
      product.stock = Number(product.stock) - item.quantity;
      await product.save();

      
      subtotal += item.price * item.quantity;

      updatedProducts.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    const newOrder = new Orders({
      user_id,
      userCreate,
      status,
      products: updatedProducts,
      subtotal,
      entire: subtotal, 
    });

    await newOrder.save();

    return res.status(201).json({ message: "Orden creada con éxito", order: newOrder });
  } catch (error) {
    console.error("Error creando orden:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Orders.find().populate("userCreate").populate("products.productId");
    return res.json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return res.status(500).json({ message: "Error al obtener órdenes" });
  }
};

export const updateOrderToPaid = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    order.status = "completed";
    order.updateDate = new Date();

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    return res.status(500).json({ message: "Error al actualizar orden" });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    order.status = "cancelled";
    order.updateDate = new Date();

    const cancelledOrder = await order.save();
    return res.json(cancelledOrder);
  } catch (error) {
    console.error("Error al cancelar orden:", error);
    return res.status(500).json({ message: "Error al cancelar orden" });
  }
};