'use client';

import { useState } from 'react';

export default function DetailAccess() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    goal: '',
    timePhilosophy: '',
    musicTaste: '',
    lifestyle: '',
    interests: [] as string[]
  });

  const steps = [
    {
      id: 'intro',
      title: 'Willkommen bei FYF',
      subtitle: 'Deine Zeit läuft. Lass uns das ändern.',
      content: 'intro'
    },
    {
      id: 'basics',
      title: 'Grunddaten',
      subtitle: 'Wer bist du?',
      content: 'basics'
    },
    {
      id: 'zeit',
      title: 'Zeit-Philosophie',
      subtitle: 'Wie denkst du über Zeit?',
      content: 'zeit'
    },
    {
      id: 'musik',
      title: 'Musik-DNA',
      subtitle: 'Was hörst du?',
      content: 'musik'
    },
    {
      id: 'lifestyle',
      title: 'Lebensstil',
      subtitle: 'Wie lebst du?',
      content: 'lifestyle'
    },
    {
      id: 'interests',
      title: 'Interessen',
      subtitle: 'Was bewegt dich?',
      content: 'interests'
    },
    {
      id: 'complete',
      title: 'Fertig!',
      subtitle: 'Willkommen in der Community',
      content: 'complete'
    }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.content) {
      case 'intro':
        return (
          <div className="step-content intro-content">
            <div className="intro-hero">
              <h1>FUCK YOUR FUTURE</h1>
              <p>Deine Zeit läuft. Lass uns das ändern.</p>
            </div>
            <div className="intro-features">
              <div className="feature-item">
                <i className="fas fa-clock"></i>
                <h3>Life in Weeks</h3>
                <p>Visualisiere deine verbleibende Zeit</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <h3>People</h3>
                <p>Finde Menschen, die zu dir passen</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-compass"></i>
                <h3>Guide</h3>
                <p>AI-gestützte Empfehlungen</p>
              </div>
            </div>
            <button className="cta-btn" onClick={nextStep}>
              Los geht's
            </button>
          </div>
        );

      case 'basics':
        return (
          <div className="step-content form-content">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Dein Name"
              />
            </div>
            <div className="form-group">
              <label>E-Mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="deine@email.com"
              />
            </div>
            <div className="form-group">
              <label>Alter</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="25"
              />
            </div>
            <div className="form-group">
              <label>Dein Ziel</label>
              <select
                value={formData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
              >
                <option value="">Wähle dein Ziel</option>
                <option value="freiheit">Freiheit mit 45</option>
                <option value="impact">Impact machen</option>
                <option value="kreativ">Kreativ sein</option>
                <option value="lernen">Immer lernen</option>
                <option value="reisen">Die Welt sehen</option>
              </select>
            </div>
          </div>
        );

      case 'zeit':
        return (
          <div className="step-content form-content">
            <div className="form-group">
              <label>Wie denkst du über Zeit?</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="timePhilosophy"
                    value="währung"
                    checked={formData.timePhilosophy === 'währung'}
                    onChange={(e) => handleInputChange('timePhilosophy', e.target.value)}
                  />
                  <span>Zeit ist die einzige Währung, die zählt</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="timePhilosophy"
                    value="begrenzt"
                    checked={formData.timePhilosophy === 'begrenzt'}
                    onChange={(e) => handleInputChange('timePhilosophy', e.target.value)}
                  />
                  <span>Zeit ist begrenzt, ich muss sie nutzen</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="timePhilosophy"
                    value="qualität"
                    checked={formData.timePhilosophy === 'qualität'}
                    onChange={(e) => handleInputChange('timePhilosophy', e.target.value)}
                  />
                  <span>Qualität vor Quantität</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'musik':
        return (
          <div className="step-content form-content">
            <div className="form-group">
              <label>Deine Musik-DNA</label>
              <div className="music-genres">
                {['Electronic', 'Hip-Hop', 'Rock', 'Jazz', 'Classical', 'Ambient', 'Pop', 'Indie'].map(genre => (
                  <button
                    key={genre}
                    className={`genre-btn ${formData.musicTaste === genre ? 'active' : ''}`}
                    onClick={() => handleInputChange('musicTaste', genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'lifestyle':
        return (
          <div className="step-content form-content">
            <div className="form-group">
              <label>Dein Lebensstil</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lifestyle"
                    value="nomad"
                    checked={formData.lifestyle === 'nomad'}
                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                  />
                  <span>Digital Nomad - Ich reise und arbeite</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lifestyle"
                    value="remote"
                    checked={formData.lifestyle === 'remote'}
                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                  />
                  <span>Remote Worker - Ich arbeite von zu Hause</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lifestyle"
                    value="office"
                    checked={formData.lifestyle === 'office'}
                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                  />
                  <span>Office Worker - Ich gehe ins Büro</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lifestyle"
                    value="hybrid"
                    checked={formData.lifestyle === 'hybrid'}
                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                  />
                  <span>Hybrid - Ich kombiniere beides</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="step-content form-content">
            <div className="form-group">
              <label>Was interessiert dich?</label>
              <div className="interests-grid">
                {[
                  'Krypto & Blockchain',
                  'Nachhaltigkeit',
                  'Kunst & Design',
                  'Technologie',
                  'Philosophie',
                  'Reisen',
                  'Fitness & Gesundheit',
                  'Musik',
                  'Bücher & Lesen',
                  'Entrepreneurship',
                  'Social Impact',
                  'Kreativität'
                ].map(interest => (
                  <button
                    key={interest}
                    className={`interest-btn ${formData.interests.includes(interest) ? 'active' : ''}`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="step-content complete-content">
            <div className="complete-hero">
              <h2>Willkommen bei FYF!</h2>
              <p>Dein Profil wurde erstellt. Du bist jetzt Teil der Community.</p>
            </div>
            <div className="complete-stats">
              <div className="stat-item">
                <span className="stat-value">32</span>
                <span className="stat-label">Sommerurlaube</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">1,664</span>
                <span className="stat-label">Wochen</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">11,648</span>
                <span className="stat-label">Tage</span>
              </div>
            </div>
            <div className="complete-actions">
              <button className="cta-btn primary">
                <i className="fas fa-play"></i>
                Life in Weeks starten
              </button>
              <button className="cta-btn secondary">
                <i className="fas fa-users"></i>
                People entdecken
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-fyf-noir text-fyf-cream">
      <div className="access-container">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Schritt {currentStep + 1} von {steps.length}
          </div>
        </div>

        {/* Step Header */}
        <div className="step-header">
          <h1 className="step-title">{steps[currentStep].title}</h1>
          <p className="step-subtitle">{steps[currentStep].subtitle}</p>
        </div>

        {/* Step Content */}
        <div className="step-container">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {currentStep < steps.length - 1 && (
          <div className="step-navigation">
            {currentStep > 0 && (
              <button className="nav-btn secondary" onClick={prevStep}>
                <i className="fas fa-arrow-left"></i>
                Zurück
              </button>
            )}
            <button className="nav-btn primary" onClick={nextStep}>
              Weiter
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}