const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/chatgpt", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content:
                            "Eres un asesor de atención al cliente para BASSP. Responde solo a preguntas relacionadas con automatización y cómo ayudar a empresas a mejorar su eficiencia.",
                    },
                    { role: "user", content: message },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data); // Enviar la respuesta al frontend
    } catch (error) {
        console.error("Error en la solicitud a OpenAI:", error);
        res.status(500).send("Error al procesar la solicitud.");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
Archivo package.json:
json
Copiar código
{
  "name": "chatgpt-backend",
  "version": "1.0.0",
  "description": "Backend para conectar con la API de OpenAI para el asesor de BASSP",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "dotenv": "^16.4.5",
    "express": "^4.21.1"
  }
}