# Check DS — ../../progetti/Studies/sito/metodologia/approccio-oe.html

27/10/2026, 19:10:22 · regole lette da `design-system/src`

**Esito: 6 errori · 0 da verificare**

## Errori (regole del DS non rispettate)

- **Titoli = DS** — h1 «Dal mondo reale ai numeri, dai numeri al»: fontSize 76px (DS 70px), lineHeight 79.04px (DS 84px) (a 1440px)
- **Titoli = DS** — h2 «Quanto attiva un investimento nell'econo»: fontSize 40px (DS 42px), lineHeight 44px (DS 50.4px) (a 1440px)
- **Titoli = DS** — h2 «Quanto vale per la società e gli stakeho»: fontSize 40px (DS 42px), lineHeight 44px (DS 50.4px) (a 1440px)
- **Titoli = DS** — h1 «Dal mondo reale ai numeri, dai numeri al»: fontSize 32.76px (DS 48px), lineHeight 34.0704px (DS 57.6px) (a 390px)
- **Titoli = DS** — h2 «Quanto attiva un investimento nell'econo»: fontSize 28px (DS 42px), lineHeight 30.8px (DS 50.4px) (a 390px)
- **Titoli = DS** — h2 «Quanto vale per la società e gli stakeho»: fontSize 28px (DS 42px), lineHeight 30.8px (DS 50.4px) (a 390px)

## Problemi del DS (nei componenti, non nella pagina)

Non si correggono nella pagina: vanno sistemati nel design system (token canonici + mirror Impeccable).

- **Minimo 12px** — p.oe-hero-analisi__cue 11px (a 1440px)
- **Hedvig solo display (≥ 28px)** — p.oe-footer__tagline 22px (a 1440px)
- **Hedvig solo display (≥ 28px)** — p.oe-footer__tagline 22px (a 390px)
- **Contenitore unico** — fuori colonna (a 390px) (colonna 16px): div.oe-footer__inner → 24px

## Da verificare

- niente

## Note

- Elementi in Mono (il DS lo riserva a chip, etichette dati e numerazione figure) — verificare: `span.oe-tag-chip.oe-tag-chip--lime`, `p.oe-hero-analisi__cue`, `div.oe-kpi__label`, `span.path__label`, `b`, `p.ind__formula`, `span.deep__meta`, `span.oe-footer__hq-label`, `span.oe-footer__disclaimer-label`
