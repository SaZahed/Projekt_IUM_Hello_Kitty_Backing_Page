
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express();
const bcrypt = require('bcrypt');//Bibliothek zur sicheren Hash-Verschlüsselung von Passwörtern, um diese sicher in der Datenbank zu speichern
const passport = require('passport');//Middleware für die Authentifizierung von Benutzern, die verschiedene Authentifizierungsmethoden unterstützt
const flash = require('express-flash');// ermöglicht: Nachrichten an die Benutzeroberfläche zu senden + in Session zu speichern, um sie auf anderen Seiten anzuzeigen.
const session = require('express-session');//ermöglicht die Verwaltung von Sitzungen in Express-Anwendungen.
const methodOverride = require('method-override');// ermöglicht, HTTP-Methoden wie PUT oder DELETE in Formularen zu benutzen, die normalerweise nur GET und POST unterstützen.

const path = require('path') //nimm den Ordner, in dem server.js liegt, und hänge /public daran

app.use(express.static(".")); //stelle datein aus dem verzeichnis zur verfügung

//methode, die in passport-config aufgerufen wird
const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const users = [];


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false })); //Middleware sorgt dafür, dass Express Daten aus klassischen HTML-Formularen lesen kann
app.use(flash())
//Bei express-session liegen die eigentlichen Session-Daten serverseitig; der Browser bekommt grundsätzlich eine Session-ID im Cookie
app.use(session({
  secret: process.env.SESSION_SECRET,//Geheimschlüssel zur Signierung der Session-ID-Cookies.
  resave: false,
  saveUninitialized: false //entscheidet, ob Sitzungen gespeichert werden sollen, wenn sie nicht geändert sind.
}));
app.use(passport.initialize());
app.use(passport.session()); //session starten um z.B login status zu speichern
app.use(methodOverride('_method')); //weitere Methoden verwenden



app.get('/', checkAuthenticated, (req, res) => { //Lädt die Startseite, setzt voraus, dass der Benutzer authentifiziert ist.
  res.render('index.ejs', { name: req.user.name });
});

app.get('/login', checkNotAuthenticated, (req, res) => { //
  res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', { //Verarbeitet die Anmeldung eines Benutzers über das Formular.
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => { //lädt die Registrierungsseite mit vorraussetzung Benutzer nicht authentifiziert ist.
  res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => { //Verarbeitet die Registrierung eines neuen Benutzers.
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //über req.body user input verarbeiten
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
  console.log(users);
});

app.delete('/logout', (req, res, next) => { // Verarbeitet die Abmeldung eines Benutzers und löscht die Sitzung 
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
// für statische Dateien: dann könnne wir zur HTML springen
app.use(express.static(path.join(__dirname, 'public')));





// Ab hier von Aufgabe 6
app.use(express.json());

// Beispiel-Produktkatalog
let catalog = [ ];

// GET-Route für den Produktkatalog
app.get('/catalog', (req, res) => {
  res.json(catalog);
});

// POST-Route zum Hinzufügen eines Produkts
app.post('/add', (req, res) => {
  const newProduct = req.body;
  catalog.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE-Route zum Entfernen eines Produkts
app.delete('/remove/:name', (req, res) => {
  const productName = req.params.name;
  catalog = catalog.filter(product => product.name !== productName);
  res.status(204).send();
});

let forumPosts = [
	{
		 name: "Hello Kitty",
    message: "Zutaten für Waffelrezept:\n\n- 2 Eier\n- 200g Mehl\n- 300ml Milch\n- 100g Zucker\n- 1 TL Backpulver\n- 1 Prise Salz\n- 50g Butter (geschmolzen)\n\nZubereitung:\n\n1. Eier und Zucker schaumig schlagen.\n2. Mehl, Backpulver und Salz mischen und abwechselnd mit der Milch unterrühren.\n3. Geschmolzene Butter hinzugeben und gut umrühren.\n4. Teig im vorgeheizten Waffeleisen goldbraun backen.\n\nGenieße deine leckeren Waffeln!",
    timestamp: new Date('2024-07-01T10:00:00'),
    likes: 1000
		
	},
 {
    name: "Melody",
    message: "Das Waffelrezept ist fantastisch! Ich habe es ausprobiert und es war ein großer Erfolg bei meiner Familie. Ich gebe diesem Rezept 5 Sterne!",
    timestamp: new Date('2024-07-05T13:30:30'),
     likes: 10
  },
   {
    name: "Mama liebt Backen",
    message: "Das Rezept ist wirklich einfach und die Waffeln schmecken super. Meine Kinder lieben sie!",
    timestamp: new Date('2024-07-06T10:15:00'),
     likes: 5
  },
  {
    name: "Backfee",
    message: "Pfannkuchen sind super einfach und schnell zuzubereiten. Hier ist mein Rezept:\n\nZutaten:\n- 1 Ei\n- 200ml Milch\n- 150g Mehl\n- 1 Prise Salz\n\nZubereitung:\n1. Ei und Milch verquirlen.\n2. Mehl und Salz dazugeben und zu einem glatten Teig verrühren.\n3. Eine Pfanne erhitzen und etwas Öl hineingeben.\n4. Teig in die Pfanne geben und beidseitig goldbraun backen.\n\nGuten Appetit!",
    timestamp: new Date('2024-07-07T08:45:00'),
     likes: 200
  },
  {
	name: "Bäckerherz",
	message: "Blitzrepezept Muffins: \n- Ofen auf 180 Grad vorheizen. 250 g Mehl, 2 TL Backpulver und eine Prise Salz vermischen. In einer anderen Schüssel 150 g Zucker, 2 Eier, 125 ml Milch und 100 ml Öl verquirlen. Flüssige Zutaten, mit einem Sieb, zu den trockenen Zutaten geben und kurz verrühren. Nach Belieben Schokostückchen oder Beeren unterheben. Teig in Muffinförmchen füllen und 20-25 Minuten backen. Fertig!",
	timestamp: new Date('2024-07-11T12:15:10'),
	 likes: 80
  },
  {
	name: "Kiara",
	message: "Ich bin neu hier! Liken wer auch neu ist :D",
	timestamp: new Date('2024-07-15T12:15:10'),
	 likes: 300
  }
];

app.get('/forum', (req, res) => {
  res.json(forumPosts);
});

app.post('/forum', (req, res) => {
  const newPost = req.body;
  forumPosts.push(newPost);
  res.status(201).json(newPost);
});


app.post('/forum/like/:index', (req, res) => {
  const index = req.params.index;
  if (forumPosts[index]) {
    forumPosts[index].likes = forumPosts[index].likes ? forumPosts[index].likes + 1 : 1;
    res.status(200).json(forumPosts[index]);
  } else {
    res.status(404).send("Post not found");
  }
});


app.listen(3000);
