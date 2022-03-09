import { EspecDatabase } from "../data/EspecDatabase"
import { EspecMedicDatabase } from "../data/EspecMedicDatabase"
import { MedicDatabase } from "../data/MedicDatabase"
import { InvalidInputError } from "../error/InvalidInputError"
import { NotFoundError } from "../error/NotFoundError"
import { Especialities } from "../model/Especialities"
import { Medic, MedicInputDTO, MedicUpdateInputDTO } from "../model/Medic"
import { IdGenerator } from "../services/idGenerator"

export class MedicBusiness {
    constructor(
        private EspecDatabase: EspecDatabase,
        private EspecMedicDatabase: EspecMedicDatabase,
        private MedicDatabase: MedicDatabase,
        private idGenerator: IdGenerator
    ){}
    async createMedic(input: MedicInputDTO) {
        const id = this.idGenerator.generate()

        if(input.name.length > 120) {
            throw new InvalidInputError("Name must contain at most 120 characters.")
        }

        if(input.crm.toString().length > 7) {
            throw new InvalidInputError("CRM must contain at most 7 characters.")
        }

        if (input.especiality.length < 2) {
            throw new InvalidInputError("There must be only two especialities.")
        }

        const especialityArrayTreated = input.especiality.map((especiality) => {
            const treatedEspeciality = especiality
                .toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(" ", "")
                .replace(" ", "")
                // .replace(/\s/g, '') A TESTAR
                switch(treatedEspeciality) {
                    case "alergologia":
                        return Especialities.ALERGOLOLOGIA
                    case "angiologia": 
                        return Especialities.ANGIOLOGIA
                    case "bucomaxilo":
                        return Especialities.BUCOMAXILO
                    case "cardilogiaclinica":
                        return Especialities.CARDIOCLINICA
                    case "cardiologiainfantil":
                        return Especialities.CARDIO_INFANTO
                    case "cirurgiacabeçaepescoço":
                        return Especialities.CIRUR_CABE_PESC
                    case "cirurgiacardiaca":
                        return Especialities.CIRUR_CARD
                    case "cirurgiadetorax":
                        return Especialities.CIRUR_TORAX
                    default:
                        throw new InvalidInputError("Invalid Especiality!")
                }
        })

        await this.MedicDatabase.createMedic(
            Medic.toMedicModel({
                id,
                name: input.name,
                crm: input.crm,
                landline: input.landline,
                cellPhone: input.cellPhone,
                cep: input.cep
            })
        )

        especialityArrayTreated.map(async (espec) => {
            const especiality = await this.EspecDatabase.getEspecialityByName(espec)

            if(!especiality) {
                throw new NotFoundError(`Especiality not found!`)
            }

            await this.EspecMedicDatabase.registerEspecToMedic(
                id,
                especiality.getEspecialityId()
            )
        })

        return id
    }

    async getMedicById(input: string) {
        if(!input) {
            throw new InvalidInputError("Invalid input to getMedicById!")
        }

        return await this.MedicDatabase.getMedicById(input)
    }

    async updateMedic(id: string, input: MedicUpdateInputDTO) {
        if(!id) {
            throw new InvalidInputError("Invalid ID to updateMedic!")
        }
        
        if(!input) {
            throw new InvalidInputError("Invalid input to updateMedic!")
        }

        if(!input.name && !input.crm && !input.cellPhone && !input.landline && !input.cellPhone && !input.cep && !input.especiality) {
            throw new InvalidInputError("Select at least one input to change!")
        }

        if(input.name && input.name.length > 120) {
            throw new InvalidInputError("Name must contain at most 120 characters.")
        }

        if(input.crm && input.crm.toString().length > 7) {
            throw new InvalidInputError("CRM must contain at most 7 characters.")
        }

        await this.MedicDatabase.updateMedic(
            Medic.toMedicModel({
                id,
                name: input.name,
                crm: input.crm,
                landline: input.landline,
                cellPhone: input.cellPhone,
                cep: input.cep
            })
        )

        if(input.especiality) {
            await this.EspecMedicDatabase.deleteMedicEspecialities(id)

            const especialityArrayTreated = input.especiality.map((especiality) => {
                const treatedEspeciality = especiality
                    .toLowerCase()
                    .trim()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s/g, '')
                    switch(treatedEspeciality) {
                        case "alergologia":
                            return Especialities.ALERGOLOLOGIA
                        case "angiologia": 
                            return Especialities.ANGIOLOGIA
                        case "bucomaxilo":
                            return Especialities.BUCOMAXILO
                        case "cardilogiaclinica":
                            return Especialities.CARDIOCLINICA
                        case "cardiologiainfantil":
                            return Especialities.CARDIO_INFANTO
                        case "cirurgiacabeçaepescoço":
                            return Especialities.CIRUR_CABE_PESC
                        case "cirurgiacardiaca":
                            return Especialities.CIRUR_CARD
                        case "cirurgiadetorax":
                            return Especialities.CIRUR_TORAX
                        default:
                            throw new InvalidInputError("Invalid Especiality!")
                    }
            })

            especialityArrayTreated.map(async (espec) => {
                const especiality = await this.EspecDatabase.getEspecialityByName(espec)
    
                if(!especiality) {
                    throw new NotFoundError(`Especiality not found!`)
                }
    
                await this.EspecMedicDatabase.registerEspecToMedic(
                    id,
                    especiality.getEspecialityId()
                )
            })

        }
    }

    async deleteMedicById(input: string) {
        if(!input) {
            throw new InvalidInputError("Invalid input to getMedicById!")
        }

        const medic = await this.MedicDatabase.getMedicById(input)

        if(medic.getId() === undefined) {
            throw new NotFoundError("There is no Medic with this ID to delete!")
        }

        await this.MedicDatabase.deleteMedicById(input)
    }
}