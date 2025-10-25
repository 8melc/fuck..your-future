import { Profile } from '@/types/profile';
import { SparklesIcon, FlameIcon, TargetIcon } from './icons';

interface MotivationFeedProps {
  profile: Profile;
}

const iconByTone: Record<Profile['feedback'][number]['tone'], JSX.Element> = {
  motivating: <SparklesIcon className="h-4 w-4" />,
  challenging: <FlameIcon className="h-4 w-4" />,
  reflecting: <TargetIcon className="h-4 w-4" />,
};

const MotivationFeed = ({ profile }: MotivationFeedProps) => {
  const entries = profile.feedback;

  return (
    <section className="fyf-card motion-fade-up" aria-labelledby="motivation-heading">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 id="motivation-heading" className="fyf-subheading">
            Feedback & Impulse
          </h2>
          <p className="fyf-microcopy">
            Kurz, klar, substanziell – damit du dran bleibst und dein Ziel stärker wird.
          </p>
        </div>
      </header>

      {entries.length === 0 ? (
        <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-fyf-steel">
          Wir analysieren dein Profil und deine Aktionen. Bald bekommst du den ersten Impuls – zugeschnitten auf dein
          Ziel.
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {entries.map((entry) => (
            <li key={entry.id} className="fyf-feedback-item">
              <div className="fyf-feedback-item__icon">{iconByTone[entry.tone]}</div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-fyf-cream">{entry.message}</p>
                <span className="text-xs uppercase tracking-wider text-fyf-steel">
                  {new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' }).format(
                    new Date(entry.createdAt)
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MotivationFeed;
