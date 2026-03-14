import React from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  FileJson,
  Printer,
  Archive
} from 'lucide-react';

const ReportDownloader = () => {
  const reports = [
    { name: 'Sales Performance Report', type: 'PDF', icon: FileText, color: '#ef4444' },
    { name: 'Inventory Stock Sheet', type: 'Excel', icon: FileSpreadsheet, color: '#10b981' },
    { name: 'Customer Activity Log', type: 'CSV', icon: FileText, color: '#3b82f6' },
    { name: 'Full Database Backup', type: 'JSON', icon: FileJson, color: '#8b5cf6' }
  ];

  const handleDownload = (name) => {
    alert(`Generating ${name}... Your download will begin shortly.`);
  };

  return (
    <div className="report-downloader animate-fade-in">
      <div className="pro-card" style={{ padding: '25px' }}>
        <div className="section-header" style={{ marginBottom: '30px' }}>
          <span className="section-subtitle">Data Export</span>
          <h2>System Reports</h2>
          <p className="cap-desc">Generate and download comprehensive data reports for offline analysis.</p>
        </div>

        <div className="grid grid--two" style={{ gap: '20px' }}>
          {reports.map((report) => (
            <div key={report.name} className="pro-field" style={{ 
              margin: 0, 
              padding: '25px', 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ color: report.color }}>
                  <report.icon size={32} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{report.name}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', display: 'block', marginTop: '4px' }}>FORMAT: {report.type}</span>
                </div>
              </div>
              <button 
                className="icon-btn" 
                style={{ background: 'white', border: '1px solid #e2e8f0', width: '45px', height: '45px', color: 'var(--primary)' }}
                onClick={() => handleDownload(report.name)}
              >
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', padding: '25px', background: 'var(--primary)', borderRadius: '16px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontWeight: 800 }}>Master Archive</h3>
            <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '13px' }}>Download all 2026 transaction records in one compressed file.</p>
          </div>
          <button className="pro-button" style={{ background: 'white', color: 'var(--primary)' }}>
            <Archive size={18} />
            <span>Generate Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDownloader;
