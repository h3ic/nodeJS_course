import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Best Courses Ever API',
        description: 'Description'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/users/users.js', './routes/courses/courses.js', './routes/lessons/lessons.js', './routes/resources/resources.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
