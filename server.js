// const express = require("express")
// const app = express()

// // Port
// const PORT = process.env.PORT || 3001; // 8080

// const sequelize = require('./config/connection');


// // app
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static(__dirname + "/public"));

// //handlebars
// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // routes
// const renderRoutes = require("./controllers/render-routes.js");
// app.use(renderRoutes);
// const apiRoutes = require("./controllers/api-routes.js");
// apiRoutes(app);

// // Sync models
// const db = require("./models")

// //Syncing sequelize models and then starting express server
// // sequelize.sync().then(function() {
// //     app.listen(PORT, function() {
// //       console.log( "\n🌎 App listening on PORT " + PORT + "\n" );
// //     });
// // })

// sequelize.sync({ force: true }).then( () => {
//   app.listen(PORT, () => 
//     console.log( `\nNow listening on PORT: [${PORT}]\n` ));
// });

// ====================================================================================
// ====================================================================================

const path = require('path');
  const express = require('express');
const session = require('express-session');
  const exphbs = require('express-handlebars');

//--------------------------------------------------------
// const renderRoutes = require("./controllers/render-routes.js");
// app.use(renderRoutes);
const routes = require('./controllers');
// const apiRoutes = require("./controllers/api-routes.js");
// apiRoutes(app);
//--------------------------------------------------------

const helpers = require('./utils/helpers');

  const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

  const app = express();
  const PORT = process.env.PORT || 3001;

/////////////////////////
/////////////////////////

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// Inform Express.js on which template engine to use
  //app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => 
    // console.log('Now listening')
    console.log( `\nNow listening on PORT: [${PORT}]\n` )
  );
});
