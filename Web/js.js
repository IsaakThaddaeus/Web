
const sendeDaten = async () => {
    const response = await fetch("https://chat.web2021.dhbw.scytec.de/room/888/messages", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({sender: "tomaso", text: " Johann", data: ""})
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

 
  function login (form) {
     this.name = form.name.value;
     console.log(this.name);
     window.location.href = 'main.html'
    
  }

  function groupClick(){
    console.log(this.name);
  }

  function dmClick(){
    console.log(this.name);
  }

  function logoutClick(){
    window.location.href = 'index.html'
  }



  //sendeDaten();

  ladeDaten();