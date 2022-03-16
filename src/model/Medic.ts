import { Especialities } from "./Especialities"

export class Medic {
    constructor(
        private id: string,
        private name: string,
        private crm: number,
        private landline: number,
        private cellPhone: number,
        private address: object,
        private especialities: Especialities[]
    ){}

    getId():string {
        return this.id
    }

    getName():string {
        return this.name
    }

    getCrm():number {
        return this.crm
    }

    getLandline():number {
        return this.landline
    }

    getCellPhone():number {
        return this.cellPhone
    }

    getCep():object {
        return this.address
    }

    getEspecialities():Especialities[] {
        return this.especialities
    }

    static toMedicModel(medic: any):Medic {
        return new Medic(
            medic.id,
            medic.name,
            medic.crm,
            medic.landline,
            medic.cellPhone,
            medic.address,
            medic.especialities
        )
    }
}

export interface MedicInputDTO {
    name: string,
    crm: number,
    landline: number,
    cellPhone: number,
    cep: number,
    especiality: Especialities[]
}

export interface MedicUpdateInputDTO {
    name?: string,
    crm?: number,
    landline?: number,
    cellPhone?: number,
    cep?: number,
    especiality?: Especialities[]
}

