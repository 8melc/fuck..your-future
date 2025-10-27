import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GuideTone = 'straight' | 'soft';
export type NudgingFrequency = 'high' | 'medium' | 'low' | 'off';

interface GuideState {
  guideTone: GuideTone;
  nudgingFrequency: NudgingFrequency;
  isGuideMuted: boolean;
  setGuideTone: (tone: GuideTone) => void;
  setNudgingFrequency: (frequency: NudgingFrequency) => void;
  toggleGuideMute: () => void;
}

export const useGuideStore = create<GuideState>()(
  persist(
    (set) => ({
      guideTone: 'straight',
      nudgingFrequency: 'medium',
      isGuideMuted: false,
      setGuideTone: (tone) => set({ guideTone: tone }),
      setNudgingFrequency: (frequency) => set({ nudgingFrequency: frequency }),
      toggleGuideMute: () => set((state) => ({ isGuideMuted: !state.isGuideMuted })),
    }),
    {
      name: 'fyf-guide-settings',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Reset to default state if version mismatch
        if (version !== 1) {
          return {
            guideTone: 'straight',
            nudgingFrequency: 'medium',
            isGuideMuted: false,
          };
        }
        return persistedState;
      },
    }
  )
);

export const getNudgingFrequencyInfo = (frequency: NudgingFrequency) => {
  const info = {
    high: { label: 'Intensiv', description: 'Der Guide gibt dir oft Anstöße.', explanation: 'Der Guide gibt dir oft Anstöße.' },
    medium: { label: 'Standard', description: 'Der Guide gibt dir gelegentlich Anstöße.', explanation: 'Der Guide gibt dir gelegentlich Anstöße.' },
    low: { label: 'Minimal', description: 'Der Guide gibt dir selten Anstöße.', explanation: 'Der Guide gibt dir selten Anstöße.' },
    off: { label: 'Aus', description: 'Der Guide gibt dir keine Anstöße.', explanation: 'Der Guide gibt dir keine Anstöße.' },
  };
  return info[frequency] || info.medium;
};