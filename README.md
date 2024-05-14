# Simple outlook proxy

When exposing an Outlook calendar as `.ics` over a public (obfuscated) URL, the resulting
`.ics` file contains non-standard TZ identifiers. When importing such a calendar from URL into
e.g. Google calendar, the resulting events are usually shifted by a few hours.

The problem is described here in more detail: https://support.google.com/calendar/thread/253308528?msgid=254249904&sjid=2904239245896180922-EU.

This simple proxy exposes a new endpoint (again with an obfuscated URL) that proxies each request to the
Outlook server and serves the resulting `.ics` file with the corrected TZ identifiers.

I personally use this Azure function to sync my calendar to emacs.

## Setup dev environment

Install nix, and simply run `nix develop`. The run `just` to see available commands in the repo.

## Deploy from command line

First login to Azure with the azure cli:

```bash
just login
```

(Note that the Azure cli is shipped inside the flake.)

The you can run the appropriate just recipe:

```bash
just deploy
```

## Automatic deployment

TODO
