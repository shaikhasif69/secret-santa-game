'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Gift, Sparkles, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';
import SpinningWheel from '@/components/SpinningWheel';
import { PARTICIPANTS } from '@/lib/constants';

function PlayPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const isDemoMode = searchParams.get('mode') === 'demo';

    const [isSpinning, setIsSpinning] = useState(false);
    const [assignedTo, setAssignedTo] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if no name
    React.useEffect(() => {
        if (!name) {
            router.push('/');
        }
    }, [name, router]);

    const handleSpin = async () => {
        if (isSpinning || assignedTo) return;

        setLoading(true);
        setError('');

        try {
            // Call the play API
            const response = await fetch('/api/play', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    isDemoMode,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.error || 'Failed to assign Secret Santa');
                setLoading(false);
                return;
            }

            // Start spinning
            setIsSpinning(true);
            setLoading(false);

            // Store the result to show after spin completes
            setTimeout(() => {
                setAssignedTo(data.data.assignedTo);
            }, 3000); // Wait for spin animation
        } catch (err) {
            console.error('Error playing game:', err);
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    const handleSpinComplete = (result: string) => {
        setIsSpinning(false);
        setShowConfetti(true);

        // Stop confetti after 5 seconds
        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    if (!name) {
        return null;
    }

    return (
        <main className="min-h-screen relative overflow-hidden">
            <Snowfall count={40} />

            {showConfetti && (
                <Confetti
                    width={typeof window !== 'undefined' ? window.innerWidth : 300}
                    height={typeof window !== 'undefined' ? window.innerHeight : 200}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <div className="relative z-10 min-h-screen px-4 py-12 flex items-center justify-center">
                <div className="max-w-4xl mx-auto w-full">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
                            {assignedTo ? '🎉 Your Secret Santa!' : 'Spin the Wheel!'}
                        </h1>
                        <p className="text-xl text-slate-200">
                            {assignedTo
                                ? 'Time to get shopping! 🎁'
                                : `Hi ${name}! Click the button below to discover who you'll be Secret Santa for!`}
                        </p>
                    </motion.div>

                    {/* Main Content */}
                    <AnimatePresence mode="wait">
                        {!assignedTo ? (
                            /* Spinning Wheel Section */
                            <motion.div
                                key="wheel"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="space-y-8"
                            >
                                <SpinningWheel
                                    participants={[...PARTICIPANTS]}
                                    onSpinComplete={handleSpinComplete}
                                    isSpinning={isSpinning}
                                />

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-center max-w-md mx-auto"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {/* Spin Button */}
                                <div className="flex justify-center">
                                    <Button
                                        variant="glow"
                                        size="xl"
                                        onClick={handleSpin}
                                        disabled={isSpinning || loading}
                                        className="min-w-[250px] text-xl"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 animate-spin" />
                                                Loading...
                                            </>
                                        ) : isSpinning ? (
                                            <>
                                                <Sparkles className="mr-2 animate-spin" />
                                                Spinning...
                                            </>
                                        ) : (
                                            <>
                                                <Gift className="mr-2" />
                                                Spin the Wheel!
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            /* Result Section */
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <Card glass className="p-12 text-center">
                                    <CardContent className="p-0 space-y-8">
                                        {/* Gift Box Icon */}
                                        <motion.div
                                            className="text-9xl"
                                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            🎁
                                        </motion.div>

                                        {/* Assigned Person */}
                                        <div>
                                            <p className="text-2xl text-slate-300 mb-4 font-semibold">
                                                You&apos;re now responsible to gift something to:
                                            </p>
                                            <motion.h2
                                                className="text-6xl md:text-8xl font-bold gradient-text"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                                            >
                                                {assignedTo}
                                            </motion.h2>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-4">
                                            <p className="text-xl text-slate-200">
                                                {isDemoMode
                                                    ? "This was just a demo! No email has been sent."
                                                    : "We've sent you an email with the details! 📧"}
                                            </p>
                                            <p className="text-lg text-slate-300">
                                                Remember to keep it a secret! 🤫
                                            </p>
                                        </div>

                                        {/* Button to Home */}
                                        <div className="pt-6">
                                            <Link href="/">
                                                <Button variant="secondary" size="lg">
                                                    <Home className="mr-2" />
                                                    Back to Home
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}

export default function PlayPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            </div>
        }>
            <PlayPageContent />
        </Suspense>
    );
}
