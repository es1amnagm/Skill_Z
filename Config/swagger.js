const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Skill_Z API",
      version: "1.0.0",
      description: "Backend API Documentation"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
      
    ],
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  }
},
  },

  apis: ["./Routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = specs;