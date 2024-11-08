import { useMemo } from 'react';

interface WeatherAnimationProps {
  condition: 'sunny' | 'cloudy' | 'night' | 'rainy';
}

export default function WeatherAnimation({ condition }: WeatherAnimationProps) {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  const raindrops = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.5 + Math.random() * 0.5}s`
    }));
  }, []);

  if (condition === 'rainy') {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="rain">
          {raindrops.map(drop => (
            <div
              key={drop.id}
              className="raindrop"
              style={{
                left: drop.left,
                animationDelay: drop.delay,
                animationDuration: drop.duration
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (condition === 'cloudy') {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="clouds">
          <div className="cloud1" />
          <div className="cloud2" />
          <div className="cloud3" />
        </div>
      </div>
    );
  }

  if (condition === 'sunny') {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="sun" />
      </div>
    );
  }

  if (condition === 'night') {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="stars">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}