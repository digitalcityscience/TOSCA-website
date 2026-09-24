---
title: Wie Dokumentation diese Website erreicht
description: Redaktionelle Leitfäden und generierte Entwicklerreferenz gemeinsam veröffentlichen.
---
# Dokumentation, die dem Werkzeugkasten folgt

Die Website verbindet zwei Dokumentationswege auf einer gemeinsamen Übersichtsseite.

## Benutzerhandbuch: Markdown in diesem Repository

Englische Leitfäden liegen in `content/en/`, deutsche in `content/de/`. Verwenden Sie gleiche Dateinamen und YAML-Metadaten für Titel und Beschreibung. Nuxt Content rendert Überschriften, Links, Codebeispiele und unterstützte Vue-Komponenten im Design der Website.

Leitfäden werden in Pull Requests geprüft. Die statische Generierung veröffentlicht die freigegebenen Inhalte. Neue Leitfäden müssen in der Dokumentationsnavigation verlinkt werden, damit ihre Routen beim Build gefunden werden.

## Entwicklerreferenz: TypeDoc aus dem Frontend

Das Frontend führt TypeDoc bereits über das Skript `docs` aus und unterstützt Vue-Komponenten. TSDoc-Kommentare bleiben direkt im Quellcode und werden gemeinsam mit Änderungen geprüft.

Für jeden Frontend-Pull-Request sollte CI die HTML-Referenz erzeugen und als Artefakt mit PR-Nummer und Commit ablegen. Vorschauen bleiben von der stabilen Referenz getrennt. Ein Merge oder Release erzeugt ein stabiles Artefakt.

Das Importskript der Website kopiert ein freigegebenes Artefakt nach `public/api/<version>/` und registriert es in der Referenzübersicht. Die TypeDoc-Suche, Symbolverweise und Navigation bleiben erhalten. API-Bezeichner werden nicht übersetzt; die Website ist mehrsprachig.

## Veröffentlichung

Ein generiertes Artefakt ist noch keine Veröffentlichung. Artefakte dürfen nur aus dem vorgesehenen Repository und einem verifizierten Workflow-Lauf stammen. Pull-Request-Code erhält keine Veröffentlichungsrechte. Ein vertrauenswürdiger Prozess prüft den Commit und importiert das Artefakt vor dem Website-Build.

Das Repository enthält einen Beispielworkflow für das Frontend und einen Importbefehl. Repository-Berechtigungen und Hosting müssen für die automatische Übergabe noch eingerichtet werden.
