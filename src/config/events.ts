export type EventType = 'mesario' | 'cumpleanos';

export interface EventConfig {
  id: EventType;
  date: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}

export const events: EventConfig[] = [
  {
    id: 'mesario',
    date: '27/12/2025',
    title: 'Nuestro Primer Mes',
    subtitle: 'Celebrando un mes juntos',
    emoji: '💕',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'cumpleanos',
    date: '21/01/2026',
    title: 'Tu Cumpleaños',
    subtitle: '¡Feliz cumpleaños, mi amor!',
    emoji: '🎂',
    color: 'from-purple-500 to-pink-500',
  },
];
