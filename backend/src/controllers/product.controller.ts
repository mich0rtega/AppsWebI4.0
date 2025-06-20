import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  return res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, status, description, stock } = req.body;
    const newProduct = new Product({ name, price, status, description, stock });
    const product = await newProduct.save();
    return res.status(201).json(product);
  } catch (error) {
    console.log("Error al crear producto:", error);
    return res.status(500).json({ message: "Error al crear producto" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, price, status, description, stock } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.status = status ?? product.status;
  product.description = description ?? product.description;
  product.stock = stock ?? product.stock;

  const updatedProduct = await product.save();
  return res.json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  product.status = false;
  await product.save();

  return res.json({ message: "Producto eliminado (status = false)" });
};
