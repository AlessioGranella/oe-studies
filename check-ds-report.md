# Check DS — ../../progetti/Studies/sito/index.html

27/10/2026, 19:10:44 · regole lette da `design-system/src`

**Esito: nessun errore · 1 da verificare**

## Errori (regole del DS non rispettate)

- nessuno

## Problemi del DS (nei componenti, non nella pagina)

Non si correggono nella pagina: vanno sistemati nel design system (token canonici + mirror Impeccable).

- **Minimo 12px** — p.oe-hero-analisi__cue 11px (a 1440px)
- **Hedvig solo display (≥ 28px)** — p.oe-footer__tagline 22px (a 1440px)
- **Hedvig solo display (≥ 28px)** — p.oe-footer__tagline 22px (a 390px)
- **Contenitore unico** — fuori colonna (a 390px) (colonna 16px): div.oe-footer__inner → 24px

## Da verificare

- **Tipografia titoli** — `.navsearch__title` ridefinisce font-size, line-height — verificare che sia il valore del DS

## Note

- Elementi in Mono (il DS lo riserva a chip, etichette dati e numerazione figure) — verificare: `div.oe-stat__label.hero__stat-label`, `p.oe-hero-analisi__cue`, `span.oe-tag-chip.oe-tag-chip--lime`, `dt`, `span.method-card__sub`, `button.oe-segment__btn.is-active`, `button.oe-segment__btn`, `span.study__date`, `span.study__lang`, `span.oe-tag-chip.oe-tag-chip--default.study__cat`, `span.oe-footer__hq-label`, `span.oe-footer__disclaimer-label`
