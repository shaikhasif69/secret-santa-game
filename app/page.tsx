'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Mail, PlayCircle } from 'lucide-react';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Snowfall Background */}
      <Snowfall count={60} />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Christmas Emojis */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="text-6xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              🎅
            </motion.span>
            <motion.span
              className="text-6xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              🎄
            </motion.span>
            <motion.span
              className="text-6xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              🎁
            </motion.span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Secret Santa 2024
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-slate-200 mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Hey squad! 👋 Ready for some Christmas fun?<br />
            Pick a character, spin the magical wheel, and find out who you&apos;re buying a gift for! 🎉
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/select?mode=real">
              <Button variant="glow" size="xl" className="group">
                <PlayCircle className="mr-2 group-hover:scale-110 transition-transform" />
                Play for Real!
              </Button>
            </Link>
            <Link href="/select?mode=demo">
              <Button variant="secondary" size="xl">
                <Sparkles className="mr-2" />
                Try Demo First
              </Button>
            </Link>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Step 1 */}
            <Card glass className="p-8 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0 text-center">
                <div className="text-6xl mb-4 animate-bounce-slow">👤</div>
                <h3 className="text-2xl font-bold text-white mb-2">1. Choose Character</h3>
                <p className="text-slate-300">
                  Pick your favorite Christmas character from Santa, Elf, Reindeer, Snowman, or Gingerbread!
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card glass className="p-8 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0 text-center">
                <div className="text-6xl mb-4 animate-spin-slow">🎡</div>
                <h3 className="text-2xl font-bold text-white mb-2">2. Spin the Wheel</h3>
                <p className="text-slate-300">
                  Watch the wheel spin and reveal who you&apos;ll be Secret Santa for this Christmas!
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card glass className="p-8 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0 text-center">
                <div className="text-6xl mb-4 animate-pulse-slow">📧</div>
                <h3 className="text-2xl font-bold text-white mb-2">3. Get Your Mission</h3>
                <p className="text-slate-300">
                  Boom! You&apos;ll get an email with your assignment + gift ideas! Keep it secret! 🤫
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fun Rules Section */}
          <motion.div
            className="mt-12 p-6 rounded-2xl glass border border-white/20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <h3 className="text-xl font-bold text-amber-400 mb-4">🎉 How To Play!</h3>
            <ul className="text-left text-slate-300 space-y-2">
              <li>🎭 Pick your favorite Christmas character</li>
              <li>🎰 Spin the magical wheel of destiny</li>
              <li>🤫 Keep your assignment TOP SECRET!</li>
              <li>🎄 Exchange gifts on Christmas Day</li>
              <li>😄 Most importantly: Have FUN with it!</li>
            </ul>
          </motion.div>

          {/* Participants Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Christmas Crew</h2>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              {['Asif', 'Mehreen', 'Tahir', 'Simran', 'Sobia'].map((name, index) => (
                <motion.div
                  key={name}
                  className="px-6 py-3 rounded-full glass border-2 border-white/30 text-white font-semibold"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(251, 191, 36, 0.8)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            className="mt-16 text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p>Built with ❤️ for Christmas 2024 • Merry Christmas! 🎄</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
