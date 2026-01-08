// création de variable
let click = 1;
let money = 0;

// lien entre html et js
let affichage_money = document.querySelector('#money');
affichage_money.textContent = money;

// On crée une boucle qui tourne toutes les 1000ms
setInterval(() => {
    money = money + click;
    affichage_money.textContent = money;
}, 1000);

// Configuration des améliorations
const ameliorations = [
    {
        id: 1,
        nombre: 0,
        cout: 100,
        gain: 1,
        bouton: document.querySelector("#a1"),
        affichage_cout: document.querySelector('#IDCoutA1'),
        affichage_nombre: document.querySelector('#IDNombreA1')
    },
    {
        id: 2,
        nombre: 0,
        cout: 1000,
        gain: 10,
        bouton: document.querySelector("#a2"),
        affichage_cout: document.querySelector('#IDCoutA2'),
        affichage_nombre: document.querySelector('#IDNombreA2')
    },
    {
        id: 3,
        nombre: 0,
        cout: 10000,
        gain: 100,
        bouton: document.querySelector("#a3"),
        affichage_cout: document.querySelector('#IDCoutA3'),
        affichage_nombre: document.querySelector('#IDNombreA3')
    },
    {
        id: 4,
        nombre: 0,
        cout: 100000,
        gain: 1000,
        bouton: document.querySelector("#a4"),
        affichage_cout: document.querySelector('#IDCoutA4'),
        affichage_nombre: document.querySelector('#IDNombreA4')
    }
];

// Quand on click sur le clicker, on gagne le nombre de click en money
function clicking() {
    money = money + click;
    affichage_money.textContent = money;
}

// Fonction générique pour acheter une amélioration
function acheterAmelioration(amelio) {
    if (money >= amelio.cout) {
        money -= amelio.cout;
        click += amelio.gain;
        amelio.cout = Math.ceil(amelio.cout * 1.5);
        amelio.nombre++;
        
        affichage_money.textContent = money;
        amelio.affichage_cout.textContent = amelio.cout;
        amelio.affichage_nombre.textContent = amelio.nombre;
    }
}

// Ajouter les event listeners pour toutes les améliorations
ameliorations.forEach(amelio => {
    amelio.bouton.addEventListener('click', () => acheterAmelioration(amelio));
});

let affichage_CPS = document.querySelector('#CPST');

// Met à jour l'affichage du CPS toutes les 1000ms
setInterval(() => {
    affichage_CPS.textContent = click;
}, 1000);