/**
 * All records are deterministic, synthetic demonstration data. No private or real
 * learner information, production screenshots, credentials, or customer datasets.
 */
export type ProgramId = 'leadership' | 'safety' | 'product' | 'compliance';
export type Verb = 'started' | 'experienced' | 'answered' | 'attempted' | 'completed';
export type Result = 'correct' | 'incorrect' | 'passed' | 'in progress' | '—';
export type Channel = 'LMS' | 'Web' | 'Mobile';
export interface Program { id: ProgramId; name: string; group: string; color: string; }
export interface Statement {
  id: string; date: string; learner: string; learnerId: string; program: ProgramId;
  verb: Verb; result: Result; score: number | null; source: Channel; durationSeconds: number;
  registration: string; context: { platform: string; language: string; attempt: number };
}
export const programs: Program[] = [
  { id:'leadership', name:'Leadership Essentials', group:'Management', color:'#2563d8' },
  { id:'safety', name:'Safety Fundamentals', group:'Operations', color:'#10a6a6' },
  { id:'product', name:'Product Training', group:'Sales', color:'#38a3ee' },
  { id:'compliance', name:'Compliance Refresher', group:'Operations', color:'#8f78cf' }
];
export const learners = [
  'Jordan Lee','Taylor Morgan','Casey Rivera','Riley Carter','Avery Brooks','Morgan Ellis',
  'Quinn Parker','Sam Blake','Alex Kim','Parker Bennett','Drew Patel','Jamie Cruz',
  'Emerson Reed','Robin Chen','Sasha Brooks','Finley Scott','Elliot Park','Blair Nguyen',
  'Morgan Avery','Cameron Ellis','Devon Price','Sydney Walsh','Skyler Adams','Reese Kim'
];
const verbs: Verb[] = ['started','experienced','attempted','answered','completed'];
const channels: Channel[] = ['LMS','Web','Mobile'];
const seeded = (n: number) => { const x = Math.sin(n * 78.233 + 2.14) * 43758.5453; return x - Math.floor(x); };
const dateISO = (day: number) => new Date(Date.UTC(2025,0,1 + day,10,0,0)).toISOString();
export const statements: Statement[] = Array.from({ length: 1740 }, (_, i) => {
  const person = Math.floor(seeded(i+1)*learners.length);
  const program = programs[Math.floor(seeded(i+117)*programs.length)].id;
  const verb = verbs[Math.floor(seeded(i+271)*verbs.length)];
  const score = (verb === 'completed' || verb === 'answered') ? 60+Math.floor(seeded(i+491)*40) : null;
  const result: Result = verb === 'completed' ? 'passed' : verb === 'answered' ? (score!==null && score>=75?'correct':'incorrect') : verb === 'started' ? 'in progress' : '—';
  const day = Math.floor(seeded(i+739)*90);
  const hour = 8+Math.floor(seeded(i+392)*10);
  const minute = Math.floor(seeded(i+49)*60);
  return {
    id:`stmt-${String(i+1).padStart(5,'0')}`,
    date:dateISO(day).replace('T10:00:00',`T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00`),
    learner:learners[person], learnerId:`learner-${person+1}`, program, verb, result, score,
    source: channels[Math.floor(seeded(i+39)*channels.length)],
    durationSeconds:180 + Math.floor(seeded(i+139)*2400),
    registration:`demo-reg-${String(Math.floor(i/9)+1).padStart(5,'0')}`,
    context:{platform:'Demo LMS',language:'en-US',attempt:1+Math.floor(seeded(i+901)*3)}
  };
}).sort((a,b)=>b.date.localeCompare(a.date));
export const getProgram = (id: ProgramId) => programs.find(p=>p.id===id)!;
export const rangeLabel = (range: string) => range==='all'?'Jan–Mar 2025':range==='30'?'March 2025':'Feb–Mar 2025';
