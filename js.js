var name;

var gruppe;
var gruppenN;
var gruppenNachrichten;
var gruppenNachrichtenAlt;

var neuerRaum;

var benutzername; //Wer ist Adressat der DM
var privatN;      //Der Nachrichtentext
var privatNachrichten; //Alle DMs
var privatNachrichtenAlt; //Alle alten DMs -> um bei Pull nur neue Hinzuzufügen



const sendeDaten = async () => {
  const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/"+ this.gruppe + "/messages", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sender: this.name, text: this.gruppenN, data: "" })
  });

  const json = await response.json();
}
const ladeDaten = async () => {

  const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/"+ this.gruppe + "/messages");
  const json = await response.json();
  this.gruppenNachrichten = json;

}

const sendeDatenPrivat = async () => {
  const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/234354233/messages", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sender: this.name, text: this.privatN, data: this.benutzername})
  });

  const json = await response.json();
}
const ladeDatenPrivat = async () => {
  const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/234354233/messages");
  const json = await response.json();
  this.privatNachrichten = json;

}


function ladeNeueNachrichten()
{
  this.gruppenNachrichtenAlt = this.gruppenNachrichten;
  ladeDaten();

  if(document.getElementById("gruppenNachrichtId").style.visibility == "visible"){
    setTimeout(() => { zeigeGruppenChatNachrichtenNeue(); }, 200);
    setTimeout(() => { ladeNeueNachrichten(); }, 300);
  }

}
function zeigeGruppenChatNachrichtenNeue(){

  var count = document.getElementById("gruppenChatNachrichtenId").childElementCount ;
  console.log(count);

  for (let i = count; i < gruppenNachrichten.length; i++) {
    document.getElementById('gruppenChatNachrichtenId').innerHTML += "<p class=chatNachrichten>" +  gruppenNachrichten[i].sender + " : " + gruppenNachrichten[i].text + "</p>";  }

    if(  window.scrollY + 50 > (document.body.offsetHeight- window.innerHeight) )
    {
      document.getElementById('gruppenChatNachrichtenId').lastChild.scrollIntoView();
    }
}
function LadeNachrichtenInitial()
{
  ladeDaten();
  setTimeout(() => { zeigeGruppenChatNachrichtenInitial(); }, 290);
}
function zeigeGruppenChatNachrichtenInitial(){

  console.log(gruppenNachrichten);

  for (let i = 0; i < gruppenNachrichten.length; i++) {
  document.getElementById('gruppenChatNachrichtenId').innerHTML += "<p class=chatNachrichten>" +  gruppenNachrichten[i].sender + " : " + gruppenNachrichten[i].text + "</p>";  }

 document.getElementById('gruppenChatNachrichtenId').lastChild.scrollIntoView();

}


function ladeNeueNachrichtenPrivat()
{
  ladeDatenPrivat();

  if(document.getElementById("privatNachrichtId").style.visibility == "visible"){
    setTimeout(() => { zeigePrivatNachrichtenNeue(); }, 200);
    setTimeout(() => { ladeNeueNachrichtenPrivat(); }, 300);
  }


  
}
function zeigePrivatNachrichtenNeue(){

  privatNachrichtenFilter = privatNachrichten.filter(x => (x.sender == this.benutzername && x.data == this.name) || (x.sender == this.name  && x.data == this.benutzername));
  var count = document.getElementById("gruppenChatNachrichtenId").childElementCount;
  console.log(count);

  for (let i = count; i < privatNachrichtenFilter.length; i++) {
    document.getElementById('gruppenChatNachrichtenId').innerHTML += "<p class=chatNachrichten>" +  privatNachrichtenFilter[i].sender + " : " + privatNachrichtenFilter[i].text + "</p>";
 
    if(  window.scrollY + 50 > (document.body.offsetHeight- window.innerHeight) )
    {
      document.getElementById('gruppenChatNachrichtenId').lastChild.scrollIntoView();
    }
}
}
function LadeNachrichtenInitialPrivat()
{
  ladeDatenPrivat();
  setTimeout(() => { zeigePrivatNachrichtenInitial(); }, 290);
}
function zeigePrivatNachrichtenInitial(){

  privatNachrichtenFilter = privatNachrichten.filter(x => (x.sender == this.benutzername && x.data == this.name) || (x.sender == this.name  && x.data == this.benutzername));
  

  for (let i = 0; i < privatNachrichtenFilter.length; i++) {
    document.getElementById('gruppenChatNachrichtenId').innerHTML += "<p class=chatNachrichten>" +  privatNachrichtenFilter[i].sender + " : " + privatNachrichtenFilter[i].text + "</p>";
  }

 document.getElementById('gruppenChatNachrichtenId').lastChild.scrollIntoView();

 console.log("init");
}

function loescheGruppenchat()
{
  document.getElementById('gruppenChatNachrichtenId').innerHTML = "";

  if(document.getElementById('gruppenChatNachrichtenId').childElementCount != 0)
  {
    loescheGruppenchat();
  }
}


function login(form) {
  console.log("tes");
  this.name = form.name.value;

  if(form.name.value != "")
  {
    window.location.href = 'main.html'
  }
  
}
//Gruppe
//Gruppe-Name
function gruppeName(form) {

  gruppenNachrichten = null;
  gruppenNachrichtenAlt = null;
  neuerRaum = false;

  this.gruppe = form.gruppe.value;
  document.getElementById("gruppenNameId").style.visibility = "hidden";
  document.getElementById("gruppenNachrichtId").style.visibility ="visible";

  LadeNachrichtenInitial();
  setTimeout(() => { ladeNeueNachrichten(); }, 400);
  
}
//Gruppe-Senden
function gruppenNachricht(form) {
  this.gruppenN = form.gruppenChat.value;
  sendeDaten();
}

//DM
//DM-Name
function benutzerName(form) {

  privatNachrichten = null;
  privatNachrichtenAlt = null;
  neuerRaum = false;

  this.benutzername = form.benutzername.value;
  document.getElementById("benutzerNameId").style.visibility = "hidden";
  document.getElementById("privatNachrichtId").style.visibility ="visible";

  LadeNachrichtenInitialPrivat();
  setTimeout(() => { ladeNeueNachrichtenPrivat(); }, 400);
  

}
//DM-Senden
function privatNachrichtForm(form)
{
  this.privatN = form.privatChat.value;
  sendeDatenPrivat();
  console.log(this.privatN);
}
//Nutzername ändern
function user_aendern(form) {
  this.name = form.user_neu.value;
  document.getElementById("settingsId").style.visibility = "hidden";
  document.getElementById("gruppenNachrichtId").style.visibility ="hidden";
  
}

//Clicks - Button
function groupClick() {
  document.getElementById("gruppenNameId").style.visibility = "visible";
  document.getElementById("benutzerNameId").style.visibility = "hidden";
  document.getElementById("settingsId").style.visibility = "hidden";
  document.getElementById("gruppenNachrichtId").style.visibility ="hidden";
  document.getElementById("privatNachrichtId").style.visibility ="hidden";
  loescheGruppenchat();
  
}
function dmClick() {
  document.getElementById("benutzerNameId").style.visibility = "visible";
  document.getElementById("gruppenNameId").style.visibility = "hidden";
  document.getElementById("settingsId").style.visibility = "hidden";
  document.getElementById("gruppenNachrichtId").style.visibility ="hidden";
  document.getElementById("privatNachrichtId").style.visibility ="hidden";
  loescheGruppenchat();
  
}
function settingsClick() {
  document.getElementById("benutzerNameId").style.visibility = "hidden";
  document.getElementById("gruppenNameId").style.visibility = "hidden";
  document.getElementById("settingsId").style.visibility = "visible";
  document.getElementById("gruppenNachrichtId").style.visibility ="hidden";
  document.getElementById("privatNachrichtId").style.visibility ="hidden";
  loescheGruppenchat();
}
function logoutClick() {
  window.location.href = 'index.html'
}
function displayName() {
  document.getElementById("loginId").innerHTML = this.name;
  console.log(this.name);
}


