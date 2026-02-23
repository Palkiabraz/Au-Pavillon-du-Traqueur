document.addEventListener('DOMContentLoaded', function () {
	var flagBtn = document.getElementById('flag-btn');
	if (!flagBtn) return;

	flagBtn.addEventListener('click', function (e) {
		var target = flagBtn.getAttribute('data-url');
		if (!target) return;
		window.location.href = target;
	});
});

