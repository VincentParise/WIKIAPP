// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const results = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

// On écoute sur le formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    errorMsg.textContent = "Wooppss, erreur de saisie";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    results.textContent = "";
    displaySearch(input.value);
  }
});

// On utilise la méthode fetch pour récupérer les données de l'API Wilkipedia
async function displaySearch(searchInput) {
  try {
    // console.log(searchInput);
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;
    const requete = await fetch(url, {
      method: "GET",
    });
    if (!requete.ok) {
      // On vérifie si erreur
      throw new Error(`${requete.status}`);
    } else {
      const donnees = await requete.json(); // recupere les donnees en objet.
      console.log(donnees.query.search);
      createCard(donnees.query.search);
    }
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

// fonction création dans le DOM
function createCard(data) {
    if (!data.length) {
        errorMsg.textContent="Wops, aucun résultat";
        loader.style.display="none";
        return;
    }
  data.forEach((el) => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
        <h3 class="result-title"><a href="${url}" target="_blank">${el.title}</a></h3>
        <p><a class="result-link" href="${url}" target="_blank">${url}</a></p>
        <p class="result-snippet">${el.snippet}</p>
        `;
    results.appendChild(card);
  });
  loader.style.display="none";
  
}
