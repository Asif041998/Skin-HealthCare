const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const app = express();
dotenv.config();
require('./database/connection');
const port = process.env.PORT || 3000;

const options = {
  swaggerDefinition: {

    openapi: '3.0.0',
    info: {
      title: "K'ept Health Cares",
      version: '1.0.0',
      description: 'API documentation using Swagger'
    },
    servers: [
      {
        url: 'http://54.159.56.165:3000'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: []
      }
    ],
  },
  apis: [
    './routers/admin/*.js',
    './routers/admin/settings/*.js',
    './routers/user/*.js',
    './routers/*.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoute1 = require('./routers/admin/listUsers');
const authRoute2 = require('./routers/admin/admin');
const authRoute3 = require('./routers/user/user');
const authRoute4 = require('./routers/user/resetPassword');
const authRoute6 = require('./routers/admin/settings/about');
const authRoute5 = require('./routers/user/questionnaire');
const authRoute7 = require('./routers/admin/settings/hippa');
const authRoute8 = require('./routers/admin/settings/policy');
const authRoute9 = require('./routers/admin/settings/research');
const authRoute10 = require('./routers/admin/settings/terms');
const authRoute11 = require('./routers/admin/programs');
const authRoute12 = require('./routers/admin/meditation');
const authRoute13 = require('./routers/admin/speakers');
const authRoute14 = require('./routers/admin/speakerSeries');
const authRoute15 = require('./routers/admin/officeHours');
const authRoute16 = require('./routers/admin/uploads');
const authRoute17 = require('./routers/user/allergies');
const authRoute18 = require('./routers/user/products');
const authRoute19 = require('./routers/user/prescriptions');
const authRoute20 = require('./routers/user/goals')
const authRoute21 = require('./routers/user/treatments');
const authRoute22 = require('./routers/user/productNotes');
const authRoute23 = require('./routers/user/skinImages');
const authRoute24 = require('./routers/user/routines');
const authRoute25 = require('./routers/user/routineNotes');
const authRoute26 = require('./routers/admin/collaborators');
const authRoute27 = require('./routers/user/refreshToken');
const authRoute28 = require('./routers/admin/research');
const authRoute29 = require('./routers/admin/signupVerily');
const authRoute30 = require('./routers/user/emailCheck');
const authRoute31 = require('./routers/user/skinImagesTracker');
const authRoute32 = require('./routers/admin/updates');
const authRoute33 = require('./routers/user/notification');
const authRoute34 = require('./routers/user/skinAnalysis');
const authRoute35 = require('./routers/admin/commonAndSignsArticle');
const authRoute36 = require('./routers/admin/skincareSuggestion');
const authRoute37 = require('./routers/admin/skincareRoutine101');

app.use('/api/v1', authRoute1, authRoute2, authRoute3, authRoute4, authRoute5, authRoute6, authRoute7, authRoute8,
  authRoute9, authRoute10, authRoute11, authRoute12, authRoute13, authRoute14, authRoute15, authRoute16, authRoute17,
  authRoute18, authRoute19, authRoute20, authRoute21, authRoute22, authRoute23, authRoute24, authRoute25, authRoute26,
  authRoute27, authRoute28, authRoute29, authRoute30, authRoute31, authRoute32, authRoute33, authRoute34, authRoute35, authRoute36, authRoute37);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})