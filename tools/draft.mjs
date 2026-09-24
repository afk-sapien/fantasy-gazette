import fs from 'node:fs'
const P=JSON.parse(fs.readFileSync('p.json')),rd=f=>JSON.parse(fs.readFileSync(f))
const leagues=['1397418543028436992','1389736270191685633','1387591596823814144']
const where={};for(const L of leagues)for(const p of rd(`picks-${L}.json`))(where[p.player_id]??={})[L]=p.pick_no
const lname=Object.fromEntries(leagues.map(L=>[L,rd(`league-${L}.json`).name]))
for(const L of leagues){
 const lg=rd(`league-${L}.json`),users=rd(`users-${L}.json`),rosters=rd(`rosters-${L}.json`),picks=rd(`picks-${L}.json`),dr=rd(`draft-${L}.json`)
 const owner=Object.fromEntries(rosters.map(r=>[r.roster_id,users.find(u=>u.user_id===r.owner_id)]))
 const tname=id=>{const u=owner[id];return u?(u.metadata?.team_name?`${u.metadata.team_name} (${u.display_name})`:u.display_name):`Team ${id}`}
 const byUser=Object.fromEntries(rosters.map(r=>[r.owner_id,r.roster_id]))
 const now={};for(const r of rosters)for(const id of r.players||[])now[id]=r.roster_id
 const pts={},started={};for(const W of [1,2])for(const m of rd(`m-${L}-${W}.json`)){for(const [id,v] of Object.entries(m.players_points||{}))(pts[id]??={})[W]=v;for(const id of m.starters||[])(started[id]??=new Set()).add(W)}
 const tot=id=>pts[id]?Math.round(Object.values(pts[id]).reduce((a,b)=>a+b,0)*100)/100:null
 const T=dr.settings.teams,pk=r=>`${r.round}.${String(r.pick_no-(r.round-1)*T).padStart(2,'0')}`
 const posCount={}
 const rows=picks.map(p=>{const pos=p.metadata.position;posCount[pos]=(posCount[pos]||0)+1;const rid=p.roster_id??byUser[p.picked_by];return {...p,rid,pos,posRank:`${pos}${posCount[pos]}`,name:`${p.metadata.first_name} ${p.metadata.last_name}`,nfl:p.metadata.team,total:tot(p.player_id)}})
 const ranked=[...rows].filter(r=>r.total!=null).sort((a,b)=>b.total-a.total);ranked.forEach((r,i)=>r.ptsRank=i+1)
 const fmt=r=>{const o=Object.entries(where[r.player_id]||{}).filter(([l])=>l!==L).map(([l,n])=>`${lname[l]} #${n}`).join(', ');const w=pts[r.player_id];const nowT=now[r.player_id];
  return `${pk(r)} (#${r.pick_no}) ${r.name} ${r.pos} ${r.nfl} — ${r.posRank} off the board; wk1 ${w?.[1]??'-'}, wk2 ${w?.[2]??'-'} (2-wk total ${r.total??'n/a'}${r.ptsRank?`, #${r.ptsRank} among all drafted players in this league`:''}); started weeks: ${[...(started[r.player_id]||[])].join(',')||'none'}; now: ${nowT==null?'NOT on any roster (dropped)':nowT===r.rid?'still on this team':'on '+tname(nowT)}${o?`; same player went ${o} in the author's other leagues`:''}`}
 let s=`# ${lg.name} — ${lg.season} draft (${dr.type}, ${dr.settings.rounds} rounds, ${dr.settings.teams} teams, completed)\nNotes: pick notation is round.pick-within-round (snake draft). "QB1 off the board" = first QB drafted. Cross-league picks are the only ADP reference available; use general football knowledge carefully and don't state ADP numbers not given here. Points shown only for players currently rostered in this league (dropped players show '-').\n\n## First 3 rounds, in order\n`
 for(const r of rows.filter(r=>r.round<=3))s+=`- ${fmt(r)} → ${tname(r.rid)}\n`
 s+=`\n## Position firsts\n`;for(const pos of ['QB','TE','K','DEF'])for(const r of rows.filter(r=>r.pos===pos).slice(0,2))s+=`- ${fmt(r)} → ${tname(r.rid)}\n`
 s+=`\n## Biggest early-round busts so far (rounds 1-5, fewest 2-week points)\n`;for(const r of rows.filter(r=>r.round<=5).sort((a,b)=>(a.total??-1)-(b.total??-1)).slice(0,6))s+=`- ${fmt(r)} → ${tname(r.rid)}\n`
 s+=`\n## Biggest late-round steals so far (round 8+, most 2-week points)\n`;for(const r of rows.filter(r=>r.round>=8&&r.total!=null).sort((a,b)=>b.total-a.total).slice(0,6))s+=`- ${fmt(r)} → ${tname(r.rid)}\n`
 s+=`\n## Each team's draft\n`
 for(const rid of [...new Set(rows.map(r=>r.rid))]){const mine=rows.filter(r=>r.rid===rid);const dropped=mine.filter(r=>now[r.player_id]==null).length;s+=`### ${tname(rid)} (slot ${mine[0].draft_slot}; ${dropped} of ${mine.length} picks already dropped)\n`+mine.map(r=>`- ${pk(r)} (#${r.pick_no}) ${r.name} ${r.pos} — ${r.total??'-'} pts in 2 wks${now[r.player_id]==null?' (dropped)':now[r.player_id]!==rid?' (now on '+tname(now[r.player_id])+')':''}`).join('\n')+'\n'}
 fs.writeFileSync(`../gazette-digests/draft-${lg.name.replace(/\W+/g,'-').toLowerCase()}.md`,s)
}
