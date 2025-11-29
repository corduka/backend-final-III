const swaggerOptions = {
    
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Coderhouse Backend E-Commerce API',
            version: '1.0.0',
            description: 'Final delivery documentation for the E-Commerce API, focusing on Users and Sessions.',
        },
    },
    
    apis: ['./src/routes/session.router.js'],
};

export default swaggerOptions;