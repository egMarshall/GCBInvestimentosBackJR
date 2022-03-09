import { Request, Response } from "express"
import { MedicBusiness } from "../business/MedicBusiness"
import { EspecDatabase } from "../data/EspecDatabase"
import { EspecMedicDatabase } from "../data/EspecMedicDatabase"
import { MedicDatabase } from "../data/MedicDatabase"
import { MedicInputDTO } from "../model/Medic"
import { IdGenerator } from "../services/idGenerator"

export class MedicController {
    async create(req: Request, res: Response) {
        try {
            const input: MedicInputDTO = {
                name: req.body.name,
                crm: req.body.crm,
                landline: req.body.landline,
                cellPhone: req.body.cellPhone,
                cep: req.body.cep,
                especiality: req.body.especiality
            }

            const medicBusiness = new MedicBusiness(
                new EspecDatabase(),
                new EspecMedicDatabase(),
                new MedicDatabase(),
                new IdGenerator()
            )
            
            const id = await medicBusiness.createMedic(input)

            res.status(201).send({id})
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id

            const medicBusiness = new MedicBusiness(
                new EspecDatabase(),
                new EspecMedicDatabase(),
                new MedicDatabase(),
                new IdGenerator()
            )

            const medic = await medicBusiness.getMedicById(id)

            res.status(200).send(medic)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id

            const input: MedicInputDTO = {
                name: req.body.name,
                crm: req.body.crm,
                landline: req.body.landline,
                cellPhone: req.body.cellPhone,
                cep: req.body.cep,
                especiality: req.body.especiality
            }

            const medicBusiness = new MedicBusiness(
                new EspecDatabase(),
                new EspecMedicDatabase(),
                new MedicDatabase(),
                new IdGenerator()
            )

            await medicBusiness.updateMedic(id, input)

            res.status(200).send({message: `Medic sucessfully updated!`})
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const id = req.params.id

            const medicBusiness = new MedicBusiness(
                new EspecDatabase(),
                new EspecMedicDatabase(),
                new MedicDatabase(),
                new IdGenerator()
            )

            await medicBusiness.deleteMedicById(id)
            res.status(200).send({message: "Medic deleted sucessfully!"})
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }
}