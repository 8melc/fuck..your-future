import Link from 'next/link';
import { Profile } from '@/types/profile';
import GoalBadge from './GoalBadge';
import { CompassIcon, PenSquareIcon, ClockIcon, MusicIcon, GaugeIcon, TargetIcon } from './icons';

interface GoalWidgetProps {
  profile: Profile;
  onEditGoal: () => void;
}

const quickActions = [
  { href: '/life-weeks', label: 'Life in Weeks', icon: CompassIcon },
  { href: '#zeit-profil', label: 'Zeit-Profil', icon: ClockIcon },
  { href: '#energie-feeds', label: 'Energie-Feeds', icon: MusicIcon },
  { href: '#tageslimit', label: 'Tageslimit', icon: GaugeIcon },
  { href: '#filter-todo', label: 'Filter-Funktion', icon: TargetIcon },
  { href: '#journey', label: 'Journey', icon: CompassIcon },
  { href: '#feedback', label: 'Feedback & Impulse', icon: PenSquareIcon },
];

const GoalWidget = ({ profile, onEditGoal }: GoalWidgetProps) => {
  return (
    <aside className="fyf-card fyf-card--sidebar motion-fade-up" aria-label="Quick Actions und Ziel">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-fyf-steel">Aktuelles Ziel</span>
          <GoalBadge goal={profile.goal.text} />
          <button type="button" className="fyf-btn fyf-btn--ghost w-fit inline-flex items-center gap-2" onClick={onEditGoal}>
            <PenSquareIcon className="h-4 w-4" aria-hidden="true" />
            Ziel bearbeiten
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-fyf-steel">Quick Actions</span>
          <nav className="flex flex-col gap-2">
            {quickActions.map(({ href, label, icon: Icon }) => (
              <Link key={label} href={href} className="fyf-quick-link">
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default GoalWidget;
