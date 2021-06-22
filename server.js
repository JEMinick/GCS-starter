const express = require("express")
const app = express()

// Port
const PORT = process.env.PORT || 3001; // 8080

const sequelize = require('./config/connection');


// app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

//handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
const renderRoutes = require("./controllers/render-routes.js");
app.use(renderRoutes);
const apiRoutes = require("./controllers/api-routes.js");
apiRoutes(app);

// Sync models
const db = require("./models")

//Syncing sequelize models and then starting express server
// sequelize.sync().then(function() {
//     app.listen(PORT, function() {
//       console.log( "\n🌎 App listening on PORT " + PORT + "\n" );
//     });
// })

sequelize.sync({ force: false }).then( () => {
  app.listen(PORT, () => 
    console.log( `\nNow listening on PORT: [${PORT}]\n` ));
});
