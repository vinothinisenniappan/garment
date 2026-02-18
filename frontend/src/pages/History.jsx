import React from 'react';

const historyData = [
    {
        year: '2019',
        subtitle: 'ECO SEWING FACTORIES AT PATLUR & ANNUR',
        text: 'Spinning Mill production capacity expansion to 25 MT / day. Two Brand New ECO satellite sewing factories.',
        image: '/assets/infrastructure/i2.jpeg'
    },
    {
        year: '2017',
        subtitle: 'KNITTING DIVISION',
        text: 'The knitted division was expanded to cope with high-quality and high-volume demand.',
        image: '/assets/infrastructure/i4.jpeg'
    },
    {
        year: '2016',
        subtitle: 'LISTED ON BSE / NSE',
        text: 'In August 2016, SREE ANJANEYA got listed on BSE and NSE.',
        image: '/assets/infrastructure/o.jpg'
    },
    {
        year: '2015',
        subtitle: 'CROCODILE',
        text: "Execution of the Sub-Licensing Agreement with our Subsidiary, CPPL to manufacture, distribute and market products under the 'Crocodile' brand.",
        image: '/assets/infrastructure/i1.jpeg'
    },
        {
        year: '1997',
        subtitle: 'CROCODILE',
        text: "Execution of the Sub-Licensing Agreement with our Subsidiary, CPPL to manufacture, distribute and market products under the 'Crocodile' brand.",
        image: '/assets/infrastructure/i1.jpeg'
    }
];

export default function History() {
    return (
        <main className="history-page">
            <section className="history-hero">
                <div className="history-hero__inner">
                    <div className="history-hero__text-group">
                        <div className="history-hero__tagline">Dressing The Future</div>
                        <h1 className="history-hero__title">Since 1997</h1>
                    </div>

                </div>
            </section>

            <div className="timeline-container">
                {historyData.map((item, index) => (
                    <section key={item.year} className="timeline-item">
                        <div className="timeline-image">
                            <img src={item.image} alt={`${item.year} - ${item.subtitle}`} />
                        </div>
                        <div className="timeline-content">
                            <div className="timeline-year">{item.year}</div>
                            <div className="timeline-subtitle">{item.subtitle}</div>
                            <p className="timeline-text">{item.text}</p>
                            <div className="timeline-connector"></div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
