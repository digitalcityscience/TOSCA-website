// Content for /architecture. Condensed from tosca_architecture_explorer_v5.html (prototype),
// checked against TOSCA-2 (frontend) and TOSCA-Backend.
type Text = { en: string, de: string }
type Link = { label: string, url: string }
export type Kind = 'service' | 'db' | 'file' | 'app' | 'auth' | 'optional'
export type Part = { id: string, name: string, kind: Kind, note: Text, what: Text, role: Text, links?: Link[] }

export const kinds: { kind: Kind, label: Text }[] = [
  { kind: 'service', label: { en: 'Services & API', de: 'Dienste & API' } },
  { kind: 'db', label: { en: 'Databases', de: 'Datenbanken' } },
  { kind: 'file', label: { en: 'Files & tiles', de: 'Dateien & Kacheln' } },
  { kind: 'app', label: { en: 'Applications', de: 'Anwendungen' } },
  { kind: 'auth', label: { en: 'Identity & access', de: 'Identität & Zugriff' } }
]

export const links: Link[] = [
  { label: 'Live Geostory', url: 'https://ngcn.dcs.hcu-hamburg.de/geostories/01a16830-be19-77a4-a61e-f7779d4f7102' },
  { label: 'API docs', url: 'https://api.ngcn.dcs.hcu-hamburg.de/api/v1/docs/' },
  { label: 'Frontend code', url: 'https://github.com/digitalcityscience/TOSCA-2' },
  { label: 'Backend code', url: 'https://github.com/digitalcityscience/TOSCA-Backend' }
]

export const layers: { title: Text, lead: Text, groups: { title?: Text, parts: Part[] }[], note?: Text }[] = [
  {
    title: { en: 'Data engineering', de: 'Datenaufbereitung' },
    lead: { en: 'Prepare and check data before it enters TOSCA.', de: 'Daten prüfen und aufbereiten, bevor sie in TOSCA gelangen.' },
    groups: [{ parts: [
      { id: 'raw', name: 'Raw data', kind: 'service', note: { en: 'ALKIS · OSM · CityGML · sensors', de: 'ALKIS · OSM · CityGML · Sensoren' },
        what: { en: 'Data from authorities, open mapping communities and sensors. Formats, projections and attributes often differ.', de: 'Daten von Behörden, offenen Karten-Communities und Sensoren. Formate, Projektionen und Attribute unterscheiden sich oft.' },
        role: { en: 'Nothing goes into TOSCA unchecked. Raw data always passes through a pipeline first.', de: 'Nichts gelangt ungeprüft in TOSCA. Rohdaten laufen immer zuerst durch eine Pipeline.' },
         },
      { id: 'pipelines', name: 'Pipelines', kind: 'service', note: { en: 'Clean · validate · transform', de: 'Bereinigen · prüfen · umwandeln' },
        what: { en: 'A repeatable recipe: import data, check it, convert it. It can run again whenever the source changes.', de: 'Ein wiederholbares Rezept: Daten importieren, prüfen, umwandeln. Es läuft erneut, sobald sich die Quelle ändert.' },
        role: { en: 'Examples: check ALKIS parcels against XPlanung plans, turn CityGML buildings into graph data, make an OSM street network routable.', de: 'Beispiele: ALKIS-Flurstücke mit XPlanung-Plänen abgleichen, CityGML-Gebäude in Graphdaten umwandeln, ein OSM-Straßennetz routingfähig machen.' },
        links: [{ label: 'Bruin (example tool)', url: 'https://getbruin.com/' }] },
      { id: 'ready', name: 'Ready-to-use data', kind: 'service', note: { en: 'Known geometry, attributes and CRS', de: 'Bekannte Geometrie, Attribute und KBS' },
        what: { en: 'Data with a known structure, documented coordinate system and recorded quality checks.', de: 'Daten mit bekannter Struktur, dokumentiertem Koordinatensystem und festgehaltenen Prüfungen.' },
        role: { en: 'Goes to a database when it needs queries, or to object storage when it is served as files or tiles.', de: 'Geht in eine Datenbank, wenn Abfragen nötig sind, oder in den Objektspeicher, wenn sie als Dateien oder Kacheln ausgeliefert wird.' },
         }
    ] }],
    note: { en: 'A map that looks right is not the same as data that is right.', de: 'Eine Karte, die richtig aussieht, heißt nicht, dass die Daten richtig sind.' }
  },
  {
    title: { en: 'Storage & delivery', de: 'Speicherung & Bereitstellung' },
    lead: { en: 'Each technology has one job. Not every dataset needs every service.', de: 'Jede Technologie hat eine Aufgabe. Nicht jeder Datensatz braucht jeden Dienst.' },
    groups: [
      { title: { en: 'Databases', de: 'Datenbanken' }, parts: [
        { id: 'postgres', name: 'PostgreSQL', kind: 'db', note: { en: 'Application records', de: 'Anwendungsdaten' },
          what: { en: 'A database that keeps information in tables and links related records.', de: 'Eine Datenbank, die Informationen in Tabellen speichert und zusammengehörige Einträge verknüpft.' },
          role: { en: 'Holds Geostories, events, users, organizations and layer settings.', de: 'Speichert Geostorys, Veranstaltungen, Nutzende, Organisationen und Layer-Einstellungen.' },
          links: [{ label: 'postgresql.org', url: 'https://www.postgresql.org/' }] },
        { id: 'postgis', name: 'PostGIS', kind: 'db', note: { en: 'Geometry and spatial queries', de: 'Geometrie und räumliche Abfragen' },
          what: { en: 'Adds geography to PostgreSQL: points, lines and polygons, and questions like “which buildings are inside this area?”', de: 'Erweitert PostgreSQL um Geografie: Punkte, Linien, Flächen und Fragen wie „Welche Gebäude liegen in diesem Gebiet?“' },
          role: { en: 'Stores spatial datasets. GeoServer or Martin can publish them as map layers.', de: 'Speichert räumliche Datensätze. GeoServer oder Martin können sie als Kartenlayer veröffentlichen.' },
          links: [{ label: 'postgis.net', url: 'https://postgis.net/' }] },
        { id: 'citydb', name: '3DCityDB v5', kind: 'db', note: { en: 'Semantic 3D city models', de: 'Semantische 3D-Stadtmodelle' },
          what: { en: 'A ready-made filing system for a 3D city: buildings, walls and roofs, based on the CityGML 3.0 standard.', de: 'Ein fertiges Ablagesystem für eine 3D-Stadt: Gebäude, Wände und Dächer nach dem Standard CityGML 3.0.' },
          role: { en: 'Keeps the detailed city model. For viewing, it is exported and converted into 3D Tiles.', de: 'Hält das detaillierte Stadtmodell. Zum Anzeigen wird es exportiert und in 3D Tiles umgewandelt.' },
          links: [{ label: '3DCityDB docs', url: 'https://docs.3dcitydb.org/' }] }
      ] },
      { title: { en: 'Files & object storage', de: 'Dateien & Objektspeicher' }, parts: [
        { id: 'garage', name: 'Garage', kind: 'file', note: { en: 'S3-compatible object storage', de: 'S3-kompatibler Objektspeicher' },
          what: { en: 'Storage for files rather than table rows. “S3-compatible” means standard tools can read and write to it.', de: 'Speicher für Dateien statt Tabellenzeilen. „S3-kompatibel“ heißt: Standardwerkzeuge können darauf lesen und schreiben.' },
          role: { en: 'Holds tile archives, 3D Tiles, images and exports. Browsers fetch them directly over HTTP.', de: 'Speichert Kachelarchive, 3D Tiles, Bilder und Exporte. Browser laden sie direkt über HTTP.' },
          links: [{ label: 'Garage', url: 'https://garagehq.deuxfleurs.fr/' }] },
        { id: 'pmtiles', name: 'PMTiles', kind: 'file', note: { en: 'Map tiles in one file', de: 'Kartenkacheln in einer Datei' },
          what: { en: 'Packs a whole tile set into one file. A map reads only the parts it needs.', de: 'Packt ein ganzes Kachelset in eine Datei. Eine Karte liest nur die Teile, die sie braucht.' },
          role: { en: 'Fast, cheap maps: generate once, store in Garage, no map server needed.', de: 'Schnelle, günstige Karten: einmal erzeugen, in Garage ablegen, kein Kartenserver nötig.' },
          links: [{ label: 'PMTiles docs', url: 'https://docs.protomaps.com/pmtiles/' }] },
        { id: 'geoparquet', name: 'GeoParquet', kind: 'file', note: { en: 'Geodata for analytics', de: 'Geodaten für Analysen' },
          what: { en: 'A compact file format for large geodata tables, built for analysis and exchange.', de: 'Ein kompaktes Dateiformat für große Geodatentabellen, gemacht für Analyse und Austausch.' },
          role: { en: 'A possible pipeline output for reuse in analytics. It is not a map tile format.', de: 'Ein mögliches Pipeline-Ergebnis zur Wiederverwendung in Analysen. Es ist kein Kachelformat.' },
          links: [{ label: 'geoparquet.org', url: 'https://geoparquet.org/' }] },
        { id: 'tiles3d', name: '3D Tiles', kind: 'file', note: { en: 'Streamable 3D city data', de: 'Streambare 3D-Stadtdaten' },
          what: { en: 'An open standard for streaming large 3D scenes in small pieces, by level of detail.', de: 'Ein offener Standard, um große 3D-Szenen in kleinen Stücken nach Detailstufe zu streamen.' },
          role: { en: 'The city model is exported as CityJSON, converted once into 3D Tiles and stored in Garage.', de: 'Das Stadtmodell wird als CityJSON exportiert, einmal in 3D Tiles umgewandelt und in Garage abgelegt.' },
          links: [{ label: 'OGC 3D Tiles', url: 'https://www.ogc.org/standard/3dtiles/' }, { label: 'CityJSON', url: 'https://www.cityjson.org/' }] }
      ] },
      { title: { en: 'Delivery — choose by use case', de: 'Auslieferung — je nach Anwendungsfall' }, parts: [
        { id: 'geoserver', name: 'GeoServer', kind: 'service', note: { en: 'OGC services (WMS / WFS)', de: 'OGC-Dienste (WMS / WFS)' },
          what: { en: 'A map server that publishes data through standard web services such as WMS (images) and WFS (features).', de: 'Ein Kartenserver, der Daten über Standard-Webdienste wie WMS (Bilder) und WFS (Objekte) veröffentlicht.' },
          role: { en: 'One of the geodata engines TOSCA can register. Access follows the same organization roles.', de: 'Eine der Geodaten-Engines, die TOSCA registrieren kann. Der Zugriff folgt denselben Organisationsrollen.' },
          links: [{ label: 'geoserver.org', url: 'https://geoserver.org/' }] },
        { id: 'martin', name: 'Martin', kind: 'service', note: { en: 'Vector tile server', de: 'Vektorkachel-Server' },
          what: { en: 'A lightweight server that turns PostGIS tables or tile files into vector tiles.', de: 'Ein schlanker Server, der PostGIS-Tabellen oder Kacheldateien in Vektorkacheln verwandelt.' },
          role: { en: 'Another registered engine, for fast, dynamic vector tiles.', de: 'Eine weitere registrierbare Engine für schnelle, dynamische Vektorkacheln.' },
          links: [{ label: 'Martin docs', url: 'https://maplibre.org/martin/' }] },
        { id: 'static', name: 'HTTP / S3', kind: 'service', note: { en: 'Static files, no map server', de: 'Statische Dateien, ohne Kartenserver' },
          what: { en: 'The browser fetches ready-made files directly, like any image on a website.', de: 'Der Browser lädt fertige Dateien direkt, wie jedes Bild auf einer Website.' },
          role: { en: 'Used for PMTiles and 3D Tiles. No server does extra work per request.', de: 'Wird für PMTiles und 3D Tiles genutzt. Kein Server rechnet pro Anfrage.' },
           },
        { id: 'graph', name: 'Graph / NoSQL', kind: 'optional', note: { en: 'Optional, per project', de: 'Optional, je nach Projekt' },
          what: { en: 'Databases built around objects and their relationships instead of tables.', de: 'Datenbanken, die auf Objekte und ihre Beziehungen statt auf Tabellen ausgerichtet sind.' },
          role: { en: 'Not a core part. Added when a project needs relationship questions, e.g. the knowledge graph integration.', de: 'Kein Kernbestandteil. Kommt hinzu, wenn ein Projekt Beziehungsfragen braucht, z. B. bei der Wissensgraph-Integration.' },
           }
      ] }
    ],
    note: { en: 'Static tiles are served straight from object storage. GeoServer or Martin are added only when needed.', de: 'Statische Kacheln kommen direkt aus dem Objektspeicher. GeoServer oder Martin nur bei Bedarf.' }
  },
  {
    title: { en: 'Backend & API', de: 'Backend & API' },
    lead: { en: 'Manages application data, permissions and configuration.', de: 'Verwaltet Anwendungsdaten, Berechtigungen und Konfiguration.' },
    groups: [
      { parts: [
        { id: 'api', name: 'Django REST API', kind: 'service', note: { en: 'Data, logic and permissions as an API', de: 'Daten, Logik und Rechte als API' },
          what: { en: 'The TOSCA backend, built with Django (Python). It has no web pages of its own — it answers requests like “give me this story” with data.', de: 'Das TOSCA-Backend, gebaut mit Django (Python). Es hat keine eigenen Webseiten — es beantwortet Anfragen wie „gib mir diese Story“ mit Daten.' },
          role: { en: 'Stories, events, the layer catalog and permission checks live here. Every app talks to it the same way. Map tiles do not go through it.', de: 'Storys, Veranstaltungen, Layer-Katalog und Berechtigungsprüfung liegen hier. Jede App spricht gleich mit ihr. Kartenkacheln laufen nicht darüber.' },
          links: [{ label: 'Live API docs', url: 'https://api.ngcn.dcs.hcu-hamburg.de/api/v1/docs/' }, { label: 'TOSCA-Backend', url: 'https://github.com/digitalcityscience/TOSCA-Backend' }] },
        { id: 'provider', name: 'Geodata provider', kind: 'service', note: { en: 'Where a layer lives and how to load it', de: 'Wo ein Layer liegt und wie er geladen wird' },
          what: { en: 'A catalog entry describing a map service: its type, public address and layers.', de: 'Ein Katalogeintrag, der einen Kartendienst beschreibt: Typ, öffentliche Adresse und Layer.' },
          role: { en: 'Supports GeoServer, Martin and pg_tileserv. Apps ask the catalog where a layer is, instead of hard-coding URLs.', de: 'Unterstützt GeoServer, Martin und pg_tileserv. Apps fragen den Katalog, wo ein Layer liegt, statt URLs fest einzutragen.' },
           }
      ] },
      { title: { en: 'Identity & access', de: 'Identität & Zugriff' }, parts: [
        { id: 'keycloak', name: 'Keycloak', kind: 'auth', note: { en: 'Login — who are you?', de: 'Anmeldung — wer bist du?' },
          what: { en: 'A login service. After sign-in it gives the browser a signed token, like a visitor badge.', de: 'Ein Anmeldedienst. Nach dem Login erhält der Browser ein signiertes Token, wie einen Besucherausweis.' },
          role: { en: 'Every protected API call carries this token. Django checks it before doing anything.', de: 'Jeder geschützte API-Aufruf trägt dieses Token. Django prüft es, bevor etwas passiert.' },
          links: [{ label: 'keycloak.org', url: 'https://www.keycloak.org/' }] },
        { id: 'orgs', name: 'Organizations & roles', kind: 'auth', note: { en: 'Reader · Writer · Admin', de: 'Leser · Autor · Admin' },
          what: { en: 'Decides what you may do. Each organization has three roles: Reader views, Writer edits, Admin manages.', de: 'Entscheidet, was du darfst. Jede Organisation hat drei Rollen: Leser sehen, Autoren bearbeiten, Admins verwalten.' },
          role: { en: 'Roles come from Keycloak. The same roles also control access in GeoServer.', de: 'Die Rollen kommen aus Keycloak. Dieselben Rollen steuern auch den Zugriff in GeoServer.' },
           },
        { id: 'admin', name: 'No-code admin', kind: 'auth', note: { en: 'Edit stories and layers', de: 'Storys und Layer bearbeiten' },
          what: { en: 'Screens where authorized editors build content without writing code.', de: 'Oberflächen, in denen berechtigte Personen Inhalte ohne Programmierung erstellen.' },
          role: { en: 'Editors create Geostories, events and layer settings. Saved through the protected API.', de: 'Hier entstehen Geostorys, Veranstaltungen und Layer-Einstellungen. Gespeichert über die geschützte API.' },
           }
      ] }
    ],
    note: { en: 'The API answers app requests. Map tiles take their own path.', de: 'Die API beantwortet App-Anfragen. Kartenkacheln nehmen einen eigenen Weg.' }
  },
  {
    title: { en: 'Frontend', de: 'Frontend' },
    lead: { en: 'One app, one shared map. Every module plugs into the same foundation.', de: 'Eine App, eine gemeinsame Karte. Jedes Modul nutzt dieselbe Grundlage.' },
    groups: [
      { title: { en: 'Shared foundation', de: 'Gemeinsame Grundlage' }, parts: [
        { id: 'shell', name: 'TOSCA-2 app', kind: 'app', note: { en: 'One Vue app for all modules', de: 'Eine Vue-App für alle Module' },
          what: { en: 'The web application people open. Built with Vue, it hosts every module side by side.', de: 'Die Webanwendung, die Menschen öffnen. Mit Vue gebaut, enthält sie alle Module nebeneinander.' },
          role: { en: 'All modules share one map, one layer catalog and one connection to the API. A layer added once is available everywhere.', de: 'Alle Module teilen eine Karte, einen Layer-Katalog und eine Verbindung zur API. Ein einmal hinzugefügter Layer ist überall verfügbar.' },
          links: [{ label: 'TOSCA-2 on GitHub', url: 'https://github.com/digitalcityscience/TOSCA-2' }] },
        { id: 'maplibre', name: 'MapLibre GL JS', kind: 'app', note: { en: 'The shared map', de: 'Die gemeinsame Karte' },
          what: { en: 'An open-source library that draws interactive maps in the browser.', de: 'Eine Open-Source-Bibliothek, die interaktive Karten im Browser zeichnet.' },
          role: { en: 'There is one map, and every module draws on it. Tiles come straight from GeoServer, Martin or storage.', de: 'Es gibt eine Karte, und jedes Modul zeichnet darauf. Kacheln kommen direkt von GeoServer, Martin oder dem Speicher.' },
          links: [{ label: 'maplibre.org', url: 'https://maplibre.org/' }] },
        { id: 'terradraw', name: 'Terra Draw', kind: 'app', note: { en: 'Draw on the map', de: 'Auf der Karte zeichnen' },
          what: { en: 'A library for drawing points, lines and areas on a web map.', de: 'Eine Bibliothek zum Zeichnen von Punkten, Linien und Flächen auf einer Webkarte.' },
          role: { en: 'Lets people mark places in participation campaigns, and powers the draw and buffer tools.', de: 'Lässt Menschen in Beteiligungskampagnen Orte markieren und treibt die Zeichen- und Puffer-Werkzeuge an.' },
          links: [{ label: 'Terra Draw', url: 'https://terradraw.io/' }] },
        { id: 'editorjs', name: 'Editor.js', kind: 'app', note: { en: 'Rich text blocks', de: 'Rich-Text-Blöcke' },
          what: { en: 'A block editor: text, headings, images, lists and quotes stored as clean data.', de: 'Ein Block-Editor: Text, Überschriften, Bilder, Listen und Zitate als saubere Daten.' },
          role: { en: 'Editors write in the admin; Geostories and Events show the same blocks read-only.', de: 'Geschrieben wird im Admin; Geostorys und Veranstaltungen zeigen dieselben Blöcke schreibgeschützt.' },
          links: [{ label: 'editorjs.io', url: 'https://editorjs.io/' }] }
      ] },
      { title: { en: 'Modules', de: 'Module' }, parts: [
        { id: 'webgis', name: 'Web GIS', kind: 'app', note: { en: 'Explore and analyse layers', de: 'Layer erkunden und analysieren' },
          what: { en: 'Browse the layer catalog, switch layers on, filter, draw and buffer.', de: 'Den Layer-Katalog durchsuchen, Layer einblenden, filtern, zeichnen und puffern.' },
          role: { en: 'Reads the catalog from the geodata providers and puts layers on the shared map.', de: 'Liest den Katalog der Geodatenanbieter und legt Layer auf die gemeinsame Karte.' } },
        { id: 'geostory', name: 'Geostories', kind: 'app', note: { en: 'Maps and narrative', de: 'Karten und Erzählung' },
          what: { en: 'A story told with text, images and maps that change as you read.', de: 'Eine Geschichte aus Text, Bildern und Karten, die sich beim Lesen ändern.' },
          role: { en: 'The story comes from the API, its text blocks from Editor.js, its layers from the shared map.', de: 'Die Story kommt über die API, ihre Textblöcke aus Editor.js, ihre Layer von der gemeinsamen Karte.' },
          links: [{ label: 'Open a live Geostory', url: 'https://ngcn.dcs.hcu-hamburg.de/geostories/01a16830-be19-77a4-a61e-f7779d4f7102' }] },
        { id: 'events', name: 'Events', kind: 'app', note: { en: 'Place-based events', de: 'Ortsbezogene Veranstaltungen' },
          what: { en: 'Events shown on a map and a calendar, with filters by topic and date.', de: 'Veranstaltungen auf Karte und Kalender, filterbar nach Thema und Datum.' },
          role: { en: 'Event data comes from the API; descriptions use Editor.js; markers sit on the shared map.', de: 'Die Daten kommen über die API, Beschreibungen nutzen Editor.js, Marker liegen auf der gemeinsamen Karte.' } },
        { id: 'participation', name: 'Participation', kind: 'app', note: { en: 'Collect local feedback', de: 'Lokales Feedback sammeln' },
          what: { en: 'Campaigns where people answer questions and mark places on the map.', de: 'Kampagnen, in denen Menschen Fragen beantworten und Orte auf der Karte markieren.' },
          role: { en: 'People draw with Terra Draw; answers are sent to the API and stored with their location.', de: 'Gezeichnet wird mit Terra Draw; Antworten gehen an die API und werden mit Ort gespeichert.' } }
      ] },
      { title: { en: 'Planned — 3D', de: 'Geplant — 3D' }, parts: [
        { id: 'viewer', name: '3D city viewer', kind: 'optional', note: { en: 'Planned', de: 'Geplant' },
          what: { en: 'A viewer that streams a 3D city and loads only what the camera sees.', de: 'Ein Viewer, der eine 3D-Stadt streamt und nur lädt, was die Kamera sieht.' },
          role: { en: 'Not in the app yet. It will read 3D Tiles straight from storage, with no map server in between.', de: 'Noch nicht in der App. Er wird 3D Tiles direkt aus dem Speicher lesen, ohne Kartenserver dazwischen.' },
          links: [{ label: 'OGC 3D Tiles', url: 'https://www.ogc.org/standard/3dtiles/' }] },
        { id: 'deck', name: 'deck.gl', kind: 'optional', note: { en: 'Planned', de: 'Geplant' },
          what: { en: 'A graphics library that uses the GPU to show very large datasets and 3D.', de: 'Eine Grafikbibliothek, die große Datenmengen und 3D mit der GPU darstellt.' },
          role: { en: 'A candidate for 3D and heavy data views on top of the shared map. Not in the app yet.', de: 'Ein Kandidat für 3D- und datenintensive Ansichten über der gemeinsamen Karte. Noch nicht in der App.' },
          links: [{ label: 'deck.gl', url: 'https://deck.gl/' }] }
      ] }
    ]
  }
]

// Who is connected to whom. Each pair shows up on both cards, so every link stays two-way.
export const edges: [string, string][] = [
  // data engineering
  ['raw', 'pipelines'], ['pipelines', 'ready'], ['pipelines', 'graph'],
  ['ready', 'postgis'], ['ready', 'citydb'], ['ready', 'garage'], ['ready', 'geoparquet'],
  // storage & delivery
  ['postgres', 'postgis'], ['postgis', 'citydb'], ['postgis', 'geoserver'], ['postgis', 'martin'],
  ['citydb', 'tiles3d'], ['garage', 'pmtiles'], ['garage', 'geoparquet'], ['garage', 'tiles3d'], ['garage', 'static'],
  ['pmtiles', 'static'], ['tiles3d', 'static'],
  // backend
  ['api', 'postgres'], ['api', 'provider'], ['api', 'keycloak'], ['api', 'orgs'], ['api', 'admin'],
  ['provider', 'geoserver'], ['provider', 'martin'], ['keycloak', 'orgs'], ['keycloak', 'admin'], ['orgs', 'geoserver'],
  ['admin', 'editorjs'], ['admin', 'geostory'], ['admin', 'events'],
  // backend ↔ frontend
  ['api', 'shell'], ['api', 'geostory'], ['api', 'events'], ['api', 'participation'], ['provider', 'shell'], ['provider', 'webgis'],
  // maps get their data directly, not through the API
  ['maplibre', 'geoserver'], ['maplibre', 'martin'], ['maplibre', 'pmtiles'],
  // frontend
  ['shell', 'maplibre'], ['shell', 'webgis'], ['shell', 'geostory'], ['shell', 'events'], ['shell', 'participation'],
  ['maplibre', 'terradraw'], ['maplibre', 'webgis'], ['maplibre', 'geostory'], ['maplibre', 'events'], ['maplibre', 'participation'],
  ['terradraw', 'webgis'], ['terradraw', 'participation'], ['editorjs', 'geostory'], ['editorjs', 'events'],
  // planned 3D
  ['viewer', 'tiles3d'], ['viewer', 'static'], ['viewer', 'deck'], ['deck', 'maplibre'], ['viewer', 'shell']
]

export type Lane = 'app' | 'map'
export const flows: { label: Text, steps: { id: string, lane: Lane, text: Text }[], takeaway: Text }[] = [
  {
    label: { en: 'Open a Geostory', de: 'Geostory öffnen' },
    steps: [
      { id: 'geostory', lane: 'app', text: { en: 'A visitor opens a Geostory link.', de: 'Jemand öffnet einen Geostory-Link.' } },
      { id: 'api', lane: 'app', text: { en: 'The page asks the API for the story: text, images and which layers to show.', de: 'Die Seite fragt die API nach der Story: Text, Bilder und welche Layer gezeigt werden.' } },
      { id: 'postgres', lane: 'app', text: { en: 'Django reads the story from the database and sends it back.', de: 'Django liest die Story aus der Datenbank und schickt sie zurück.' } },
      { id: 'provider', lane: 'app', text: { en: 'For each layer, the catalog says where its map data lives.', de: 'Für jeden Layer sagt der Katalog, wo seine Kartendaten liegen.' } },
      { id: 'geoserver', lane: 'map', text: { en: 'The map asks that service for tiles directly — not through Django.', de: 'Die Karte holt die Kacheln direkt bei diesem Dienst — nicht über Django.' } },
      { id: 'maplibre', lane: 'map', text: { en: 'MapLibre draws the map next to the story.', de: 'MapLibre zeichnet die Karte neben der Story.' } }
    ],
    takeaway: { en: 'Two separate conversations: story content through the API, map data straight from the map service.', de: 'Zwei getrennte Gespräche: Story-Inhalte über die API, Kartendaten direkt vom Kartendienst.' }
  },
  {
    label: { en: 'Edit a story', de: 'Story bearbeiten' },
    steps: [
      { id: 'admin', lane: 'app', text: { en: 'An editor opens the admin and signs in.', de: 'Eine Person öffnet den Admin-Bereich und meldet sich an.' } },
      { id: 'keycloak', lane: 'app', text: { en: 'Keycloak checks the login and gives the browser a token.', de: 'Keycloak prüft die Anmeldung und gibt dem Browser ein Token.' } },
      { id: 'api', lane: 'app', text: { en: 'The browser sends the change to the API, together with the token.', de: 'Der Browser schickt die Änderung mit dem Token an die API.' } },
      { id: 'orgs', lane: 'app', text: { en: 'Django reads the role: only a Writer or Admin of this organization may edit.', de: 'Django liest die Rolle: Nur Autoren oder Admins dieser Organisation dürfen bearbeiten.' } },
      { id: 'postgres', lane: 'app', text: { en: 'If allowed, the change is saved. The next visitor sees it.', de: 'Wenn erlaubt, wird die Änderung gespeichert. Der nächste Besuch zeigt sie.' } }
    ],
    takeaway: { en: 'Keycloak says who you are. TOSCA decides what you may do.', de: 'Keycloak sagt, wer du bist. TOSCA entscheidet, was du darfst.' }
  },
  {
    label: { en: 'Load a 3D city (planned)', de: '3D-Stadt laden (geplant)' },
    steps: [
      { id: 'citydb', lane: 'map', text: { en: 'The 3D city model is stored with its buildings, walls and roofs.', de: 'Das 3D-Stadtmodell ist mit Gebäuden, Wänden und Dächern gespeichert.' } },
      { id: 'tiles3d', lane: 'map', text: { en: 'It is exported and converted once into small 3D Tiles.', de: 'Es wird einmal exportiert und in kleine 3D Tiles umgewandelt.' } },
      { id: 'garage', lane: 'map', text: { en: 'The tiles are stored as plain files in Garage.', de: 'Die Kacheln liegen als einfache Dateien in Garage.' } },
      { id: 'viewer', lane: 'map', text: { en: 'The viewer loads only the tiles the camera can see.', de: 'Der Viewer lädt nur die Kacheln, die die Kamera sieht.' } }
    ],
    takeaway: { en: 'Prepared once, streamed many times. No server work for each view.', de: 'Einmal vorbereitet, oft gestreamt. Keine Serverarbeit pro Ansicht.' }
  }
]


// A phase is a small sequence diagram: actors are columns, messages go from one column to another.
// from === to means work done inside that actor. reply marks an answer travelling back.
export type Msg = { from: number, to: number, text: Text, reply?: boolean }
export type Phase = { title: Text, when: Text, actors: { name: string, kind: Kind }[], msgs: Msg[] }
const once = { en: 'Once', de: 'Einmalig' }

export const integrations: { title: Text, summary: Text, status: Text, poc?: boolean, phases: Phase[], point: Text, guard: Text, links: Link[] }[] = [
  {
    title: { en: 'Knowledge graph + local AI', de: 'Wissensgraph + lokale KI' },
    summary: { en: 'Ask questions about city objects and how they connect.', de: 'Fragen zu Stadtobjekten und ihren Beziehungen stellen.' },
    status: { en: 'Proof of concept', de: 'Machbarkeitsstudie' }, poc: true,
    phases: [
      { title: { en: 'Prepare the knowledge', de: 'Wissen vorbereiten' }, when: once,
        actors: [{ name: 'CityGML / CityJSON', kind: 'file' }, { name: 'Pipeline', kind: 'service' }, { name: 'Graph DB', kind: 'db' }],
        msgs: [
          { from: 0, to: 1, text: { en: '3D city objects', de: '3D-Stadtobjekte' } },
          { from: 1, to: 1, text: { en: 'Finds objects and how they relate', de: 'Findet Objekte und ihre Beziehungen' } },
          { from: 1, to: 2, text: { en: 'Nodes and edges', de: 'Knoten und Kanten' } }
        ] },
      { title: { en: 'Ask a question', de: 'Eine Frage stellen' }, when: { en: 'Every question', de: 'Bei jeder Frage' },
        actors: [{ name: 'Frontend', kind: 'app' }, { name: 'Django REST API', kind: 'service' }, { name: 'Local LLM', kind: 'app' }, { name: 'Graph DB', kind: 'db' }],
        msgs: [
          { from: 0, to: 1, text: { en: '“Which buildings touch this street?”', de: '„Welche Gebäude grenzen an diese Straße?“' } },
          { from: 1, to: 1, text: { en: 'Checks login and role', de: 'Prüft Anmeldung und Rolle' } },
          { from: 1, to: 2, text: { en: 'Passes the question on', de: 'Gibt die Frage weiter' } },
          { from: 2, to: 3, text: { en: 'Controlled graph query', de: 'Kontrollierte Graph-Abfrage' } },
          { from: 3, to: 2, text: { en: 'Matching objects (facts)', de: 'Passende Objekte (Fakten)' }, reply: true },
          { from: 2, to: 1, text: { en: 'Answer in plain language', de: 'Antwort in Alltagssprache' }, reply: true },
          { from: 1, to: 0, text: { en: 'Answer + the objects it used', de: 'Antwort + genutzte Objekte' }, reply: true }
        ] }
    ],
    point: { en: 'The graph supplies the facts; the model only phrases the answer. The graph extends PostGIS and 3DCityDB — it does not replace them.', de: 'Der Graph liefert die Fakten, das Modell formuliert nur die Antwort. Er ergänzt PostGIS und 3DCityDB, ersetzt sie aber nicht.' },
    guard: { en: 'The model runs locally. Protected data is only queried after the API has checked the user.', de: 'Das Modell läuft lokal. Geschützte Daten werden erst abgefragt, nachdem die API die Person geprüft hat.' },
    links: [{ label: 'pyKCI', url: 'https://github.com/hcu-cml/pykci' }, { label: 'Neo4j', url: 'https://neo4j.com/docs/' }]
  },
  {
    title: { en: 'Game engines & VR', de: 'Game-Engines & VR' },
    summary: { en: 'Reuse city models in Unity or Unreal via Cesium.', de: 'Stadtmodelle in Unity oder Unreal über Cesium nutzen.' },
    status: { en: 'Possible integration', de: 'Mögliche Integration' },
    phases: [
      { title: { en: 'Prepare the 3D city', de: '3D-Stadt vorbereiten' }, when: once,
        actors: [{ name: '3DCityDB', kind: 'db' }, { name: 'Converter', kind: 'service' }, { name: 'Garage', kind: 'file' }],
        msgs: [
          { from: 0, to: 1, text: { en: 'CityJSON export', de: 'CityJSON-Export' } },
          { from: 1, to: 1, text: { en: 'Builds 3D Tiles', de: 'Erzeugt 3D Tiles' } },
          { from: 1, to: 2, text: { en: 'Uploads the tileset', de: 'Lädt das Tileset hoch' } }
        ] },
      { title: { en: 'Open the city in VR', de: 'Stadt in VR öffnen' }, when: { en: 'Every session', de: 'Bei jeder Sitzung' },
        actors: [{ name: 'Unity / Unreal', kind: 'app' }, { name: 'Django REST API', kind: 'service' }, { name: 'Garage', kind: 'file' }],
        msgs: [
          { from: 0, to: 1, text: { en: '“Which 3D cities may I load?”', de: '„Welche 3D-Städte darf ich laden?“' } },
          { from: 1, to: 1, text: { en: 'Checks access', de: 'Prüft den Zugriff' } },
          { from: 1, to: 0, text: { en: 'Dataset + tileset address', de: 'Datensatz + Tileset-Adresse' }, reply: true },
          { from: 0, to: 2, text: { en: 'Tiles for the current view', de: 'Kacheln für die aktuelle Ansicht' } },
          { from: 2, to: 0, text: { en: '3D Tiles — again as the camera moves', de: '3D Tiles — erneut, wenn sich die Kamera bewegt' }, reply: true }
        ] }
    ],
    point: { en: 'Two connections: the API says what to load, storage delivers the tiles. Django never streams 3D data itself.', de: 'Zwei Verbindungen: Die API sagt, was geladen wird, der Speicher liefert die Kacheln. Django streamt selbst keine 3D-Daten.' },
    guard: { en: 'Private cities need protection on both paths: the API answer and the tile storage.', de: 'Private Städte brauchen Schutz auf beiden Wegen: bei der API-Antwort und beim Kachelspeicher.' },
    links: [{ label: 'Cesium for Unity', url: 'https://cesium.com/learn/unity/' }, { label: 'Cesium for Unreal', url: 'https://cesium.com/learn/unreal/' }, { label: '3DCityDB export', url: 'https://docs.3dcitydb.org/latest/citydb-tool/export/' }]
  },
  {
    title: { en: 'MCP — agent-ready TOSCA', de: 'MCP — TOSCA für KI-Agenten' },
    summary: { en: 'Let AI agents use selected TOSCA functions as tools.', de: 'KI-Agenten ausgewählte TOSCA-Funktionen als Werkzeuge nutzen lassen.' },
    status: { en: 'Possible integration', de: 'Mögliche Integration' },
    phases: [
      { title: { en: 'From a request to a saved draft', de: 'Von der Bitte zum gespeicherten Entwurf' }, when: { en: 'Every request', de: 'Bei jeder Anfrage' },
        actors: [{ name: 'User', kind: 'app' }, { name: 'AI agent', kind: 'app' }, { name: 'TOSCA MCP server', kind: 'service' }, { name: 'Django REST API', kind: 'service' }],
        msgs: [
          { from: 0, to: 1, text: { en: '“Draft a Geostory about flood risk here.”', de: '„Entwirf eine Geostory zum Hochwasserrisiko hier.“' } },
          { from: 1, to: 2, text: { en: 'Calls a tool, e.g. “create story draft”', de: 'Ruft ein Werkzeug auf, z. B. „Story-Entwurf anlegen“' } },
          { from: 2, to: 3, text: { en: 'Normal API request, with the user’s token', de: 'Normale API-Anfrage mit dem Token der Person' } },
          { from: 3, to: 3, text: { en: 'Is this user a Writer? Then save as draft', de: 'Ist die Person Autor? Dann als Entwurf speichern' } },
          { from: 3, to: 2, text: { en: 'Draft created', de: 'Entwurf angelegt' }, reply: true },
          { from: 2, to: 1, text: { en: 'Tool result', de: 'Werkzeug-Ergebnis' }, reply: true },
          { from: 1, to: 0, text: { en: '“Here is your draft — review and publish.”', de: '„Hier ist dein Entwurf — prüfen und veröffentlichen.“' }, reply: true }
        ] }
    ],
    point: { en: 'The MCP server is only a translator. The agent can do exactly what the API already allows that user — nothing more.', de: 'Der MCP-Server ist nur ein Übersetzer. Der Agent darf genau das, was die API dieser Person ohnehin erlaubt — nicht mehr.' },
    guard: { en: 'Publishing stays a human decision.', de: 'Veröffentlichen bleibt eine menschliche Entscheidung.' },
    links: [{ label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/docs/learn/architecture' }, { label: 'TOSCA API docs', url: 'https://api.ngcn.dcs.hcu-hamburg.de/api/v1/docs/' }]
  }
]
