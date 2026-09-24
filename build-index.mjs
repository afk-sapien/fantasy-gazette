// Builds index.html from each league's posts/<slug>/meta.json. Run: node build-index.mjs
import {readFileSync, writeFileSync} from 'node:fs'

const LEAGUES = [['scripsy-tipsy', 'Scripsy Tipsy'], ['the-strand-zone', 'The Strand Zone'], ['game-of-throws', 'Game of Throws']]
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c])

const sections = LEAGUES.map(([slug, name]) => {
  const posts = JSON.parse(readFileSync(`posts/${slug}/meta.json`, 'utf8')).sort((a, b) => b.week - a.week)
  const cards = posts.map(p => `<a class="card" href="posts/${slug}/week-${p.week}.html"><div class="kicker">Week ${p.week}</div><h3>${esc(p.headline)}</h3><p>${esc(p.dek)}</p></a>`).join('\n')
  return `<section class="league"><h2>${name}</h2><div class="cards">\n${cards}\n</div></section>`
}).join('\n')

writeFileSync('index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>The Fantasy Gazette</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&display=swap">
<link rel="stylesheet" href="assets/style.css">
<meta property="og:title" content="The Fantasy Gazette"><meta property="og:description" content="Weekly fantasy football recaps. Unofficial and unserious.">
</head><body><div class="wrap">
<header class="masthead"><a href="./"><h1>The Fantasy Gazette</h1></a><p>All the lineup crimes fit to print · 2026</p></header>
${sections}
<footer>Unofficial, unserious, and powered by box scores. GIFs via GIPHY.</footer>
</div></body></html>
`)
console.log('index.html written')
