import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        info: {
            title: 'Services Car',
            description: 'API para gerenciamento de usuários e empresas',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos de rota que você deseja documentar
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
