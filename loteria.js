const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

// Función para obtener los premios de los números
async function obtenerPremios(numeros) {
    try {
        // URL del JSON de Loterías de Navidad
        const url = 'https://e00-loterias.uecdn.es/navidad.json';

        // Realizar la solicitud HTTP
        const response = await axios.get(url);

        // Obtener los datos del JSON
        const datos = response.data;

        // Filtrar los premios para los números proporcionados
        const premios = {};
        numeros.forEach(numero => {
            if (datos.combinaciones[numero]) {
                premios[numero] = datos.combinaciones[numero];
            } else {
                premios[numero] = 'Número no premiado';
            }
        });
        console.log('Premios:', premios);
        return premios;
    } catch (error) {
        throw new Error('Error al obtener los premios: ' + error.message);
    }
}

// Ruta para consultar premios
app.post('/consultar-premios', async (req, res) => {
    const numerosAConsultar = req.body.numeros;

    if (!numerosAConsultar || !Array.isArray(numerosAConsultar)) {
        return res.status(400).json({ error: 'Se esperaba un array de números en el cuerpo de la solicitud.' });
    }

    try {
        const premios = await obtenerPremios(numerosAConsultar);
        res.json({ premios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});