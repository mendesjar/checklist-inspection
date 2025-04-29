import { Slider } from '@/components/ui/slider';
import { Dispatch, SetStateAction } from 'react';

interface SliderLevelInterface {
  fuelLevel: number;
  setFuelLevel: Dispatch<SetStateAction<number>>;
}

export function SliderLevel({ fuelLevel, setFuelLevel }: SliderLevelInterface) {
  const angle = (fuelLevel / 100) * 180 - 90;

  const getColor = () => {
    if (fuelLevel <= 20) return 'text-red-500';
    if (fuelLevel <= 50) return 'text-yellow-400';
    return 'text-green-500';
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 p-6">
      <div className="relative h-24 w-48 overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center">
          <div
            className={`h-24 w-1 origin-bottom bg-black transition-transform duration-300`}
            style={{ transform: `rotate(${angle}deg)` }}
          />
        </div>

        <svg
          className="absolute top-0 left-0 h-full w-full"
          viewBox="0 0 100 50"
        >
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
          />
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke={
              fuelLevel <= 20
                ? '#ef4444'
                : fuelLevel <= 50
                  ? '#facc15'
                  : '#22c55e'
            }
            strokeWidth="6"
            strokeDasharray="126"
            strokeDashoffset={126 - (fuelLevel / 100) * 126}
          />
        </svg>
      </div>

      <div className={`text-2xl font-bold ${getColor()}`}>
        {fuelLevel}% Combustível
      </div>

      <Slider
        defaultValue={[fuelLevel]}
        max={100}
        step={1}
        onValueChange={([value]) => setFuelLevel(value)}
      />
    </div>
  );
}
