import { Request, Response } from "express";
import { Rol } from "../models/Rol";


export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    const newRole = new Rol({ name, type });
    const savedRole = await newRole.save();

    res.status(201).json(savedRole);
  } catch (error) {
    console.error("Error al crear el rol:", error);
    res.status(500).json({ message: "Error al crear el rol" });
  }
};
