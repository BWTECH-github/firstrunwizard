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

	/*
	 * Tab läuft im Dialog im Kreis. colorbox fängt den Fokus erst auf, wenn er
	 * schon draußen auf einem Element gelandet ist, und setzt ihn dann auf den
	 * Kasten statt auf das erste Bedienelement - hinter dem letzten Verweis
	 * ging der Fokus so aus dem Dialog in die Browserleiste (WCAG 2.4.3).
	 */
	function fokusImKreis(e) {
		if (e.key !== 'Tab' && e.keyCode !== 9) {
			return;
		}
		var box = document.getElementById('colorbox');
		if (!box) {
			return;
		}
		var ziele = $(box).find('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')
			.filter(':visible').get();
		if (!ziele.length) {
			return;
		}
		var erstes = ziele[0];
		var letztes = ziele[ziele.length - 1];
		var wo = document.activeElement;
		if (!e.shiftKey && (wo === letztes || !box.contains(wo))) {
			e.preventDefault();
			erstes.focus();
		} else if (e.shiftKey && (wo === erstes || wo === box || !box.contains(wo))) {
			e.preventDefault();
			letztes.focus();
		}
	}

	/*
	 * Nach dem Schließen gehört der Fokus dorthin zurück, wo er vorher war
	 * (etwa auf „Einführung erneut anzeigen“). Öffnete sich der Dialog von
	 * selbst nach der Anmeldung, beginnt die Seite beim Sprungverweis - sonst
	 * stünde der Fokus auf <body>.
	 */
	function fokusZurueck(vorher) {
		var ziel = vorher;
		if (!ziel || ziel === document.body || !document.documentElement.contains(ziel)
			|| (document.getElementById('colorbox') && document.getElementById('colorbox').contains(ziel))) {
			ziel = document.querySelector('.bwt-skip-link');
		}
		if (ziel && typeof ziel.focus === 'function') {
			ziel.focus();
		}
	}

	window.showfirstrunwizard = function () {
		var vorher = document.activeElement;
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
				$('#colorbox').attr('aria-modal', 'true');
				// Neue Fenster: rel gegen Zugriff auf diese Seite, Hinweis für
				// Sprachausgaben aus dem Kern (der beobachtet nur #content, der
				// Dialog hängt an <body>).
				$('#firstrunwizard a[target="_blank"]').attr('rel', 'noopener noreferrer');
				if (window.OCO && typeof window.OCO.markNewWindowLinks === 'function') {
					window.OCO.markNewWindowLinks(document.getElementById('firstrunwizard'));
				}
				$(document).on('keydown.firstrunwizard', fokusImKreis);
				$('#firstrunwizard img').on('load', fitWizard);
				$(window).on('resize', onWindowResize);
				fitWizard();
			},
			onClosed: function () {
				clearTimeout(resizeTimer);
				$(window).off('resize', onWindowResize);
				$('#colorbox').removeAttr('aria-labelledby').removeAttr('aria-modal');
				$(document).off('keydown.firstrunwizard', fokusImKreis);
				// nach colorbox' eigenem returnFocus, das ohne Auslöser ins Leere geht
				setTimeout(function () { fokusZurueck(vorher); }, 0);
				$.ajax({
					url: OC.filePath('firstrunwizard', 'ajax', 'disable.php'),
					data: ''
				});
			}
		});
	};

	// preventDefault: #showWizard ist ein <a href="#"> (Kernvorlage), der Klick
	// hängte sonst ein „#“ an die Adresse.
	$(document).on('click', '#showWizard', function (e) {
		e.preventDefault();
		window.showfirstrunwizard();
	});
	$(document).on('click', '#closeWizard', $.colorbox.close);
})(jQuery);
