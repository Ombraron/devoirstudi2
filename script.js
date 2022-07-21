/* Rappel des règles
Le jeu comprend 2 joueurs sur un seul et même écran. 
Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le 
résultat d’un lancer est ajouté au ROUND. 
Lors de son tour, le joueur peut décider à tout moment de:
- Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le
tour de l’autre joueur.
- Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
Le premier joueur qui atteint les 100 points sur global gagne le jeu.

*/

let globalScore = '';

let roundScore = '';

let joueurActif = '';

let tour = '';


// Lancement du dé

document.querySelector('.btn-lancer').addEventListener('click', function() {
   if (tour) {
        let dice = Math.floor(Math.random() * 6) + 1;
    
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#resultat-' + joueurActif).textContent = roundScore;
        } else {
            prochainJoueur();
        }    
    }



});


document.querySelector('.btn-garder').addEventListener('click', function() {
    if (tour) {
        globalScore[joueurActif] += roundScore;
        document.querySelector('score-' + joueurActif).textContent = globalScore[joueurActif];

        if (globalScore[joueurActif] >= 100) {
            document.querySelector('#nom-' + joueurActif).textContent = 'Vainqueur!';
            document.querySelector('.dice').style.display ='none';
            document.querySelector('joueur-' + joueurActif + '-actif').classList.add('vainqueur');
            document.querySelector('joueur-' + joueurActif + '-actif').classList.remove('actif');
            tour = false;
        } else {
            prochainJoueur()
        }
    }
});


function prochainJoueur() {
    
 joueurActif === 0 ? joueurActif = 1 : joueurActif = 0;
    roundScore = 0;

    document.getElementById('resultat-1').textContent = '0';
    document.getElementById('resultat-2').textContent = '0';

    document.querySelector('.joueur-1').classList.toggle('actif');
    document.querySelector('.joueur-2').classList.toggle('actif');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-nouvelle-partie').addEventListener('click', init);

function init() {
    globalScore = [0, 0];
    joueurActif = 0;
    roundScore = 0;
    tour = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-2').textContent = '0';
    document.getElementById('resultat-1').textContent = '0';
    document.getElementById('resultat-2').textContent = '0';
    document.getElementById('nom-1').textContent = 'Joueur 1';
    document.getElementById('nom-2').textContent = 'Joueur 2';
    document.querySelector('.joueur-1').classList.remove('vainqueur');
    document.querySelector('.joueur-2').classList.remove('vainqueur');
    document.querySelector('.joueur-1').classList.remove('actif');
    document.querySelector('.joueur-2').classList.remove('actif');
    document.querySelector('.joueur-1').classList.add('actif');
}

init()