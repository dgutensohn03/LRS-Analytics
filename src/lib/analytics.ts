import type { Statement, ProgramId } from '../data/sample';
import { programs } from '../data/sample';
export type RangeKey = '30'|'60'|'all';
export interface Filters { program: ProgramId|'all'; range: RangeKey; }
const cutoff: Record<RangeKey,string> = { '30':'2025-03-01','60':'2025-02-01',all:'2025-01-01' };
export const applyFilters = (rows: Statement[], filters: Filters) => rows.filter(s =>
  s.date.slice(0,10)>=cutoff[filters.range] && (filters.program==='all'||s.program===filters.program));
export const pct = (value:number)=>`${value.toFixed(1)}%`;
export interface Summary { activity:number; learners:number; completed:number; completionRate:number; avgScore:number; engagement:number; }
export function summary(rows:Statement[]):Summary {
  const distinct = new Set(rows.map(s=>s.learnerId));
  const started = rows.filter(s=>s.verb==='started').length;
  const completed = rows.filter(s=>s.verb==='completed').length;
  const graded = rows.filter(s=>s.score!==null).map(s=>s.score as number);
  const activeDays = new Set(rows.map(s=>s.date.slice(0,10))).size;
  // Demonstration metrics, defined here so all screens agree. This is not a production KPI specification.
  return { activity:rows.length, learners:distinct.size, completed,
    completionRate:started+completed?completed/(started+completed)*100:0,
    avgScore:graded.length?graded.reduce((a,b)=>a+b,0)/graded.length:0,
    engagement:activeDays?Math.min(100,rows.length/activeDays/24*100):0 };
}
export interface ProgramStat { id:ProgramId; name:string; color:string; statements:number; learners:number; completed:number; completionRate:number; avgScore:number; }
export function programStats(rows:Statement[]):ProgramStat[] {
  return programs.map(p=>{
    const data=rows.filter(s=>s.program===p.id);
    const starts=data.filter(s=>s.verb==='started').length;
    const completes=data.filter(s=>s.verb==='completed').length;
    const scores=data.filter(s=>s.score!==null).map(s=>s.score as number);
    return {id:p.id,name:p.name,color:p.color,statements:data.length,learners:new Set(data.map(s=>s.learnerId)).size,completed:completes,
      completionRate:(starts+completes)?100*completes/(starts+completes):0,
      avgScore:scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:0};
  });
}
export function dailySeries(rows:Statement[]){
  const days=new Map<string,{date:string,started:number,answered:number,completed:number,attempted:number,experienced:number}>();
  rows.forEach(s=>{
    const date=s.date.slice(0,10);
    if(!days.has(date))days.set(date,{date,started:0,answered:0,completed:0,attempted:0,experienced:0});
    days.get(date)![s.verb]++;
  });
  return [...days.values()].sort((a,b)=>a.date.localeCompare(b.date));
}
export function scoreSeries(rows:Statement[]){
  const periods=new Map<string,{date:string,scores:number[],passed:number,graded:number,attempts:number}>();
  rows.forEach(s=>{
    const date=s.date.slice(0,10);
    if(!periods.has(date)) periods.set(date,{date,scores:[],passed:0,graded:0,attempts:0});
    const p=periods.get(date)!;
    if(s.score!==null){p.scores.push(s.score);p.graded++;if(s.score>=75)p.passed++;}
    if(s.verb==='attempted')p.attempts++;
  });
  return [...periods.values()].sort((a,b)=>a.date.localeCompare(b.date)).map(p=>({date:p.date,
    avg:p.scores.length?p.scores.reduce((a,b)=>a+b,0)/p.scores.length:null,
    pass:p.graded?100*p.passed/p.graded:null,attempts:p.attempts }));
}
export function csvFor(rows:Statement[]){
  const header=['id','timestamp','learner','program','verb','result','score','source'];
  const lines=rows.map(s=>[s.id,s.date,s.learner,programs.find(p=>p.id===s.program)?.name??s.program,s.verb,s.result,s.score??'',s.source]);
  const esc=(v:string|number)=>`"${String(v).replace(/"/g,'""')}"`;
  return [header,...lines].map(line=>line.map(esc).join(',')).join('\r\n');
}
