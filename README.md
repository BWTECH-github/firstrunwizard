# Willkommensfenster

Zeigt neuen Nutzern beim ersten Anmelden ein Fenster, das die wichtigsten
Wege erklärt: wo die Dateien liegen, wie geteilt wird und wo es die Programme
für Arbeitsplatz und Telefon gibt. Danach erscheint es nicht wieder.

Wer es später noch einmal sehen möchte, findet den Knopf dafür in den
persönlichen Einstellungen unter *Allgemein*.

## Voraussetzungen

* owncloud.online 11.x
* PHP 8.4

## Installation

Über den Market, oder von Hand:

```bash
cd /var/www/owncloud.online/apps
git clone https://github.com/BWTECH-github/firstrunwizard.git
chown -R www-data:www-data firstrunwizard
sudo -u www-data php8.4 ../occ app:enable firstrunwizard
```

## Inhalt anpassen

Das Fenster liegt als Vorlage in [`templates/wizard.php`](templates/wizard.php).
Ändern Sie die Vorlage nicht direkt in der App — sie wird beim nächsten Update
überschrieben. Legen Sie stattdessen eine eigene Theme-App an und hinterlegen
Sie die Vorlage dort unter demselben Pfad; der Server bevorzugt die Fassung aus
dem Theme.

Die Texte selbst kommen aus der Übersetzung unter [`l10n/`](l10n/).

## Kommandozeile

```bash
# Fenster für alle Konten erneut anzeigen
sudo -u www-data php8.4 occ firstrunwizard:reset-all
```

Sinnvoll etwa nach einem größeren Update der Oberfläche, wenn alle die Neuerungen
einmal sehen sollen.

## Herkunft

Fork der gleichnamigen ownCloud-App, gepflegt von der BW-Tech GmbH für
owncloud.online und PHP 8.4. Lizenz: AGPLv3.
