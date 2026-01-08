// création de variable
let click = 1;
let clicksouris = 1;
let money = 0;

// lien entre html et js
let affichage_money = document.querySelector('#money');
affichage_money.textContent = money;

// On crée une boucle qui tourne toutes les 1000ms
setInterval(() => {
    money = money + click;
    affichage_money.textContent = money;

    // Met à jour les CPS et active/désactive les boutons d'amélioration
    ameliorations.forEach(a => {
        if (a.affichage_cps) a.affichage_cps.textContent = (a.nombre * a.gain);
        if (a.bouton) a.bouton.disabled = money < a.cout;
    });
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
        affichage_nombre: document.querySelector('#IDNombreA1'),
        affichage_cps: document.querySelector('#A1cps'),
        affichage_gain: document.querySelector('#A1gain')
    },
    {
        id: 2,
        nombre: 0,
        cout: 500,
        gain: 3,
        bouton: document.querySelector("#a2"),
        affichage_cout: document.querySelector('#IDCoutA2'),
        affichage_nombre: document.querySelector('#IDNombreA2'),
        affichage_cps: document.querySelector('#A2cps'),
        affichage_gain: document.querySelector('#A2gain')
    },
    {
        id: 3,
        nombre: 0,
        cout: 2000,
        gain: 10,
        bouton: document.querySelector("#a3"),
        affichage_cout: document.querySelector('#IDCoutA3'),
        affichage_nombre: document.querySelector('#IDNombreA3'),
        affichage_cps: document.querySelector('#A3cps'),
        affichage_gain: document.querySelector('#A3gain')
    },
    {
        id: 4,
        nombre: 0,
        cout: 15000,
        gain: 35,
        bouton: document.querySelector("#a4"),
        affichage_cout: document.querySelector('#IDCoutA4'),
        affichage_nombre: document.querySelector('#IDNombreA4'),
        affichage_cps: document.querySelector('#A4cps'),
        affichage_gain: document.querySelector('#A4gain')
    }
];

// Quand on click sur le clicker, on gagne le nombre de click en money
function clicking() {
    money = money + clicksouris;
    affichage_money.textContent = money;
}

// Fonction générique pour acheter une amélioration
function acheterAmelioration(amelio) {
    if (money >= amelio.cout) {
        money -= amelio.cout;
        click += amelio.gain;
        amelio.cout = Math.ceil(amelio.cout * 1.2);
        amelio.nombre++;
        
        affichage_money.textContent = money;
        if (amelio.affichage_cout) amelio.affichage_cout.textContent = amelio.cout;
        if (amelio.affichage_nombre) amelio.affichage_nombre.textContent = amelio.nombre;
        if (amelio.affichage_cps) amelio.affichage_cps.textContent = (amelio.nombre * amelio.gain);
        if (amelio.affichage_gain) amelio.affichage_gain.textContent = amelio.gain;
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

// Initialisation des affichages des améliorations (cout, nombre, cps, gain)
ameliorations.forEach(a => {
    if (a.affichage_cout) a.affichage_cout.textContent = a.cout;
    if (a.affichage_nombre) a.affichage_nombre.textContent = a.nombre;
    if (a.affichage_cps) a.affichage_cps.textContent = (a.nombre * a.gain);
    if (a.affichage_gain) a.affichage_gain.textContent = a.gain;
});

// On récupère tes variables existantes
// let clicksouris = 1; 

document.addEventListener('mousedown', function(e) {
    // 1. Création de l'élément span
    const floating = document.createElement('span');
    
    // 2. Contenu du texte (+ suivi de ta variable)
    floating.innerText = `+${clicksouris}`;
    
    // 3. Style et positionnement
    floating.classList.add('floating-text');
    
    // On centre le texte sur la souris (ajuste le -10 selon la taille de ta police)
    floating.style.left = `${e.pageX - 10}px`;
    floating.style.top = `${e.pageY - 20}px`;

    // 4. Ajout au document
    document.body.appendChild(floating);

    // 5. Suppression de l'élément après l'animation (0.8s = 800ms)
    setTimeout(() => {
        floating.remove();
    }, 800);
});
