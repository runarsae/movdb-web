# ![MovDB](Documentation/head.png)

# MovDB - En filmdatabaseapplikasjon

Web-applikasjonen MovDB skaffer brukere informasjon om over 2000 filmer! Gjennom søkefeltet øverst på siden, kan brukerne finne filmer ved å skrive inn nøkkelord fra filmens tittel eller beskrivelse. Deretter kan de trykke på de enkelte filmene fra resultatet av søket. Da åpnes en popup, hvor brukeren kan se filmens trailer, se hvilke produksjonsselskap som lagde den, se hvilke(t) land filmen ble spilt inn i og se lengden av filmen. Dersom brukeren er registrert på siden, og har logget inn, kan den vise hvilke filmer som er dens favoritter ved å trykke på hjerteikonet. Det totale antallet av brukere som har likt filmen vises i ved siden av ikonet. Hvis brukeren ikke leter etter én bestemt film, kan den bruke applikasjonens filter og sortering til å finne filmer den vil se. Mens det er mulig å sortere på rating, lengde og lanseringsdato, kan man filtrere filmer på sjangre, produksjonsselskap, lanseringsdato og lendge.  

## Verktøy

* [React](https://reactjs.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [GraphQL](https://graphql.org/)
* [MongoDB](https://www.mongodb.com/)
* [Material-UI](https://material-ui.com/)

## Nedlasting

Ved å følge instruksjonene under, vil du kunne kjøre prosjektet på din lokale maskin både for utvikling og testing. 

### Forutsatte nødvendigheter

Følgende er nødvendig for å kunne kjøre prosjektet:

- [Node.js and npm](https://nodejs.org/en/download/)
- [VPN](https://innsida.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN) or a direct connection to the NTNU network.

Du må muligens omstarte maskinen din etter at installeringen er ferdig.

### Installering

#### Steg 1 - Klon Prosjektet
Åpne en ny terminal, og naviger til mappen du ønsker å installere prosjektet i.
Klone [repoet](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-23/prosjekt-3) ved å skrive: 

```
git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-23/prosjekt-3.git
```
#### Step 2 - Koble til NTNUs nettverk
Koble til NTNUs nettverk enten direkte, eller gjennom en VPN.

#### Step 3 - Installer og start backend
Nå er vi klare til å installere avhengighetene:
1. Åpne terminalen igjen
2. Mens du er prosjektets rotmappe, naviger til backend-mappen: 
    ``` 
    ...\prosjekt-3\movdb_backend 
    ```
4. Installer avhengighetene til backend med: 
    ```
    ...\prosjekt-3\movdb_backend npm install
    ```
5. Start backend med: 
    ``` 
    ...\prosjekt-3\movdb_backend node index.js
    ```

#### Steg 4 - Installer og kjør frontend:
1. Åpne en ny terminal, men hold terminalen du brukte over åpen
2. Mens du er i prosjektets rotmappe, naviger til frontend-mappen med: 
    ``` 
    ...\prosjekt-3\movdb_frontend 
    ```
3. Installer avhengihetene til frontend med: 
    ``` 
    ...\prosjekt-3\movdb_frontend npm install
    ```
4. Start frontend med: 
    ``` 
    ...\prosjekt-3\movdb_frontend npm start
    ```

#### Steg 5 - Bruk applikasjonen:
Åpne favorittnettleseren din og gå til [localhost:3000](localhost:3000). Hvis applikasjonen er ferdig med å komplilere, vil du bli møtt med forsiden av MovDB.

# ![MovDBFront](Documentation/front.png)


For å stoppe applikasjonen, gå til terminalene du åpnet for å starte frontend og backend og trykk "ctrl + C" på Windows, eller "cmd + C" på Mac.

## Testing

Prosjektet er testet med end-to-end testing med [Cypress](https://www.cypress.io/) og unit-testing med Jest. For å kjøre unit-testene må du igjen navigere til frontend-mappen. Deretter skriver du:
    ``` 
    ...\prosjekt-3\movdb_frontend npm test
    ```

For å kjøre end-to-end-testene må du navigere til backend-mappen. Deretter skriver du:
    ``` 
    ...\prosjekt-3\movdb_backend npx cypress run
    ```

## Bidragsytere
* **Aleksander** - aleksawk@stud.ntnu.no - Gitlab: [aleksawk](https://gitlab.stud.idi.ntnu.no/aleksawk)
* **Runar** - runarsae@stud.ntnu.no - Gitlab: [runarsae](https://gitlab.stud.idi.ntnu.no/runarsae)
* **Erlend** - erlenmom@stud.ntnu.no - Gitlab: [erlenmom](https://gitlab.stud.idi.ntnu.no/erlenmom)