import Link from 'next/link';
import { Profile } from '@/types/profile';
import GoalBadge from './GoalBadge';
import { CompassIcon, UsersIcon, TargetIcon, ArrowUpRightIcon } from './icons';

interface GoalWidgetProps {
  profile: Profile;
  onEditGoal: () => void;
}

const quickActions = [
  { href: '/life-weeks', label: 'Life in Weeks', icon: CompassIcon },
  { href: '/people', label: 'People', icon: UsersIcon },
  { href: '/access', label: 'Access', icon: TargetIcon },
  { href: '/dashboard', label: 'Dashboard', icon: ArrowUpRightIcon },
];

const GoalWidget = ({ profile, onEditGoal }: GoalWidgetProps) => {
  return (
    <aside className="fyf-card fyf-card--sidebar motion-fade-up" aria-label="Quick Actions und Ziel">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-fyf-steel">Aktuelles Ziel</span>
          <GoalBadge goal={profile.goal.text} />
          <button type="button" className="fyf-btn fyf-btn--ghost w-fit" onClick={onEditGoal}>
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
