# Sauna Guide — Welcome Flow

> Komplett dokumentation för signup-till-första-brev-flödet

---

## Flödesöversikt

```
[Besökare] → [Signup-formulär] → [Thank You Page] → [Welcome Email] → [Första nyhetsbrevet]
                                        ↓
                              Beehiiv bekräftelse-email
```

---

## 1. Signup-formulär

**Fil:** `src/components/newsletter/NewsletterSignup.tsx`

**CTA-text:** "Step inside →"

**Beteende:**
- Skickar email till `/api/newsletter/subscribe`
- Redirectar till `/welcome` vid success
- Visar felmeddelande inline vid error

**Varianter:**
- `hero` — Full storlek för landing page
- `inline` — Kompakt för sektioner
- `minimal` — Ännu mindre

---

## 2. Thank You Page

**URL:** `/welcome`
**Fil:** `src/app/welcome/page.tsx`

**Syfte:**
- Bekräfta att signup lyckades
- Förklara vad som händer nu
- Maximera email deliverability

**Innehåll:**
1. ✓ "You're in." — Bekräftelse
2. Safelist-instruktioner (add to contacts, check Promotions, reply "Löyly")
3. Finskt ordspråk för atmosphere
4. Tre länkar att utforska medan de väntar

**Metrics to track:**
- Bounce rate (ska vara låg)
- Time on page
- Klick på guides

---

## 3. Welcome Email

**Fil:** `src/content/welcome-email.html` (HTML-mall för Beehiiv)
**Fil:** `src/content/welcome-email.md` (Strategi och plain text)

### Subject Line Options (A/B-testa)
- **A:** "The door is open"
- **B:** "Your first letter from the heat"
- **C:** "Welcome — here's what happens next"

### Preview Text
"Why heat heals, where to find it, and your first moment of stillness."

### Beehiiv-inställningar
- **Send timing:** Immediately after signup
- **From name:** Sauna Guide
- **From email:** saunaguide@mail.beehiiv.com
- **Reply-to:** saunaguide@mail.beehiiv.com

### Psykologi-principer
1. **Recency bias** — Skickas direkt medan excitement är hög
2. **Quirk factor** — "Reply with Löyly" är oväntat och minnesvärt
3. **Set expectations** — "What happens now" section
4. **Sideways CTA** — Enkel reply-request, inte försäljning
5. **Belonging** — "You just did something most people never do"
6. **Immediate reward** — Länkar till värdefullt content
7. **Safelist request** — Förbättrar deliverability

### Mätvärden
| Metric | Target | Bransch-snitt |
|--------|--------|---------------|
| Open rate | 60%+ | 50% |
| Reply rate | 5%+ | <1% |
| Click rate | 15%+ | 8% |

---

## 4. Första Nyhetsbrevet

**Mall:** `src/content/newsletter-template.html`

**Dag/tid:** Varje torsdag kväll

**Struktur:**
1. Opening Brief (2-3 meningar, atmosfärisk)
2. Main Feature (300-400 ord)
3. The Practice (konkret tips)
4. Gear Spotlight (en produkt)
5. Insider Intel (3-5 snabblänkar)
6. Closing + P.S.

---

## Beehiiv Setup-checklista

### Publication Settings
- [ ] Publication name: **Sauna Guide**
- [ ] One-liner: **Every Thursday: why heat heals, where to find it, and five minutes of stillness.**
- [ ] Default from email: saunaguide@mail.beehiiv.com
- [ ] Reply-to: saunaguide@mail.beehiiv.com

### Welcome Email
- [ ] Aktivera automation
- [ ] Importera HTML från `welcome-email.html`
- [ ] Sätt subject line (A/B-test)
- [ ] Aktivera "send immediately"

### Signup Form
- [ ] Koppla domän till sauna.guide
- [ ] Redirect URL: https://sauna.guide/welcome
- [ ] Stäng av Beehiiv's default thank you page

### Domain & Deliverability
- [ ] Verifiera domän (DKIM, SPF, DMARC)
- [ ] Sätt upp custom tracking domain
- [ ] Testa med Mail Tester (mål: 10/10)

---

## Framtida Optimeringar

### Onboarding Sequence
Efter welcome email, överväg en 3-dagars sekvens:
- **Dag 2:** "The one thing most people get wrong about sauna" (link to guide)
- **Dag 5:** "Your first challenge: 3 sessions this week"
- **Dag 7:** "Favorite saunas from our readers" (social proof)

### Segmentering
Baserat på svar på welcome email:
- Svar med "Löyly" → Engagerad segment
- Klick på guides → Kunskapssökare
- Klick på saunas → Resebokare

---

## Sources

- [Beehiiv: 8 Psychology-Backed Tips for Welcome Emails](https://www.beehiiv.com/blog/tips-for-welcome-emails)
- [Beehiiv: Onboarding Email Sequence Guide](https://www.beehiiv.com/blog/onboarding-email-sequence)
