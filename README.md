# FútHoy — Spanish Football News Portal

A modern Spanish football (fútbol) news portal built with Next.js 15, focused on La Liga, Champions League, and Spanish-speaking football audiences.

## Stack

- **Next.js 15** (App Router, RSC, ISR)
- **TypeScript** (strict)
- **Tailwind CSS** v3
- **next-intl** for Spanish/English i18n
- **rss-parser** for aggregating MARCA, AS, Mundo Deportivo, Olé
- **next-mdx-remote** for original articles
- **Football-Data.org** API for live scores & standings

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your FOOTBALL_DATA_TOKEN (free at football-data.org)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Writing Articles

Create `.mdx` files in `content/articles/`:

```mdx
---
title: "Mbappé anota un gol olímpico en el Clásico"
slug: "mbappe-gol-olimpico-clasico"
date: "2026-05-19"
author: "Carlos Jiménez"
tag: "La Liga"
image: "/images/articles/mbappe-clasico.jpg"
excerpt: "El delantero francés decidió el encuentro con un golazo de córner directo."
exclusive: true
---

Article body in **MDX**. You can use components, images, code, etc.
```

## Structure

- `app/[locale]/` — localized pages (es default)
- `components/` — UI components organized by purpose
- `lib/` — RSS, football API, MDX utilities
- `content/articles/` — original articles (MDX)
- `messages/` — i18n translations

## Deployment

Deploy to Vercel:

```bash
vercel
```

Set `FOOTBALL_DATA_TOKEN` and `NEXT_PUBLIC_SITE_URL` in Vercel project settings.

## Legal

RSS items are aggregated headlines that link out to source sites (MARCA, AS, Mundo Deportivo, Olé) per fair-use / standard RSS practice. Only original MDX articles are hosted as full content.
