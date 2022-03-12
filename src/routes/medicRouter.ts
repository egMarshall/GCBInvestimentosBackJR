import express from "express"
import { MedicController } from "../controller/MedicController"

export const medicRouter = express.Router()
const medicController = new MedicController()

medicRouter.post("/create", medicController.create)
medicRouter.get("/:id", medicController.getById)
medicRouter.put("/update/:id", medicController.updateById)
medicRouter.delete("/delete/:id", medicController.deleteById)