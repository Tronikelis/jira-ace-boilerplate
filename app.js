import express from 'express';

// middleware
import compression from 'compression';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import morgan from 'morgan';

// atlassian-connect-express also provides a middleware
import ace from 'atlassian-connect-express';

// we also need a few stock Node modules
import http from 'http';
import os from 'os';
import helmet from 'helmet';
import nocache from 'nocache';

// app routes
import routes from './routes';

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

    // if (devEnv) addon.register();
});