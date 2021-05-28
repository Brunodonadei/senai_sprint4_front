sCREATE DATABASE wishlist_senai_tarde
GO

USE wishlist_senai_tarde
GO

CREATE TABLE desejo
(
	idDesejo	INT PRIMARY KEY IDENTITY
	,descricao	VARCHAR(255) NOT NULL
);
GO

ALTER TABLE desejo
ADD idUsuario	INT FOREIGN KEY REFERENCES usuario(idUsuario);

CREATE TABLE usuario
(
	idUsuario	INT PRIMARY KEY IDENTITY
	,idDesejo	INT FOREIGN KEY REFERENCES desejo(idDesejo)
	,email		VARCHAR(255) UNIQUE NOT NULL
	,senha		VARCHAR(255) NOT NULL

);
GO