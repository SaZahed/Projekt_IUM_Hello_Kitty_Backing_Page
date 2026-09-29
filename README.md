# 🎀 Hello Kitty Baking Website

Eine interaktive Baking-Website rund um süße Rezepte im **Hello-Kitty-Stil**. Das Projekt kombiniert eine responsive Webseite mit einem Forum sowie einem Login- und Registrierungssystem.

Das Projekt entstand im Rahmen des Moduls **Internet und Medien**.

## 🍰 Über das Projekt

Die Hello Kitty Baking Website richtet sich an Hobbybäcker und erfahrene Bäcker, die neue Rezepte entdecken, eigene Beiträge teilen und sich mit anderen Backbegeisterten austauschen möchten.

Die Website besteht aus mehreren Bereichen:

* Landingpage
* About-Seite
* Login und Registrierung
* Geschütztes Forum für angemeldete Nutzer
* Informationsseite für nicht angemeldete Nutzer

Neben HTML, CSS und JavaScript kommen serverseitig unter anderem **Node.js, Express, EJS und Passport.js** zum Einsatz.

## ✨ Features

### Responsive Webdesign

Die Website wurde mit **CSS Grid, Flexbox und Media Queries** umgesetzt und passt sich unterschiedlichen Bildschirmgrößen an.

Auf kleineren Bildschirmen wird die normale Navigation durch ein **Burger-Menü** ersetzt.

### Landingpage

Die Landingpage gibt einen Überblick über die Website und verwendet unter anderem:

* animierten GIF-Hintergrund
* Farbverläufe und Transparenz
* fixierte Navigation
* responsives Layout

### About-Seite

Die About-Seite enthält Informationen über die Website sowie eine Galerie verschiedener Backkreationen.

Die Galerie wurde mit Flexbox umgesetzt und passt sich mithilfe von Media Queries an verschiedene Bildschirmgrößen an.

### 🔐 Login und Registrierung

Nutzer können sich registrieren und anschließend anmelden.

Für die Authentifizierung werden verwendet:

* Node.js
* Express
* Passport.js
* `passport-local`
* bcrypt
* Sessions
* EJS

Passwörter werden mithilfe von **bcrypt** überprüft.

Der Login-Status wird über eine Session gespeichert, sodass Nutzer nicht bei jedem Seitenaufruf erneut ihre Zugangsdaten eingeben müssen.

Geschützte Routen verhindern außerdem, dass nicht angemeldete Nutzer direkt auf das Forum zugreifen können.

Bereits angemeldete Nutzer werden wiederum daran gehindert, erneut die Login- oder Registrierungsseite aufzurufen.

Über einen Logout-Button kann die aktuelle Sitzung beendet werden.

### 💬 Forum

Das Forum steht angemeldeten Nutzern zur Verfügung.

Nutzer können:

* Beiträge erstellen
* vorhandene Beiträge ansehen
* Beiträge liken

Ein Beitrag enthält den Namen des Absenders, den eigentlichen Inhalt sowie einen Zeitstempel.

Beiträge werden an den Server gesendet und dort gespeichert. Neue Beiträge erscheinen am Ende der vorhandenen Beiträge.

Über **Axios** werden Beiträge asynchron vom Server abgerufen und im DOM aktualisiert, ohne dass dafür die gesamte Seite neu geladen werden muss.

Zusätzlich enthält das Forum fünf vordefinierte Beiträge, darunter verschiedene Rezepte und Kommentare.

Nicht angemeldete Nutzer erhalten keinen Zugriff auf das eigentliche Forum. Stattdessen gibt es mit `forumUnangemeldet.html` eine eigene Seite, die auf die notwendige Anmeldung hinweist.

### ❤️ Like-System

Forum-Beiträge können geliked werden.

Eine Route in `server.js` verwaltet die Likes und aktualisiert die Anzahl der Likes des jeweiligen Beitrags.

### Formularvalidierung

Formulare werden vor dem Absenden auf Vollständigkeit überprüft.

Dafür werden JavaScript Event Listener für das `submit`-Event verwendet. Bei unvollständigen Eingaben wird eine entsprechende Meldung ausgegeben.

Weitere Überprüfungen finden innerhalb der Authentifizierungslogik statt.

## 🛠️ Verwendete Technologien

**Frontend**

* HTML
* CSS
* JavaScript
* Flexbox
* CSS Grid
* Media Queries
* Axios

**Backend**

* Node.js
* Express
* EJS
* Passport.js
* passport-local
* bcrypt
* Sessions

**Entwicklung**

* npm
* nodemon

## 🎨 Design

Das Design orientiert sich an einer verspielten **Hello-Kitty-Ästhetik**.

Die Hauptfarbe der Website ist Pink. Als Akzentfarbe wird Türkis verwendet, beispielsweise für aktive Navigationselemente und Buttons. Der Like-Button des Forums verwendet einen Pastell-Lilaton.

Weitere Gestaltungselemente sind unter anderem:

* `border-radius`
* `box-shadow`
* Farbverläufe
* GIF-Hintergründe
* responsive Bilder
* Flexbox-Layouts

Für Teile des Farbschemas wurde das Online-Tool **Paletton** verwendet.

## 📁 Wichtige Dateien

Zu den in der Projektdokumentation beschriebenen Dateien gehören unter anderem:

```text
index.html
abouut.html
forumUnangemeldet.html

login.ejs
register.ejs
index.ejs

style.css
script.js
server.js
passport-config.js
package.json
```

> **Hinweis:** Die Landingpage heißt `index.html`, während die Forumsseite `index.ejs` heißt. Dadurch existieren im Projekt zwei unterschiedliche Dateien mit dem Namen `index`.

## 🚀 Projekt starten

Für das Projekt werden **Node.js** und **npm** benötigt.

Zunächst müssen die in `package.json` definierten Abhängigkeiten installiert werden:

```bash
npm install
```

Anschließend kann der Entwicklungsserver über das in `package.json` definierte `devStart`-Skript gestartet werden:

```bash
npm run devStart
```

Dabei wird **nodemon** verwendet. Änderungen an den Quelldateien führen dadurch automatisch zu einem Neustart des Servers.

Die Anwendung läuft laut Projektdokumentation lokal über Port `3000`.

## 🔒 Zugriff auf das Forum

Das Forum ist eine geschützte Route.

Wird versucht, ohne Anmeldung auf das Forum zuzugreifen, wird der Nutzer automatisch zum Login weitergeleitet.

Die Anwendung verwendet dafür unter anderem die Funktionen:

```text
checkAuthenticated
checkNotAuthenticated
```

Diese überprüfen, ob ein Nutzer angemeldet bzw. nicht angemeldet ist und steuern entsprechend den Zugriff auf bestimmte Routen.

## 📌 Projektziel

Ziel des Projekts war es, eine optisch ansprechende und responsive Website zu entwickeln und dabei klassische Frontend-Technologien mit serverseitiger Funktionalität zu verbinden.

Neben der Gestaltung der Benutzeroberfläche standen insbesondere dynamische Inhalte, Formulare, Authentifizierung, Sessions und die Interaktion innerhalb eines einfachen Forums im Mittelpunkt.
