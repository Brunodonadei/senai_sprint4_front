USE wishlist_senai_tarde
GO

INSERT INTO desejo (descricao)
VALUES			   ('Tirar a carta de motorista')
GO

INSERT INTO desejo (descricao, IdUsuario)
VALUES				('Corsa rebaixado',1)

INSERT INTO usuario (idDesejo, email, senha)
VALUES				('1', 'ocriador@gmail.com', 'ocriador123')

GO

UPDATE desejo 
SET IdUsuario = 1
WHERE idDesejo = 1;
