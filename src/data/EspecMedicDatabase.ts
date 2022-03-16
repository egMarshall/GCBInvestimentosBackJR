import { NotFoundError } from "../error/NotFoundError"
import { BaseDatabase } from "./BaseDatabase"

export class EspecMedicDatabase extends BaseDatabase {

    public async registerEspecToMedic (
        medic_id: string, especiality_id: string
        ): Promise<void> {
            try {
                await this.getConnection()
                    .insert({especiality_id, medic_id})
                    .into(this.tableNames.medicEspeciality)
            } catch (error: any) {
                throw new Error(error.message || error.sqlMessage)  
            }
        }

    public async getMedicEspec (
        input: string
    ) {
        try {
            const medicEspecialities = await this.getConnection()
                .select()
                .from(this.tableNames.medicEspeciality)
                .where({medic_id: input})
            
            if(!medicEspecialities) {
                throw new NotFoundError(`Unable to find the especiality with medic id "${input}"!`)
            }

            return medicEspecialities
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
    
    public async deleteMedicEspecialities (
        id: string
    ) {
        try {
            await this.getConnection().raw(`
                DELETE FROM ${this.tableNames.medicEspeciality}
                WHERE medic_id = "${id}"
            `)

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}