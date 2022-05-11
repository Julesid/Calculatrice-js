// Variable globales
// Eléments mémoire et écran
const memoireElt = document.querySelector("#memoire");
const ecranElt = document.querySelector("#ecran");

// On stock les valeurs de l'écran "précédent"
let precedent = 0;

// On stock l'affichage
let affichage = "";

// On stock l'opération
let operation = null;

// On initailisela mémoire
let memoire;

window.onload = () => {
    // On écoute les clics sur les touches
    let touches = document.querySelectorAll("span");

    for(let touche of touches) {
        touche.addEventListener("click", gererTouches);
    }

    // On écoute les touches du clavier
    document.addEventListener("keydown", gererTouches);

    // Récupération de la mémoire depuis le stockage local
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire != 0) memoireElt.style.display = "initial";
}

/**
 * Fonction gérant les touches
 */
function gererTouches(event) {
    let touche;
    // On liste les touches autorisées
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "*", "/", "+", "-", "Enter", "Backspace"];
    
    // On vérifie si on a l'évènement "keydown"
    if(event.type === "keydown"){
        // On compare la touche appuyée
        if(listeTouches.includes(event.key)){
            // On empêche l'utilisation "par défaut" de la touche 
            event.preventDefault();
            // On stocke la touche choisie dans la variable touche
            touche = event.key;
        }
    } else {
        let touche = this.innerText;
    }

    // On récupère la valeur de la touche
    touche = this.innerText;

    // On vérifie si c'est un chiffre ou pas
    if(parseFloat(touche) >= 0 || touche === ".") {
        //On met à jour la valeur d'affichage et on affiche sur l'écran
        affichage = (affichage === "") ? touche.toString() : affichage + touche.toString();
        ecranElt.innerText = affichage;
    }else{
        // On vérifie si c'est une opération
        switch(touche){
            case "C":
            case "Backspace":
                console.log("C");
                // On réinitialise l'affichage et les touches
                precedent = 0;
                affichage = "";
                operation = null;
                ecranElt.innerText = 0;
                break;
            // Calculs
            case "+":
            case "-":
            case "*":
            case "/":
            // On calcule la valeur résultat de l'étape précédente    
            precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
            // On met à jour l'écran
                ecranElt.innerText = precedent;
                // On stocke l'opération
                operation = touche;
                // On réinitialise la variable d'affichage
                affichage = "";
                break;
            case "=":
            case "Enter":
                // On calcule la valeur résultat de l'étape précédente    
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                // On met à jour l'écran
                ecranElt.innerText = precedent;
                // On stocke le résultat dans la variable d'affichage
                affichage = precedent;
                // On réinitialise précédent
                precedent = 0;
                break;
            // On gère la mémoire
            case "M+":
                // On stocke (en addtionnant) à la valeur déjà en mémoire
                localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage);
                // On affiche la valeur de la mémoire
                memoireElt.style.display = "initial";
                break;
            case "MC":
                // On efface la mémoire
                localStorage.memoire = 0;
                // On cache la valeur de la mémoire
                memoireElt.style.display = "none";
                break;
            case "MR":
                // On affiche la valeur de la mémoire
                memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
                affichage = memoire;
                ecranElt.innerText = memoire;
                break;
            default:
                break;
        }
    }
}

/**
 * Effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns number
 */
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}