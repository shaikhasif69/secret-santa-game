'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import CharacterCard from '@/components/CharacterCard';
import { PARTICIPANTS, CHARACTERS } from '@/lib/constants';

type ParticipantName = typeof PARTICIPANTS[number];

function SelectPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isDemoMode = searchParams.get('mode') === 'demo';

    const [selectedName, setSelectedName] = useState<ParticipantName | ''>('');
    const [email, setEmail] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [takenCharacters, setTakenCharacters] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch game state on mount (only in real mode)
    useEffect(() => {
        if (!isDemoMode) {
            fetchGameState();
        }
    }, [isDemoMode]);

    const fetchGameState = async () => {
        try {
            const response = await fetch('/api/game-state');
            const data = await response.json();
            if (data.success) {
                setTakenCharacters(data.data.selectedCharacters || []);
            }
        } catch (err) {
            console.error('Error fetching game state:', err);
        }
    };

    const handleCharacterSelect = (characterId: string) => {
        if (!takenCharacters.includes(characterId) || isDemoMode) {
            setSelectedCharacter(characterId);
            setError('');
        }
    };

    const handleContinue = async () => {
        // Validation
        if (!selectedName) {
            setError('Please select your name');
            return;
        }
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        if (!selectedCharacter) {
            setError('Please select a character');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Save character selection
            const response = await fetch('/api/select-character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: selectedName,
                    email,
                    character: selectedCharacter,
                    isDemoMode,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.error || 'Failed to select character');
                setLoading(false);
                return;
            }

            // Navigate to play page
            router.push(`/play?name=${selectedName}&mode=${isDemoMode ? 'demo' : 'real'}`);
        } catch (err) {
            console.error('Error selecting character:', err);
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden">
            <Snowfall count={40} />

            <div className="relative z-10 min-h-screen px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div className="px-4 py-2 rounded-full glass border border-white/30">
                            <span className="text-white font-semibold">
                                {isDemoMode ? '🎮 Demo Mode' : '🎅 Real Mode'}
                            </span>
                        </div>
                    </div>

                    {/* Main Card */}
                    <Card glass className="p-8">
                        <CardHeader>
                            <CardTitle className="text-center text-4xl gradient-text mb-2">
                                Choose Your Character
                            </CardTitle>
                            <p className="text-center text-slate-300 text-lg">
                                Select who you are and pick your festive character!
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Name Selection */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold text-lg">
                                    <User className="w-5 h-5" />
                                    Who are you?
                                </label>
                                <select
                                    value={selectedName}
                                    onChange={(e) => setSelectedName(e.target.value as ParticipantName)}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                >
                                    <option value="">Select your name...</option>
                                    {PARTICIPANTS.map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold text-lg">
                                    <Mail className="w-5 h-5" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                />
                                <p className="text-sm text-slate-400">
                                    {isDemoMode
                                        ? 'Your email (for demo purposes only, no email will be sent)'
                                        : 'Your Secret Santa assignment will be sent here!'}
                                </p>
                            </div>

                            {/* Character Selection */}
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold text-lg text-center">
                                    Pick Your Character
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {CHARACTERS.map((character) => (
                                        <CharacterCard
                                            key={character.id}
                                            id={character.id}
                                            name={character.name}
                                            emoji={character.emoji}
                                            isSelected={selectedCharacter === character.id}
                                            isTaken={!isDemoMode && takenCharacters.includes(character.id)}
                                            onSelect={() => handleCharacterSelect(character.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-center"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Continue Button */}
                            <div className="flex justify-center pt-4">
                                <Button
                                    variant="glow"
                                    size="xl"
                                    onClick={handleContinue}
                                    disabled={loading}
                                    className="min-w-[200px]"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Continue to Game'
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}

export default function SelectPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            </div>
        }>
            <SelectPageContent />
        </Suspense>
    );
}
