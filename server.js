let express = require("express");
let app = express();
const path = require("path");

let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri =
  "mongodb+srv://mb:toto@cluster0.zqtee.mongodb.net/assignments?retryWrites=true&w=majority";

const uri2 = "mongodb://localhost:27017/assignments";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/assignment-app/"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/index.html"));
});

// les routes avec le router du module express
const prefix = "/api";

app.route(prefix + "/assignments").get(assignment.getAssignments);

app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app
  .route(prefix + "/assignments")
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

// On démarre le serveur
// Start the app by listening on the default Heroku port
app.listen(port, "0.0.0.0");

console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;

//-----

//Install express server
