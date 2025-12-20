// IIFE pour éviter de polluer le scope global
(function(){
	// Chemins des images et clé de stockage
	const DAY = './Images/Fond_day.png';
	const NIGHT = './Images/Fond_night.png';
	const KEY = 'bg-mode';

	// Applique le fond en fonction du mode ('day'|'night'|'default')
	function applyMode(mode){
		const body = document.body;
		if(!body) return;
		if(mode === 'day') body.style.backgroundImage = `url('${DAY}')`;
		else if(mode === 'night') body.style.backgroundImage = `url('${NIGHT}')`;
		else body.style.backgroundImage = "url('./Images/Fond.jpg')"; // fond par défaut
	}

	// Au chargement du DOM, récupérer le bouton, appliquer le mode stocké
	// et installer le gestionnaire de clic pour basculer jour/nuit
	document.addEventListener('DOMContentLoaded', function(){
		const btn = document.getElementById('bg-toggle');
		const stored = localStorage.getItem(KEY) || 'default';
		applyMode(stored);
		if(!btn) return;
		btn.dataset.mode = stored;
		btn.addEventListener('click', function(){
			// Détermine le mode courant et bascule
			const current = btn.dataset.mode === 'day' ? 'day' : (btn.dataset.mode === 'night' ? 'night' : 'default');
			const next = current === 'day' ? 'night' : 'day';
			localStorage.setItem(KEY, next);
			btn.dataset.mode = next;
			applyMode(next);
		});
	});
})();
