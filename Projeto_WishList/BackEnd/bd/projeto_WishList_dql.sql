USE wishlist_senai_tarde
GO

SELECT * FROM desejo

SELECT * FROM usuario

SELECT descricao, email FROM desejo
LEFT JOIN usuario
ON desejo.idUsuario = usuario.idUsuario

SELECT descricao, usuario.email FROM desejo
INNER JOIN usuario
ON desejo.idUsuario = usuario.idUsuario