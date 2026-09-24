# How the Gazette is written

Rules for every weekly post, in every league.

## Content
- Every team gets at least a couple of sentences of its own in every post. A one-line mention isn't enough.
- It's one continuous story. Before writing week N, re-read the league's earlier posts (at least week N−1) and call back to them: "and yet again…", running jokes, streaks, grudges, and last week's roasts paying off or backfiring.
- The draft is part of the story. Bring back reaches, busts and late-round steals as the season goes on, like the Caleb Williams pick at 1.09 in Scripsy Tipsy. Week 1 ran "Draft Day, Revisited" and week 2 ran a "Draft Report Card".
- Each post is about 900–1100 words of prose, not counting awards and captions. Funny, not technical, and no jargon.
- Only use facts from the data: scores, starters, benches, moves and draft picks. Don't give reasons for a zero (injury etc.) unless the data says so.
- Roasts are about fantasy decisions only, never about people's real lives. The author's team (SteelerIDKher) gets no favors.

## Pieces
- 2–4 GIPHY GIFs per post, never reused anywhere on the site. Check each link, and look at a frame, because GIPHY returns a placeholder image for IDs that don't exist.
- 4–6 awards, the standings, and a one-line look ahead.
- Posts go at `posts/<league>/week-N.html`, built from `posts/_template.html`. Add the post to `posts/<league>/meta.json` and fix the previous post's "Next" link. Then run `node build-index.mjs`.

## Data
`tools/digest.mjs` (one week per league) and `tools/draft.mjs` (the draft) turn the raw data into notes for writing posts. Run them in a folder holding the Awaker recap for each league and week (`recap-<league>-<week>.json`), plus Sleeper's league, users, rosters, matchups (`m-<league>-<week>.json`), draft and picks JSON, and a slim player list (`p.json`). The digest script only has weeks 1 and 2 built in, so bump that list for each new week.
