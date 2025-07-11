import React, { useMemo  } from 'react.ts';
import { PrizePicksProjection } from '@/api/PrizePicksAPI.ts';

interface PropCardProps {
  projection: PrizePicksProjection;
  onClick: () => void;
  isSelected: boolean;
}

const PropCard: React.FC<PropCardProps key={387456}> = React.memo(({ projection, onClick, isSelected }) => {
  const {
    playerName,
    teamAbbrev,
    position,
    statType,
    opponent,
    lineScore,
    confidence,
    propType,
    fireCount,
  } = projection;

  // Memoize computed values;

  const propTypeEmoji = useMemo(() => {
    switch (propType) {
      case 'goblin':
        return '💰';
      case 'demon':
        return '👹';
      case 'normal':
        return '⇄';
    }
  }, [propType]);

  const positionColor = useMemo(() => {
    switch (position) {
      case 'C-F':
        return 'bg-blue-500';
      case 'G':
        return 'bg-green-500';
      case 'G-F':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  }, [position]);

  const confidenceClass = useMemo(() => {
    if (confidence >= 0.8) return 'bg-green-500/20 text-green-400';
    if (confidence <= 0.35) return 'bg-red-500/20 text-red-400';
    return 'bg-gray-500/20 text-gray-400';
  }, [confidence]);

  return (
    <div;
      className={`
        relative rounded-xl overflow-hidden;
        bg-gradient-to-br from-gray-900 to-gray-800;
        backdrop-blur-lg border border-gray-700;
        transition-all duration-300 ease-out;
        hover:scale-105 hover:shadow-xl;
        cursor-pointer;
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={onClick}
     key={353339}>
      {/* Fire Count */}
      {fireEmoji && <div className="absolute top-4 right-4 text-lg" key={83148}>{fireEmoji}</div>}

      {/* Player Image */}
      <div className="w-full h-32 bg-gradient-to-b from-transparent to-gray-900" / key={359496}>

      {/* Position Badge */}
      <div;
        className={`
        absolute top-4 left-4 px-3 py-1 rounded-full;
        text-white text-sm font-semibold;
        ${positionColor}
      `}
       key={124299}>
        {teamAbbrev} • {position}
      </div>

      {/* Prop Type Indicator */}
      <div className="absolute top-16 right-4 text-2xl" key={382847}>{propTypeEmoji}</div>

      {/* Content */}
      <div className="p-4 pt-2" key={336421}>
        <h3 className="text-xl font-bold text-white mb-1" key={528878}>{playerName}</h3>

        <div className="flex items-center justify-between mb-2" key={120997}>
          <span className="text-gray-400 text-sm" key={259309}>vs {opponent}</span>
          <span className="text-gray-400 text-sm" key={259309}>Today 7:10pm</span>
        </div>

        <div className="flex items-center justify-between" key={96335}>
          <div className="flex items-center space-x-2" key={740830}>
            <span className="text-2xl font-bold text-white" key={942482}>{lineScore}</span>
            <span className="text-gray-400" key={912100}>{statType}</span>
          </div>

          {/* Confidence Indicator */}
          <div;
            className={`
            px-3 py-1 rounded-full text-sm font-semibold;
            ${confidenceClass}
          `}
           key={34366}>
            {Math.round(confidence * 100)}%
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4" key={451337}>
          <button;
            className={`
            py-2 rounded-lg font-semibold text-center;
            transition-colors duration-200;
            ${isSelected ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'}
            hover:bg-red-600;
          `}
           key={712971}>
            Less;
          </button>
          <button;
            className={`
            py-2 rounded-lg font-semibold text-center;
            transition-colors duration-200;
            ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}
            hover:bg-green-600;
          `}
           key={252330}>
            More;
          </button>
        </div>
      </div>
    </div>
  );
});

PropCard.displayName = 'PropCard';

export default PropCard;
