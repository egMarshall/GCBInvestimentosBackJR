import { BaseDatabase } from "./BaseDatabase"

class Migrations extends BaseDatabase {
    async createTable() {
        try {
            await this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS ${this.tableNames.medics} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                crm INT NOT NULL UNIQUE,
                landline INT NOT NULL,
                cellPhone INT NOT NULL,
                cep INT NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS ${this.tableNames.especialities} (
                id VARCHAR(255) PRIMARY KEY,
                especiality_name VARCHAR(255) NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS ${this.tableNames.medicEspeciality} (
                medic_id VARCHAR(255), 
                especiality_id VARCHAR(255),
                FOREIGN KEY(medic_id) REFERENCES ${this.tableNames.medics}(id),
                FOREIGN KEY(especiality_id) ${this.tableNames.especialities}(id)
            );
    
            INSERT INTO ${this.tableNames.especialities} (especiality_name, id)
                VALUE 
                ("Alergologia", 1),
                ("Angiologia", 2),
                ("Buco Maxilo", 3),
                ("Cardiologia Clínica", 4),
                ("Cardiologia Infantil", 5),
                ("Cirurgia Cabeça e Pescoço", 6),
                ("Cirurgia Cardíaca", 7),
                ("Cirurgia de Tórax", 8);
            `)
            console.log(`
            Tables "${this.tableNames.medics}",
            "${this.tableNames.especialities}" 
            and "${this.tableNames.medicEspeciality}" created!`)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        } finally {
            Migrations.destroyConnection()
        }
    }
}

const createMigrations = new Migrations()

createMigrations.createTable()