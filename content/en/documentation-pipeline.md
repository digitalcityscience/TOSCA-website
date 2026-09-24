---
title: How documentation reaches this website
description: Authored guides and generated developer reference, published together.
---
# Documentation that follows the toolkit

The website combines two documentation tracks, both available from the documentation landing page.

## User guides: Markdown in this repository

Write English guides in `content/en/` and German guides in `content/de/`. Use matching filenames, a title, and a description in YAML front matter. Nuxt Content renders the Markdown inside the website, including headings, links, code examples, and supported Vue components.

Guides are reviewed in pull requests. Static generation publishes the reviewed content with the site. Add new guides to the documentation navigation so that the static crawler discovers their routes.

## Developer reference: TypeDoc from the frontend

The frontend already runs TypeDoc through its `docs` script, including support for Vue components. TSDoc comments remain in the frontend source, where developers can review them alongside changes.

For each frontend pull request, CI should generate the HTML reference and upload it as an artifact identified by the PR number and commit. Preview references must remain separate from the stable reference. A merge or release produces a stable artifact.

The website's import script copies an approved artifact into `public/api/<version>/` and registers it in the reference index. TypeDoc retains its own search, symbol links, and navigation. API identifiers remain in their original language; the surrounding website is localized.

## Publication boundary

Generating an artifact does not publish it. Download artifacts only from the intended repository and verified workflow run. Do not run pull-request code with publishing credentials. A trusted promotion job should validate the source commit and import the artifact before building the website.

The repository includes a frontend workflow example and an import command. Cross-repository automation still needs repository permissions and a hosting destination to be configured.
