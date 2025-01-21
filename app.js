// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const results = document.querySelector(".results");

const research = document.querySelector(".research");

let searchInput = "";

research.addEventListener("input", (e) => {
  //console.log(e.target.value);
  searchInput = e.target.value;
  //console.log(searchInput);
  retrieveSearch();
});

function displaySearch(data) {
    results.textContent='';
    // Itérer un objet en récupérant la clé et la valeur :
    Object.entries(data.query.search).forEach(([index, value]) =>{
        results.innerHTML += `<p>${value.title}</p></br>`
        //console.log(`Clé : ${index}, Valeur : ${value.title}`);  
    });
}

async function retrieveSearch() {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;
  const requete = await fetch(url, {
    //1er url et 2eme : objet
    method: "GET",
  });
  if (!requete.ok) {
    // On vérifie si erreur
    alert("Erreur");
  } else {
    let donnees = await requete.json(); // recupere les donnees en objet.
    console.log(donnees);
    displaySearch(donnees);
  }
}
