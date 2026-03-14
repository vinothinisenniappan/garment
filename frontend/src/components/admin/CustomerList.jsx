import React from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const CustomerList = ({ customers }) => {
  return (
    <div className="customer-list animate-fade-in">
      <div className="pro-card">
        <div className="pro-table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '25px' }}>Customer / Company</th>
                <th>Contact Details</th>
                <th>Relationship</th>
                <th>Last Inquiry</th>
                <th style={{ paddingRight: '25px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td style={{ paddingLeft: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        background: 'var(--primary)', 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '14px'
                      }}>
                        {customer.companyName?.charAt(0) || 'B'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{customer.companyName}</div>
                        <div className="cap-desc" style={{ fontSize: '11px' }}>{customer.contactPerson}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <Mail size={12} color="#64748B" />
                        <span>{customer.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <Phone size={12} color="#64748B" />
                        <span>{customer.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="status-tag" style={{ 
                      background: customer.status === 'Contracted' ? '#f5f3ff' : '#f8fafc',
                      color: customer.status === 'Contracted' ? '#7c3aed' : '#64748B'
                    }}>
                      {customer.status || 'Potentional'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '12px' }}>
                      <Calendar size={12} />
                      {new Date(customer.submittedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ paddingRight: '25px', textAlign: 'right' }}>
                    <button className="icon-btn" style={{ color: 'var(--primary)' }}>
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
