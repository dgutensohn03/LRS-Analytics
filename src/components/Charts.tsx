import Plot from 'react-plotly.js';
import { dailySeries, scoreSeries } from '../lib/analytics';
import type { Statement } from '../data/sample';
const ink='#66768d',grid='#e4ebf4';
const baseLayout={
  autosize:true,margin:{l:46,r:14,t:12,b:45},paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',
  font:{family:'Inter, ui-sans-serif, system-ui, sans-serif',color:ink,size:11},
  xaxis:{showgrid:true,gridcolor:grid,zeroline:false,tickfont:{color:ink},type:'date' as const},
  yaxis:{showgrid:true,gridcolor:grid,zeroline:false,tickfont:{color:ink},rangemode:'tozero' as const},
  hovermode:'x unified' as const,showlegend:true,
  legend:{orientation:'h' as const,x:.5,xanchor:'center' as const,y:-.23,yanchor:'top' as const,font:{size:11}}
};
export function ActivityChart({rows}:{rows:Statement[]}){
  const series=dailySeries(rows);
  const lines=[{key:'completed',name:'Completed',color:'#2164df'},{key:'started',name:'Started',color:'#3ba9ef'},{key:'attempted',name:'Attempted',color:'#13a8a2'}] as const;
  return <div className="chart"><Plot data={lines.map(l=>({type:'scatter' as const,mode:'lines' as const,name:l.name,x:series.map(d=>d.date),y:series.map(d=>d[l.key]),line:{color:l.color,width:2.5},fill:l.key==='completed'?'tozeroy' as const:undefined,fillcolor:l.key==='completed'?'rgba(33,100,223,.08)':undefined,hovertemplate:`%{y} ${l.name.toLowerCase()}<extra></extra>`}))} layout={{...baseLayout,yaxis:{...baseLayout.yaxis,title:{text:'Statements',font:{size:11}}}}} config={{displayModeBar:false,responsive:true}} useResizeHandler style={{height:'100%',width:'100%'}} /></div>;
}
export function ScoreChart({rows}:{rows:Statement[]}){
  const series=scoreSeries(rows);
  return <div className="chart"><Plot data={[
    {type:'scatter',mode:'lines',name:'Average score',x:series.map(s=>s.date),y:series.map(s=>s.avg),line:{color:'#2164df',width:2.8},connectgaps:true},
    {type:'scatter',mode:'lines',name:'Pass rate',x:series.map(s=>s.date),y:series.map(s=>s.pass),line:{color:'#13a8a2',width:2.8},connectgaps:true}
  ]} layout={{...baseLayout,yaxis:{...baseLayout.yaxis,range:[0,100],ticksuffix:'%'}}} config={{displayModeBar:false,responsive:true}} useResizeHandler style={{height:'100%',width:'100%'}} /></div>;
}
export function CompactBars({values}:{values:{label:string;value:number;color:string}[]}){
  return <div className="compact-bars">{values.map(item=><div key={item.label}><div className="bar-label"><span>{item.label}</span><strong>{item.value.toFixed(1)}%</strong></div><div className="mini-track"><div style={{width:`${item.value}%`,background:item.color}}/></div></div>)}</div>;
}
