import { NotFoundError } from "../error/NotFoundError"
import { Medic } from "../model/Medic"
import { BaseDatabase } from "./BaseDatabase"
import axios from "axios"

export class MedicDatabase extends BaseDatabase {

    public async createMedic (
        medic: Medic
    ): Promise<string> {
            try {
                await this.getConnection()
                    .insert({
                        id: medic.getId(),
                        name: medic.getName(),
                        crm: medic.getCrm(),
                        landline: medic.getLandline(),
                        cellPhone: medic.getCellPhone(),
                        cep: medic.getCep()
                    })
                    .into(this.tableNames.medics)

                return medic.getId()
                
            } catch (error: any) {
                throw new Error(error.message || error.sqlMessage)
            }
        }

    public async getMedicById (
        id: string
    ): Promise<Medic> {
        try {
            const result = await this.getConnection().raw(`
            SELECT 
                m.id as medic_id, 
                m.name as medic_name,
                m.crm as medic_crm,
                m.landline as medic_landline,
                m.cellPhone as medic_cellPhone, 
                m.cep as medic_cep,
                s.especiality_name as medic_especialities
            FROM ${this.tableNames.medics} m
                INNER JOIN ${this.tableNames.medicEspeciality} b ON m.id = b.medic_id
                INNER JOIN ${this.tableNames.especialities} s ON b.especiality_id = s.id
            WHERE m.id = "${id}"
            `)

            if(!result[0][0]) {
                throw new NotFoundError(`Unable to find a medic with id "${id}"`)
            }

            const medic: any = {
                especialities: []
            }

            const medicAddress =  await axios(`https://viacep.com.br/ws/${result[0][0].medic_cep}/json`)
            
            if(!medicAddress.data) {
                throw new NotFoundError(`Unable to find medic address!`)
            }

            for (let m of result[0]) {
                medic.id = m.medic_id
                medic.name = m.medic_name
                medic.crm = m.medic_crm
                medic.landline = m.medic_landline
                medic.cellPhone = m.medic_cellPhone
                medic.address = medicAddress.data
                medic.especialities.push(m.medic_especialities)
            }

            return Medic.toMedicModel(medic)

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async updateMedic (
        medic: Medic
    ): Promise<string> {
        try {
        if(medic.getName()) {
            await this.getConnection().raw(`
                UPDATE ${this.tableNames.medics}
                SET name = '${medic.getName()}'
                WHERE id = '${medic.getId()}'
            `)         
        } 

        if(medic.getCrm()) {
            await this.getConnection().raw(`
                UPDATE ${this.tableNames.medics}
                SET crm = '${medic.getCrm()}'
                WHERE id = '${medic.getId()}'
            `)
        }

        if(medic.getLandline()) {
            await this.getConnection().raw(`
                UPDATE ${this.tableNames.medics}
                SET landline = '${medic.getLandline()}'
                WHERE id = '${medic.getId()}'
            `)
        }

        if(medic.getCellPhone()) {
            await this.getConnection().raw(`
                UPDATE ${this.tableNames.medics}
                SET cellPhone = '${medic.getCellPhone()}'
                WHERE id = '${medic.getId()}'
            `)
        }

        return medic.getId()
            
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async deleteMedicById (
        id: string
    ): Promise<void> {
        try {
            await this.getConnection().raw(`
                DELETE FROM ${this.tableNames.medicEspeciality}
                WHERE medic_id = "${id}"
            `)
            await this.getConnection().raw(`
                DELETE FROM ${this.tableNames.medics}
                WHERE id = "${id}"
            `)
            
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}