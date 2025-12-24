'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
    id: string;
    name: string;
    emoji: string;
    isSelected: boolean;
    isTaken: boolean;
    onSelect: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
    id,
    name,
    emoji,
    isSelected,
    isTaken,
    onSelect,
}) => {
    return (
        <motion.button
            onClick={() => !isTaken && onSelect()}
            disabled={isTaken}
            className={cn(
                'relative p-8 rounded-2xl border-2 transition-all duration-300',
                'flex flex-col items-center justify-center gap-4',
                'min-h-[240px]',
                isSelected
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400 shadow-lg shadow-green-500/50'
                    : isTaken
                        ? 'bg-slate-800/50 border-slate-700 opacity-50 cursor-not-allowed'
                        : 'glass border-white/30 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer'
            )}
            whileHover={!isTaken ? { scale: 1.05, y: -5 } : {}}
            whileTap={!isTaken ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Selected Check Mark */}
            {isSelected && (
                <motion.div
                    className="absolute top-4 right-4 bg-green-500 rounded-full p-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                >
                    <Check className="w-5 h-5 text-white" />
                </motion.div>
            )}

            {/* Taken Badge */}
            {isTaken && !isSelected && (
                <div className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Taken
                </div>
            )}

            {/* Character Emoji */}
            <motion.div
                className="text-8xl"
                animate={isSelected ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                {emoji}
            </motion.div>

            {/* Character Name */}
            <h3 className="text-2xl font-bold text-white">{name}</h3>

            {/* Hover Effect Glow */}
            {!isTaken && !isSelected && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-300" />
            )}
        </motion.button>
    );
};

export default CharacterCard;
