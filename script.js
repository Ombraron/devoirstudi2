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

let globalScore, roundScore, activePlayer, gamePlaying;

init()

// déroulement du tour de jeux

document.querySelector('.btn-roll').addEventListener('click', function() {
   if (gamePlaying) {
        // lancement du dé, nombre aléatoire
        let dice = Math.floor(Math.random() * 6) + 1;

        // résultat
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = '/img/dice-' + dice + '.png';

        // rajouter le chiffre au score temporaire si le dé /= 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // fin du tour joueur si dé = 1
            nextPlayer();
        }    
    }



});

// Ajout du score temporaire au score final et déclaration de la victoire si le score final >= 100
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        globalScore[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer];

        if (globalScore[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Vainqueur!';
            document.querySelector('.dice').style.display ='none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // fin du dtour du joueur si score final < 100
            nextPlayer()
        }
    }
});

// fonction qui active le tour du prochain joueur
function nextPlayer() {
    
 activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    
}

// début de partie
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    globalScore = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Joueur 1';
    document.getElementById('name-1').textContent = 'Joueur 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

