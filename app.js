const { useState, useMemo } = React;
const C = {
  ink: "#14233F",
  ink2: "#3A4A68",
  paper: "#F1F3F6",
  card: "#FFFFFF",
  line: "#D8DEE7",
  att: "#B23A2F",
  nuovo: "#1B4F9C",
  ayv: "#D99A2B",
  ok: "#1E7A5A",
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
const ORDINI = [{
  m: "RAV4 HEV",
  f: "Kinto",
  r: {
    36: 449,
    48: 445,
    60: 429
  },
  a: {
    36: 787,
    48: 705,
    60: 667
  },
  ir: 0.1500,
  n: 0,
  stim: true
}, {
  m: "MB GLC Coupé",
  f: "Athlon",
  r: {
    36: 692.62,
    48: 651.17
  },
  a: {
    36: 932,
    48: 852,
    60: 800
  },
  ir: 0.2180,
  n: 2,
  stim: true
}, {
  m: "Dacia Bigster",
  f: "Mobilize",
  r: {
    36: 278.02,
    48: 285.67
  },
  a: {
    36: 472,
    48: 439,
    60: 418
  },
  ir: 0.1390,
  n: 1,
  stim: true
}, {
  m: "BMW X1",
  f: "Athlon",
  r: {
    36: 498.95,
    48: 468.73
  },
  a: {
    36: 667,
    48: 628,
    60: 604
  },
  ir: 0.1700,
  n: 2,
  stim: true
}, {
  m: "Toyota C-HR",
  f: "Kinto",
  r: {
    36: 329,
    48: 319,
    60: 319
  },
  a: {
    36: 479,
    48: 442,
    60: 428
  },
  ir: 0.1465,
  n: 45,
  stim: false
}, {
  m: "Yaris Cross",
  f: "Kinto",
  r: {
    36: 299,
    48: 289,
    60: 279
  },
  a: {
    36: 447,
    48: 413,
    60: 397
  },
  ir: 0.1476,
  n: 29,
  stim: false
}, {
  m: "Aygo X Hybrid",
  f: "Kinto",
  r: {
    36: 279,
    48: 259,
    60: 229
  },
  a: {
    36: 381,
    48: 346,
    60: 334
  },
  ir: 0.1260,
  n: 67,
  stim: false
}, {
  m: "Alfa Tonale",
  f: "Leasys",
  r: {
    36: 414.06,
    48: 397.18
  },
  a: {
    36: 508,
    48: 478,
    60: 465
  },
  ir: 0.1433,
  n: 6,
  stim: false
}, {
  m: "Pandina Hybrid",
  f: "Leasys",
  r: {
    36: 206.48,
    48: 186.67
  },
  a: {
    36: 275,
    48: 259,
    60: 243
  },
  ir: 0.1220,
  n: 1,
  stim: true
}, {
  m: "Renault Clio",
  f: "Mobilize",
  r: {
    36: 273.18,
    48: 254.48
  },
  a: {
    36: 323,
    48: 310,
    60: 296
  },
  ir: 0.1178,
  n: 15,
  stim: false
}];

/* ay = Ayvens 48 mesi, quotatore, netto IVA */
const PTF = [{
  m: "Aygo X",
  n: 67,
  fissa: 196.33,
  km: 332,
  vp: 0.0816,
  ir: 0.126,
  fo: 244.07,
  kmin: 7,
  kmax: 941,
  ay: 346
}, {
  m: "C-HR",
  n: 45,
  fissa: 219.01,
  km: 556,
  vp: 0.0943,
  ir: 0.1465,
  fo: 275.41,
  kmin: 10,
  kmax: 1241,
  ay: 442
}, {
  m: "Yaris Cross",
  n: 29,
  fissa: 229.79,
  km: 531,
  vp: 0.099,
  ir: 0.1476,
  fo: 285.14,
  kmin: 94,
  kmax: 1034,
  ay: 413
}, {
  m: "Yaris",
  n: 28,
  fissa: 199.86,
  km: 501,
  vp: 0.0785,
  ir: 0.129,
  fo: 258.80,
  kmin: 85,
  kmax: 1197,
  ay: 0
}, {
  m: "Panda",
  n: 18,
  fissa: 157.00,
  km: 327,
  vp: 0.0638,
  ir: 0.1358,
  fo: 183.06,
  kmin: 106,
  kmax: 928,
  ay: 0
}, {
  m: "Clio",
  n: 15,
  fissa: 185.71,
  km: 413,
  vp: 0.0793,
  ir: 0.1178,
  fo: 235.69,
  kmin: 120,
  kmax: 1026,
  ay: 310
}, {
  m: "208",
  n: 10,
  fissa: 198.23,
  km: 410,
  vp: 0.0878,
  ir: 0.1218,
  fo: 256.66,
  kmin: 86,
  kmax: 807,
  ay: 0
}, {
  m: "Renault 5",
  n: 6,
  fissa: 220.45,
  km: 492,
  vp: 0.0942,
  ir: 0.114,
  fo: 274.01,
  kmin: 212,
  kmax: 1080,
  ay: 0
}, {
  m: "Tonale",
  n: 6,
  fissa: 274.85,
  km: 797,
  vp: 0.0957,
  ir: 0.1433,
  fo: 317.67,
  kmin: 585,
  kmax: 1059,
  ay: 478
}, {
  m: "C3",
  n: 5,
  fissa: 197.54,
  km: 417,
  vp: 0.0855,
  ir: 0.1384,
  fo: 241.66,
  kmin: 112,
  kmax: 823,
  ay: 0
}, {
  m: "Junior",
  n: 5,
  fissa: 266.05,
  km: 314,
  vp: 0.1106,
  ir: 0.144,
  fo: 313.04,
  kmin: 142,
  kmax: 476,
  ay: 0
}, {
  m: "2008",
  n: 4,
  fissa: 220.23,
  km: 493,
  vp: 0.1033,
  ir: 0.1685,
  fo: 303.52,
  kmin: 14,
  kmax: 938,
  ay: 0
}, {
  m: "Captur",
  n: 4,
  fissa: 193.43,
  km: 515,
  vp: 0.0785,
  ir: 0.136,
  fo: 236.59,
  kmin: 379,
  kmax: 598,
  ay: 0
}, {
  m: "3008",
  n: 4,
  fissa: 260.34,
  km: 675,
  vp: 0.111,
  ir: 0.1462,
  fo: 337.63,
  kmin: 216,
  kmax: 1058,
  ay: 0
}];

/* quota = % del margine caricata sul km (il resto va sulla rata fissa) */
const SCENARI = {
  "A · tutto sul fisso": {
    quota: 0,
    kmIncl: 0
  },
  "B · FLEE 3.0": {
    quota: 50,
    kmIncl: 250
  },
  "C · tutto sul km": {
    quota: 100,
    kmIncl: 0
  },
  "Libero": null
};
const KM_MAX = 1250;
const DURATE = [6, 12, 18, 24, 36, 48, 60];
const FERMI = {
  "Best 30gg": 30,
  "Base 45gg": 45,
  "Worst 60gg": 60
};

/* quanti contratti da D mesi entrano in S, e quanti mesi si vendono davvero */
function riempi(S, D, fermoGg) {
  const F = fermoGg / 30;
  const npi = Math.floor((S + F) / (D + F));
  const r = S - npi * (D + F);
  const n = r >= 0.5 ? npi + 1 : npi;
  const A = r >= 0.5 ? npi * D + r : npi * D;
  return {
    n,
    A,
    sa: S / A,
    persi: S - A
  };
}
/* svalutazione sul prezzo ottenibile: nulla fino a offerte di 12 mesi, poi cresce.
   Non si applica al primo contratto, che alloca un veicolo nuovo. */
const svalut = (D, primo, max) => primo || D <= 12 ? 0 : max / 100 * ((D - 12) / 48);
function SimulatoreFlee() {
  const [tab, setTab] = useState("ordini");
  const [cts, setCts] = useState(35);
  const [km, setKm] = useState(400);
  const [durMode, setDurMode] = useState("best");
  const [selD, setSelD] = useState("Toyota C-HR");
  const [supD, setSupD] = useState(48);
  const [fermoN, setFermoN] = useState("Base 45gg");
  const [mkPct, setMkPct] = useState(10);
  const [svalMax, setSvalMax] = useState(10);
  const [sel, setSel] = useState("Aygo X");
  const [kmP, setKmP] = useState(332);
  const [scen, setScen] = useState("C · tutto sul km");
  const [margPct, setMargPct] = useState(10);
  const [quota, setQuota] = useState(100);
  const [kmIncl, setKmIncl] = useState(0);
  const [vista, setVista] = useState("canone");

  /* ---------- ORDINI ---------- */
  const ord = useMemo(() => ORDINI.map(v => {
    const durate = Object.keys(v.r).map(Number);
    const opz = durate.map(d => {
      const forn = v.r[d],
        ass = km * v.ir,
        ay = v.a[d];
      const marg = ay - forn - cts - ass;
      return {
        d,
        forn,
        ass,
        ay,
        marg,
        pct: marg / ay,
        markupKm: marg / km
      };
    });
    const scelta = durMode === "best" ? opz.reduce((a, b) => b.marg > a.marg ? b : a) : opz.find(o => o.d === Number(durMode)) || opz.reduce((a, b) => b.marg > a.marg ? b : a);
    return {
      ...v,
      opz,
      s: scelta
    };
  }).sort((a, b) => b.s.marg - a.s.marg), [km, cts, durMode]);
  const scalaMax = Math.max(...ord.map(v => Math.max(v.s.ay, v.s.forn + cts + v.s.ass)));
  const verdetto = p => p >= 0.12 ? ["ORDINA", C.ok] : p >= 0.05 ? ["VALUTA", C.ayv] : ["NON ORDINARE", C.att];

  /* ---------- GRIGLIA DURATE 6-60 ---------- */
  const vD = ORDINI.find(x => x.m === selD);
  const supOk = Object.keys(vD.r).map(Number);
  const supUse = vD.r[supD] ? supD : supOk[supOk.length - 1];
  const griglia = useMemo(() => {
    const CF = vD.r[supUse] + cts;
    const m = mkPct / 100;
    return DURATE.filter(D => D <= supUse).map(D => {
      const {
        n,
        A,
        sa,
        persi
      } = riempi(supUse, D, FERMI[fermoN]);
      const fissa = CF * sa;
      /* markup/km che realizza m% del canone: km·mk = m·(fissa + km·ir + km·mk) */
      const mkKm = m * (fissa + km * vD.ir) / (km * (1 - m));
      const varRata = km * (vD.ir + mkKm);
      const canone = fissa + varRata;
      const sc = svalut(D, false, svalMax);
      return {
        D,
        n,
        A,
        sa,
        persi,
        fissa,
        varRata,
        canone,
        mkKm,
        margine: km * mkKm,
        canoneUsato: canone * (1 - sc),
        sconto: sc,
        margineUsato: km * mkKm - canone * sc,
        ay: vD.a[D] || null
      };
    }).reverse();
  }, [vD, supUse, cts, km, fermoN, mkPct, svalMax]);
  const rif = griglia.find(g => g.D === supUse) || griglia[0];

  /* ---------- PORTAFOGLIO ---------- */
  const v = PTF.find(x => x.m === sel);
  const applica = nome => {
    setScen(nome);
    const s = SCENARI[nome];
    if (s) {
      setQuota(s.quota);
      setKmIncl(s.kmIncl);
    }
  };
  const lib = setter => x => {
    setter(x);
    setScen("Libero");
  };

  /* margine totale al km di riferimento: M = m(costo + km·ir)/(1-m), indipendente dalla ripartizione */
  const motore = (mod, kmRif) => {
    const cnk = mod.fo + cts,
      m = margPct / 100,
      s = quota / 100;
    const M = m < 1 ? m * (cnk + kmRif * mod.ir) / (1 - m) : 0;
    const u = Math.max(0, kmRif - kmIncl);
    const margFisso = u > 0 ? (1 - s) * M : M;
    const mkKm = u > 0 ? s * M / u : 0;
    const fissaNew = cnk + margFisso + kmIncl * mod.ir;
    return {
      cnk,
      M,
      margFisso,
      mkKm,
      fissaNew,
      canoneNew: q => fissaNew + Math.max(0, q - kmIncl) * (mod.ir + mkKm),
      margNew: q => margFisso + Math.max(0, q - kmIncl) * mkKm
    };
  };
  const calc = useMemo(() => {
    const e = motore(v, v.km);
    return {
      ...e,
      canoneAtt: q => v.fissa + q * (v.vp + v.ir),
      margAtt: q => v.fissa + q * v.vp - e.cnk,
      sogliaNew: v.ay ? kmIncl + (v.ay - e.fissaNew) / (v.ir + e.mkKm) : null
    };
  }, [v, margPct, quota, kmIncl, cts]);
  const W = 760,
    H = 300,
    PL = 54,
    PR = 14,
    PT = 14,
    PB = 36;
  const serie = vista === "canone" ? [{
    k: "a",
    f: calc.canoneAtt,
    col: C.att,
    lab: "Pricing attuale"
  }, {
    k: "n",
    f: calc.canoneNew,
    col: C.nuovo,
    lab: "Pricing nuovo"
  }] : [{
    k: "a",
    f: calc.margAtt,
    col: C.att,
    lab: "Margine attuale"
  }, {
    k: "n",
    f: calc.margNew,
    col: C.nuovo,
    lab: "Margine nuovo"
  }];
  const vals = [];
  for (let q = 0; q <= KM_MAX; q += 50) serie.forEach(s => vals.push(s.f(q)));
  if (vista === "canone" && v.ay) vals.push(v.ay);
  const yMax = Math.max(...vals) * 1.08,
    yMin = Math.min(0, Math.min(...vals) * 1.15);
  const X = q => PL + q / KM_MAX * (W - PL - PR);
  const Y = e => H - PB - (e - yMin) / (yMax - yMin) * (H - PT - PB);
  const path = f => {
    let d = "";
    for (let q = 0; q <= KM_MAX; q += 25) d += (q ? "L" : "M") + X(q).toFixed(1) + " " + Y(f(q)).toFixed(1) + " ";
    return d;
  };
  const Tab = ({
    id,
    children
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab(id),
    style: {
      padding: "7px 16px",
      borderRadius: 5,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: FONT,
      border: `1px solid ${tab === id ? C.ink : C.line}`,
      background: tab === id ? C.ink : "#fff",
      color: tab === id ? "#fff" : C.ink2,
      fontWeight: tab === id ? 600 : 400
    }
  }, children);
  const Slider = ({
    lab,
    val,
    set,
    mn,
    mx,
    st,
    u,
    fmt
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
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
  }, lab), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12
    }
  }, fmt ? fmt(val) : val, " ", u)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: mn,
    max: mx,
    step: st,
    value: val,
    onChange: e => set(parseFloat(e.target.value))
  }));
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
  }, "Cosa ordinare, e cosa fare di quello che abbiamo"), /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 7,
      margin: "14px 0"
    }
  }, /*#__PURE__*/React.createElement(Tab, {
    id: "ordini"
  }, "Vetture da ordinare"), /*#__PURE__*/React.createElement(Tab, {
    id: "ptf"
  }, "Portafoglio · 313 contratti"), /*#__PURE__*/React.createElement(Tab, {
    id: "durate"
  }, "Durate flessibili 6–60 mesi")), tab === "ordini" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: C.ink2,
      margin: "0 0 14px",
      maxWidth: 730,
      lineHeight: 1.5
    }
  }, "Ogni barra è il prezzo Ayvens per quella vettura. Dentro, dove finisce: quanto al fornitore, quanto alla gestione, quanto all'assicurazione. Quello che avanza è il vostro margine."), /*#__PURE__*/React.createElement("div", {
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
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 260px"
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
    onChange: e => setKm(parseInt(e.target.value))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 5
    }
  }, "Durata fornitura"), /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 5
    }
  }, ["best", "36", "48", "60"].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => setDurMode(d),
    style: {
      padding: "5px 10px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${durMode === d ? C.nuovo : C.line}`,
      background: durMode === d ? C.nuovo : "#fff",
      color: durMode === d ? "#fff" : C.ink2
    }
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
      width: 64,
      padding: "3px 6px",
      border: `1px solid ${C.line}`,
      borderRadius: 3,
      fontFamily: MONO,
      fontSize: 12,
      textAlign: "right"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: "18px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 16,
      marginBottom: 14,
      fontSize: 11,
      color: C.ink2
    }
  }, [["Costo fornitura", C.forn], ["Cost-to-serve", C.cts], ["Assicurazione", C.ass], ["Margine Flee", C.marg], ["Sopra il prezzo di mercato", C.over]].map(([l, col]) => /*#__PURE__*/React.createElement("span", {
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
  }), l))), ord.map(v => {
    const s = v.s,
      [vd, vc] = verdetto(s.pct);
    const pc = x => `${x / scalaMax * 100}%`;
    const neg = s.marg < 0;
    return /*#__PURE__*/React.createElement("div", {
      key: v.m,
      style: {
        marginBottom: 15
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between",
      style: {
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        fontWeight: 500
      }
    }, v.m, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.mute,
        fontWeight: 400,
        fontSize: 11
      }
    }, " ", "· ", v.f, " · ", s.d, " mesi", v.n > 0 ? ` · ${v.n} in ptf` : " · mai ordinata", v.stim && /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.ayv
      }
    }, " · dati stimati"))), /*#__PURE__*/React.createElement("span", {
      className: "flex items-baseline",
      style: {
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: MONO,
        fontSize: 13,
        fontWeight: 600,
        color: neg ? C.att : C.ok
      }
    }, eur(s.marg), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        opacity: 0.7
      }
    }, "(", (s.pct * 100).toFixed(1), "%)")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: vc,
        letterSpacing: ".04em"
      }
    }, vd))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 26,
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
        width: pc(s.forn),
        background: C.forn
      },
      title: `Fornitura ${eur(s.forn)}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: pc(cts),
        background: C.cts
      },
      title: `Cost-to-serve ${eur(cts)}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: pc(s.ass),
        background: C.ass
      },
      title: `Assicurazione ${eur(s.ass)}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: pc(Math.abs(s.marg)),
        background: neg ? C.over : C.marg
      },
      title: `${neg ? "Sopra mercato" : "Margine"} ${eur(s.marg)}`
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: pc(s.ay),
        top: -3,
        bottom: -3,
        width: 2,
        background: C.ayv
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: pc(s.ay),
        top: -16,
        fontSize: 9.5,
        fontFamily: MONO,
        color: C.ayv,
        transform: "translateX(-50%)"
      }
    }, eur(s.ay))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginTop: 10,
      lineHeight: 1.5
    }
  }, "La linea arancione è il prezzo Ayvens. Se la barra la supera, a quel chilometraggio siete fuori mercato anche regalando il servizio.")), /*#__PURE__*/React.createElement("div", {
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
      margin: "0 0 10px"
    }
  }, "La scelta della durata, vettura per vettura"), /*#__PURE__*/React.createElement("table", {
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
  }, "Vettura"), /*#__PURE__*/React.createElement("th", {
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
  }, "60 mesi"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "migliore"))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: MONO
    }
  }, ord.map(v => {
    const best = v.opz.reduce((a, b) => b.marg > a.marg ? b : a);
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
    }, v.m), [36, 48, 60].map(d => {
      const o = v.opz.find(x => x.d === d);
      return /*#__PURE__*/React.createElement("td", {
        key: d,
        style: {
          textAlign: "right",
          color: !o ? C.mute : o.marg < 0 ? C.att : C.ok,
          fontWeight: o && o.d === best.d ? 600 : 400
        }
      }, o ? eur(o.marg) : "non offerta");
    }), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        fontFamily: FONT,
        fontWeight: 600
      }
    }, best.d, " mesi"));
  }))))) : tab === "durate" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: C.ink2,
      margin: "0 0 14px",
      maxWidth: 760,
      lineHeight: 1.5
    }
  }, "L'impegno col fornitore dura ", supUse, " mesi e va pagato tutto. Un contratto corto significa più cambi cliente, quindi più mesi di piazzale: quei mesi li devono pagare i mesi venduti. È da lì, e non dalla flessibilità, che nasce il sovrapprezzo sulle durate brevi."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 5,
      marginBottom: 12
    }
  }, ORDINI.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.m,
    onClick: () => setSelD(x.m),
    style: {
      padding: "5px 9px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${x.m === selD ? C.nuovo : C.line}`,
      background: x.m === selD ? C.nuovo : "#fff",
      color: x.m === selD ? "#fff" : C.ink2
    }
  }, x.m))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end",
    style: {
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 5
    }
  }, "Impegno col fornitore"), /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 5
    }
  }, [36, 48, 60].map(d => {
    const ok = !!vD.r[d];
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      disabled: !ok,
      onClick: () => setSupD(d),
      style: {
        padding: "5px 10px",
        borderRadius: 4,
        cursor: ok ? "pointer" : "not-allowed",
        fontSize: 11.5,
        fontFamily: FONT,
        border: `1px solid ${d === supUse ? C.nuovo : C.line}`,
        background: d === supUse ? C.nuovo : "#fff",
        color: !ok ? C.mute : d === supUse ? "#fff" : C.ink2,
        opacity: ok ? 1 : 0.45
      }
    }, d, "m", /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9.5,
        fontFamily: MONO,
        opacity: 0.75
      }
    }, ok ? eur(vD.r[d]) : "n.d."));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 5
    }
  }, "Fermo tra clienti"), /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 5
    }
  }, Object.keys(FERMI).map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFermoN(f),
    style: {
      padding: "5px 10px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${f === fermoN ? C.nuovo : C.line}`,
      background: f === fermoN ? C.nuovo : "#fff",
      color: f === fermoN ? "#fff" : C.ink2
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 180px"
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
  }, "Mark-up sul canone"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12
    }
  }, mkPct, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 25,
    step: 1,
    value: mkPct,
    onChange: e => setMkPct(parseInt(e.target.value))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 180px"
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
  }, "Svalutazione max a 60m"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12
    }
  }, svalMax, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 30,
    step: 1,
    value: svalMax,
    onChange: e => setSvalMax(parseInt(e.target.value))
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 4px"
    }
  }, "Il listino per durata"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: C.mute,
      margin: "0 0 10px"
    }
  }, "A ", km, " km/mese. Il prezzo usato vale dal secondo noleggio in poi: il primo contratto alloca un veicolo nuovo e non subisce svalutazione."), /*#__PURE__*/React.createElement("table", {
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
  }, "Durata"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Contratti"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Mesi venduti"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Persi"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "S/A"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Rata fissa"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Rata var."), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "CANONE"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "vs ", supUse, "m"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "su usato"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Ayvens"))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: MONO
    }
  }, griglia.map(g => /*#__PURE__*/React.createElement("tr", {
    key: g.D,
    style: {
      borderTop: `1px solid ${C.line}`,
      background: g.D === supUse ? "#EEF3FB" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 0",
      fontFamily: FONT,
      fontWeight: g.D === supUse ? 600 : 400
    }
  }, g.D, " mesi"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: C.mute
    }
  }, g.n), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: C.mute
    }
  }, g.A.toFixed(1)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: g.persi > 4 ? C.ayv : C.mute
    }
  }, g.persi.toFixed(1)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: C.mute
    }
  }, g.sa.toFixed(4)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right"
    }
  }, eur(g.fissa, 2)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: C.mute
    }
  }, eur(g.varRata, 2)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      fontWeight: 600
    }
  }, eur(g.canone, 2)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: g.canone > rif.canone ? C.att : C.ok
    }
  }, g.canone >= rif.canone ? "+" : "", ((g.canone / rif.canone - 1) * 100).toFixed(1), "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: C.mute
    }
  }, g.sconto > 0 ? eur(g.canoneUsato, 2) : "="), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "right",
      color: !g.ay ? C.mute : g.canone <= g.ay ? C.ok : C.att
    }
  }, g.ay ? eur(g.ay) : "no NLT"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: "10px 12px",
      background: C.paper,
      borderLeft: `3px solid ${C.ayv}`,
      fontSize: 11.5,
      lineHeight: 1.55,
      color: C.ink2
    }
  }, "Sotto i 36 mesi non esiste un benchmark NLT: leasing e broker quel prodotto non lo vendono. I competitor reali sono gli abbonamenti auto — Bipi, Sixt+, Drivalia CarCloud, Carify — e i loro prezzi non li abbiamo. Il sovrapprezzo che vedi sulle durate brevi copre il costo dei mesi persi, non è un prezzo di mercato.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 340px",
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 10px"
    }
  }, "Da dove viene il sovrapprezzo"), griglia.map(g => {
    const maxC = Math.max(...griglia.map(x => x.canone));
    const base = rif.fissa,
      extra = g.fissa - base;
    return /*#__PURE__*/React.createElement("div", {
      key: g.D,
      style: {
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between",
      style: {
        fontSize: 11,
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", null, g.D, " mesi"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: MONO,
        color: C.mute
      }
    }, extra > 0.01 ? `+${eur(extra, 2)} per ${g.persi.toFixed(1)} mesi persi` : "nessun mese perso")), /*#__PURE__*/React.createElement("div", {
      className: "flex",
      style: {
        height: 16,
        background: C.paper,
        borderRadius: 2,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${base / maxC * 100}%`,
        background: C.forn
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${extra / maxC * 100}%`,
        background: C.ayv
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${g.varRata / maxC * 100}%`,
        background: C.ass
      }
    })));
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 14,
      marginTop: 10,
      fontSize: 10.5,
      color: C.ink2
    }
  }, [["Costo del veicolo", C.forn], ["Mesi di piazzale", C.ayv], ["Quota al km", C.ass]].map(([l, col]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: "flex items-center",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: col,
      borderRadius: 2,
      display: "inline-block"
    }
  }), l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 320px",
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 10px"
    }
  }, "Cosa cambia col fermo"), /*#__PURE__*/React.createElement("table", {
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
  }, "Durata"), Object.entries(FERMI).map(([n, g]) => /*#__PURE__*/React.createElement("th", {
    key: n,
    style: {
      textAlign: "right"
    }
  }, g, " gg")))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: MONO
    }
  }, DURATE.filter(D => D <= supUse).reverse().map(D => /*#__PURE__*/React.createElement("tr", {
    key: D,
    style: {
      borderTop: `1px solid ${C.line}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 0",
      fontFamily: FONT
    }
  }, D, " mesi"), Object.values(FERMI).map(gg => {
    const f = (vD.r[supUse] + cts) * riempi(supUse, D, gg).sa;
    return /*#__PURE__*/React.createElement("td", {
      key: gg,
      style: {
        textAlign: "right"
      }
    }, eur(f, 2));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 11,
      color: C.mute,
      lineHeight: 1.5
    }
  }, "Sulle durate lunghe il fermo non conta: il veicolo non torna mai in piazzale. Sulle brevi decide tutto, ed è una questione operativa prima che di pricing.")))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: C.ink2,
      margin: "0 0 14px",
      maxWidth: 730,
      lineHeight: 1.5
    }
  }, "Rata fissa attuale comprensiva dell'anticipo spalmato. Costo = fornitura + cost-to-serve; l'assicurazione è girata a costo e non produce margine."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 7
    }
  }, "Modello"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 5
    }
  }, PTF.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.m,
    onClick: () => {
      setSel(x.m);
      setKmP(x.km);
    },
    style: {
      padding: "5px 9px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${x.m === sel ? C.nuovo : C.line}`,
      background: x.m === sel ? C.nuovo : "#fff",
      color: x.m === sel ? "#fff" : C.ink2
    }
  }, x.m, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.6,
      fontFamily: MONO,
      fontSize: 10
    }
  }, x.n))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.ink,
      color: "#fff",
      borderRadius: 6,
      padding: "16px 22px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Canone attuale a ", kmP, " km"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      color: "#FF8C7A"
    }
  }, eur(calc.canoneAtt(kmP), 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.55,
      fontFamily: MONO
    }
  }, "margine ", eur(calc.margAtt(kmP), 2))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Canone nuovo a ", kmP, " km"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      color: "#7FE3B8"
    }
  }, eur(calc.canoneNew(kmP), 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.55,
      fontFamily: MONO
    }
  }, "margine ", eur(calc.margNew(kmP), 2))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Variazione di prezzo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26
    }
  }, calc.canoneNew(kmP) >= calc.canoneAtt(kmP) ? "+" : "", ((calc.canoneNew(kmP) / calc.canoneAtt(kmP) - 1) * 100).toFixed(0), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.55,
      fontFamily: MONO
    }
  }, eur(calc.canoneNew(kmP) - calc.canoneAtt(kmP), 2))), v.ay > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }, "Ayvens ", eur(v.ay)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      color: calc.canoneNew(kmP) <= v.ay ? "#7FE3B8" : "#FF8C7A"
    }
  }, calc.canoneNew(kmP) > v.ay ? "+" : "", ((calc.canoneNew(kmP) / v.ay - 1) * 100).toFixed(0), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.55,
      fontFamily: MONO
    }
  }, "competitivi fino a ", calc.sogliaNew > 0 ? Math.round(calc.sogliaNew) : 0, " km")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex",
    style: {
      gap: 5
    }
  }, ["canone", "margine"].map(x => /*#__PURE__*/React.createElement("button", {
    key: x,
    onClick: () => setVista(x),
    style: {
      padding: "4px 11px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${x === vista ? C.ink : C.line}`,
      background: x === vista ? C.ink : "#fff",
      color: x === vista ? "#fff" : C.ink2
    }
  }, x === "canone" ? "Canone al cliente" : "Margine Flee"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center",
    style: {
      gap: 14,
      fontSize: 11,
      color: C.ink2
    }
  }, serie.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.k,
    className: "flex items-center",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 3,
      background: s.col,
      display: "inline-block"
    }
  }), s.lab)), vista === "canone" && v.ay > 0 && /*#__PURE__*/React.createElement("span", {
    className: "flex items-center",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 3,
      background: C.ayv,
      display: "inline-block"
    }
  }), "Ayvens"))), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: "100%",
      height: "auto",
      display: "block"
    }
  }, [0, 0.25, 0.5, 0.75, 1].map(f => {
    const e = yMin + (yMax - yMin) * f;
    return /*#__PURE__*/React.createElement("g", {
      key: f
    }, /*#__PURE__*/React.createElement("line", {
      x1: PL,
      y1: Y(e),
      x2: W - PR,
      y2: Y(e),
      stroke: C.line
    }), /*#__PURE__*/React.createElement("text", {
      x: PL - 7,
      y: Y(e) + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: C.mute,
      fontFamily: MONO
    }, Math.round(e)));
  }), yMin < 0 && /*#__PURE__*/React.createElement("line", {
    x1: PL,
    y1: Y(0),
    x2: W - PR,
    y2: Y(0),
    stroke: C.ink2,
    strokeWidth: "1.2"
  }), [0, 250, 500, 750, 1000, 1250].map(q => /*#__PURE__*/React.createElement("text", {
    key: q,
    x: X(q),
    y: H - PB + 15,
    textAnchor: "middle",
    fontSize: "10",
    fill: C.mute,
    fontFamily: MONO
  }, q)), /*#__PURE__*/React.createElement("text", {
    x: (PL + W - PR) / 2,
    y: H - 3,
    textAnchor: "middle",
    fontSize: "10.5",
    fill: C.ink2
  }, "km percorsi al mese"), /*#__PURE__*/React.createElement("rect", {
    x: X(v.kmin),
    y: PT,
    width: X(v.kmax) - X(v.kmin),
    height: H - PT - PB,
    fill: C.nuovo,
    opacity: "0.045"
  }), /*#__PURE__*/React.createElement("text", {
    x: X(v.kmin) + 4,
    y: PT + 11,
    fontSize: "9.5",
    fill: C.mute,
    fontFamily: MONO
  }, "km reali ", v.kmin, "–", v.kmax), vista === "canone" && v.ay > 0 && /*#__PURE__*/React.createElement("line", {
    x1: PL,
    y1: Y(v.ay),
    x2: W - PR,
    y2: Y(v.ay),
    stroke: C.ayv,
    strokeWidth: "2",
    strokeDasharray: "6 4"
  }), serie.map(s => /*#__PURE__*/React.createElement("path", {
    key: s.k,
    d: path(s.f),
    fill: "none",
    stroke: s.col,
    strokeWidth: "2.5"
  })), /*#__PURE__*/React.createElement("line", {
    x1: X(kmP),
    y1: PT,
    x2: X(kmP),
    y2: H - PB,
    stroke: C.ink,
    opacity: "0.3"
  }), serie.map(s => /*#__PURE__*/React.createElement("circle", {
    key: s.k,
    cx: X(kmP),
    cy: Y(s.f(kmP)),
    r: "4.5",
    fill: s.col,
    stroke: "#fff",
    strokeWidth: "2"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: X(v.km),
    cy: H - PB,
    r: "3.5",
    fill: C.ink
  }), /*#__PURE__*/React.createElement("text", {
    x: X(v.km),
    y: H - PB - 6,
    textAnchor: "middle",
    fontSize: "9.5",
    fill: C.ink,
    fontFamily: MONO
  }, "media ", v.km)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
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
  }, "Km al mese"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 13,
      fontWeight: 600
    }
  }, kmP, " km")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: KM_MAX,
    step: 10,
    value: kmP,
    onChange: e => setKmP(parseInt(e.target.value))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 330px",
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 10px"
    }
  }, "Dove mettere il margine"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap",
    style: {
      gap: 5,
      marginBottom: 14
    }
  }, Object.keys(SCENARI).map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => applica(s),
    style: {
      padding: "5px 10px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11.5,
      fontFamily: FONT,
      border: `1px solid ${s === scen ? C.nuovo : C.line}`,
      background: s === scen ? C.nuovo : "#fff",
      color: s === scen ? "#fff" : C.ink2
    }
  }, s))), /*#__PURE__*/React.createElement(Slider, {
    lab: "Margine target sul canone",
    val: margPct,
    set: lib(setMargPct),
    mn: 0,
    mx: 25,
    st: 1,
    u: "%"
  }), /*#__PURE__*/React.createElement(Slider, {
    lab: "Quota del margine caricata sul km",
    val: quota,
    set: lib(setQuota),
    mn: 0,
    mx: 100,
    st: 5,
    u: "%"
  }), /*#__PURE__*/React.createElement(Slider, {
    lab: "Km inclusi nella rata fissa",
    val: kmIncl,
    set: lib(setKmIncl),
    mn: 0,
    mx: 800,
    st: 25,
    u: "km"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 10,
      borderTop: `1px solid ${C.line}`,
      fontSize: 11.5,
      lineHeight: 1.7,
      color: C.ink2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Costo fornitura"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, eur(v.fo, 2))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Cost-to-serve"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, eur(cts, 2))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between",
    style: {
      fontWeight: 600,
      color: C.ink
    }
  }, /*#__PURE__*/React.createElement("span", null, "Margine a ", v.km, " km"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, eur(calc.M, 2))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "· sulla rata fissa"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, eur(calc.margFisso, 2))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "· sul km"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, calc.mkKm.toFixed(4), " €/km")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between",
    style: {
      fontWeight: 600,
      color: C.ink,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "Rata fissa nuova"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, eur(calc.fissaNew, 2))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Rata fissa attuale"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, eur(v.fissa, 2))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Tariffa Generali"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO
    }
  }, v.ir.toFixed(4), " €/km")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "2 1 430px",
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 6,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 4px"
    }
  }, "Tutti i modelli ai km medi reali"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: C.mute,
      margin: "0 0 10px"
    }
  }, "Con i parametri impostati a sinistra."), /*#__PURE__*/React.createElement("table", {
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
      textAlign: "right"
    }
  }, "n"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "km"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Marg. att."), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Marg. new"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Prezzo new"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right"
    }
  }, "Ayvens"))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: MONO
    }
  }, PTF.map(x => {
    const e = motore(x, x.km);
    const ma = x.fissa + x.km * x.vp - e.cnk;
    const mn = e.margNew(x.km);
    const pn = e.canoneNew(x.km);
    return /*#__PURE__*/React.createElement("tr", {
      key: x.m,
      style: {
        borderTop: `1px solid ${C.line}`,
        background: x.m === sel ? "#EEF3FB" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 0",
        fontFamily: FONT,
        fontWeight: x.m === sel ? 600 : 400
      }
    }, x.m), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: C.mute
      }
    }, x.n), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: C.mute
      }
    }, x.km), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: ma < 0 ? C.att : C.ok
      }
    }, eur(ma)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: mn < 0 ? C.att : C.ok
      }
    }, eur(mn)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right"
      }
    }, eur(pn)), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        color: !x.ay ? C.mute : pn <= x.ay ? C.ok : C.att
      }
    }, x.ay ? pn <= x.ay ? "sotto" : "sopra" : "—"));
  })))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginTop: 14,
      lineHeight: 1.55,
      maxWidth: 810
    }
  }, "La rata fissa assume un solo contratto per veicolo, senza fermo tra un cliente e l'altro. Ripristino al rientro e penali sui km eccedenti restano fuori. Il confronto regge solo se i prezzi Ayvens sono netto IVA come i vostri: se fossero lordi, gli spazi si riducono di circa il 18%."));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(SimulatoreFlee));
