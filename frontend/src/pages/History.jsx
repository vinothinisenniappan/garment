import React from 'react';
import { Milestone, Star, TrendingUp, Award, Building2 } from 'lucide-react';

const historyData = [
    {
        year: '2019',
        subtitle: 'ECO SEWING FACTORIES',
        text: 'Expansion of spinning mill capacity to 25 MT/day and launch of two high-efficiency ECO satellite factories.',
        image: '/assets/infrastructure/f1.webp',
        icon: <Building2 />
    },
    {
        year: '2017',
        subtitle: 'KNITTING DIVISION',
        text: 'Strategic expansion of our knitting facilities to meet global high-volume demands with precision.',
        image: '/assets/infrastructure/f2.webp',
        icon: <Layers /> // Note: I should use Lucide icon component, but I'll fix missing imports in a second
    },
    {
        year: '2016',
        subtitle: 'PUBLIC LISTING',
        text: 'A major milestone as SREE ANJANEYA achieved listing on the BSE and NSE stock exchanges.',
        image: '/assets/infrastructure/f3.avif',
        icon: <TrendingUp />
    },
    {
        year: '2015',
        subtitle: 'GLOBAL PARTNERSHIPS',
        text: "Secured exclusive sub-licensing rights for the 'Crocodile' brand manufacturing and distribution.",
        image: '/assets/infrastructure/f4.avif',
        icon: <Award />
    },
    {
        year: '1997',
        subtitle: 'FOUNDATION',
        text: "The beginning of our excellence journey, established in the heart of the textile hub, Tirupur.",
        image: '/assets/infrastructure/maine.png',
        icon: <Milestone />
    }
];

import { Layers } from 'lucide-react'; // Fix missing import

export default function History() {
    return (
        <main className="history-page app--internal" style={{ background: '#F8FAFC' }}>
            <section className="internal-hero">
                <div className="internal-hero__inner scale-reveal">
                    <span className="section-subtitle">A Legacy of Trust</span>
                    <h1 className="internal-hero__title">Our Journey</h1>
                    <p>Tracing the milestones of transformation from a local pioneer to a global textile powerhouse.</p>
                </div>
            </section>

            <div className="page-container" style={{ position: 'relative', padding: '60px 20px' }}>
                <div className="timeline-track" style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, transparent, var(--border) 100px, var(--border) calc(100% - 100px), transparent)', transform: 'translateX(-50%)' }}></div>
                
                {historyData.map((item, index) => (
                    <section key={item.year} className={`timeline-item-pro reveal-on-scroll`} style={{ 
                        display: 'flex', 
                        justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                        marginBottom: '60px',
                        position: 'relative',
                        animationDelay: `${index * 0.2}s`
                    }}>
                        {/* Central Pulse */}
                        <div style={{ position: 'absolute', left: '50%', top: '24px', transform: 'translateX(-50%)', zIndex: '2' }}>
                            <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', border: '2px solid var(--primary)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 6px rgba(15, 46, 90, 0.05)' }}>
                                <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                            </div>
                        </div>

                        {/* Large Background Year */}
                        <div style={{ 
                            position: 'absolute', 
                            [index % 2 === 0 ? 'right' : 'left']: '55%', 
                            top: '-20px', 
                            fontSize: '8rem', 
                            fontWeight: '900', 
                            color: 'rgba(15, 46, 90, 0.03)', 
                            pointerEvents: 'none',
                            fontFamily: 'Outfit'
                        }}>
                            {item.year}
                        </div>

                        <div className="pro-card" style={{ 
                            width: '45%', 
                            padding: '30px', 
                            borderRadius: '24px', 
                            background: 'white', 
                            boxShadow: 'var(--shadow)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div className="floating-frame" style={{ borderRadius: '16px', height: '200px' }}>
                                <img src={item.image} alt={item.subtitle} style={{ height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                                <span className="section-subtitle" style={{ color: 'var(--secondary)', marginBottom: '8px', display: 'block' }}>{item.year}</span>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--primary)' }}>{item.subtitle}</h2>
                                <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>{item.text}</p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
