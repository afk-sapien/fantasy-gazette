import fs from 'node:fs'
const P=JSON.parse(fs.readFileSync('p.json')),rd=f=>JSON.parse(fs.readFileSync(f))
const leagues=['1397418543028436992','1389736270191685633','1387591596823814144']
for(const L of leagues){
 const lg=rd(`league-${L}.json`),users=rd(`users-${L}.json`),rosters=rd(`rosters-${L}.json`)
 const owner=Object.fromEntries(rosters.map(r=>[r.roster_id,users.find(u=>u.user_id===r.owner_id)]))
 const tname=id=>{const u=owner[id];return u?(u.metadata?.team_name?`${u.metadata.team_name} (${u.display_name})`:u.display_name):`Team ${id}`}
 const pn=id=>P[id]?`${P[id].n} (${P[id].pos}${P[id].t?', '+P[id].t:''})`:id
 const rec={};for(const r of rosters)rec[r.roster_id]={w:0,l:0,t:0,pf:0}
 let out=[]
 for(const W of [1,2]){
  const m=rd(`m-${L}-${W}.json`),rc=rd(`recap-${L}-${W}.json`).recaps[0]
  const byId=Object.fromEntries(m.map(x=>[x.roster_id,x]))
  let s=`# ${lg.name} — Week ${W} (season ${lg.season})\nLeague: ${lg.total_rosters} teams. Scoring: rec=${lg.scoring_settings.rec} PPR, pass_td=${lg.scoring_settings.pass_td}. Slots: ${lg.roster_positions.filter(p=>p!=='BN').join(',')}. Blog author's own team: ${tname(rc.rosterId)}\n`
  s+=`Summary: avg ${rc.summary.average}, high ${rc.summary.high}, low ${rc.summary.low}, total left on benches ${rc.summary.leftOnBench}\n\n## Matchups\n`
  const seen=new Set()
  for(const row of rc.rows){ if(seen.has(row.rosterId))continue; seen.add(row.rosterId); if(row.opponentId)seen.add(row.opponentId)
   const o=rc.rows.find(x=>x.rosterId===row.opponentId)
   s+=`- ${tname(row.rosterId)} ${row.points} vs ${o?tname(o.rosterId)+' '+o.points:'(no opponent)'} → ${row.result==='win'?tname(row.rosterId):row.result==='loss'?tname(o.rosterId):'tie'} by ${Math.abs(row.margin)}\n` }
  s+=`\n## Teams\n`
  for(const row of [...rc.rows].sort((a,b)=>b.points-a.points)){
   const mm=byId[row.rosterId]; const r=rec[row.rosterId]; if(row.result==='win')r.w++;else if(row.result==='loss')r.l++;else r.t++; r.pf+=row.points
   const st=(mm.starters||[]).map((id,i)=>`${pn(id)} ${mm.starters_points?.[i]??'?'}`).join('; ')
   const bench=(mm.players||[]).filter(id=>!mm.starters.includes(id)).map(id=>[id,mm.players_points?.[id]??0]).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([id,p])=>`${pn(id)} ${p}`).join('; ')
   s+=`### ${tname(row.rosterId)} — ${row.points} pts, ${row.result} (${row.margin>0?'+':''}${row.margin}); record now ${r.w}-${r.l}${r.t?'-'+r.t:''}\n- Starters: ${st}\n- Best bench: ${bench}\n- Optimal lineup would have scored ${row.best} (left ${row.left} on bench).${row.swung?' A better lineup would have FLIPPED the result.':''}\n`
   for(const d of row.decisions||[])s+=`- Start/sit: started ${d.playedName} over ${d.satName}, cost ${d.gained} pts (pregame projection edge ${d.foreseen}; graded "${d.label}")\n`
  }
  const moves=(rc.moves?.rows||[]).filter(x=>x.played&&x.net!=null).sort((a,b)=>Math.abs(b.net)-Math.abs(a.net)).slice(0,8)
  const trades=(rc.moves?.rows||[]).filter(x=>x.type==='trade')
  if(moves.length){s+=`\n## Notable waiver/FA moves this week (net = added pts minus dropped pts that week)\n`;for(const x of moves)s+=`- ${x.teams.map(t=>t.team).join(' & ')}: added ${x.adds.map(a=>`${a.name} (${a.points??'-'}${a.started?', started':''})`).join(', ')}; dropped ${x.drops.map(a=>`${a.name} (${a.points??'-'})`).join(', ')||'nobody'}; net ${x.net}${x.bid!=null?'; FAAB $'+x.bid:''}\n`}
  if(trades.length){s+=`\n## Trades\n`;for(const x of trades)s+=`- ${JSON.stringify({teams:x.teams.map(t=>t.team),adds:x.adds.map(a=>[a.name,a.team.team,a.points]),net:x.net,label:x.label})}\n`}
  const pending=(rc.moves?.rows||[]).filter(x=>!x.played).length; if(pending)s+=`\n(${pending} other moves cleared too late to affect this week.)\n`
  s+=`\n## Standings after week ${W}\n`+Object.entries(rec).sort((a,b)=>b[1].w-a[1].w||b[1].pf-a[1].pf).map(([id,r],i)=>`${i+1}. ${tname(+id)} ${r.w}-${r.l} (${r.pf.toFixed(2)} PF)`).join('\n')+'\n'
  fs.writeFileSync(`digest-${lg.name.replace(/\W+/g,'-').toLowerCase()}-w${W}.md`,s)
 }
}
