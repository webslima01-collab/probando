const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ⚙️ DATOS DE CONFIGURACIÓN - CAMBIA ESTOS TRES VALORES
const token = "AQUI_VA_TU_ACCESS_TOKEN"; // Copia el que te da Meta (WhatsApp Cloud)
const phoneNumberId = "AQUI_VA_TU_PHONE_NUMBER_ID"; // Aparece en el panel de Meta
const myWhatsapp = "51936752893"; // Tu número personal sin el signo +

app.post("/enviar", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const texto = `📩 Nuevo mensaje del formulario:
👤 Nombre: ${nombre}
📧 Email: ${email}
💬 Mensaje: ${mensaje}`;

  try {
    await axios.post(
      `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: myWhatsapp,
        type: "text",
        text: { body: texto },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.send("✅ Tu mensaje fue enviado correctamente");
  } catch (error) {
    console.error("❌ Error enviando mensaje:", error.response?.data || error);
    res.status(500).send("Error al enviar el mensaje.");
  }
});

app.listen(3000, () =>
  console.log("Servidor backend ejecutándose en http://localhost:3000 🚀")
);