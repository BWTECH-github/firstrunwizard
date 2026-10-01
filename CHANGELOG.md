# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [2.0.1] - 2026-10-01

### Fixed

- Die Erstinformation erscheint beim ersten Login sofort auf *Start* (apps/dashboard), der ersten Seite nach der Anmeldung. Bisher hing sie nur an der Dateiliste und kam erst nach dem Klick auf „Alle Dateien“. Nach dem Schließen bleibt sie aus, auch in der Dateiliste.
- Der Dialog passt sich dem Fenster an: am Rechner höchstens 760 px breit und so hoch wie der Inhalt, auf dem Handy fast randlos; ist das Fenster zu niedrig, rollt der Inhalt im Dialog. Bisher 70 % x 70 % – auf dem Handy 273 px schmal und unten aus dem Fenster gelaufen. Beim Ändern der Fenstergröße (Drehen) passt er sich neu an.
- Der Dialog trägt seine Überschrift als Namen (`aria-labelledby`); der Schließen-Knopf heißt auf Deutsch „Schließen“ statt „Close“.

## [2.0.0] - 2026-09-23

Redesign-Linie (owncloud.online 11.1). Für 11.0 gilt weiter der Zweig `main`.

### Changed

- Die Knöpfe „Verbinde Deinen Kalender“, „Verbinde Deine Kontakte“ und „Greife auf Dateien über WebDAV zu“ entfallen: owncloud.online hat weder Kalender noch Kontakte, und die Dokumentation hat keine WebDAV-Seite – die Knöpfe führten auf die Startseite der Doku bzw. eine unpassende Seite. Es bleibt der Knopf „Dokumentation“ (Nutzerdokumentation).
- Der Einleitungssatz nennt nur noch Dateien.
- Fremdlink auf owncloud.org durch https://owncloud.online ersetzt.

## [1.3.3] - 2026-08-13

### Changed

- Produktname, Beschreibung und uebersetzte Zeichenketten nennen owncloud.online;
  Verweise auf Fehlerbereich, Repository und Dokumentation zeigen auf das eigene
  Repository. Screenshots aus fremden Repositories entfernt.

## [Unreleased]

## [1.3.2] - 2026-08-10

### Fixed

- The dialog no longer sits below its own frame. The colorbox theme reserves 20px
  above the content for a title and counter that this app never sets, and it
  hides colorbox's close button in favour of its own - so the strip stayed empty.
  The focus ring made it visible: colorbox focuses `#colorbox` (`tabindex="-1"`)
  when opening, and the `[tabindex]:focus-visible` rule from core draws the ring
  around that outer box, which therefore started 20px above the white dialog.
  Measured in the browser: frame and dialog now share all four edges, gap 0
  instead of 20px, still centred, close still works and still disables the wizard.

## [1.2.0] - 2019-04-16

### Added

- Add occ command to reset for all users - [#83](https://github.com/owncloud/firstrunwizard/issues/83)

### Changed

- Decouple from core, switching to own release cycle

## [1.1.1]

### Changed

- Set max version to 10

## [1.1] - 2014-07-07

### Added

 - link to promote page  [#8](https://github.com/owncloud/firstrunwizard/pull/8)

### Changed

 - Now default theme is not shown when it is removed from themes [#26](https://github.com/owncloud/templateeditor/pull/26)

### Fixed

 - CSS & style fixes [#6](https://github.com/owncloud/firstrunwizard/pull/6)
 
 - prevent wrapping of buttons and header on mobile [#7](https://github.com/owncloud/firstrunwizard/pull/7)

## [1.0] - 2013-03-09

### Added

 - Initial implementation

[Unreleased]: https://github.com/owncloud/firstrunwizard/compare/v1.2.0...master
[1.2.0]: https://github.com/owncloud/firstrunwizard/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/owncloud/firstrunwizard/compare/v1.1...v1.1.1
