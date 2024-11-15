import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration de Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API du projet Books',
        version: '1.0.0',
        description: 'Une simple API de gestion de livres avec Express et Redis',
      },
      servers: [
        {
            url: '/api',
        }
    ]
    },
    apis: [resolve(__dirname, '../routes/swaggerDocs.js')], // Chemin vers les fichiers de routes pour l’annotation des endpoints
};
  
export const swaggerDocs = swaggerJSDoc(swaggerOptions);