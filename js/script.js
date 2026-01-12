// création de variable
let click = 0;
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

let gaina1 = 1;

// Configuration des améliorations
const ameliorations = [
    {
        id: 1,
        nombre: 0,
        cout: 100,
        gain: gaina1,
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
    saveGame();
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
        saveGame();
    }
} 

// Ajouter les event listeners pour toutes les améliorations
ameliorations.forEach(amelio => {
    amelio.bouton.addEventListener('click', () => acheterAmelioration(amelio));
});

// ====== Sauvegarde/Chargement (localStorage) ======
const STORAGE_KEY = 'wwc-save-v1';

function mettreAJourUIAmeliorations() {
    ameliorations.forEach(a => {
        if (a.affichage_cout) a.affichage_cout.textContent = a.cout;
        if (a.affichage_nombre) a.affichage_nombre.textContent = a.nombre;
        if (a.affichage_cps) a.affichage_cps.textContent = (a.nombre * a.gain);
        if (a.affichage_gain) a.affichage_gain.textContent = a.gain;
    });
}

function saveGame() {
    try {
        const data = {
            money,
            click,
            clicksouris,
            ameliorations: ameliorations.map(a => ({ id: a.id, nombre: a.nombre, cout: a.cout, gain: a.gain }))
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Sauvegarde échouée:', e);
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            mettreAJourUIAmeliorations();
            click = ameliorations.reduce((s, a) => s + a.nombre * a.gain, 0);
            return;
        }
        const data = JSON.parse(raw);
        if (typeof data.money === 'number') money = data.money;
        if (typeof data.click === 'number') click = data.click;
        if (typeof data.clicksouris === 'number') clicksouris = data.clicksouris;
        if (Array.isArray(data.ameliorations)) {
            data.ameliorations.forEach(s => {
                const a = ameliorations.find(x => x.id === s.id);
                if (a) {
                    if (typeof s.nombre === 'number') a.nombre = s.nombre;
                    if (typeof s.cout === 'number') a.cout = s.cout;
                    if (typeof s.gain === 'number') a.gain = s.gain;
                    if (a.id === 1) gaina1 = a.gain;
                }
            });
        }
        affichage_money.textContent = money;
        mettreAJourUIAmeliorations();
        click = ameliorations.reduce((s, a) => s + a.nombre * a.gain, 0);
    } catch (e) {
        console.warn('Chargement échoué:', e);
        mettreAJourUIAmeliorations();
    }
}

// Charger l'état sauvegardé au démarrage
loadGame();

// Sauvegarde régulière et avant fermeture
setInterval(saveGame, 5000);
window.addEventListener('beforeunload', saveGame);

let affichage_CPS = document.querySelector('#CPST');

// Met à jour l'affichage du CPS toutes les 1000ms
setInterval(() => {
    affichage_CPS.textContent = click;
}, 1000);

// Initialisation des affichages des améliorations (cout, nombre, cps, gain)
mettreAJourUIAmeliorations();

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

let ameliorationClick = document.querySelector('#Al1');
let affichage_cout_Al1 = document.querySelector('#IDCoutAl1');
let cout_Al1 = 200;

ameliorationClick.addEventListener('click', () => {
    if (money >= cout_Al1) {
        money = money - cout_Al1;
        clicksouris = clicksouris * 2;
        cout_Al1 = cout_Al1 * 100;
        affichage_cout_Al1.textContent = cout_Al1;
    }
});

let ameliorationMamie = document.querySelector('#Al2');
let affichage_cout_Al2 = document.querySelector('#IDCoutAl2');
let cout_Al2 = 2000;

ameliorationMamie.addEventListener('click', () => {
    if (money >= cout_Al2) {
        money = money - cout_Al2;
        cout_Al2 = cout_Al2 * 100;
        gaina1 = gaina1 * 2;
        // Mettre à jour le gain utilisé par l'amélioration A1, recalculer le CPS, rafraîchir l'UI et sauvegarder
        ameliorations[0].gain = gaina1;
        click = ameliorations.reduce((s, a) => s + a.nombre * a.gain, 0);
        mettreAJourUIAmeliorations();
        saveGame();
        affichage_cout_Al2.textContent = cout_Al2;
    }
});

let resetButton = document.querySelector('#Reset');

resetButton.addEventListener('click', () => {
    if (!confirm('Voulez-vous vraiment réinitialiser la partie ?')) return;

    // Supprime la sauvegarde
    localStorage.removeItem(STORAGE_KEY);

    // Réinitialise les variables globales
    money = 0;
    click = 0;
    clicksouris = 1;
    gaina1 = 1;

    // Réinitialise les améliorations aux valeurs par défaut
    ameliorations.forEach(a => {
        if (a.id === 1) { a.nombre = 0; a.cout = 100; a.gain = gaina1; }
        else if (a.id === 2) { a.nombre = 0; a.cout = 500; a.gain = 3; }
        else if (a.id === 3) { a.nombre = 0; a.cout = 2000; a.gain = 10; }
        else if (a.id === 4) { a.nombre = 0; a.cout = 15000; a.gain = 35; }
    });

    // Réinitialise les améliorations spéciales
    cout_Al1 = 200;
    affichage_cout_Al1.textContent = cout_Al1;
    cout_Al2 = 2000;
    affichage_cout_Al2.textContent = cout_Al2;

    // Met à jour l'UI
    affichage_money.textContent = money;
    mettreAJourUIAmeliorations();
    click = ameliorations.reduce((s, a) => s + a.nombre * a.gain, 0);
    affichage_CPS.textContent = click;

    // Sauvegarde l'état réinitialisé
    saveGame();
});