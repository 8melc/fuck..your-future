'use client';

import { useState } from 'react';

interface Person {
  name: string;
  initials: string;
  role: string;
  quote: string;
  restzeit: string;
  match: {
    type: 'spotify' | 'topics' | 'impact' | 'tech' | 'social';
    label: string;
    value: string;
  };
}

export default function PeopleSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with Sarah
  const [recommendationHidden, setRecommendationHidden] = useState(false);

  const people: Person[] = [
    {
      name: "Nina Richter",
      initials: "NR",
      role: "Kultur & Creative Direction",
      quote: "Kunst ist keine Dekoration, sondern Widerstand gegen die Beliebigkeit.",
      restzeit: "Noch 51 Sommerurlaube",
      match: { type: "spotify", label: "Musik-DNA", value: "61% Musik-DNA" }
    },
    {
      name: "Sarah Chen",
      initials: "SC",
      role: "Digital Nomad & Krypto",
      quote: "Zeit ist die einzige Währung, die wirklich zählt.",
      restzeit: "Noch 32 Sommerurlaube",
      match: { type: "spotify", label: "Musik-DNA", value: "82% Musik-DNA" }
    },
    {
      name: "Marcus Weber",
      initials: "MW",
      role: "Gründer & Impact Investor",
      quote: "Ich baue Unternehmen, die meine Enkel stolz machen werden.",
      restzeit: "Noch 41 Weihnachtsfeste",
      match: { type: "topics", label: "Shared Topics", value: "3 Shared Topics" }
    },
    {
      name: "Julia Martinez",
      initials: "JM",
      role: "Sustainable Finance",
      quote: "Geld sollte für Menschen arbeiten, nicht umgekehrt.",
      restzeit: "Noch 48 große Reisen",
      match: { type: "impact", label: "Impact Focus", value: "Impact-orientiert" }
    },
    {
      name: "Tom Fischer",
      initials: "TF",
      role: "Tech Philosophy",
      quote: "Technologie muss der Menschlichkeit dienen.",
      restzeit: "Noch 38 Tech-Revolutionen",
      match: { type: "tech", label: "Tech DNA", value: "Tech-affin" }
    },
    {
      name: "Lisa Anderson",
      initials: "LA",
      role: "Social Entrepreneur",
      quote: "Impact ist der neue Profit.",
      restzeit: "Noch 28 Karrierewechsel",
      match: { type: "social", label: "Social Impact", value: "Social Mission" }
    }
  ];

  const updateDisplay = (index: number) => {
    setCurrentIndex(index);
  };

  const getMatchIcon = (type: string) => {
    switch (type) {
      case 'spotify': return 'fab fa-spotify';
      case 'topics': return 'fas fa-lightbulb';
      case 'impact': return 'fas fa-leaf';
      case 'tech': return 'fas fa-microchip';
      default: return 'fas fa-users';
    }
  };

  const getCardPosition = (cardIndex: number) => {
    const peopleIndex = (currentIndex + cardIndex - 1 + people.length) % people.length;
    if (cardIndex === 0) return 'left';
    if (cardIndex === 1) return 'center';
    if (cardIndex === 2) return 'right';
    return '';
  };

  const handleCardClick = (cardIndex: number) => {
    const clickedIndex = (currentIndex + cardIndex - 1 + people.length) % people.length;
    updateDisplay(clickedIndex);
  };

  const handleFocusSarah = () => {
    updateDisplay(1); // Sarah's index
  };

  const handleWhyBtn = () => {
    alert('Der Algorithmus analysiert:\n\n• Musik-Präferenzen (Spotify API)\n• Zeit-Philosophie aus deinen Antworten\n• Lebensstil-Daten (Remote vs. Office)\n• Gemeinsame Interessen & Topics\n\nSo findest du Menschen, die wirklich zu dir passen.');
  };

  return (
    <div className="min-h-screen bg-fyf-noir text-fyf-cream overflow-x-hidden">
      <div className="people-main-container">
        {/* Title */}
        <h1 className="about-title">PEOPLE</h1>

        {/* Recommendation Card - Value-Focused */}
        {!recommendationHidden && (
          <div className="recommendation-card">
            <div className="rec-header">
              <div className="rec-icon-wrapper">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="rec-content">
                <div className="rec-label">Empfehlung basierend auf deinem Profil</div>
                <h2 className="rec-title">Sarah Chen könnte für dich relevant sein</h2>
              </div>
              <button 
                className="rec-close-btn" 
                onClick={() => setRecommendationHidden(true)}
              >
                ×
              </button>
            </div>

            <div className="rec-reasoning">
              <div className="reason-item">
                <i className="fas fa-music reason-icon"></i>
                <div className="reason-text">
                  <div className="reason-label">Musik-DNA</div>
                  <div className="reason-value">82% Overlap bei Moderat, FKA twigs, Four Tet</div>
                </div>
              </div>

              <div className="reason-item">
                <i className="fas fa-clock reason-icon"></i>
                <div className="reason-text">
                  <div className="reason-label">Zeit-Philosophie</div>
                  <div className="reason-value">Ihr denkt ähnlich über Zeit als Währung vs. Geld</div>
                </div>
              </div>

              <div className="reason-item">
                <i className="fas fa-globe reason-icon"></i>
                <div className="reason-text">
                  <div className="reason-label">Lebensstil</div>
                  <div className="reason-value">Remote-first, 5 Jahre Nomad-Erfahrung</div>
                </div>
              </div>
            </div>

            <div className="rec-actions">
              <span className="rec-action" onClick={handleFocusSarah}>Profil ansehen</span>
              <span className="rec-action" onClick={handleWhyBtn}>Algorithmus verstehen</span>
            </div>
          </div>
        )}

        {/* People Grid */}
        <div className="people-container">
          {[0, 1, 2].map((cardIndex) => {
            const peopleIndex = (currentIndex + cardIndex - 1 + people.length) % people.length;
            const person = people[peopleIndex];
            const position = getCardPosition(cardIndex);

            return (
              <div
                key={`${currentIndex}-${cardIndex}`}
                className={`portrait-card ${position}`}
                onClick={() => handleCardClick(cardIndex)}
              >
                <div className="portrait-border"></div>
                <div className="portrait-placeholder">
                  <div className="placeholder-pattern"></div>
                  <div className="placeholder-avatar">{person.initials}</div>
                </div>

                <div className="restzeit-badge">{person.restzeit}</div>

                <div className="connection-match">
                  <div className="match-label">Verbindung</div>
                  <div className="match-value">
                    <i className={getMatchIcon(person.match.type)}></i>
                    <span>{person.match.value}</span>
                  </div>
                </div>

                <div className="person-info-overlay">
                  <h2 className="person-name">{person.name}</h2>
                  <p className="person-role">{person.role}</p>
                  <div className="social-icons">
                    <a href="#"><i className="fab fa-spotify"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="navigation">
          {people.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => updateDisplay(index)}
            />
          ))}
        </div>

        {/* Meet Section */}
        <div className="meet-section">
          <p className="meet-quote">"{people[currentIndex].quote}"</p>
          <button className="meet-btn">Profil öffnen</button>
        </div>
      </div>
    </div>
  );
}