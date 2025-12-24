import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Participant from '@/models/Participant';
import { PARTICIPANTS, SPECIAL_PAIRINGS } from '@/lib/constants';
import { sendEmail, getSecretSantaEmailTemplate } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, isDemoMode } = body;

        // Validation
        if (!name) {
            return NextResponse.json(
                { success: false, error: 'Missing participant name' },
                { status: 400 }
            );
        }

        // Validate name is in allowed list
        if (!PARTICIPANTS.includes(name as any)) {
            return NextResponse.json(
                { success: false, error: 'Invalid participant name' },
                { status: 400 }
            );
        }

        // Get the participant's info
        const participant = await Participant.findOne({
            name,
            isDemoMode: isDemoMode || false,
        });

        if (!participant) {
            return NextResponse.json(
                { success: false, error: 'Participant not found. Please select a character first.' },
                { status: 404 }
            );
        }

        // Check if already assigned
        if (participant.assignedTo && !isDemoMode) {
            return NextResponse.json(
                {
                    success: true,
                    data: { assignedTo: participant.assignedTo },
                    message: 'You have already been assigned',
                }
            );
        }

        let assignedTo: string;

        // Special pairing: Asif <-> Mehreen
        if (SPECIAL_PAIRINGS[name]) {
            assignedTo = SPECIAL_PAIRINGS[name];
        } else {
            // Get all participants who have been assigned to someone (in real mode)
            const assignedParticipants = await Participant.find({
                isDemoMode: isDemoMode || false,
                assignedTo: { $exists: true, $ne: null },
            });

            const alreadyAssigned = assignedParticipants.map((p) => p.assignedTo);

            // Build available pool: all participants except current player and already assigned
            const availablePool = PARTICIPANTS.filter(
                (p) => p !== name && !alreadyAssigned.includes(p)
            );

            if (availablePool.length === 0) {
                return NextResponse.json(
                    { success: false, error: 'No participants available for assignment' },
                    { status: 400 }
                );
            }

            // Randomly select from available pool
            const randomIndex = Math.floor(Math.random() * availablePool.length);
            assignedTo = availablePool[randomIndex];
        }

        // Update participant with assignment
        participant.assignedTo = assignedTo;
        await participant.save();

        // Send email in real mode
        if (!isDemoMode && participant.email) {
            console.log(`Attempting to send email to ${participant.email} for ${name}...`);
            try {
                const emailHtml = getSecretSantaEmailTemplate(name, assignedTo);
                const emailResult = await sendEmail({
                    to: participant.email,
                    subject: '🎅 Your Secret Santa Assignment!',
                    html: emailHtml,
                });

                if (emailResult.success) {
                    console.log(`Email successfully sent to ${participant.email}`);
                } else {
                    console.error(`Email failed to send to ${participant.email}:`, emailResult.error);
                }
            } catch (emailError) {
                console.error('Error in email sending process:', emailError);
            }
        } else {
            console.log(`Skipping email sending: isDemoMode=${isDemoMode}, email=${participant.email}`);
        }

        return NextResponse.json({
            success: true,
            data: {
                name,
                assignedTo,
                emailSent: !isDemoMode,
            },
            message: isDemoMode
                ? 'Demo assignment complete!'
                : 'Assignment complete! Check your email for details.',
        });
    } catch (error) {
        console.error('Error playing game:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to assign Secret Santa' },
            { status: 500 }
        );
    }
}
