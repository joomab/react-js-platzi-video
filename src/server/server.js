import express from "express";
import config from "./config";
import webpack from "webpack";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import serverRoutes from "../frontend/routes/serverRoutes";
import reducer from "../frontend/reducers";
import initialState from "../frontend/initialState";
import { render } from "node-sass";

const { env, port } = config;

const app = express();

if (env === "development") {
  console.log("Development config");
  const webpackConfig = require("../../webpack.config");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  //Ayuda a la configuración de webpack
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler)); //Hace el hot code replacement en todo el proyecto
}

const setResponse = (html) => {
  return `<!DOCTYPE html>
          <html>
            <head>
              <title>Platzi Video</title>
              <link rel="stylesheet" href="assets/app.css" type="text/css">
            </head>
            <body>
              <div id="app">${html}</div>
              <script src="assets/app.js" type="text/javascript"></script>
            </body>
          </html>`;
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState); //No necesitamos composeEnhancers() porque no vamos a utilizar redux dev tools
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>
  );

  res.send(setResponse(html));
};

app.get("*", renderApp);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server running in port 3000");
});
