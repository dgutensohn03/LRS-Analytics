import type { ReactNode, ChangeEvent } from 'react';
import { ChevronDown, CalendarDays, Layers3, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { programs, type ProgramId } from '../data/sample';
import type { Filters,RangeKey } from '../lib/analytics';
export function Panel({title,eyebrow,action,children,className=''}:{title?:string;eyebrow?:string;action?:ReactNode;children:ReactNode;className?:string}){
  return <section className={`panel ${className}`}><div className="panel-head"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}{title&&<h2>{title}</h2>}</div>{action}</div>{children}</section>;
}
export function SelectField({label,value,onChange,options,icon}:{label:string;value:string;onChange:(v:string)=>void;options:{value:string;label:string}[];icon?:ReactNode}){
  return <label className="select-field"><span className="sr-only">{label}</span>{icon??<SlidersHorizontal size={16}/>}<select value={value} onChange={(e:ChangeEvent<HTMLSelectElement>)=>onChange(e.target.value)} aria-label={label}>{options.map(o=><option value={o.value} key={o.value}>{o.label}</option>)}</select><ChevronDown size={15}/></label>;
}
export function GlobalFilters({filters,onChange}:{filters:Filters;onChange:(f:Filters)=>void}){
  return <div className="filter-row"><SelectField label="Date range" value={filters.range} onChange={v=>onChange({...filters,range:v as RangeKey})} options={[{value:'30',label:'March 2025'},{value:'60',label:'Feb–Mar 2025'},{value:'all',label:'Jan–Mar 2025'}]} icon={<CalendarDays size={17}/>}/><SelectField label="Training program" value={filters.program} onChange={v=>onChange({...filters,program:v as ProgramId|'all'})} options={[{value:'all',label:'All programs'},...programs.map(p=>({value:p.id,label:p.name}))]} icon={<Layers3 size={17}/>}/></div>;
}
export function StatCard({label,value,detail,icon}:{label:string;value:string;detail:string;icon:ReactNode}){
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><strong>{value}</strong><span className="stat-detail"><ArrowUpRight size={15}/>{detail}</span></div>;
}
export function Progress({value,color='#2463d8'}:{value:number;color?:string}){
  return <div className="progress-track" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}><div style={{width:`${Math.max(0,Math.min(100,value))}%`,background:color}} /></div>;
}
export const displayDate=(iso:string)=>new Date(iso).toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit',timeZone:'UTC'});
