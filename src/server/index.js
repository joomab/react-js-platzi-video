require("ignore-styles"); //Le dice al server ignora todos los llamados de css en el servidor ya que esto no se puede del lado del server

require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("asset-require-hook")({
  //Este hook no funciona si el paquete file-loader es superior a la version 5.1.0 -> npm install file-loader@5.1.0 -D -E
  extensions: ["jpg", "png", "gif"],
  name: "/assets/[hash].[ext]",
});

require("./server");
