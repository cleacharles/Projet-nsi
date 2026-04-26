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
    mettreAJourPanier();
}

// Mettre à jour le nombre de produits dans le panier
function mettreAJourPanier() {
    const panier = recupererPanier();
    const nombreTotalProduits = panier.reduce((somme, produit) => somme + produit.quantite, 0);

    const elementsPanier = document.querySelectorAll('.panier-compteur');
    elementsPanier.forEach(element => {
        element.textContent = nombreTotalProduits;
    });
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

function viderPanier() {
    if (!confirm('Voulez-vous vider votre panier ?')) {
        return;
    }

    localStorage.removeItem('panier');

    // Recharger la page panier si on est dessus
    if (window.location.pathname.includes("panier.html")) {
        location.reload();
    }
}

function afficherPanier() {
    const panier = recupererPanier();
    const panierVide = document.getElementById("panier-vide");
    const panierContenu = document.getElementById("panier-contenu");
    const panierProduitsContainer = document.getElementById("panier-produits-container");

    if (panier.length === 0) {
        panierVide.style.display = "flex";
        panierContenu.style.display = "none";
        return;
    }

    panierVide.style.display = "none";
    panierContenu.style.display = "grid";

    // Afficher les produits
    panierProduitsContainer.innerHTML = panier.map(item => {
        const produitTrouve = PRODUITS.find(produit => produit.id === item.id);
        if (!produitTrouve) {
            return '';
        }

        return `
                    <div class="panier-item" data-id="${item.id}">
                        <div class="panier-item-image">
                            <img src="${produitTrouve.src}" alt="${produitTrouve.nom}" title="${produitTrouve.nom}">
                        </div>
                        <div class="panier-item-details">
                            <h3>${produitTrouve.nom}</h3>
                            <p class="panier-item-prix">${produitTrouve.prix.toFixed(2)} €</p>
                        </div>
                        <div class="panier-item-quantite">
                            <button class="bouton-quantite" onclick="changerPanierQuantite('${item.id}', ${item.quantite - 1})">-</button>
                            <span class="affichage-quantite">${item.quantite}</span>
                            <button class="bouton-quantite" onclick="changerPanierQuantite('${item.id}', ${item.quantite + 1})">+</button>
                        </div>
                        <div class="panier-item-total">
                            ${(produitTrouve.prix * item.quantite).toFixed(2)} €
                        </div>
                        <button class="panier-item-supprime" onclick="supprimerDuPanier('${item.id}')" title="Supprimer">
                            ✕
                        </button>
                    </div>
                `;
    }).join('');

    // Calculer et afficher le total
    calculerLeTotalEtAfficher();
}

document.querySelectorAll(".liste-bougies img")
    .forEach(function (image) {
        image.addEventListener("click", function () {
            ajouterAuPanier(image.id);
        })
    });

// Initialiser le compteur au chargement de la page
document.addEventListener('DOMContentLoaded', mettreAJourPanier);

function changerPanierQuantite(produitId, nouvelleQuantite) {
    if (nouvelleQuantite < 1) {
        if (confirm('Voulez-vous retirer cet article du panier ?')) {
            supprimerDuPanier(produitId);
        }
        return;
    }

    if (nouvelleQuantite > 10) {
        alert('Quantité maximum : 10');
        return;
    }

    const panier = recupererPanier();
    const produitTrouve = panier.find(item => item.id === produitId);
    if (produitTrouve) {
        produitTrouve.quantite = nouvelleQuantite;
        enregistrerPanier(panier);
        afficherPanier();
        mettreAJourPanier();
    }
}

function supprimerDuPanier(produitId) {
    let panier = recupererPanier();
    panier = panier.filter(item => item.id !== produitId);
    enregistrerPanier(panier);

    // Recharger la page panier si on est dessus
    if (window.location.pathname.includes("panier.html")) {
        location.reload();
    }
}

function calculerLeTotalEtAfficher() {
    const panier = recupererPanier();
    let total = 0;

    panier.forEach(item => {
        const produitTrouve = PRODUITS.find(produit => produit.id === item.id);
        if (produitTrouve) {
            total += produitTrouve.prix * item.quantite;
        }
    });

    document.getElementById('soustotal').textContent = total.toFixed(2) + ' €';
    document.getElementById('total').textContent = total.toFixed(2) + ' €';
}
