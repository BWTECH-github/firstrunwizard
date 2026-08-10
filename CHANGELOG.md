# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

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
