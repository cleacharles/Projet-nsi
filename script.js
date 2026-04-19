// Obtenir le panier
function recupererPanier() {
    const panier = localStorage.getItem('panier');
    return panier
        ? JSON.parse(panier)
        : [];
}

// Enregistrer le panier
function enregistrerPanier(panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
    // mettre à jour le nombre de produits dans le panier
}

// Ajouter un produit au panier
function ajouterAuPanier(produitId, quantite = 1) {
    const panier = recupererPanier();
    const produitExistant = panier.find(produit => produit.id === produitId);

    if (produitExistant) {
        produitExistant.quantite += quantite;
    } else {
        panier.push({ id: produitId, quantite: quantite });
    }

    enregistrerPanier(panier);
}

document.querySelectorAll(".liste-bougies img")
    .forEach(function (image) {
        image.addEventListener("click", function () {
            ajouterAuPanier(image.id);
        })
    });




document.addEventListener("DOMContentLoaded", function(){
    const customSelectTrigger = document.querySelector("#custom-select")
    const customOptions = document.querySelector('#custom-options')
    const customOptionsItems = document.querySelectorAll("#custom-options li")
    const customDefault = document.querySelector("#custom-default")
    const hiddenInput = document.querySelector("#hiddenInput")

    customSelectTrigger.addEventListener('click', function(){
        customOptions.classList.toggle('open')
    })

    customOptionsItems.forEach(option => {
        option.addEventListener("click", function(){
            customDefault.innerHTML = `
            ${this.textContent}
            <span class="material-icons">expand_more</span>
            `
            hiddenInput.value = this.getAttribute('data-value')
        })
    })
})


