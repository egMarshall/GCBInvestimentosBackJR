export class Especiality {
    constructor(
        private especiality_name: Especialities,
        private id: string
    ){}

    getEspecialityName(): Especialities {
        return this.especiality_name
    }

    getEspecialityId(): string {
        return this.id
    }

    static toEspecialityModel(especiality: any): Especiality {
        return new Especiality(
            especiality.especiality_name,
            especiality.id
        )
    }
}

export enum Especialities  {
    ALERGOLOLOGIA = "Alergologia",
    ANGIOLOGIA =  "Angiologia",
    BUCOMAXILO = "Buco Maxilo",
    CARDIOCLINICA = "Cardiologia Clínca",
    CARDIO_INFANTO = "Cardiologia Infantil",
    CIRUR_CABE_PESC = "Cirurgia Cabeça e Pescoço",
    CIRUR_CARD = "Cirurgia Cardíaca",
    CIRUR_TORAX = "Cirurgia de Tórax"
}

export interface EspecialityDatabaseDTO {
    especiality_name: string
    id: string
}
