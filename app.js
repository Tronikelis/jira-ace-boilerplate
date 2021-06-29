const express = require('express');

// middleware
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

// atlassian-connect-express also provides a middleware
const ace = require('atlassian-connect-express');

// view engine
const handlebars = require('express-handlebars');

// we also need a few stock Node modules
const http = require('http');
const os = require('os');
const helmet = require('helmet');
const nocache = require('nocache');

// app routes
const routes = require('./routes');

const dotenv = require("dotenv");

const app = express();
const addon = ace(app);

// see config.json
const port = addon.config.port();
app.set('port', port);

// log requests, using an appropriate formatter by env
const devEnv = app.get('env') === 'development';
app.use(morgan(devEnv ? 'dev' : 'combined'));

// security requirements
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: false
}));
app.use(helmet.referrerPolicy({
    policy: ['origin']
}));

// set up view engine, handlebars
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars);

// include request parsers
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

// gzip responses when appropriate
app.use(compression());

// include atlassian-connect-express middleware
app.use(addon.middleware());

app.use(nocache());

// show nicer errors in dev mode
if (devEnv) app.use(errorHandler());

routes(app, addon);

http.createServer(app).listen(port, () => {
    console.log('App server running at http://' + os.hostname() + ':' + port);

    if (devEnv) {
        addon.register();
        // ! somehow this is very important, if this was before the addon.register it would not register
        // jira does not like environment variables for some reason
        dotenv.config();
    };
});
