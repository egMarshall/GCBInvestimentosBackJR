import { InvalidInputError } from "../error/InvalidInputError"
import { NotFoundError } from "../error/NotFoundError"
import { Especialities } from "../model/Especialities"
import { Medic, MedicInputDTO, MedicUpdateInputDTO } from "../model/Medic"

const MedicBusiness = {
    createMedic: jest.fn(async (input: MedicInputDTO) => {
        const id = idGenerator.generate()

        if(input.name.length > 120) {
            throw new InvalidInputError("Name must contain at most 120 characters.")
        }
 
        if(input.crm.toString().length > 7) {
            throw new InvalidInputError("CRM must contain at most 7 characters.")
        }

        if(input.cep.toString().length !== 8) {
            throw new InvalidInputError("CEP must be valid!")
        }

        if (input.especiality.length < 2) {
            throw new InvalidInputError("There must at least two especialities.")
        }

        input.especiality.map((especiality) => {
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

        return id
    }),
    getMedicById: jest.fn(async (id: string) => {
        if(id === "this_is_medic_id") {
            return Medic.toMedicModel({
                id,
                name: "this_is_medic_name",
                crm: 123467,
                landline: 33333333,
                cellPhone: 999999999,
                address: 12345678,
                especialities: ["especiality_1", "especiality_2"]
            })
        } else {
            throw new NotFoundError(`Unable to find a medic with id "${id}"`)
        }
        
    }),
    updateMedic: jest.fn(async (id: string, input: MedicUpdateInputDTO) => {
        if(!id) {
            throw new InvalidInputError("Invalid ID to updateMedic!")
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

        if(input.especiality) {
            input.especiality.map((especiality) => {
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
        }

        return id
    }),
    deleteMedicById: jest.fn(async (input: string) => {
        if(!input) {
            throw new InvalidInputError("You must provide an ID to delete!")
        }

        await MedicBusiness.getMedicById(input)
    })
}

const idGenerator = {
    generate: jest.fn(() => "this_is_medic_id")
}


describe("Create Medic Test Flow", () => {
    
    test("Should return error when wrong CRM length.", async() => {
        expect.assertions(2)

        const medic = {
            name: "this_is_medic_name",
            crm: 12345678,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 12345678,
            especiality: ["buco maxilo", "angiologia"]
        } as unknown as MedicInputDTO

        try {
            await MedicBusiness.createMedic(medic)
        } catch (error: any) {
            expect(error.message).toBe("CRM must contain at most 7 characters.")
            expect(error.code).toBe(422)
        }
    })

    test("Should return error when wrong CEP length.", async() => {
        expect.assertions(2)
        
        const medic = {
            name: "this_is_medic_name",
            crm: 1234567,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 1234567,
            especiality: ["buco maxilo", "angiologia"]
        } as unknown as MedicInputDTO

        try {
            await MedicBusiness.createMedic(medic)
        } catch (error: any) {
            expect(error.message).toBe("CEP must be valid!")
            expect(error.code).toBe(422)
        }
    })

    test("Should return error when only one especiality", async() => {
        expect.assertions(2)

        const medic = {
            name: "this_is_medic_name",
            crm: 1234567,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 12345678,
            especiality: ["buco maxilo"]
        } as unknown as MedicInputDTO

        try {
            await MedicBusiness.createMedic(medic)
        } catch (error: any) {
            expect(error.message).toBe("There must at least two especialities.")
            expect(error.code).toBe(422)
        }
    })

    test("Should return error when invalid especiality", async() => {
        expect.assertions(2)

        const medic = {
            name: "this_is_medic_name",
            crm: 1234567,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 12345678,
            especiality: ["buco maxilo", "thisIsWrong"]
        } as unknown as MedicInputDTO

        try {
            await MedicBusiness.createMedic(medic)
        } catch (error: any) {
            expect(error.message).toBe("Invalid Especiality!")
            expect(error.code).toBe(422)
        }
    })
})

describe("Get Medic by ID Test Flow", () => {

    test("Should be unable to find medic", async() => {
        expect.assertions(2)

       const id = "this_id_doesnt_exist" 

       try {
           await MedicBusiness.getMedicById(id)
       } catch (error: any) {
        expect(error.message).toBe(`Unable to find a medic with id "${id}"`)
        expect(error.code).toBe(404)
       }

    })

    test("Should be able to find medic", async() => {
       const id = "this_is_medic_id"

       try {
           await MedicBusiness.getMedicById(id)
           expect.objectContaining({
            id,
            name: "this_is_medic_name",
            crm: 123467,
            landline: 33333333,
            cellPhone: 999999999,
            address: 12345678,
            especialities: ["especiality_1", "especiality_2"]
           })
           
       } catch (error: any) {
            throw new NotFoundError(`Unable to find a medic with id "${id}"`)
       }
    })
})

describe("Update Medic Test Flow", () => {

    test("Should return error when not providing correct ID", async() => {
        expect.assertions(2)
        
        const id = undefined as unknown as string
        
        const medic = {
            name: "this_is_medic_name",
            crm: 12345678,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 12345678,
            especiality: ["buco maxilo", "angiologia"]
        } as unknown as MedicInputDTO

        try {
            await MedicBusiness.updateMedic(id, medic)
        } catch (error: any) {
            expect(error.message).toBe("Invalid ID to updateMedic!")
            expect(error.code).toBe(422)
        }
    })

    test("Should return error when not providing any Input", async() => {
        expect.assertions(2)
        
        const id = "this_is_medic_id"
        
        const medic = {} as unknown as MedicUpdateInputDTO

        try {
            await MedicBusiness.updateMedic(id, medic)
        } catch (error: any) {
            expect(error.message).toBe("Select at least one input to change!")
            expect(error.code).toBe(422)
        }
    })
})

describe("Delete Medic Test Flow", () => {

    test("Should return error when the ID is invalid", async () => {
        expect.assertions(2)

        const medic = {
            id: "this_id_doesnt_exist",
            name: "this_is_medic_name",
            crm: 12345678,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 12345678,
            especiality: ["buco maxilo", "angiologia"]
        } 

        try {
            await MedicBusiness.deleteMedicById(medic.id)

        } catch (error: any) {
            expect(error.message).toBe(`Unable to find a medic with id "${medic.id}"`)
            expect(error.code).toBe(404)
        }
    })

    test("Should return error when no ID is provided", async () => {
        expect.assertions(2)

        const medic = {
            id: undefined as unknown as string,
            name: "this_is_medic_name",
            crm: 12345678,
            landline: 33333333,
            cellPhone: 999999999,
            cep: 12345678,
            especiality: ["buco maxilo", "angiologia"]
        } 

        try {
            await MedicBusiness.deleteMedicById(medic.id)

        } catch (error: any) {
            expect(error.message).toBe("You must provide an ID to delete!")
            expect(error.code).toBe(422)
        }
    })
})
