import React from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  XSquare,
  User,
  Quote
} from 'lucide-react';

const ReviewModerator = ({ reviews, onUpdateStatus }) => {
  return (
    <div className="review-moderator animate-fade-in">
      <div className="grid grid--one" style={{ gap: '20px' }}>
        {reviews.map((review) => (
          <div key={review._id} className="pro-card" style={{ padding: '25px', display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: '30px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="#64748B" />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{review.buyerId?.contactPerson || 'Anonymous'}</div>
                  <div className="cap-desc" style={{ fontSize: '11px' }}>Verified Buyer</div>
                </div>
              </div>
              <div style={{ marginTop: '15px', color: '#f59e0b', display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < review.rating ? '#f59e0b' : 'none'} />
                ))}
              </div>
            </div>

            <div>
              <div style={{ color: '#64748B', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Quote size={20} style={{ opacity: 0.2 }} />
                <p style={{ margin: 0, fontWeight: 500, fontStyle: 'italic', lineHeight: '1.6' }}>"{review.comment}"</p>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                On Product: {review.productId?.name}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'right' }}>
              <span className="status-tag" style={{ 
                display: 'inline-block',
                background: review.isApproved ? '#f0fdf4' : '#fff7ed',
                color: review.isApproved ? '#166534' : '#9a3412',
                borderRadius: '4px',
                fontSize: '10px'
              }}>
                {review.isApproved ? 'PUBLISHED' : 'PENDING'}
              </span>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                {!review.isApproved && (
                  <button 
                    className="icon-btn" 
                    style={{ color: '#10b981' }}
                    onClick={() => onUpdateStatus(review._id, { isApproved: true })}
                  >
                    <CheckCircle2 size={20} />
                  </button>
                )}
                <button className="icon-btn" style={{ color: '#ef4444' }}><XSquare size={20} /></button>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="pro-card center cap-desc" style={{ padding: '60px' }}>No reviews found to moderate.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewModerator;
