import React from 'react';
import { cn } from '@/lib/utils';

interface SnowflakeProps {
    delay: number;
    size: number;
    left: number;
    duration: number;
}

const Snowflake: React.FC<SnowflakeProps> = ({ delay, size, left, duration }) => {
    return (
        <div
            className="absolute text-white opacity-70 pointer-events-none"
            style={{
                left: `${left}%`,
                top: '-10px',
                fontSize: `${size}px`,
                animation: `snowfall ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
            }}
        >
            ❄
        </div>
    );
};

interface SnowfallProps {
    count?: number;
    className?: string;
}

const Snowfall: React.FC<SnowfallProps> = ({ count = 50, className }) => {
    const snowflakes = React.useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            delay: Math.random() * 10,
            size: Math.random() * 10 + 10,
            left: Math.random() * 100,
            duration: Math.random() * 5 + 10,
        }));
    }, [count]);

    return (
        <div className={cn('fixed inset-0 overflow-hidden pointer-events-none z-0', className)}>
            {snowflakes.map((flake) => (
                <Snowflake
                    key={flake.id}
                    delay={flake.delay}
                    size={flake.size}
                    left={flake.left}
                    duration={flake.duration}
                />
            ))}
        </div>
    );
};

export default Snowfall;
