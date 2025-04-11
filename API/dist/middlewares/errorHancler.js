export const errorHandler = (err, req, res, next) => {
    console.error("Erro:", err); // Mostra o erro no console
    res.status(500).json({ erro: "Erro interno do servidor" }); // Responde com erro padrão
};
