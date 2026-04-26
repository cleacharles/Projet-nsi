// Obtenir le panier
function recupererPanier() {
    const panier = localStorage.getItem('panier'); /*recup panier stocke*/
    return panier
        ? JSON.parse(panier) /*transforme le texte en objet JS*/
        : [];
}

// Enregistrer le panier
function enregistrerPanier(panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
    mettreAJourPanier();
}

// Mettre à jour le nombre de produits dans le panier
function mettreAJourPanier() {
    const panier = recupererPanier();
    const nombreTotalProduits = panier.reduce((somme, produit) => somme + produit.quantite, 0); /*calculer total des quantites*/

    const elementsPanier = document.querySelectorAll('.cart-count'); /*selectionne element*/
    elementsPanier.forEach(element => {
        element.textContent = nombreTotalProduits;
    });
}

// Ajouter un produit au panier
function ajouterAuPanier(produitId, quantite = 1) {
    const panier = recupererPanier();
    const produitExistant = panier.find(produit => produit.id === produitId); /*chercher si le produit existe deja*/

    if (produitExistant) {
        produitExistant.quantite += quantite;
    } else {
        panier.push({ id: produitId, quantite: quantite });
    }

    alert("Panier : " + JSON.stringify(panier));

    enregistrerPanier(panier);
}

function viderPanier() { /*fonction pour vider*/
    localStorage.removeItem('panier'); /*supprime du localStorage*/
    mettreAJourPanier(); /*met a jour l'affichage*/
}

document.querySelectorAll(".liste-bougies img") /*selectionne toutes les images*/
    .forEach(function (image) {  /*L48-52 ajoute au panier*/
        image.addEventListener("click", function () {
            ajouterAuPanier(image.id);
        })
    });

// Initialiser le compteur au chargement de la page
document.addEventListener('DOMContentLoaded', mettreAJourPanier);





document.addEventListener("DOMContentLoaded", function(){ /*attend que la page soit chargee*/
    const customSelectTrigger = document.querySelector("#custom-select") /*recupere le bouton du menu personnalise*/
    const customOptions = document.querySelector('#custom-options') /*recupere les options*/
    const customOptionsItems = document.querySelectorAll("#custom-options li") /*recupere chaque options*/
    const customDefault = document.querySelector("#custom-default") /*recupere l'affichage par default*/
    const hiddenInput = document.querySelector("#hiddenInput") /*recupere un champ cache*/

    customSelectTrigger.addEventListener('click', function(){ /*click pour ouvrir et fermer le menu (L68-69)*/
        customOptions.classList.toggle('open')
    })

    customOptionsItems.forEach(option => { /*boucle les options*/
        option.addEventListener("click", function(){ /* L73-78 change le texte/ met la valeur dans input cache*/
            customDefault.innerHTML = `
            ${this.textContent}
            <span class="material-icons">expand_more</span>
            `
            hiddenInput.value = this.getAttribute('data-value')
        })
    })
})


