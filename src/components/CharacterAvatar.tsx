import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  charId: string;
  color: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const sizeMap = { sm: 40, md: 64, lg: 96, xl: 128 };

export default function CharacterAvatar({ charId, color, size = 'md', animated = true }: Props) {
  const s = sizeMap[size];
  const [error, setError] = useState(false);

  const img = error ? (
    <div
      className="rounded-full flex items-center justify-center text-xs font-bold"
      style={{
        width: s,
        height: s,
        background: `${color}20`,
        border: `2px solid ${color}40`,
        color,
      }}
    >
      {charId.slice(0, 1)}
    </div>
  ) : (
    <img
      src={`/images/characters/${encodeURIComponent(charId)}.png`}
      alt={charId}
      className="rounded-full"
      onError={() => setError(true)}
      style={{
        width: s,
        height: s,
        objectFit: 'cover',
        border: `2px solid ${color}40`,
        boxShadow: `0 0 20px ${color}30, 0 0 40px ${color}10`,
        background: `${color}15`,
      }}
    />
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="shrink-0"
        style={{ width: s, height: s }}
      >
        {img}
      </motion.div>
    );
  }

  return <div className="shrink-0" style={{ width: s, height: s }}>{img}</div>;
}
