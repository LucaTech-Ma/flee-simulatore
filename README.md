# Flee · Simulatore pricing

Strumento di supporto alle decisioni di sourcing e pricing per il prodotto
pay-per-use Flee. In cima alla pagina c'è un riquadro **Come si usa** che spiega
in quattro passaggi come impostare lo scenario, leggere il margine, usare lo
score e correggere i prezzi di mercato.

Tre schede:

- **Vetture da ordinare** — scomposizione del prezzo di mercato per ciascuna
  vettura del listino fornitori, con verdetto di acquisto.
- **Portafoglio** — 313 contratti attivi, confronto tra pricing attuale e nuovo
  modello a costo + protezione a consumo.
- **Durate flessibili 6–60 mesi** — listino per durata di contratto, con il costo
  dei mesi di fermo incorporato nella rata fissa.

## Come si apre

Apri `index.html` in un browser. Non serve installare nulla, ma serve la connessione:
React e Tailwind vengono scaricati da CDN al primo avvio.

Il file `app.js` è il componente già compilato. Il sorgente leggibile è
`simulatore.jsx`: se lo modifichi va ricompilato prima di pubblicarlo.

## Come si pubblica

Su GitHub Pages: Settings → Pages → Source: `main`, cartella `/ (root)`.
Il sito è online in un paio di minuti.

## Note sui dati

Rate di fornitura reali (Kinto, Mobilize, Athlon, Leasys). Benchmark di mercato
dal quotatore Ayvens, netto IVA, stessa durata. Le tariffe assicurative e le
percorrenze vengono dal portafoglio attivo dove disponibili, altrimenti sono
stimate e segnalate come tali nell'interfaccia.

Esclusi dal modello: ripristino al rientro tra un cliente e l'altro, penali sui
km eccedenti il plafond del fornitore, accantonamento per insolvenza.
