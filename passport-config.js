const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); //Import bycrpt zum Hashen

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
	 
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'Kein Benutzer mit dieser Email gefunden' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Passwort ist falsch' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    const user = getUserById(id);
    return done(null, user);
  });
}

module.exports = initialize;
