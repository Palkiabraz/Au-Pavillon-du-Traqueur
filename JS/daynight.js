(function(){
	const DAY = './Images/Fond_day.png';
	const NIGHT = './Images/Fond_night.png';
	const KEY = 'bg-mode';

	function applyMode(mode){
		const body = document.body;
		if(!body) return;
		if(mode === 'day') body.style.backgroundImage = `url('${DAY}')`;
		else if(mode === 'night') body.style.backgroundImage = `url('${NIGHT}')`;
		else body.style.backgroundImage = "url('./Images/Fond.jpg')";
	}

	document.addEventListener('DOMContentLoaded', function(){
		const btn = document.getElementById('bg-toggle');
		const stored = localStorage.getItem(KEY) || 'default';
		applyMode(stored);
		if(!btn) return;
		btn.dataset.mode = stored;
		btn.addEventListener('click', function(){
			const current = btn.dataset.mode === 'day' ? 'day' : (btn.dataset.mode === 'night' ? 'night' : 'default');
			const next = current === 'day' ? 'night' : 'day';
			localStorage.setItem(KEY, next);
			btn.dataset.mode = next;
			applyMode(next);
		});
	});
})();
