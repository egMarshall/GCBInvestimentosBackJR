CREATE TABLE GCB_MEDICS (
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    crm INT NOT NULL UNIQUE,
    landline INT NOT NULL,
    cellPhone INT NOT NULL,
    cep INT NOT NULL
);

CREATE TABLE GCB_ESPECIALITIES (
	id VARCHAR(255) PRIMARY KEY,
    especiality_name VARCHAR(255) NOT NULL
);

CREATE TABLE GCB_MEDICS_ESPECIALITIES (
	medic_id VARCHAR(255), 
    especiality_id VARCHAR(255),
    FOREIGN KEY(medic_id) REFERENCES GCB_MEDICS(id),
    FOREIGN KEY(especiality_id) REFERENCES GCB_ESPECIALITIES(id)
);
    
DROP TABLE GCB_MEDICS;

DROP TABLE GCB_MEDICS_ESPECIALITIES;

truncate TABLE GCB_ESPECIALITIES;

SELECT * FROM GCB_MEDICS;

SELECT * FROM GCB_ESPECIALITIES;

SELECT * FROM GCB_MEDICS_ESPECIALITIES;

INSERT INTO GCB_ESPECIALITIES (especiality_name, id)
VALUE 
("Alergologia", 1),
("Angiologia", 2),
("Buco Maxilo", 3),
("Cardiologia Clínica", 4),
("Cardiologia Infantil", 5),
("Cirurgia Cabeça e Pescoço", 6),
("Cirurgia Cardíaca", 7),
("Cirurgia de Tórax", 8);

SELECT 
	m.id as medic_id, 
	m.name as medic_name,
	m.crm as medic_crm,
	m.landline as medic_landline,
	m.cellphone as medic_cellphone, 
	m.cep as medic_cep,
	s.especiality_name as medic_especialities
FROM GCB_MEDICS m
	INNER JOIN GCB_MEDICS_ESPECIALITIES b ON m.id = b.medic_id
    INNER JOIN GCB_ESPECIALITIES s ON b.especiality_id = s.id
;

DELETE FROM GCB_MEDICS_ESPECIALITIES
WHERE medic_id = "f4cc1d9b-2c38-4e72-a5d7-c4ade955242c";

DELETE FROM GCB_MEDICS
WHERE id = "f4cc1d9b-2c38-4e72-a5d7-c4ade955242c";






