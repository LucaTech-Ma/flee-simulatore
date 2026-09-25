(function(){
const {
  useState,
  useMemo
} = React;
const C = {
  ink: "#14233F",
  ink2: "#3A4A68",
  paper: "#F1F3F6",
  card: "#FFFFFF",
  line: "#D8DEE7",
  ok: "#1E7A5A",
  att: "#B23A2F",
  ayv: "#D99A2B",
  nuovo: "#1B4F9C",
  mute: "#78849A",
  forn: "#2E4A7D",
  cts: "#6E88B5",
  ass: "#B9C8DF",
  marg: "#1E7A5A",
  over: "#B23A2F"
};
const FONT = `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
const MONO = `'IBM Plex Mono', 'SF Mono', Menlo, monospace`;
const eur = (n, d = 0) => (n < 0 ? "−€" : "€") + Math.abs(n).toLocaleString("it-IT", {
  minimumFractionDigits: d,
  maximumFractionDigits: d
});

/* Catalogo luglio-agosto 2026. r36/r48 = canone fornitore netto IVA. ir = tariffa assicurativa €/km.
   tc = giorni di consegna (0 = ignoto). stk = stock: -1 ignoto, -2 disponibile senza conteggio,
   0 solo su ordine, n unità. a36/a48 = prezzo Ayvens, 10.000 km/anno, anticipo zero: reale dove quotato nel catalogo broker
   di settembre, altrimenti stimato dal listino per fascia. */
const CATALOGO = [{
  m: "MB GLC COUPÈ GLC 220d MHEV 4M…",
  f: "Athlon",
  li: 61655,
  ir: 0.216,
  r36: 665.04,
  r48: 631.6,
  a36: 932,
  a48: 852,
  src: "reale",
  seg: "Premium",
  tc: 180,
  stk: 0
}, {
  m: "Q5 TDI 150kW quattro S tronic…",
  f: "Leasys",
  li: 55751,
  ir: 0.169,
  r36: 700.17,
  r48: 704.73,
  a36: 862.81,
  a48: 763.28,
  src: "reale",
  seg: "Premium",
  tc: 0,
  stk: -1
}, {
  m: "MB GLC GLC 200 4M Mild Hyb. A…",
  f: "Athlon",
  li: 53711,
  ir: 0.216,
  r36: 652.14,
  r48: 609.49,
  a36: 969.0,
  a48: 870.92,
  src: "reale",
  seg: "Premium",
  tc: 200,
  stk: 0
}, {
  m: "Audi Q3 SPORTBACK TDI 110 kW …",
  f: "Athlon",
  li: 41206,
  ir: 0.169,
  r36: 523.83,
  r48: 494.72,
  a36: 874.09,
  a48: 757.65,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "Audi Q3 SPORTBACK TFSI 110 Kw…",
  f: "Athlon",
  li: 40141,
  ir: 0.169,
  r36: 526.24,
  r48: 498.69,
  a36: 836.51,
  a48: 752.54,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "Audi Q3 TDI 110 kW S tronic B…",
  f: "Athlon",
  li: 39796,
  ir: 0.169,
  r36: 581.83,
  r48: 535.66,
  a36: 689.5,
  a48: 624.82,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "BMW X1 sDrive 18d X-Line DCT",
  f: "Athlon",
  li: 39361,
  ir: 0.169,
  r36: 480.81,
  r48: 454.45,
  a36: 667,
  a48: 628,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "Audi Q3 TFSI 110 kW S tronic …",
  f: "Athlon",
  li: 38730,
  ir: 0.169,
  r36: 563.64,
  r48: 526.65,
  a36: 803.87,
  a48: 722.71,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "DS 7 BlueHDi 130 Automatica P…",
  f: "Leasys",
  li: 37566,
  ir: 0.169,
  r36: 385.73,
  r48: 392.65,
  a36: 652.99,
  a48: 612.16,
  src: "reale",
  seg: "SUV medi",
  tc: 0,
  stk: -1
}, {
  m: "RAV4 2.5 HEV E-CVT",
  f: "Kinto",
  li: 37164,
  ir: 0.169,
  r36: 445.0,
  r48: 445.0,
  a36: 787,
  a48: 705,
  src: "reale",
  seg: "SUV medi",
  tc: 90,
  stk: 8
}, {
  m: "TIGUAN 2.0 TDI 110KW SCR Edit…",
  f: "Leasys",
  li: 36362,
  ir: 0.169,
  r36: 450.52,
  r48: 430.2,
  a36: 840.06,
  a48: 732.06,
  src: "reale",
  seg: "SUV medi",
  tc: 0,
  stk: -1
}, {
  m: "TESLA MODEL 3 75 kWh Premium …",
  f: "Athlon",
  li: 36057,
  ir: 0.169,
  r36: 658.52,
  r48: 586.89,
  a36: 793.67,
  a48: 711.82,
  src: "simile",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "Jeep COMPASS 1.2 Turbo MHEV 1…",
  f: "Leasys",
  li: 33270,
  ir: 0.169,
  r36: 503.79,
  r48: 496.27,
  a36: 653.81,
  a48: 592.39,
  src: "reale",
  seg: "SUV medi",
  tc: 0,
  stk: -1
}, {
  m: "LBX 1.5 136 Emotion 2WD",
  f: "Kinto",
  li: 33238,
  ir: 0.144,
  r36: 385.0,
  r48: 355.0,
  a36: 584.79,
  a48: 531.94,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "BYD SEAL U DM-I 1.5 217cv Boo…",
  f: "Athlon",
  li: 32787,
  ir: 0.144,
  r36: 482.85,
  r48: 446.38,
  a36: 586.44,
  a48: 532.43,
  src: "reale",
  seg: "SUV medi",
  tc: 180,
  stk: 0
}, {
  m: "C10 HYBRID 1.5 28.4KWH Design",
  f: "Leasys",
  li: 32049,
  ir: 0.144,
  r36: 437.06,
  r48: 459.48,
  a36: 632.56,
  a48: 549.09,
  src: "reale",
  seg: "SUV medi",
  tc: 0,
  stk: -1
}, {
  m: "Alfa Romeo TONALE 1.6 Diesel …",
  f: "Leasys",
  li: 31844,
  ir: 0.169,
  r36: 414.06,
  r48: 397.18,
  a36: 602.71,
  a48: 554.32,
  src: "reale",
  seg: "SUV medi",
  tc: 0,
  stk: -1
}, {
  m: "Toyota C-HR 1.8 HV E-CVT Trend",
  f: "Kinto",
  li: 31230,
  ir: 0.144,
  r36: 329.0,
  r48: 319.0,
  a36: 479,
  a48: 442,
  src: "reale",
  seg: "SUV medi",
  tc: 30,
  stk: 10
}, {
  m: "Audi A3 TFSI 85 kW S tronic B…",
  f: "Athlon",
  li: 29313,
  ir: 0.144,
  r36: 418.26,
  r48: 393.54,
  a36: 585.37,
  a48: 526.51,
  src: "simile",
  seg: "Compatte e crossover",
  tc: 180,
  stk: 0
}, {
  m: "NISSAN QASHQAI 1.3 MHEV 158 N…",
  f: "Athlon",
  li: 29184,
  ir: 0.144,
  r36: 363.87,
  r48: 347.85,
  a36: 448.26,
  a48: 417.82,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 180,
  stk: 0
}, {
  m: "DACIA BIGSTER Journey  full h…",
  f: "Mobilize",
  li: 26683,
  ir: 0.144,
  r36: 278.02,
  r48: 285.67,
  a36: 472,
  a48: 439,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 45,
  stk: -2
}, {
  m: "YARIS CROSS 1.5 HEV ICON E-CVT",
  f: "Kinto",
  li: 25779,
  ir: 0.144,
  r36: 295.0,
  r48: 289.0,
  a36: 447,
  a48: 413,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 90,
  stk: 40
}, {
  m: "JUNIOR 1.2 145CV eDCT6 ibrida…",
  f: "Leasys",
  li: 25492,
  ir: 0.144,
  r36: 304.74,
  r48: 319.7,
  a36: 410.22,
  a48: 383.5,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 0,
  stk: -1
}, {
  m: "Fiat 600 1.2 110cv Icon",
  f: "Leasys",
  li: 21475,
  ir: 0.144,
  r36: 338.06,
  r48: 291.0,
  a36: 397.45,
  a48: 370.02,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 0,
  stk: -1
}, {
  m: "CAPTUR evolution ECO-G 120 MY…",
  f: "Mobilize",
  li: 20186,
  ir: 0.144,
  r36: 267.05,
  r48: 250.23,
  a36: 516.96,
  a48: 457.19,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 45,
  stk: -2
}, {
  m: "Yaris Active MY25",
  f: "Kinto",
  li: 20164,
  ir: 0.144,
  r36: 282.0,
  r48: 266.0,
  a36: 459.94,
  a48: 420.86,
  src: "reale",
  seg: "Compatte e crossover",
  tc: 30,
  stk: 5
}, {
  m: "Peugeot 208 Style Turbo benzi…",
  f: "Leasys",
  li: 18623,
  ir: 0.122,
  r36: 248.71,
  r48: 227.55,
  a36: 307.79,
  a48: 295.21,
  src: "reale",
  seg: "City car",
  tc: 0,
  stk: -1
}, {
  m: "Aygo X 115 Icon e-CVT",
  f: "Kinto",
  li: 18361,
  ir: 0.122,
  r36: 260.0,
  r48: 259.0,
  a36: 381,
  a48: 346,
  src: "reale",
  seg: "City car",
  tc: 30,
  stk: 10
}, {
  m: "Fiat GRANDE PANDA Business",
  f: "Leasys",
  li: 18320,
  ir: 0.122,
  r36: 295.62,
  r48: 282.43,
  a36: 350.02,
  a48: 318.22,
  src: "reale",
  seg: "City car",
  tc: 0,
  stk: -1
}, {
  m: "Citroen C3 110 cv Automatico …",
  f: "Leasys",
  li: 18008,
  ir: 0.122,
  r36: 292.21,
  r48: 285.28,
  a36: 347.44,
  a48: 335.96,
  src: "reale",
  seg: "City car",
  tc: 0,
  stk: -1
}, {
  m: "Fiat 500 Icon",
  f: "Leasys",
  li: 17582,
  ir: 0.122,
  r36: 276.21,
  r48: 261.88,
  a36: 370.21,
  a48: 332.4,
  src: "reale",
  seg: "City car",
  tc: 0,
  stk: -1
}, {
  m: "CLIO EVOLUTION TCE 115CV",
  f: "Mobilize",
  li: 16088,
  ir: 0.122,
  r36: 273.18,
  r48: 254.48,
  a36: 323,
  a48: 310,
  src: "reale",
  seg: "City car",
  tc: 45,
  stk: -2
}, {
  m: "PANDINA 1.0 FireFly 65cv S&S …",
  f: "Leasys",
  li: 14303,
  ir: 0.122,
  r36: 206.48,
  r48: 186.67,
  a36: 280.11,
  a48: 262.97,
  src: "reale",
  seg: "City car",
  tc: 0,
  stk: -1
}, {
  m: "FIAT PANDINA 1.0 FireFly 65cv…",
  f: "Athlon",
  li: 14221,
  ir: 0.122,
  r36: 277.7,
  r48: 253.87,
  a36: 280.11,
  a48: 262.97,
  src: "reale",
  seg: "City car",
  tc: 60,
  stk: 10
}];
const SEGMENTI = ["City car", "Compatte e crossover", "SUV medi", "Premium", "n.d."];
const FORNITORI = ["Kinto", "Leasys", "Mobilize", "Athlon"];
function CatalogoFlee() {
  const [km, setKm] = useState(400);
  const [mkPct, setMkPct] = useState(10);
  const [cts, setCts] = useState(35);
  const [dur, setDur] = useState("best");
  const [forn, setForn] = useState([...FORNITORI]);
  const [segs, setSegs] = useState([...SEGMENTI]);
  const [prezzi, setPrezzi] = useState({});
  const [cons, setCons] = useState({});
  const [stock, setStock] = useState({});
  const [pesi, setPesi] = useState({
    marg: 50,
    cons: 25,
    stk: 25
  });
  const [ordine, setOrdine] = useState("score");
  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  const calc = useMemo(() => {
    return CATALOGO.map(v => {
      const ov = prezzi[v.m];
      const a36 = ov !== undefined && ov !== "" ? parseFloat(ov) || 0 : v.a36;
      const a48 = ov !== undefined && ov !== "" ? Math.round((parseFloat(ov) || 0) * 0.926) : v.a48;
      const opz = [{
        d: 36,
        r: v.r36,
        a: a36
      }, {
        d: 48,
        r: v.r48,
        a: a48
      }].filter(o => o.r > 0 && o.a > 0).map(o => ({
        ...o,
        ass: km * v.ir,
        marg: o.a - o.r - cts - km * v.ir
      }));
      const s = opz.length ? dur === "best" ? opz.reduce((x, y) => y.marg > x.marg ? y : x) : opz.find(o => o.d === Number(dur)) || opz[0] : null;
      const fornMax = s ? s.a * (1 - mkPct / 100) - cts - km * v.ir : 0;
      const tcOv = cons[v.m],
        stOv = stock[v.m];
      const tc = tcOv !== undefined && tcOv !== "" ? parseInt(tcOv) || 0 : v.tc;
      const stk = stOv !== undefined && stOv !== "" ? parseInt(stOv) : v.stk;
      const pct = s ? s.marg / s.a : 0;
      const sMarg = s ? Math.max(0, Math.min(100, pct / 0.25 * 100)) : 0;
      const sCons = tc > 0 ? Math.max(0, Math.min(100, (200 - tc) / 170 * 100)) : null;
      const sStk = stk === -1 ? null : stk === -2 ? 70 : stk === 0 ? 0 : Math.min(100, 40 + stk * 3);
      const pesoTot = pesi.marg + (sCons !== null ? pesi.cons : 0) + (sStk !== null ? pesi.stk : 0);
      const score = s && pesoTot > 0 ? (sMarg * pesi.marg + (sCons ?? 0) * (sCons !== null ? pesi.cons : 0) + (sStk ?? 0) * (sStk !== null ? pesi.stk : 0)) / pesoTot : null;
      const parziale = sCons === null || sStk === null;
      return {
        ...v,
        a36,
        a48,
        opz,
        s,
        fornMax,
        tc,
        stk,
        sMarg,
        sCons,
        sStk,
        score,
        parziale,
        manuale: ov !== undefined && ov !== ""
      };
    });
  }, [km, cts, dur, mkPct, prezzi, cons, stock, pesi]);
  const visibili = calc.filter(v => forn.includes(v.f) && segs.includes(v.seg));
  const conPrezzo = visibili.filter(v => v.s).sort((a, b) => ordine === "score" ? (b.score ?? -1) - (a.score ?? -1) : ordine === "consegna" ? (a.tc || 999) - (b.tc || 999) : b.s.marg / b.s.a - a.s.marg / a.s.a);
  const senzaPrezzo = visibili.filter(v => !v.s);
  const ordinati = [...conPrezzo, ...senzaPrezzo];
  const scala = Math.max(...conPrezzo.map(v => Math.max(v.s.a, v.s.r + cts + v.s.ass)), 1);
  const verdetto = p => p >= 0.12 ? ["ORDINA", C.ok] : p >= 0.05 ? ["VALUTA", C.ayv] : ["NO", C.att];
  const nOrd = conPrezzo.filter(v => v.s.marg / v.s.a >= mkPct / 100).length;
  const nStimOrd = conPrezzo.filter(v => v.s.marg / v.s.a >= mkPct / 100 && !v.manuale && v.src !== "reale").length;
  const nReali = visibili.filter(v => v.src === "reale" || v.manuale).length;
  const nStim = visibili.filter(v => !v.manuale && (v.src === "stimato" || v.src === "simile")).length;
  const Chip = ({
    on,
    onClick,
    children
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      padding: "4px 9px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${on ? C.nuovo : C.line}`,
      background: on ? C.nuovo : "#fff",
      color: on ? "#fff" : C.mute
    }
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      background: C.paper,
      color: C.ink,
      padding: "22px 24px 40px"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        input[type=range]{accent-color:${C.nuovo};width:100%;}
        input:focus-visible,button:focus-visible{outline:2px solid ${C.nuovo};outline-offset:2px;}`), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: "-.02em",
      margin: 0
    }
  }, "Catalogo luglio-agosto 2026 \xB7 cosa ordinare"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: C.ink2,
      margin: "5px 0 10px",
      maxWidth: 760,
      lineHeight: 1.5
    }
  }, "Ogni barra \xE8 il prezzo di mercato della vettura. Dentro, dove finisce: quanto al fornitore, quanto alla gestione, quanto all’assicurazione. Quello che avanza \xE8 il margine."), /*#__PURE__*/React.createElement("details", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: "9px 13px",
      marginBottom: 12,
      maxWidth: 900,
      fontSize: 12.3,
      lineHeight: 1.55,
      color: C.ink2
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      fontWeight: 600,
      color: C.ink,
      fontSize: 12.5,
      listStyle: "none"
    }
  }, "Come si usa ▾"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      display: "grid",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.ink
    }
  }, "1. Imposta lo scenario."), " I cursori in alto definiscono le ipotesi comuni a tutte le vetture: percorrenza mensile del cliente, mark-up target, durata del contratto e cost-to-serve. Cambiandoli si ricalcola tutto il catalogo in tempo reale."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.ink
    }
  }, "2. Leggi il margine."), " Ogni barra \xE8 il prezzo di mercato (Ayvens o broker, IVA esclusa). Le sezioni colorate sono i costi certi — fornitura, gestione, assicurazione Generali — e la parte restante \xE8 il margine che resta a Flee a quella percorrenza."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.ink
    }
  }, "3. Usa lo score per scegliere."), " Ogni modello ha un punteggio 0-100 che pesa margine, tempi di consegna e disponibilit\xE0 a stock. I pesi sono modificabili: se la priorit\xE0 \xE8 consegnare in fretta, alza “Consegna” e la classifica si riordina di conseguenza."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.ink
    }
  }, "4. Correggi i dati."), " Nella tabella “Dati per modello” il prezzo di mercato \xE8 editabile. I valori sono marcati ", /*#__PURE__*/React.createElement("i", null, "reale"), " (quotazione verificata), ", /*#__PURE__*/React.createElement("i", null, "stimato"), " (media di segmento) o", /*#__PURE__*/React.createElement("i", null, " mancante"), ": sostituendo una stima con una quotazione vera, margine e score si aggiornano subito."), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.mute,
      fontSize: 11.5
    }
  }, "Le modifiche restano solo in questa sessione: ricaricando la pagina si torna ai valori di partenza. Tutte le tabelle sono ordinate dal modello pi\xF9 conveniente al meno."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end",
    style: {
      gap: 22,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 220px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: C.ink2
    }
  }, "Percorrenza del cliente"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, km, " km/mese")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 100,
    max: 1000,
    step: 25,
    value: km,
    onChange: e => setKm(+e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 200px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: C.ink2
    }
  }, "Mark-up target"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, mkPct, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 25,
    step: 1,
    value: mkPct,
    onChange: e => setMkPct(+e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 5
    }
  }, "Durata"), /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 5
    }
  }, ["best", "36", "48"].map(d => /*#__PURE__*/React.createElement(Chip, {
    key: d,
    on: dur === d,
    onClick: () => setDur(d)
  }, d === "best" ? "la migliore" : d + "m")))), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: C.ink2
    }
  }, "Cost-to-serve"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: cts,
    step: 5,
    onChange: e => setCts(parseFloat(e.target.value) || 0),
    style: {
      width: 62,
      padding: "3px 6px",
      border: `1px solid ${C.line}`,
      borderRadius: 3,
      fontFamily: MONO,
      fontSize: 12,
      textAlign: "right"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end",
    style: {
      gap: 22,
      marginBottom: 12,
      paddingBottom: 12,
      borderBottom: `1px solid ${C.line}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 5
    }
  }, "Peso nello score"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 18
    }
  }, [["marg", "Margine"], ["cons", "Consegna"], ["stk", "Stock"]].map(([k, lab]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      width: 150
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.ink2
    }
  }, lab), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11
    }
  }, pesi[k])), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    step: 5,
    value: pesi[k],
    onChange: e => setPesi({
      ...pesi,
      [k]: +e.target.value
    })
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 5
    }
  }, "Ordina per"), /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 5
    }
  }, [["score", "score"], ["margine", "margine"], ["consegna", "consegna"]].map(([k, l]) => /*#__PURE__*/React.createElement(Chip, {
    key: k,
    on: ordine === k,
    onClick: () => setOrdine(k)
  }, l))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginRight: 3
    }
  }, "Fornitore"), FORNITORI.map(f => /*#__PURE__*/React.createElement(Chip, {
    key: f,
    on: forn.includes(f),
    onClick: () => toggle(forn, setForn, f)
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginRight: 3
    }
  }, "Segmento"), SEGMENTI.map(sg => /*#__PURE__*/React.createElement(Chip, {
    key: sg,
    on: segs.includes(sg),
    onClick: () => toggle(segs, setSegs, sg)
  }, sg))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.ink,
      color: "#fff",
      borderRadius: 6,
      padding: "16px 22px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center",
    style: {
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      fontWeight: 600
    }
  }, visibili.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "modelli a catalogo")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      opacity: 0.35
    }
  }, "›"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      fontWeight: 600
    }
  }, conPrezzo.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "confrontabili", senzaPrezzo.length ? `, ${senzaPrezzo.length} senza prezzo` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      opacity: 0.35
    }
  }, "›"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      fontWeight: 600,
      color: "#7FE3B8"
    }
  }, nOrd), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "sopra il ", mkPct, "%", nStimOrd ? `, di cui ${nStimOrd} su prezzo stimato` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#7FE3B8"
    }
  }, nReali), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, " / "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#F0B860"
    }
  }, nStim), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, " / "), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7
    }
  }, senzaPrezzo.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "quotazioni reali / stimate / mancanti")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: "16px 16px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 15,
      marginBottom: 14,
      fontSize: 11,
      color: C.ink2
    }
  }, [["Costo fornitura", C.forn], ["Cost-to-serve", C.cts], ["Assicurazione", C.ass], ["Margine", C.marg], ["Sopra il mercato", C.over]].map(([l, col]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: "flex items-center",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      background: col,
      borderRadius: 2,
      display: "inline-block"
    }
  }), l))), conPrezzo.map(v => {
    const s = v.s,
      pct = s.marg / s.a,
      [vd, vc] = verdetto(pct),
      neg = s.marg < 0;
    const w = x => `${x / scala * 100}%`;
    return /*#__PURE__*/React.createElement("div", {
      key: v.m,
      style: {
        marginBottom: 13
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between",
      style: {
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 500
      }
    }, v.m, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.mute,
        fontWeight: 400,
        fontSize: 10.5
      }
    }, " · ", v.f, " · ", s.d, " mesi", v.seg !== "n.d." ? " · " + v.seg : "", v.tc ? ` · ${v.tc} gg` : " · consegna n.d.", v.stk === -1 ? "" : v.stk === -2 ? " · a stock" : v.stk === 0 ? " · su ordine" : ` · ${v.stk} a stock`, v.manuale ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.nuovo
      }
    }, " · prezzo inserito") : v.src === "stimato" ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.ayv
      }
    }, " · prezzo stimato") : v.src === "simile" ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.ayv
      }
    }, " · da modello simile") : null)), /*#__PURE__*/React.createElement("span", {
      className: "flex items-baseline",
      style: {
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: MONO,
        fontSize: 12.5,
        fontWeight: 600,
        color: neg ? C.att : C.ok
      }
    }, eur(s.marg), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        opacity: 0.7
      }
    }, "(", (pct * 100).toFixed(1), "%)")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9.5,
        fontWeight: 600,
        color: vc,
        letterSpacing: ".04em",
        width: 52,
        textAlign: "right"
      }
    }, vd), /*#__PURE__*/React.createElement("span", {
      title: v.score === null ? "dati insufficienti" : `margine ${v.sMarg.toFixed(0)} · consegna ${v.sCons === null ? "n.d." : v.sCons.toFixed(0)} · stock ${v.sStk === null ? "n.d." : v.sStk.toFixed(0)}`,
      style: {
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 600,
        width: 42,
        textAlign: "center",
        padding: "1px 0",
        borderRadius: 3,
        color: "#fff",
        background: v.score === null ? C.mute : v.score >= 60 ? C.ok : v.score >= 40 ? C.ayv : C.att,
        opacity: v.parziale ? 0.6 : 1
      }
    }, v.score === null ? "—" : Math.round(v.score)))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 22,
        background: C.paper,
        borderRadius: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex",
      style: {
        height: "100%",
        borderRadius: 3,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: w(s.r),
        background: C.forn
      },
      title: `Fornitura ${eur(s.r)}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: w(cts),
        background: C.cts
      },
      title: `Cost-to-serve ${eur(cts)}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: w(s.ass),
        background: C.ass
      },
      title: `Assicurazione ${eur(s.ass)}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: w(Math.abs(s.marg)),
        background: neg ? C.over : C.marg
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: w(s.a),
        top: -3,
        bottom: -3,
        width: 2,
        background: C.ayv
      }
    })));
  }), !conPrezzo.length && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.mute,
      padding: "10px 0"
    }
  }, "Nessun modello con i filtri selezionati.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between",
    style: {
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: 0
    }
  }, "Dati per modello"), Object.keys(prezzi).length + Object.keys(cons).length + Object.keys(stock).length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrezzi({});
      setCons({});
      setStock({});
    },
    style: {
      fontSize: 11,
      padding: "3px 9px",
      border: `1px solid ${C.line}`,
      borderRadius: 3,
      background: "#fff",
      color: C.ink2,
      cursor: "pointer",
      fontFamily: FONT
    }
  }, "Azzera modifiche")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: C.mute,
      margin: "0 0 10px"
    }
  }, "Prezzo di mercato a 10.000 km/anno e anticipo zero; il valore a 48 mesi si ricalcola al 92,8% di quello a 36. Per lo stock scrivi il numero di unit\xE0, oppure 0 se la vettura \xE8 solo su ordine."), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: C.mute,
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "3px 0"
    }
  }, "Modello"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left"
    }
  }, "Fornitore"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "36 mesi"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "48 mesi"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      paddingLeft: 8
    }
  }, "Origine"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      paddingLeft: 8
    }
  }, "Prezzo 36m"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      paddingLeft: 14
    }
  }, "Consegna gg"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Stock"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      paddingLeft: 10
    }
  }, "Score"))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: MONO
    }
  }, ordinati.map(v => {
    const et = v.manuale ? ["inserito", C.nuovo] : v.src === "reale" ? ["reale", C.ok] : v.src === "simile" ? ["da simile", C.ayv] : v.src === "stimato" ? ["stimato", C.ayv] : ["mancante", C.att];
    const inp = (val, ph, on, mod, w) => /*#__PURE__*/React.createElement("input", {
      type: "number",
      placeholder: ph,
      value: val,
      onChange: on,
      style: {
        width: w,
        padding: "2px 6px",
        border: `1px solid ${mod ? C.nuovo : C.line}`,
        borderRadius: 3,
        fontFamily: MONO,
        fontSize: 11.5,
        textAlign: "right",
        background: mod ? "#EEF3FB" : "#fff"
      }
    });
    return /*#__PURE__*/React.createElement("tr", {
      key: v.m,
      style: {
        borderTop: `1px solid ${C.line}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "4px 0",
        fontFamily: FONT
      }
    }, v.m), /*#__PURE__*/React.createElement("td", {
      style: {
        fontFamily: FONT,
        color: C.mute,
        fontSize: 10.5
      }
    }, v.f), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right"
      }
    }, v.a36 ? eur(v.a36) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: C.mute
      }
    }, v.a48 ? eur(v.a48) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        paddingLeft: 8,
        fontFamily: FONT,
        fontSize: 10.5,
        color: et[1]
      }
    }, et[0]), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        paddingLeft: 8
      }
    }, inp(prezzi[v.m] ?? "", v.a36 ? String(v.a36) : "€", e => setPrezzi({
      ...prezzi,
      [v.m]: e.target.value
    }), v.manuale, 76)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        paddingLeft: 14
      }
    }, inp(cons[v.m] ?? "", v.tc ? String(v.tc) : "gg", e => setCons({
      ...cons,
      [v.m]: e.target.value
    }), cons[v.m] !== undefined && cons[v.m] !== "", 60)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right"
      }
    }, inp(stock[v.m] ?? "", v.stk === -1 ? "n.d." : v.stk === -2 ? "stock" : String(v.stk), e => setStock({
      ...stock,
      [v.m]: e.target.value
    }), stock[v.m] !== undefined && stock[v.m] !== "", 60)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        paddingLeft: 10,
        fontWeight: 600,
        color: v.score === null ? C.mute : v.score >= 60 ? C.ok : v.score >= 40 ? C.ayv : C.att
      }
    }, v.score === null ? "—" : Math.round(v.score), v.parziale && v.score !== null ? "*" : ""));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 11,
      color: C.mute,
      lineHeight: 1.5
    }
  }, "Lo score va da 0 a 100 e pesa tre cose: il ", /*#__PURE__*/React.createElement("strong", null, "margine"), " (0 a zero, 100 al 25%), la", /*#__PURE__*/React.createElement("strong", null, " consegna"), " (100 a 30 giorni, 0 a 200) e lo ", /*#__PURE__*/React.createElement("strong", null, "stock"), " (0 se solo su ordine, 100 da venti unit\xE0 in su). I pesi si regolano in alto. L’asterisco segnala uno score calcolato senza tutti e tre i dati: per i tredici modelli Leasys mancano consegna e stock.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 4px"
    }
  }, "Margine per durata, e quanto potremmo pagare"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: C.mute,
      margin: "0 0 10px"
    }
  }, "La rata massima \xE8 il prezzo oltre il quale non conviene firmare col fornitore, al mark-up impostato."), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: C.mute,
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "3px 0"
    }
  }, "Modello"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left"
    }
  }, "Fornitore"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "36 mesi"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "48 mesi"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "paghiamo"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "rata max"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "spazio"))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: MONO
    }
  }, conPrezzo.map(v => {
    const sp = v.fornMax - v.s.r;
    return /*#__PURE__*/React.createElement("tr", {
      key: v.m,
      style: {
        borderTop: `1px solid ${C.line}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 0",
        fontFamily: FONT
      }
    }, v.m), /*#__PURE__*/React.createElement("td", {
      style: {
        fontFamily: FONT,
        color: C.mute,
        fontSize: 10.5
      }
    }, v.f), [36, 48].map(d => {
      const o = v.opz.find(x => x.d === d);
      return /*#__PURE__*/React.createElement("td", {
        key: d,
        style: {
          textAlign: "right",
          color: !o ? C.mute : o.marg < 0 ? C.att : C.ok,
          fontWeight: o && v.s.d === d ? 600 : 400
        }
      }, o ? eur(o.marg) : "—");
    }), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: C.mute
      }
    }, eur(v.s.r)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right"
      }
    }, eur(v.fornMax)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        fontWeight: 600,
        color: sp < 0 ? C.att : C.ok
      }
    }, sp >= 0 ? "+" : "", eur(sp)));
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginTop: 14,
      lineHeight: 1.55,
      maxWidth: 820
    }
  }, "Canoni fornitore netto IVA, catalogo luglio-agosto 2026. Prezzo di mercato: quotazione Ayvens a 10.000 km/anno e anticipo zero, settembre 2026. Due modelli sono quotati in un allestimento diverso dal nostro — Audi A3 e Tesla Model 3 — e il prezzo \xE8 riscalato sul rapporto tra i listini. Contratto unico, senza fermo tra un cliente e l’altro. Ripristino al rientro e penali sui km eccedenti restano fuori."));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(CatalogoFlee));
})();
