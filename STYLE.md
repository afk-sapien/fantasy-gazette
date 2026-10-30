# How the Gazette is written

Rules for every weekly post, in every league.

## Content
- Every team gets at least a couple of sentences of its own in every post. A one-line mention isn't enough.
- It's one continuous story. Before writing week N, re-read the league's earlier posts (at least week N−1) and call back to them: "and yet again…", running jokes, streaks, grudges, and last week's roasts paying off or backfiring.
- The draft is part of the story. Bring back reaches, busts and late-round steals as the season goes on, like the Caleb Williams pick at 1.09 in Scripsy Tipsy. Week 1 ran "Draft Day, Revisited" and week 2 ran a "Draft Report Card".
- Each post is about 900–1100 words of prose, not counting awards and captions. Funny, not technical, and no jargon.
- Use the league data for scores, starters, benches, moves and draft picks. Owner-provided team-name background below is also an approved source for league jokes. Don't give reasons for a zero (injury etc.) unless the data says so.
- Roasts are about fantasy decisions only, never about people's real lives. The user's teams get the same scrutiny as every other team.

## Narrator
- The Gazette is an independent sports publication covering the leagues. It is not written in the user's voice and does not participate in any league.
- Refer to every manager and fantasy team in the third person. Never call the user's teams "the editor," "the author," "my team," or "our team," and never describe their decisions, wins or losses as the narrator's own.
- The user's teams are SteelerIDKher in Scripsy Tipsy and Game of Throws, and Team Osteoporosis (formerly Team Taylor) in The Strand Zone. Use the name appropriate to the week being covered.
- Editorial "we" may refer to the Gazette's coverage, jokes or past predictions. It must never imply that the publication owns a roster, drafts players, sets a lineup or has a personal relationship with a manager.
- Keep the sp1cycurry coverage bit, but do not portray games against the user's team as games against the newspaper. Apply this voice consistently in articles, captions, awards, previews and metadata.

## Headlines
- Give each issue a headline about the league's week as a whole: a shared lineup mistake, a standings shakeup, a scoring trend, or a group of NFL players underperforming. A headline may focus on an NFL player when that performance captures the broader story.
- Do not center the main headline on one fantasy manager, team name, or individual matchup. Keep those specific stories in the subheading and article.
- Prefer short, funny editorial headlines grounded in that week's results. "The Bench Was Better" is the model. Avoid generic recaps and claims broader than the data supports.
- Keep the article heading, browser title, social preview title, and league metadata in sync, then rebuild the homepage.

## Pieces
- Add 1 opening GIPHY GIF beneath the introduction and before the matchups. Its reaction and caption should fit the headline and the league-wide theme.
- Every matchup must also have exactly 1 GIPHY GIF in its own recap section, tied to that matchup's joke. Including the opening GIF, this makes 6 GIFs for each ten-team league and 7 for the twelve-team league. Never reuse a GIF anywhere on the site. Check each link and inspect a frame, because GIPHY returns a placeholder image for IDs that don't exist. Verify both the opening GIF and the count per matchup before publishing.
- 4–6 awards, the standings, and a one-line look ahead.
- Posts go at `posts/<league>/week-N.html`, built from `posts/_template.html`. Add the post to `posts/<league>/meta.json` and fix the previous post's "Next" link. Then run `node build-index.mjs`.

## Data
`tools/digest.mjs` (one week per league) and `tools/draft.mjs` (the draft) turn the raw data into notes for writing posts. Run them in a folder holding the Awaker recap for each league and week (`recap-<league>-<week>.json`), plus Sleeper's league, users, rosters, matchups (`m-<league>-<week>.json`), draft and picks JSON, and a slim player list (`p.json`). The digest script takes the weeks to write on the command line (`node tools/digest.mjs 6 7`), or with no arguments writes every week that has a recap file. Records and standings come from the matchup files for weeks 1 through N, including the weekly median game in leagues that use one, so a week N digest needs `m-<league>-1.json` through `m-<league>-N.json`.

## Scripsy Tipsy running bit
- The owner requested alternating treatment of sp1cycurry: roast heavily in Week 3, give exaggerated praise in Week 4, then alternate harsh and flattering coverage in later issues. This is an editorial preference for future issues, not a publishing schedule.
- The owner confirmed that sp1cycurry prefers favorable Gazette coverage. That preference can be a running joke alongside his fantasy decisions. Keep the teasing playful, avoid real-life personal attacks, and report good results accurately even during roast weeks.

## Scripsy Tipsy team-name background

Confirmed by the league owner. Preserve the exact Sleeper spellings in scorelines and standings.

- **SteelerIDKher** is the user's team, not the narrator's team. The name uses the joke of hearing a word ending in "her" and replying "I don't know her." The Steelers reference can coexist with that wordplay.
- **Arianajonas** is the user's girlfriend's team, not the narrator's girlfriend's team. She loves the Jonas Brothers, which explains the name. Band and fandom jokes are welcome, with the focus on her fantasy team.
- **InelvatableBeerMile** belongs to Elva. The name combines Elva with "inevitable beer mile." The league's loser has to do a beer mile, so this is a joke about the last-place consequence. Do not present the name as a typo or assume Elva has already lost.
- **gwaman** is pronounced like "G Woman" and comes from "group woman." She was the only woman on a camping trip with a group of men, and the nickname stuck. This explains the name, not an invitation to gender-based roasts.
- **underscore11** was a bot-controlled slot in Week 1. The human manager joined after Week 1 and inherited that roster. Do not credit or blame the human manager for the bot's draft or Week 1 lineup. The owner described it as the best team overall, and the Week 3 data shows it leading total points and the standings. Verify those claims afresh in later issues.
