(function ($) {
	'use strict';

	// Die Breite folgt dem Fenster (auf dem Handy fast randlos, am Rechner
	// höchstens 760 px), die Höhe dem Inhalt bis 92 % des Fensters – erst
	// darüber rollt der Inhalt im Dialog. Mit festen 70 % x 70 % war der
	// Dialog auf dem Handy 273 px schmal und lief unten aus dem Fenster.
	var MAX_WIDTH = 760;
	var resizeTimer = null;

	function wizardWidth() {
		return Math.min(MAX_WIDTH, Math.round(window.innerWidth * 0.94));
	}

	function prefersReducedMotion() {
		return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
	}

	function fitWizard() {
		var $loaded = $('#cboxLoadedContent');
		if (!$loaded.length || !$loaded.find('#firstrunwizard').length) {
			return;
		}
		var scrollTop = $loaded.scrollTop();
		var width = wizardWidth();
		$loaded.css({width: width, height: 'auto'});
		var height = Math.min($loaded.height(), Math.round(window.innerHeight * 0.92));
		$.colorbox.resize({innerWidth: width, innerHeight: height});
		$loaded.scrollTop(scrollTop);
	}

	function onWindowResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(fitWizard, 100);
	}

	window.showfirstrunwizard = function () {
		$.colorbox({
			opacity: 0.4,
			transition: prefersReducedMotion() ? 'none' : 'elastic',
			speed: 100,
			innerWidth: wizardWidth(),
			maxHeight: '92%',
			fixed: true,
			// Beim Ändern der Fenstergröße zentriert colorbox sonst selbst –
			// mit der alten Breite und einer 400-ms-Animation, die unsere
			// Anpassung (fitWizard) wieder überschreibt.
			reposition: false,
			href: OC.filePath('firstrunwizard', '', 'wizard.php'),
			onComplete: function () {
				// colorbox setzt role="dialog", aber keinen Namen.
				var $title = $('#firstrunwizard h1').first();
				if ($title.length) {
					$title.attr('id', $title.attr('id') || 'firstrunwizard-title');
					$('#colorbox').attr('aria-labelledby', $title.attr('id'));
				}
				// Bilder ohne feste Maße (auch aus Theme-Vorlagen) schieben den
				// Inhalt erst nach dem Laden auseinander.
				$('#firstrunwizard img').on('load', fitWizard);
				$(window).on('resize', onWindowResize);
				fitWizard();
			},
			onClosed: function () {
				clearTimeout(resizeTimer);
				$(window).off('resize', onWindowResize);
				$('#colorbox').removeAttr('aria-labelledby');
				$.ajax({
					url: OC.filePath('firstrunwizard', 'ajax', 'disable.php'),
					data: ''
				});
			}
		});
	};

	$(document).on('click', '#showWizard', window.showfirstrunwizard);
	$(document).on('click', '#closeWizard', $.colorbox.close);
})(jQuery);
