'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';

interface SpinningWheelProps {
    participants: string[];
    onSpinComplete: (result: string) => void;
    isSpinning: boolean;
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({
    participants,
    onSpinComplete,
    isSpinning,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const segmentAngle = 360 / participants.length;

    React.useEffect(() => {
        if (isSpinning) {
            let index = 0;
            let speed = 50; // Initial speed (ms)
            const minSpeed = 500; // Slowest speed
            const acceleration = 20; // How much to slow down each iteration

            const interval = setInterval(() => {
                index = (index + 1) % participants.length;
                setCurrentIndex(index);
                speed = Math.min(speed + acceleration, minSpeed);

                if (speed >= minSpeed) {
                    clearInterval(interval);
                    setTimeout(() => {
                        onSpinComplete(participants[index]);
                    }, 500);
                }
            }, speed);

            return () => clearInterval(interval);
        }
    }, [isSpinning, participants, onSpinComplete]);

    return (
        <div className="relative flex items-center justify-center">
            {/* Wheel Container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-amber-400 drop-shadow-lg" />
                </div>

                {/* Wheel */}
                <motion.div
                    className="relative w-full h-full rounded-full shadow-2xl overflow-hidden"
                    style={{
                        background: `conic-gradient(
              ${participants
                                .map(
                                    (_, i) =>
                                        `${i % 2 === 0 ? '#dc2626' : '#16a34a'} ${(i * segmentAngle)
                                        }deg ${((i + 1) * segmentAngle)}deg`
                                )
                                .join(', ')}
            )`,
                    }}
                    animate={
                        isSpinning
                            ? { rotate: 360 }
                            : { rotate: -(currentIndex * segmentAngle) }
                    }
                    transition={
                        isSpinning
                            ? { duration: 0.5, repeat: Infinity, ease: 'linear' }
                            : { duration: 0.5, ease: 'easeOut' }
                    }
                >
                    {/* Center Circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-amber-400 rounded-full shadow-lg flex items-center justify-center">
                            <Gift className="w-10 h-10 text-slate-900" />
                        </div>
                    </div>

                    {/* Participant Names */}
                    {participants.map((participant, index) => {
                        const angle = (index * segmentAngle) + (segmentAngle / 2);
                        const radius = 120; // Distance from center
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        return (
                            <div
                                key={participant}
                                className="absolute top-1/2 left-1/2 text-white font-bold text-sm md:text-base whitespace-nowrap"
                                style={{
                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                                }}
                            >
                                {participant}
                            </div>
                        );
                    })}
                </motion.div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(251,191,36,0.5)] animate-pulse-slow" />
            </div>
        </div>
    );
};

export default SpinningWheel;
