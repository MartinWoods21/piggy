# Miarka

Licznik kalorii i makroskładników po polsku. Jeden plik HTML, bez backendu, bez konta,
bez śledzenia. Zrobiony pod telefon.

**Apka:** https://martinwoods21.github.io/miarka/

## Co potrafi

- **Dziennik** — posiłki, makro (białko / węglowodany / tłuszcz), błonnik, woda, przełączanie dni
- **239 produktów** — podstawy plus marki własne Lidla (Pilos, Pikok, Crownfield, Combino, Alesto…)
  i Biedronki (Mleczna Dolina, Kraina Wędlin, Vitanella, Go Active…), z typowymi porcjami,
  żeby nie trzeba było wszystkiego ważyć. Można dodawać własne produkty z etykiety
- **Własne posiłki** — dowolne nazwy i kolejność, plus posiłki jednorazowe „tylko na dziś"
- **Plan** — podsumowanie tygodnia z wykresem, kalendarz miesiąca, osobne cele kaloryczne
  na dni treningowe i nietreningowe
- **Atlas ćwiczeń** — 74 ćwiczenia w 10 partiach, z techniką krok po kroku i częstymi błędami
- **Offline** — po pierwszym wejściu działa bez internetu (service worker)

## Gdzie są dane

Wyłącznie w `localStorage` przeglądarki na urządzeniu użytkownika. Nic nie jest wysyłane
na żaden serwer — repo nie zawiera i nie może zawierać niczyjego dziennika.

Konsekwencja: dane **nie synchronizują się między urządzeniami**, a wyczyszczenie danych
przeglądarki je kasuje. W apce jest **Ja → Kopia zapasowa**, która eksportuje wszystko
do tekstu i pozwala wczytać z powrotem.

## Pliki

| Plik | Rola |
|------|------|
| `index.html` | Cała aplikacja — style, logika, baza produktów i ćwiczeń |
| `sw.js` | Service worker: dokument z sieci, cache jako zapas offline |
| `manifest.webmanifest` | PWA — instalacja na ekranie głównym |
| `icon-*.png` | Ikony aplikacji |

## Rozwój

```bash
python3 -m http.server 8731
```

Potem otwórz http://localhost:8731. Serwer jest potrzebny, bo service worker
nie działa z `file://`.

Po zmianie `index.html` podbij `VERSION` w `sw.js`, żeby stary cache został unieważniony.

## Wartości odżywcze

Przybliżone. Producenci zmieniają receptury, więc przy konkretnych produktach warto
zerknąć na etykietę — każdy produkt da się w apce poprawić albo dodać własny.
Apka nie zastępuje porady dietetyka ani lekarza.
