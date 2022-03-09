import { NotFoundError } from "../error/NotFoundError"
import { Especialities, Especiality, EspecialityDatabaseDTO } from "../model/Especialities"
import { BaseDatabase } from "./BaseDatabase"

export class EspecDatabase extends BaseDatabase {

    public async getEspecialityByName (
        input: Especialities
    ): Promise<Especiality> {
        try {
            const especiality: EspecialityDatabaseDTO[] = await this.getConnection()
                .select("*")
                .from(this.tableNames.especialities)
                .where({especiality_name: input})

                if(!especiality[0]) {
                    throw new NotFoundError(`Unable to find Especiality with id "${input}"!`)
                }

            return Especiality.toEspecialityModel(especiality[0])

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}