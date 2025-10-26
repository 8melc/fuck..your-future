import { GuidePromptHistory } from '@/hooks/useGuideState';

interface GuideConversationSectionProps {
  prompts: GuidePromptHistory[];
}

export default function GuideConversationSection({ prompts }: GuideConversationSectionProps) {
  if (prompts.length === 0) {
    return (
      <section className="guide-section" id="guide">
        <div className="guide-section-header">
          <span className="guide-kicker">Guide Gespräche</span>
          <h2 className="guide-title">Deine Guide-Interaktionen</h2>
          <p className="guide-subtitle">Frag den FYF Guide etwas – deine Gespräche werden hier gespeichert.</p>
        </div>
        <div className="guide-empty-state">
          <p>Noch keine Gespräche mit dem Guide geführt.</p>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `vor ${diffInHours}h`;
    } else if (diffInHours < 48) {
      return 'gestern';
    } else {
      const days = Math.floor(diffInHours / 24);
      return `vor ${days} Tagen`;
    }
  };

  return (
    <section className="guide-section" id="guide">
      <div className="guide-section-header">
        <span className="guide-kicker">Guide Gespräche</span>
        <h2 className="guide-title">Deine Guide-Interaktionen</h2>
        <p className="guide-subtitle">Frag den FYF Guide etwas – deine Gespräche werden hier gespeichert.</p>
      </div>
      
      <div className="guide-conversation-list">
        {prompts.map((item, idx) => (
          <div key={idx} className="guide-conversation-item">
            <div className="guide-conversation-user">
              <span className="guide-conversation-label">Du</span>
              <div className="guide-conversation-bubble guide-conversation-bubble-user">
                <p>{item.prompt}</p>
              </div>
            </div>
            
            <div className="guide-conversation-guide">
              <span className="guide-conversation-label">Guide</span>
              <div className="guide-conversation-bubble guide-conversation-bubble-guide">
                <p>{item.response}</p>
              </div>
            </div>
            
            <div className="guide-conversation-time">
              <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
