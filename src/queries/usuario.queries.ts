export const createTable = `
        CREATE TABLE IF NOT EXIST usuario
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR (100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        contraseña VARCHAR(255) NOT NULL,
        rol ENUM('user', 'admin') DEFAULT 'user',
        fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        fechaModificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
`;

export const insertUser = `
    INSERT INTO usuario (nombre, email, contraseña, rol)
    VALUES (?, ?, ?, ?);
`;

export const selectUser = `
    SELECT id, nombre, email, rol, fechaCreacion, fechaModificacion
    FROM usuario;
`;

export const selectById = `
    SELECT id, nombre, email, rol, fechaCreacion, fechaModificacion
    FROM usuario WHERE id = ?;
`;

export const selectByEmail = `
    SELECT id, nombre, email, rol, fechaCreacion, fechaModificacion
    FROM usuario WHERE email = ?;
`;

export const updateUser = `
    UPDATE usuario
    SET nombre = ?, email = ?, contraseña = ?, rol = ?, fechaModificacion = CURRENT_TIMESTAMP
    WHERE id = ?;
`;

export const deleteUser = `
    DELETE FROM usuario WHERE id = ?;
`;