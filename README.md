## Slutprojekt - Webbshop

## Beskrivning

## Tekniker och verktyg

Vi har användt oss av följande ramverk och verktyg:

### Front End

-

### Back End

-

## Skapare

Tomas Invarsson [github...], Sebastian Johansson[github...], Mergim Shalaa[github...], Yehad Moussaoui[github...]

## Kodbas

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).

Här är en lista på de olika skripten som kan köras i terminalen.

### G-Krav

- [x] Alla sidor skall vara responsiva. (G)
- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)
- [x] Express backenden ska ha validering på samtliga endpoints. (G)
- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
- [x] Man ska kunna logga in som administratör i systemet (G)
- [x] Inga Lösenord får sparas i klartext i databasen (G)
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- [ ] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kat(egori G)
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

### VG

- [x] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
- [ ] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
- [x] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)
- [halvt] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)
- [x] En administratör ska kunna uppgradera en användare till administratör (VG)
- [ ] Administratörer ska kunna markera beställningar som skickade (VG)
