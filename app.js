const { useState, useMemo } = React;
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
const eur = (n, d = 0) => (n < 0 ? "\u2212\u20ac" : "\u20ac") + Math.abs(n).toLocaleString("it-IT", {
  minimumFractionDigits: d,
  maximumFractionDigits: d
});

/* Catalogo luglio-agosto 2026. r36/r48 = canone fornitore netto IVA. ir = tariffa assicurativa \u20ac/km.
   a36/a48 = prezzo di mercato: reale dove quotato, altrimenti stimato dal listino per fascia. */
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
  seg: "Premium"
}, {
  m: "MB GLC GLC 200 4M Mild Hyb. A…",
  f: "Athlon",
  li: 53711,
  ir: 0.216,
  r36: 652.14,
  r48: 609.49,
  a36: 811,
  a48: 751,
  src: "stimato",
  seg: "Premium"
}, {
  m: "Audi Q3 SPORTBACK TDI 110 kW …",
  f: "Athlon",
  li: 41206,
  ir: 0.169,
  r36: 523.83,
  r48: 494.72,
  a36: 663,
  a48: 614,
  src: "stimato",
  seg: "SUV medi"
}, {
  m: "Audi Q3 SPORTBACK TFSI 110 Kw…",
  f: "Athlon",
  li: 40141,
  ir: 0.169,
  r36: 526.24,
  r48: 498.69,
  a36: 646,
  a48: 598,
  src: "stimato",
  seg: "SUV medi"
}, {
  m: "Audi Q3 TDI 110 kW S tronic B…",
  f: "Athlon",
  li: 39796,
  ir: 0.169,
  r36: 581.83,
  r48: 535.66,
  a36: 641,
  a48: 593,
  src: "stimato",
  seg: "SUV medi"
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
  seg: "SUV medi"
}, {
  m: "Audi Q3 TFSI 110 kW S tronic …",
  f: "Athlon",
  li: 38730,
  ir: 0.169,
  r36: 563.64,
  r48: 526.65,
  a36: 624,
  a48: 577,
  src: "stimato",
  seg: "SUV medi"
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
  seg: "SUV medi"
}, {
  m: "TESLA MODEL 3 75 kWh Premium …",
  f: "Athlon",
  li: 36057,
  ir: 0.169,
  r36: 658.52,
  r48: 586.89,
  a36: 581,
  a48: 538,
  src: "stimato",
  seg: "SUV medi"
}, {
  m: "LBX 1.5 136 Emotion 2WD",
  f: "Kinto",
  li: 33238,
  ir: 0.144,
  r36: 385.0,
  r48: 355.0,
  a36: 535,
  a48: 496,
  src: "stimato",
  seg: "SUV medi"
}, {
  m: "BYD SEAL U DM-I 1.5 217cv Boo…",
  f: "Athlon",
  li: 32787,
  ir: 0.144,
  r36: 482.85,
  r48: 446.38,
  a36: 528,
  a48: 489,
  src: "stimato",
  seg: "SUV medi"
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
  seg: "SUV medi"
}, {
  m: "Audi A3 TFSI 85 kW S tronic B…",
  f: "Athlon",
  li: 29313,
  ir: 0.144,
  r36: 418.26,
  r48: 393.54,
  a36: 513,
  a48: 475,
  src: "stimato",
  seg: "Compatte e crossover"
}, {
  m: "NISSAN QASHQAI 1.3 MHEV 158 N…",
  f: "Athlon",
  li: 29184,
  ir: 0.144,
  r36: 363.87,
  r48: 347.85,
  a36: 511,
  a48: 473,
  src: "stimato",
  seg: "Compatte e crossover"
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
  seg: "Compatte e crossover"
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
  seg: "Compatte e crossover"
}, {
  m: "CAPTUR evolution ECO-G 120 MY…",
  f: "Mobilize",
  li: 20186,
  ir: 0.144,
  r36: 267.05,
  r48: 250.23,
  a36: 353,
  a48: 327,
  src: "stimato",
  seg: "Compatte e crossover"
}, {
  m: "Yaris Active MY25",
  f: "Kinto",
  li: 20164,
  ir: 0.144,
  r36: 282.0,
  r48: 266.0,
  a36: 353,
  a48: 327,
  src: "stimato",
  seg: "Compatte e crossover"
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
  seg: "City car"
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
  seg: "City car"
}, {
  m: "FIAT PANDINA 1.0 FireFly 65cv…",
  f: "Athlon",
  li: 14221,
  ir: 0.122,
  r36: 277.7,
  r48: 253.87,
  a36: 275,
  a48: 259,
  src: "reale",
  seg: "City car"
}, {
  m: "Alfa Romeo TONALE 1.6 Diesel …",
  f: "Leasys",
  li: 0,
  ir: 0.169,
  r36: 414.06,
  r48: 397.18,
  a36: 508,
  a48: 478,
  src: "reale",
  seg: "n.d."
}, {
  m: "Fiat GRANDE PANDA Business",
  f: "Leasys",
  li: 0,
  ir: 0.122,
  r36: 295.62,
  r48: 282.43,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "Fiat 600 1.2 110cv Icon",
  f: "Leasys",
  li: 0,
  ir: 0.144,
  r36: 338.06,
  r48: 291.0,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "Fiat 500 Icon",
  f: "Leasys",
  li: 0,
  ir: 0.122,
  r36: 276.21,
  r48: 261.88,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "Peugeot 208 Style Turbo benzi…",
  f: "Leasys",
  li: 0,
  ir: 0.122,
  r36: 248.71,
  r48: 227.55,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "Jeep COMPASS 1.2 Turbo MHEV 1…",
  f: "Leasys",
  li: 0,
  ir: 0.169,
  r36: 503.79,
  r48: 496.27,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "Citroen C3 110 cv Automatico …",
  f: "Leasys",
  li: 0,
  ir: 0.122,
  r36: 292.21,
  r48: 285.28,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "C10 HYBRID 1.5 28.4KWH Design",
  f: "Leasys",
  li: 0,
  ir: 0.144,
  r36: 437.06,
  r48: 459.48,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "JUNIOR 1.2 145CV eDCT6 ibrida…",
  f: "Leasys",
  li: 0,
  ir: 0.144,
  r36: 304.74,
  r48: 319.7,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "DS 7 BlueHDi 130 Automatica P…",
  f: "Leasys",
  li: 0,
  ir: 0.169,
  r36: 385.73,
  r48: 392.65,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "PANDINA 1.0 FireFly 65cv S&S …",
  f: "Leasys",
  li: 0,
  ir: 0.122,
  r36: 206.48,
  r48: 186.67,
  a36: 275,
  a48: 259,
  src: "reale",
  seg: "n.d."
}, {
  m: "Q5 TDI 150kW quattro S tronic…",
  f: "Leasys",
  li: 0,
  ir: 0.169,
  r36: 700.17,
  r48: 704.73,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
}, {
  m: "TIGUAN 2.0 TDI 110KW SCR Edit…",
  f: "Leasys",
  li: 0,
  ir: 0.169,
  r36: 450.52,
  r48: 430.2,
  a36: 0,
  a48: 0,
  src: "assente",
  seg: "n.d."
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
      return {
        ...v,
        a36,
        a48,
        opz,
        s,
        fornMax,
        manuale: ov !== undefined && ov !== ""
      };
    });
  }, [km, cts, dur, mkPct, prezzi]);
  const visibili = calc.filter(v => forn.includes(v.f) && segs.includes(v.seg));
  const conPrezzo = visibili.filter(v => v.s).sort((a, b) => b.s.marg / b.s.a - a.s.marg / a.s.a);
  const senzaPrezzo = visibili.filter(v => !v.s);
  const scala = Math.max(...conPrezzo.map(v => Math.max(v.s.a, v.s.r + cts + v.s.ass)), 1);
  const verdetto = p => p >= 0.12 ? ["ORDINA", C.ok] : p >= 0.05 ? ["VALUTA", C.ayv] : ["NO", C.att];
  const nOrd = conPrezzo.filter(v => v.s.marg / v.s.a >= 0.12).length;
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
  }, "Catalogo luglio-agosto 2026 \\u00b7 cosa ordinare"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: C.ink2,
      margin: "5px 0 14px",
      maxWidth: 760,
      lineHeight: 1.5
    }
  }, "Ogni barra \\u00e8 il prezzo di mercato della vettura. Dentro, dove finisce: quanto al fornitore, quanto alla gestione, quanto all\\u2019assicurazione. Quello che avanza \\u00e8 il margine."), /*#__PURE__*/React.createElement("div", {
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
      padding: "14px 20px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 30
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Modelli visibili"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 24
    }
  }, conPrezzo.length, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      opacity: 0.55
    }
  }, " / ", CATALOGO.length))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Sopra il ", mkPct, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 24,
      color: "#7FE3B8"
    }
  }, nOrd)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Senza prezzo di mercato"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 24,
      color: senzaPrezzo.length ? "#F0B860" : "#fff"
    }
  }, senzaPrezzo.length)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Prezzo stimato dal listino"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 24
    }
  }, conPrezzo.filter(v => v.src === "stimato" && !v.manuale).length)))), /*#__PURE__*/React.createElement("div", {
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
    }, " \u00b7 ", v.f, " \u00b7 ", s.d, " mesi", v.seg !== "n.d." ? " \u00b7 " + v.seg : "", v.manuale ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.nuovo
      }
    }, " \u00b7 prezzo inserito") : v.src === "stimato" ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.ayv
      }
    }, " \u00b7 prezzo stimato") : null)), /*#__PURE__*/React.createElement("span", {
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
    }, vd))), /*#__PURE__*/React.createElement("div", {
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
  }, "Nessun modello con i filtri selezionati.")), senzaPrezzo.length > 0 && /*#__PURE__*/React.createElement("div", {
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
  }, "Manca il prezzo di mercato"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: C.mute,
      margin: "0 0 10px"
    }
  }, "Modelli senza quotazione Ayvens e senza listino da cui stimarla. Inserisci il prezzo a 36 mesi e rientrano nel confronto."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 8
    }
  }, senzaPrezzo.map(v => /*#__PURE__*/React.createElement("label", {
    key: v.m,
    className: "flex items-center justify-between",
    style: {
      gap: 8,
      width: 310,
      padding: "6px 10px",
      background: C.paper,
      borderRadius: 4,
      border: `1px solid ${C.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5
    }
  }, v.m, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.mute,
      fontSize: 10
    }
  }, " \u00b7 ", v.f, " \u00b7 ", eur(v.r36))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "\\u20ac/mese",
    value: prezzi[v.m] ?? "",
    onChange: e => setPrezzi({
      ...prezzi,
      [v.m]: e.target.value
    }),
    style: {
      width: 72,
      padding: "3px 6px",
      border: `1px solid ${C.line}`,
      borderRadius: 3,
      fontFamily: MONO,
      fontSize: 12,
      textAlign: "right"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
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
  }, "La rata massima \\u00e8 il prezzo oltre il quale non conviene firmare col fornitore, al mark-up impostato."), /*#__PURE__*/React.createElement("table", {
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
      }, o ? eur(o.marg) : "\u2014");
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
  }, "Canoni fornitore netto IVA, catalogo luglio-agosto 2026. Prezzo di mercato: quotazione Ayvens dove disponibile, altrimenti stimato dal listino con il rapporto osservato per fascia di prezzo (2,01% sotto i 20mila, 1,75% fino a 30mila, 1,61% fino a 45mila, 1,51% oltre) e ridotto del 7,4% sui 48 mesi. Contratto unico, senza fermo tra un cliente e l\\u2019altro: \\u00e8 l\\u2019ipotesi pi\\u00f9 favorevole. Ripristino al rientro e penali sui km eccedenti restano fuori."));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(CatalogoFlee));
