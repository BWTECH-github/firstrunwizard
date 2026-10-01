<?php
/**
 * @copyright Copyright (c) 2026, BW-Tech GmbH
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

namespace OCA\FirstRunWizard\Tests;

use OCP\IUser;
use OCP\IUserSession;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\EventDispatcher\GenericEvent;
use Test\TestCase;

/**
 * Die Erstinformation gehört auf die erste Seite nach der Anmeldung. Im
 * Redesign ist das Start (apps/dashboard); die Dateiliste bleibt für Konten
 * ohne Start und für Direktlinks in den Dateibereich. Geprüft wird, ob
 * appinfo/app.php den Auslöser js/activate.js beim Bauen dieser Seiten lädt –
 * und nur, solange das Konto die Information nicht geschlossen hat.
 *
 * @group DB
 */
class AppTest extends TestCase {
	private const UID = 'frw-apptest';
	private const ACTIVATE = 'firstrunwizard/js/activate';

	private EventDispatcher $dispatcher;
	private array $scriptsBefore = [];
	private array $stylesBefore = [];

	protected function setUp(): void {
		parent::setUp();
		$this->scriptsBefore = \OC_Util::$scripts;
		$this->stylesBefore = \OC_Util::$styles;
		\OC_Util::$scripts = [];

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn(self::UID);
		$session = $this->createMock(IUserSession::class);
		$session->method('isLoggedIn')->willReturn(true);
		$session->method('getUser')->willReturn($user);

		// Eigener Verteiler: beim Auslösen laufen nur die Zuhörer dieser App,
		// nicht die der übrigen Apps des Testkerns.
		$this->dispatcher = new EventDispatcher();
		$this->overwriteService('EventDispatcher', $this->dispatcher);
		$this->overwriteService('UserSession', $session);

		require __DIR__ . '/../../../appinfo/app.php';
	}

	protected function tearDown(): void {
		$this->restoreService('UserSession');
		$this->restoreService('EventDispatcher');
		\OC::$server->getConfig()->deleteAllUserValues(self::UID);
		\OC_Util::$scripts = $this->scriptsBefore;
		\OC_Util::$styles = $this->stylesBefore;
		parent::tearDown();
	}

	public static function firstPageEvents(): array {
		return [
			'Start (apps/dashboard)' => ['OCA\Dashboard::loadAdditionalScripts'],
			'Dateiliste' => ['OCA\Files::loadAdditionalScripts'],
		];
	}

	/**
	 * @dataProvider firstPageEvents
	 */
	public function testShowsWizardOnFirstPageAfterLogin(string $event): void {
		$this->dispatcher->dispatch(new GenericEvent(null), $event);

		$this->assertContains(self::ACTIVATE, \OC_Util::$scripts);
	}

	/**
	 * @dataProvider firstPageEvents
	 */
	public function testWizardStaysClosedOnceDismissed(string $event): void {
		\OC::$server->getConfig()->setUserValue(self::UID, 'firstrunwizard', 'show', '0');

		$this->dispatcher->dispatch(new GenericEvent(null), $event);

		$this->assertNotContains(self::ACTIVATE, \OC_Util::$scripts);
	}
}
