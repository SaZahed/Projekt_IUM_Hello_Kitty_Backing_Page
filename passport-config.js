const LocalStrategy = require('passport-local').Strategy; //passport local bib, die sich um Authentifizierung kümmert
const bcrypt = require('bcrypt'); //Import bycrpt zum Hashen

//funktion definieren mit 3 param getter methoden kommen von server.js
function initialize(passport, getUserByEmail, getUserById) {
  //asyncrone funktion wobei done der callback von passport ist
  const authenticateUser = async (email, password, done) => {
	 
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'Kein Benutzer mit dieser Email gefunden' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) { //passt eingabe mit gehastes passwort: an dieser stelle das await, weil es etwas zeit nimmt
        return done(null, user);
      } else {
        return done(null, false, { message: 'Passwort ist falsch' });
      }
    } catch (e) {
      return done(e);
    }
  };

  // Normalerweise erwartet passport-local ein Feld namens username, aber in diesem projekt wird mit email und pass gearbeitet
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id)); //in der session soll passport die user id speichern (anstelle von namen z.B)
  //Wenn Passport später nur die User-ID aus der Session hat, hole anhand dieser ID wieder den Benutzer
  passport.deserializeUser((id, done) => {
    const user = getUserById(id);
    return done(null, user);
  });
}

module.exports = initialize; //damit andere dateien zugang zu der funktion haben
