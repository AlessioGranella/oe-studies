# Check DS — ../../progetti/Studies/sito/metodologia/approccio-oe.html

27/10/2026, 19:17:36 · regole lette da `design-system/src`

**Esito: 2 errori · 1 da verificare**

## Errori (regole del DS non rispettate)

- **Titoli = DS** — h1 «Dal mondo reale ai dati, dai dati alle v»: fontSize 76px (DS 70px), lineHeight 79.04px (DS 84px) (a 1440px)
- **Titoli = DS** — h1 «Dal mondo reale ai dati, dai dati alle v»: fontSize 32.76px (DS 48px), lineHeight 34.0704px (DS 57.6px) (a 390px)

## Problemi del DS (nei componenti, non nella pagina)

Non si correggono nella pagina: vanno sistemati nel design system (token canonici + mirror Impeccable).

- **Minimo 12px** — p.oe-hero-analisi__cue 11px (a 1440px)
- **Hedvig solo display (≥ 28px)** — p.oe-footer__tagline 22px (a 1440px)
- **Hedvig solo display (≥ 28px)** — p.oe-footer__tagline 22px (a 390px)
- **Contenitore unico** — fuori colonna (a 390px) (colonna 16px): div.oe-footer__inner → 24px

## Da verificare

- **Tipografia titoli** — `.banner__title` ridefinisce font-family, font-size, line-height — verificare che sia il valore del DS

## Note

- Elementi in Mono (il DS lo riserva a chip, etichette dati e numerazione figure) — verificare: `span.oe-tag-chip.oe-tag-chip--lime`, `div.oe-stat__label`, `p.oe-hero-analisi__cue`, `span.path__label`, `b`, `p.ind__formula`, `p.banner__meta`, `span.deep__meta`, `span.oe-footer__hq-label`, `span.oe-footer__disclaimer-label`
