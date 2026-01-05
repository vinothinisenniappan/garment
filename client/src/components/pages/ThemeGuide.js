import React, { useMemo, useRef } from 'react';

const palettes = [
  {
    name: 'Pistachio Light',
    vars: {
      '--primary-color': '#D6F0CC',
      '--primary-strong': '#2F6D4F',
      '--secondary-color': '#8FD19E',
      '--accent-color': '#B28D2E',
      '--success-color': '#22C55E',
      '--text-color': '#0F172A',
      '--muted-text': '#64748B',
      '--light-bg': '#F6FBF6',
      '--border-color': '#E3F1E6',
      '--surface-color': '#FFFFFF',
    },
  },
  {
    name: 'Nordic Mist',
    vars: {
      '--primary-color': '#ECEFF4',
      '--primary-strong': '#2E3440',
      '--secondary-color': '#88C0D0',
      '--accent-color': '#D08770',
      '--success-color': '#A3BE8C',
      '--text-color': '#2E3440',
      '--muted-text': '#4C566A',
      '--light-bg': '#E5E9F0',
      '--border-color': '#D8DEE9',
      '--surface-color': '#FFFFFF',
    },
  },
  {
    name: 'Soft Indigo',
    vars: {
      '--primary-color': '#EEF2FF',
      '--primary-strong': '#1F2A44',
      '--secondary-color': '#A5B4FC',
      '--accent-color': '#F5A524',
      '--success-color': '#34D399',
      '--text-color': '#111827',
      '--muted-text': '#6B7280',
      '--light-bg': '#F9FAFB',
      '--border-color': '#E5E7EB',
      '--surface-color': '#FFFFFF',
    },
  },
  {
    name: 'Desert Rose',
    vars: {
      '--primary-color': '#FFF1F2',
      '--primary-strong': '#7C2D12',
      '--secondary-color': '#FECACA',
      '--accent-color': '#D97706',
      '--success-color': '#10B981',
      '--text-color': '#1F2937',
      '--muted-text': '#6B7280',
      '--light-bg': '#FFF7ED',
      '--border-color': '#F5D5CB',
      '--surface-color': '#FFFFFF',
    },
  },
];

export default function ThemeGuide() {
  const original = useRef(null);

  const currentVars = useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const keys = ['--primary-color','--primary-strong','--secondary-color','--accent-color','--success-color','--text-color','--muted-text','--light-bg','--border-color','--surface-color'];
    const obj = {};
    keys.forEach(k => obj[k] = styles.getPropertyValue(k).trim());
    return obj;
  }, []);

  const applyPalette = (vars) => {
    if (!original.current) original.current = currentVars;
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  };

  const resetPalette = () => {
    const vars = original.current || currentVars;
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">Theme Guide</h1>
      <p className="text-muted mb-4">Explore elegant, readable palettes. Click Preview to apply temporarily.</p>
      <div className="row g-4">
        {palettes.map((p) => (
          <div key={p.name} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title mb-3">{p.name}</h5>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {Object.entries(p.vars).filter(([k]) => k.startsWith('--') && !k.includes('text')).slice(0,6).map(([k, v]) => (
                    <div key={k} className="p-3 rounded" style={{ backgroundColor: v, border: '1px solid #e5e7eb', minWidth: 56 }} title={`${k}: ${v}`}></div>
                  ))}
                </div>
                <div className="mb-3" style={{ backgroundColor: p.vars['--surface-color'], border: '1px solid #e5e7eb', borderRadius: 12 }}>
                  <div className="p-3" style={{ backgroundColor: p.vars['--primary-color'], color: p.vars['--text-color'] }}>
                    <strong>Hero Example</strong>
                    <div className="mt-2">
                      <button className="btn btn-primary me-2" style={{ backgroundColor: p.vars['--secondary-color'], borderColor: p.vars['--secondary-color'] }}>Primary</button>
                      <button className="btn btn-outline-primary" style={{ color: p.vars['--primary-strong'], borderColor: p.vars['--primary-strong'] }}>Outline</button>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" onClick={() => applyPalette(p.vars)}>Preview</button>
                  <button className="btn btn-outline-primary" onClick={resetPalette}>Reset</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
