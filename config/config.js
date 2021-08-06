module.exports = {
  dev: {
    publicPath: "/",
    devtoolType: "cheap-module-eval-source-map",
    host: "localhost",
    port: "8080",
    proxyTable: {}
  },
  build: {
    publicPath: "/",
    devtoolType: "source-map",
    staticPath: "static"
  }
};
