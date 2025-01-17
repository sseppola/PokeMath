const newsButton = document.getElementById("update-log")
const cookiePolicy = document.getElementById("cookie-container")

//Halloween
const halloweenbox = document.getElementById("halloween-egg")

/**
 * Toast stuff
 */

 const DEFAULT_OPTIONS = {
  autoClose: 8000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  showProgress: true,
}

class Toast {
  #toastElem
  #autoCloseInterval
  #progressInterval
  #removeBinded
  #timeVisible = 0
  #autoClose
  #isPaused = false
  #unpause
  #pause
  #visibilityChange
  #shouldUnPause

  constructor(options) {
    this.#toastElem = document.createElement("div")
    this.#toastElem.classList.add("toast")
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show")
    })
    this.#removeBinded = this.remove.bind(this)
    this.#unpause = () => (this.#isPaused = false)
    this.#pause = () => (this.#isPaused = true)
    this.#visibilityChange = () => {
      this.#shouldUnPause = document.visibilityState === "visible"
    }
    this.update({ ...DEFAULT_OPTIONS, ...options })
  }

  set autoClose(value) {
    this.#autoClose = value
    this.#timeVisible = 0
    if (value === false) return

    let lastTime
    const func = time => {
      if (this.#shouldUnPause) {
        lastTime = null
        this.#shouldUnPause = false
      }
      if (lastTime == null) {
        lastTime = time
        this.#autoCloseInterval = requestAnimationFrame(func)
        return
      }
      if (!this.#isPaused) {
        this.#timeVisible += time - lastTime
        if (this.#timeVisible >= this.#autoClose) {
          this.remove()
          return
        }
      }

      lastTime = time
      this.#autoCloseInterval = requestAnimationFrame(func)
    }

    this.#autoCloseInterval = requestAnimationFrame(func)
  }

  set position(value) {
    const currentContainer = this.#toastElem.parentElement
    const selector = `.toast-container[data-position="${value}"]`
    const container = document.querySelector(selector) || createContainer(value)
    container.append(this.#toastElem)
    if (currentContainer == null || currentContainer.hasChildNodes()) return
    currentContainer.remove()
  }

  set text(value) {
    this.#toastElem.textContent = value
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value)
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded)
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded)
    }
  }

  set showProgress(value) {
    this.#toastElem.classList.toggle("progress", value)
    this.#toastElem.style.setProperty("--progress", 1)

    if (value) {
      const func = () => {
        if (!this.#isPaused) {
          this.#toastElem.style.setProperty(
            "--progress",
            1 - this.#timeVisible / this.#autoClose
          )
        }
        this.#progressInterval = requestAnimationFrame(func)
      }

      this.#progressInterval = requestAnimationFrame(func)
    }
  }

  set badToast(value) {
    this.#toastElem.classList.toggle("badToast", value)
    this.#toastElem.classList.toggle("goodToast", !value)
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastElem.addEventListener("mouseover", this.#pause)
      this.#toastElem.addEventListener("mouseleave", this.#unpause)
    } else {
      this.#toastElem.removeEventListener("mouseover", this.#pause)
      this.#toastElem.removeEventListener("mouseleave", this.#unpause)
    }
  }

  set pauseOnFocusLoss(value) {
    if (value) {
      document.addEventListener("visibilitychange", this.#visibilityChange)
    } else {
      document.removeEventListener("visibilitychange", this.#visibilityChange)
    }
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  remove() {
    cancelAnimationFrame(this.#autoCloseInterval)
    cancelAnimationFrame(this.#progressInterval)
    const container = this.#toastElem.parentElement
    this.#toastElem.classList.remove("show")
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove()
      if (container.hasChildNodes()) return
      container.remove()
    })
    this.onClose()
  }
}

function createContainer(position) {
  const container = document.createElement("div")
  container.classList.add("toast-container")
  container.dataset.position = position
  document.body.append(container)
  return container
}

function createToast() {
  const toast = new Toast({
    text: "Hello",
    position: "top-right",
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    canClose: true,
    badToast: true,
  })
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/**
 * Other stuff
 */

function resetPrompt(){
  if (confirm('Er du sikker på at du vil slette alle pokemon og poeng?')) {
    // Save it!
    clearStorage();
    console.log('Everything was deleted as requested..');
    location.reload();
  } else {
    // Do nothing!
    console.log('Nothing was deleted.');
  }
}

function settingsMenu() {
  document.getElementById("settingsDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } else if (!event.target.matches('.playerbtn')) {
    var dropdowns = document.getElementsByClassName("playercard-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


let state = {
	username: "Ash",
	totalScore: 0,
	score: 0,
	wrongAnswers: 0,
	streak: 0,
  pkmnCaught: 0,
  pkmnList: new Array(),
  tier1Solved: 0,
  tier2Solved: 0,
  tier3Solved: 0,
  tier4Solved: 0,
  tier5Solved: 0,
  customSolved: 0
}

let shopOptions = {
  background: "",
  playerIcon: "",
  boughtBackgrounds: [],
  boughtPlayerIcons: [],
  shinyLevel: 1,
  mythicLevel: 0,
  legendLevel: 0,
  specialLevel: 0,
  coinLevel: 0
}

function loadShop() {
  shopOptions.background = getStorageString('shopBackground')//"images/backgrounds/bg-001.png"//
  shopOptions.boughtBackgrounds = getStorageArray('boughtBackgrounds','|')
  shopOptions.playerIcon = getStorageString('playerIcon')//"images/backgrounds/bg-001.png"//
  shopOptions.boughtPlayerIcons = getStorageArray('boughtPlayerIcons','|')
  shopOptions.shinyLevel = getStorageInt('shinyLevel')
  if(shopOptions.shinyLevel == 0) {
    shopOptions.shinyLevel = 1
  }
  shopOptions.mythicLevel = getStorageInt('mythicLevel')
  shopOptions.legendLevel = getStorageInt('legendLevel')
  shopOptions.specialLevel = getStorageInt('specialLevel')
  shopOptions.coinLevel = getStorageInt('coinLevel')
  loadBackground();
  loadPlayerIcon();
}

function loadBackground(){
  if(document.getElementById("background") == null) {
    console.log("This page did not have a background element. Unable to load global background variable")
    return;
  }
  if(shopOptions.background != "") {
    document.getElementById("background").setAttribute('src',"images/backgrounds/"+shopOptions.background+".png")
  } else {
    document.getElementById("background").setAttribute('src',"")
  }
}

function loadPlayerIcon(){
  if(shopOptions.playerIcon != "") {
    document.getElementById("playerimage").setAttribute('src',"images/playericons/"+shopOptions.playerIcon+".png")
    document.getElementById("playerimagebig").setAttribute('src',"images/playericons/"+shopOptions.playerIcon+".png")
  } else {
    document.getElementById("playerimage").setAttribute('src',"images/player.png")
    document.getElementById("playerimagebig").setAttribute('src',"images/player.png")
  }
}

function saveAll(){
  if(checkACookieExists("cookies")) {
    //console.log("Saving all - Cookies are accepted")
  } else {
    const toast = new Toast({
      text: "Du har ikke godkjent bruken av Cookies, så vi kan ikke lagre din spillerdate på din enhet.",
      position: "top-right",
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      canClose: true,
      badToast: true,
    })
    return;
  }
  if(!isNaN(state.totalScore)) {
    window.localStorage.setItem('money',JSON.stringify(state.totalScore))
  }
  if(!isNaN(state.pkmnCaught)) {
    window.localStorage.setItem('pkmncaught',JSON.stringify(state.pkmnCaught))
  }
  if(state.pokemonlist != "") {
    window.localStorage.setItem('pokemonlist',JSON.stringify(state.pkmnList.join('|')))
  }
  /**
  if(document.getElementById("pokedex")!=null) {
    window.localStorage.setItem('pokedex',JSON.stringify(document.getElementById("pokedex").innerHTML))
  } */
  if(state.username != "") {
    window.localStorage.setItem('username',JSON.stringify(state.username))
  } else {
    window.localStorage.setItem('username',JSON.stringify("Ash"))
  }
  if(true) {
    window.localStorage.setItem('tier1Solved',JSON.stringify(state.tier1Solved))
    window.localStorage.setItem('tier2Solved',JSON.stringify(state.tier2Solved))
    window.localStorage.setItem('tier3Solved',JSON.stringify(state.tier3Solved))
    window.localStorage.setItem('tier4Solved',JSON.stringify(state.tier4Solved))
    window.localStorage.setItem('tier5Solved',JSON.stringify(state.tier5Solved))
    window.localStorage.setItem('customSolved',JSON.stringify(state.customSolved))
  }

  //Shop stuff
  window.localStorage.setItem('shopBackground',JSON.stringify(shopOptions.background))
  if(shopOptions.boughtBackgrounds != "") {
    window.localStorage.setItem('boughtBackgrounds',JSON.stringify(shopOptions.boughtBackgrounds.join('|')))
  }
  window.localStorage.setItem('playerIcon',JSON.stringify(shopOptions.playerIcon))
  if(shopOptions.boughtPlayerIcons != "") {
    window.localStorage.setItem('boughtPlayerIcons',JSON.stringify(shopOptions.boughtPlayerIcons.join('|')))
  }
  if(shopOptions.shinyLevel != "") {
    window.localStorage.setItem('shinyLevel',JSON.stringify(shopOptions.shinyLevel))
  }
  if(shopOptions.legendLevel != "") {
    window.localStorage.setItem('legendLevel',JSON.stringify(shopOptions.legendLevel))
  }
  if(shopOptions.mythicLevel != "") {
    window.localStorage.setItem('mythicLevel',JSON.stringify(shopOptions.mythicLevel))
  }
  if(shopOptions.specialLevel != "") {
    window.localStorage.setItem('specialLevel',JSON.stringify(shopOptions.specialLevel))
  }
  if(shopOptions.coinLevel != "") {
    window.localStorage.setItem('coinLevel',JSON.stringify(shopOptions.coinLevel))
  }
}

const getCookieValue = (name) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)
function checkACookieExists(name) {
  if (document.cookie.split(';').some((item) => item.trim().startsWith(name + '='))) {
    return true;
  }
  return false;
}


function loadAll() {
  //Log to console
  console.log('%cPokeMath!', 'color: black; background: red; font-size: 30px; padding: 10px');
  console.log('%cVi er klar over at det er mulig å endre på egne verdier for å jukse i PokeMath. Dette er en svakhet ved at vi lagrer all spillerdata på brukerens maskin, istedet for å samle det inn til en server, men det er tryggere for brukeren med GDPR i fokus.', 'color: black; font-size: 20px; padding: 10px');
  console.log('%cHvis du er her for å jukse til deg pokemon så skal vi ikke prøve å stoppe deg, men vit at å jukse i et spill vil ødelegge mye av motivasjonen du får ellers. Du ender altså bare opp med å ødelegge for deg selv. Hvis du finner ut av noen av våre hemmeligheter (f.eks lukene i julekalender eller andre events) så setter vi pris på om du klarer å holde det hemmelig for klassekammeratene dine!', 'color: black; font-size: 20px; padding: 10px');
  console.log('%cDu kan finne all kildekoden til PokeMath på vår GitHub side (se Kontakt Oss). Det er litt lettere å lese seg frem der, enn i nettleserens Developer Tools. Ønsker du å bidra til prosjektet så er det stedet å starte! Finner du bugs, eller sikkerhetshull, så ikke nøl med å kontakte oss.', 'color: black; font-size: 20px; padding: 10px');
  
  //See if cookies are consented
  if(checkACookieExists("cookies")) {
    if(cookiePolicy != null) {
      cookiePolicy.style = "display: none";
    }
  }

  //See if name is set
  let params = new URLSearchParams(location.search);
	var name = params.get('name');
  if(name == null || name == "") {
    //Do nothing
  } else {
    window.localStorage.setItem('username',JSON.stringify(name))
  }

  state.totalScore = getStorageInt('money')
  state.pkmnCaught = getStorageInt('pkmncaught')
  state.pkmnList = getStorageArray('pokemonlist','|')
  state.tier1Solved = getStorageInt('tier1Solved')
  state.tier2Solved = getStorageInt('tier2Solved')
  state.tier3Solved = getStorageInt('tier3Solved')
  state.tier4Solved = getStorageInt('tier4Solved')
  state.tier5Solved = getStorageInt('tier5Solved')
  state.customSolved = getStorageInt('customSolved')
  /**
  if(document.getElementById("pokedex")!=null){
    document.getElementById("pokedex").innerHTML = getStorageString('pokedex')
  } */

  state.username = getStorageString('username')
  if(state.username.length > 22) {
    state.username = "Ash";
    window.localStorage.setItem('username',JSON.stringify("Ash"))
    const toast = new Toast({
      text: "Brukernavnet er for langt! Det har blitt tilbakestilt til Ash",
      position: "top-right",
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      canClose: true,
      badToast: true,
    })
  } else if(state.username.length < 1){
    //No name = Default
    state.username = "Ash";
  
  }
  document.getElementById("cointext").dataset.total = state.totalScore;
  document.getElementById("balltext").textContent = state.pkmnCaught;
  document.getElementById("playertext").textContent = state.username;
  document.getElementById("playertextheader").textContent = state.username;
  document.getElementById("t1solved").textContent = state.tier1Solved;
  document.getElementById("t2solved").textContent = state.tier2Solved;
  document.getElementById("t3solved").textContent = state.tier3Solved;
  document.getElementById("t4solved").textContent = state.tier4Solved;
  document.getElementById("t5solved").textContent = state.tier5Solved;
  //document.getElementById("csolved").textContent = state.customSolved;
  loadShop();
  countVisit();
}

function getStorageString(key) {
  if(window.localStorage.getItem(key)) {
    return JSON.parse(window.localStorage.getItem(key));
  } else {
    return "";
  }
}
function getStorageArray(key,splitter) {
  if(window.localStorage.getItem(key)) {
    var array = getStorageString(key).split(splitter);
    if(array.length < 1) {
      return new Array();
    }
    return array;
  } else {
    return new Array();
  }
}

function getStorageInt(key) {
  if(window.localStorage.getItem(key)) {
    var number = JSON.parse(window.localStorage.getItem(key));
    return (parseInt(number));
  } else {
    return 0;
  }
}

function clearStorage() {
  window.localStorage.clear();
  window.sessionStorage.clear();
}

function acceptCookies(){
  if(cookiePolicy != null) {
    cookiePolicy.style = "display: none";
  }
  const d = new Date();
  d.setTime(d.getTime() + (90*24*60*60*1000)); //90 days from 1970
  let expires = "expires="+ d.toUTCString();
  document.cookie = "cookies=true;" + expires +";path=/"
}

async function countVisit(){
  if(checkACookieExists("cookies") && !(getStorageString('visitCounted'))) {
    statCounter("hit","unicount");
    window.localStorage.setItem('visitCounted','true')
    /*
    var xhr = new XMLHttpRequest();
    path = "https://api.countapi.xyz/hit/pokemath.online/unicount";
    xhr.open("GET", path); //"https://api.countapi.xyz/hit/pokemath.online/test"
    xhr.responseType = "json";
    xhr.onload = function() {
      window.localStorage.setItem('visitCounted','true')
      console.log("Visit counted.")
    }
    xhr.send(); */
  } else {
   // console.log("Requirements failed")
  }
  
}

window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                         window.performance.getEntriesByType("navigation")[0].type === "back_forward" );
  if ( historyTraversal ) {
    // Handle page restore.
    console.log("Forcing reload because browser back button was clicked.")
    //window.location.reload();
    loadAll();
  }
});

async function statCounter(type, key){
  var xhr = new XMLHttpRequest();
  path = "https://api.countapi.xyz/" + type + "/pokemath.online/" + key;
  xhr.open("GET", path); //"https://api.countapi.xyz/hit/pokemath.online/test"
  xhr.responseType = "json";
  xhr.onload = function() {
    //console.log("Hit " + key + "!")
  }
  xhr.send();
}

async function statCounterAmount(type, key, amount){
  var xhr = new XMLHttpRequest();
  path = "https://api.countapi.xyz/" + type + "/pokemath.online/" + key + "?amount=" + amount;
  xhr.open("GET", path); //"https://api.countapi.xyz/hit/pokemath.online/test"
  xhr.responseType = "json";
  xhr.onload = function() {
    //console.log(type + " " + key + " with value " + amount + "! " + path)
  }
  xhr.send();
}

function log(message){
  if(state.username == "debugger") {
    console.log(message);
    const toast = new Toast({
      text: "DEBUG: " + message,
      position: "top-right",
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      canClose: true,
      badToast: true,
    })
  }
}

loadAll();