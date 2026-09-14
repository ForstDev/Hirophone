# Marketing Audit: Hirophone Perú
**URL:** https://hirophone.vercel.app
**Date:** 2026-09-14
**Business Type:** E-commerce / local retail hybrid (in-store phone financing, WhatsApp-quoted, no online payment)
**Overall Marketing Score: 58/100 (Grade: C)**

---

## Executive Summary

Hirophone's site does the fundamentals of its specific business model unusually well: the hero passes the 5-second test, the 4-step financing flow (choose phone → WhatsApp quote → DNI evaluation → pickup) removes real friction for a credit-skeptical buyer, and the WhatsApp quote drawer itself is a genuinely strong piece of conversion design — it previews the exact message before sending and reassures "sin pagos en línea" at the moment of action. Trust signals (40 stores, 9/10 approval, DNI-only) are consistent across every page.

The two biggest gaps pull the score down hard. First, **technical SEO infrastructure is essentially absent** (no sitemap.xml, no robots.txt, no structured data, no Open Graph tags) despite strong on-page title/meta work — the site is invisible to search and shares poorly on the WhatsApp/social channels it actually depends on. Second, **the core financing pitch is category table-stakes, not a differentiator**: competitor research shows CrediSmart, Samsung Finance+, PayJoy, and Acuotaz all lead with the identical "solo tu DNI, sin buró" claim, so a buyer comparing options has no stated reason to pick Hirophone specifically.

Fixing the SEO infrastructure is a same-week, near-zero-risk fix with outsized impact. Sharpening competitive positioning and building out real social proof (named testimonials, a fuller store directory) are the next-tier moves. Implementing all recommendations below is a low-cost, high-leverage package for a business this WhatsApp/store-network-dependent — realistic upside is organic-search visibility going from ~0 to measurable within 4-8 weeks, plus a meaningfully stronger close rate on WhatsApp conversations that currently end in "why not just go to a bank."

---

## Score Breakdown

| Category | Score | Weight | Weighted Score | Key Finding |
|----------|-------|--------|---------------|-------------|
| Content & Messaging | 70/100 | 25% | 17.5 | Hero nails the 5-second test; testimonials are generic and one page has a self-undermining "evaluación crediticia" line |
| Conversion Optimization | 74/100 | 20% | 14.8 | WhatsApp quote drawer is excellent; floating WhatsApp bubble collided with the on-page CTA (fixed during this pass) |
| SEO & Discoverability | 38/100 | 20% | 7.6 | No sitemap.xml, robots.txt, structured data, or OG tags — biggest single gap on the site |
| Competitive Positioning | 42/100 | 15% | 6.3 | "DNI-only, no buró" is now universal marketing in this category — zero differentiation content |
| Brand & Trust | 72/100 | 10% | 7.2 | Consistent trust triad site-wide; /nosotros asserts scale (40 stores) but only shows 12 |
| Growth & Strategy | 45/100 | 10% | 4.5 | Clear, low-friction funnel; zero retention/referral/cross-sell mechanism anywhere |
| **TOTAL** | | **100%** | **57.9 ≈ 58/100** | |

---

## Quick Wins (This Week)

1. **Add `app/sitemap.ts` and `app/robots.ts`.** Both currently 404. Next.js generates these natively. Highest-leverage fix on the whole list — costs almost nothing, unblocks all future SEO work.
2. **Add Open Graph + Twitter Card tags** (og:title, og:description, og:image, og:url) to every page template. This is a WhatsApp/Instagram-driven business — shared links currently render with no preview at all.
3. **Fix the credit-check contradiction on the product page fine print.** Before: *"sujeto a evaluación crediticia."* After: *"Evaluamos tu inicial y tu DNI en tienda, no tu historial crediticio."* — it currently contradicts the homepage's own "sin buró" promise.
4. **Reword the /catalogo demo disclaimer** so it reads as reassurance, not a placeholder notice. Before: *"Catálogo de referencia con fines de demostración de diseño."* After: *"Precios referenciales: tu inicial exacta se confirma por WhatsApp en menos de un minuto."*
5. **Rewrite testimonials with specifics** — store name, product, real numbers. Before: *"Muy buen servicio, tienen gran variedad de equipos."* After: *"Fui con mi DNI un sábado y en 20 minutos salí con mi Galaxy A55 pagando S/250 de inicial."* — Angie Vargas, Real Plaza Salaverry.
6. **~~Fix the floating WhatsApp bubble overlapping the inline CTA on mobile product pages~~ — done during this pass** (the bubble now hides on `/producto/*` routes, where a page-level WhatsApp CTA already exists).
7. **~~Give the homepage hero a real product photo~~ — done during this pass** (hero now shows a real photo collage of the Galaxy S24 Ultra, iPhone 15, and Xiaomi 14T instead of abstract icons).

## Strategic Recommendations (This Month)

1. **Build an explicit "Hirophone vs." comparison section** — vs. a bank plan, vs. Mercado Libre, vs. a digital-only lender like PayJoy/Acuotaz. Lead with what only Hirophone offers: same-day in-person pickup at 40 physical stores, no online payment risk. This is the single highest-impact fix for the Competitive Positioning score.
2. **Add Product + Offer JSON-LD schema to every PDP**, and LocalBusiness/Organization schema with store locations. With 40 physical stores, this is legitimate Local Pack / Google Maps territory currently left untouched.
3. **Expand /nosotros to the full 40-store directory** (filterable by city), not the current 12, plus a short founding story and a real team photo — converts stated scale into felt scale.
4. **Add a lightweight referral incentive** (discount on next down payment for a successful referral) — near-zero cost, high natural fit for a word-of-mouth, WhatsApp-driven business with currently zero retention mechanism.
5. **Add a WhatsApp/email opt-in** for price-drop or restock alerts on specific models — the only current growth channel is a single Instagram link in the footer.

## Long-Term Initiatives (This Quarter)

1. **Own comparison-intent SEO** ("Hirophone vs CrediSmart", "celular a cuotas sin buró Perú") now that sitemap/schema infrastructure exists — this category is currently dominated by competitors making the identical claim Hirophone makes.
2. **Build a lightweight trade-in / upgrade path** ("cambia tu equipo actual como inicial") to create a second purchase occasion and lower the effective down payment barrier — no such mechanism exists today.
3. **Publish real approval-time and full cost-to-pay transparency** (total a pagar vs. inicial, per plan length) to substantiate the "9 de cada 10 aprueban" claim with real numbers, not just an assertion.

---

## Detailed Analysis by Category

### Content & Messaging Analysis (70/100)
**Strength:** The hero + trust-strip combination ("Estrena celular hoy, en cómodas cuotas" + "Solo con tu DNI / 9 de cada 10 aprueban / 40 tiendas") answers what's sold, how financing works, and why it beats a bank plan before any scrolling. Message stays consistent through Catálogo and Nosotros, and every CTA is WhatsApp-first, matching how Peruvian buyers actually expect to transact.

**Gap:** Social proof is thin and generic (no names, no store, no specifics). The product-page fine print's "sujeto a evaluación crediticia" directly contradicts the homepage's "sin buró perfecto" promise — exactly the kind of small-print gotcha this buyer is primed to distrust. The /catalogo demo disclaimer reads as unfinished-prototype language, not reassurance.

### Conversion Optimization Analysis (74/100)
**Strength:** The quote drawer's WhatsApp hand-off previews the exact pre-filled message before sending and pairs it with "Sin pagos en línea: la compra se confirma en tienda con tu DNI" right at the point of action — directly answers the two biggest doubts a WhatsApp-quote shopper has, with zero extra clicks.

**Gap (fixed during this session):** The floating WhatsApp bubble physically overlapped the inline "Cotizar este equipo ahora" CTA and the installment-simulator controls on mobile product pages, and duplicated an action that page already offered inline. The bubble now hides itself on `/producto/*` routes.

**Still open:** the "Agregar" (build multi-item quote) and the direct single-item WhatsApp quote path aren't visually distinguished on catalog cards — a small icon/label difference would clarify the mental model.

### SEO & Discoverability Analysis (38/100)
**Strength:** Every page checked has a unique, genuinely tailored `<title>` and meta description (even per-product), a single correct H1, and a real responsive viewport meta tag.

**Gap:** Zero structured data anywhere (no Product/Offer, LocalBusiness, Organization, or BreadcrumbList schema, despite 40 physical stores being prime LocalBusiness territory), zero Open Graph/Twitter Card tags, and both `/robots.txt` and `/sitemap.xml` return 404 — Google has no sanctioned crawl path today. URL structure itself (`/producto/[slug]`, `/catalogo`) is already clean and needs no changes.

### Competitive Positioning Analysis (42/100)
**Strength:** Hirophone backs its claims with concrete, verifiable numbers most rivals don't publish — 40 physical stores, a stated 9/10 approval rate, named mall chains — more credible than faceless "sin buró" digital lenders.

**Gap:** Direct competitor research (CrediSmart, Samsung Finance+, PayJoy, Peru Smart/Acuotaz, Tavocel, bank/brand installment programs) shows nearly all of them lead with the identical "solo tu DNI, sin buró" claim. That message is now category table-stakes, not a differentiator, and the site has zero comparison/alternatives content anywhere to make the real difference (physical pickup network, no online payment risk) explicit.

### Brand & Trust Analysis (72/100)
**Strength:** The trust triad is repeated consistently on both the homepage and /nosotros, directly answering the two objections a financing-skeptical buyer has.

**Gap:** /nosotros lists only 12 of the stated 40 branches, with no team/founder story or history — it asserts scale rather than proving it. Testimonials remain generic single-line quotes with no names or store attribution.

### Growth & Strategy Analysis (45/100)
**Strength:** The financing flow is genuinely well explained and matches a low-trust, cash-constrained buyer's mental model better than a generic "apply for credit" page would.

**Gap:** No retention, referral, or cross-sell mechanism exists anywhere — no loyalty program, no referral incentive, no accessories/trade-in upsell, no email/WhatsApp opt-in beyond a single Instagram footer link. The business currently has no built-in mechanism to turn a one-time buyer into a repeat customer or advocate.

---

## Competitor Comparison

| Factor | Hirophone | CrediSmart | Samsung Finance+ | PayJoy / Acuotaz |
|--------|-----------|------------|-------------------|-------------------|
| DNI-only, no buró claim | Yes | Yes | Yes (manufacturer-backed) | Yes |
| Physical store network | 40 stores (Lima + provincias) | Limited | Retail-partner dependent | Online-only |
| Same-day in-person pickup | Yes | Partial | Partial | No |
| Published approval-rate stat | Yes (9/10) | Not published | Not published | Not published |
| Comparison/"why us" content | **None** | Some | Some (brand trust) | Some |

---

## Revenue Impact Summary

| Recommendation | Est. Monthly Impact | Confidence | Timeline |
|---------------|-------------------|------------|----------|
| Sitemap + robots.txt + OG tags | Low now, compounding | High (infrastructure-gated) | 1-2 days |
| Product/LocalBusiness schema | Medium (local search + rich results) | Medium | 1 week |
| Comparison/differentiation content | Medium-High (close-rate lift on WhatsApp chats already started) | Medium | 2-3 weeks |
| Named, specific testimonials | Low-Medium (trust lift, not top-of-funnel) | Medium | 2-3 days |
| Referral incentive | Medium (compounds over time via word-of-mouth) | Low-Medium (new mechanism, unproven) | 2-4 weeks |
| **Total Potential** | **Meaningful compounding lift, hard to price precisely for a WhatsApp-quote (non-checkout) funnel** | | |

*Note: this business has no online transaction to attribute revenue to directly — impact is best tracked via WhatsApp-chat volume and organic-search sessions, not e-commerce conversion rate.*

---

## Next Steps

1. Ship `app/sitemap.ts`, `app/robots.ts`, and Open Graph tags — highest leverage, lowest risk, do this first.
2. Fix the "evaluación crediticia" contradiction and rewrite testimonials with real specifics.
3. Draft a "Hirophone vs." comparison section to convert stated trust signals into an actual competitive argument.

*Generated by AI Marketing Suite — `/market audit`, run against the live deployment at https://hirophone.vercel.app.*
