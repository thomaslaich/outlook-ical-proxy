# Simple outlook proxy

When choosing to expose an Outlook calendar as `.ics` over a public (obfuscated URL), the resulting
`.ics` file contains non-standard TZ identifiers. When importing such a calendar from URL into
google calendar, the resulting events are not imported correctly.

The problem described here in detail: https://support.google.com/calendar/thread/253308528?msgid=254249904&sjid=2904239245896180922-EU.

This simple proxy exposes a new endpoint (again with an obfuscated URL) that proxies each request to the 
Outlook server and serves the resulting `.ics` file with the corrected TZ identifiers. In my case, the `TZID`
is just `Europe/Zurich`.

The whole repo just serves as a POC of how to setup and deploy azure functions. I also use this function
to synch my calendar to emacs org-mode.

## Setup dev environment

Install nix, and simply run `nix develop`. The run `just` to see available commands in the repo.

## Deploy from command line

First login to azure with the azure cli:
```bash
just login
```
(Note that the azure cli is shipped inside the flake.)

The you can run the appropriate just recipe:
```bash
just deploy
```
## Automatic deployment

TODO