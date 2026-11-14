import { describe,it,expect } from 'vitest';
import { statements } from '../data/sample';
import { applyFilters,summary,programStats,csvFor } from './analytics';
describe('synthetic analytics',()=>{
  it('keeps program filtering consistent',()=>{
    const rows=applyFilters(statements,{program:'safety',range:'30'});
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every(s=>s.program==='safety')).toBe(true);
    expect(rows.every(s=>s.date>='2025-03-01')).toBe(true);
  });
  it('aggregates totals from the same filtered rows',()=>{
    const rows=applyFilters(statements,{program:'all',range:'all'});
    expect(programStats(rows).reduce((sum,s)=>sum+s.statements,0)).toBe(rows.length);
    expect(summary(rows).activity).toBe(rows.length);
  });
  it('escapes CSV text and includes column labels',()=>{
    expect(csvFor(statements.slice(0,2))).toContain('"timestamp"');
    expect(csvFor(statements.slice(0,2)).split('\r\n')).toHaveLength(3);
  });
});
