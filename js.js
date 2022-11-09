
const sendeDaten = async () => {
  const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/888/messages", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sender: "tomaso", text: " Herr Koch ist cool", data: "" })
  });

  const json = await response.json();
  console.log(json);
}

const ladeDaten = async () => {
  const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/888/messages");
  const json = await response.json();
  console.log(json);
}


var name;
var gruppe;
var gruppenN;
var benutzername;
var user_neu;


function login(form) {
  this.name = form.name.value;
  console.log(this.name);
  window.location.href = 'main.html'
}

function gruppeName(form) {
  this.gruppe = form.gruppe.value;
  console.log(this.gruppe);
  document.getElementById("gruppenNameId").style.visibility = "hidden";
}

function benutzerName(form) {
  this.benutzername = form.benutzername.value;
  console.log(this.benutzername);
  document.getElementById("benutzerNameId").style.visibility = "hidden";
}

function user_aendern(form) {
  this.user_neu = form.user_neu.value;
  console.log(this.user_neu);
  document.getElementById("settingsId").style.visibility = "hidden";
  this.name = this.user_neu;
}

function gruppenNachricht(form) {
  this.gruppenN = form.gruppenN.value;
  console.log(this.gruppenN);
}

function groupClick() {
  console.log(this.name);
  document.getElementById("gruppenNameId").style.visibility = "visible";
  document.getElementById("benutzerNameId").style.visibility = "hidden";
  document.getElementById("settingsId").style.visibility = "hidden";
  document.getElementById("startlogo").style.visibility = "hidden";
}

function dmClick() {
  console.log(this.name);
  document.getElementById("benutzerNameId").style.visibility = "visible";
  document.getElementById("gruppenNameId").style.visibility = "hidden";
  document.getElementById("settingsId").style.visibility = "hidden";
  document.getElementById("startlogo").style.visibility = "hidden";
}

function settingsClick() {
  console.log(this.name);
  document.getElementById("benutzerNameId").style.visibility = "hidden";
  document.getElementById("gruppenNameId").style.visibility = "hidden";
  document.getElementById("settingsId").style.visibility = "visible";
  document.getElementById("startlogo").style.visibility = "hidden";
}

function logoutClick() {
  window.location.href = 'index.html'
}

function displayName() {
  document.getElementById("loginId").innerHTML = this.name;
  console.log(this.name);
}

//sendeDaten();

ladeDaten();