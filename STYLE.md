# How the Gazette is written

Rules for every weekly post, in every league.

## Content
- Every team gets at least a couple of sentences of its own in every post. A one-line mention isn't enough.
- It's one continuous story. Before writing week N, re-read the league's earlier posts (at least week N−1) and call back to them: "and yet again…", running jokes, streaks, grudges, and last week's roasts paying off or backfiring.
- The draft is part of the story. Bring back reaches, busts and late-round steals as the season goes on, like the Caleb Williams pick at 1.09 in Scripsy Tipsy. Week 1 ran "Draft Day, Revisited" and week 2 ran a "Draft Report Card".
- Each post is about 900–1100 words of prose, not counting awards and captions. Funny, not technical, and no jargon.
- Use the league data for scores, starters, benches, moves and draft picks. Owner-provided team-name background below is also an approved source for league jokes. Don't give reasons for a zero (injury etc.) unless the data says so.
- Roasts are about fantasy decisions only, never about people's real lives. The author's team (SteelerIDKher) gets no favors.

## Pieces
- 2–4 GIPHY GIFs per post, never reused anywhere on the site. Check each link, and look at a frame, because GIPHY returns a placeholder image for IDs that don't exist.
- 4–6 awards, the standings, and a one-line look ahead.
- Posts go at `posts/<league>/week-N.html`, built from `posts/_template.html`. Add the post to `posts/<league>/meta.json` and fix the previous post's "Next" link. Then run `node build-index.mjs`.

## Data
`tools/digest.mjs` (one week per league) and `tools/draft.mjs` (the draft) turn the raw data into notes for writing posts. Run them in a folder holding the Awaker recap for each league and week (`recap-<league>-<week>.json`), plus Sleeper's league, users, rosters, matchups (`m-<league>-<week>.json`), draft and picks JSON, and a slim player list (`p.json`). The digest script only has weeks 1 and 2 built in, so bump that list for each new week.

## Scripsy Tipsy running bit
- The owner requested alternating treatment of sp1cycurry: roast heavily in Week 3, give exaggerated praise in Week 4, then alternate harsh and flattering coverage in later issues. This is an editorial preference for future issues, not a publishing schedule.
- The owner confirmed that sp1cycurry prefers favorable Gazette coverage. That preference can be a running joke alongside his fantasy decisions. Keep the teasing playful, avoid real-life personal attacks, and report good results accurately even during roast weeks.

## Scripsy Tipsy team-name background

Confirmed by the league owner. Preserve the exact Sleeper spellings in scorelines and standings.

- **SteelerIDKher** is the author's team. The name uses the joke of hearing a word ending in "her" and replying "I don't know her." The Steelers reference can coexist with that wordplay.
- **Arianajonas** is the author's girlfriend's team. She loves the Jonas Brothers, which explains the name. Band and fandom jokes are welcome, with the focus on her fantasy team.
- **InelvatableBeerMile** belongs to Elva. The name combines Elva with "inevitable beer mile." The league's loser has to do a beer mile, so this is a joke about the last-place consequence. Do not present the name as a typo or assume Elva has already lost.
- **gwaman** is pronounced like "G Woman" and comes from "group woman." She was the only woman on a camping trip with a group of men, and the nickname stuck. This explains the name, not an invitation to gender-based roasts.
- **underscore11** was a bot-controlled slot in Week 1. The human manager joined after Week 1 and inherited that roster. Do not credit or blame the human manager for the bot's draft or Week 1 lineup. The owner described it as the best team overall, and the Week 3 data shows it leading total points and the standings. Verify those claims afresh in later issues.
