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

        // Check if already assigned - if so, we'll re-send the email
        if (participant.assignedTo && !isDemoMode) {
            console.log(`Participant ${name} already assigned to ${participant.assignedTo}. Re-sending email...`);
            if (participant.email) {
                try {
                    const emailHtml = getSecretSantaEmailTemplate(name, participant.assignedTo);
                    const emailResult = await sendEmail({
                        to: participant.email,
                        subject: '🎅 Your Secret Santa Assignment!',
                        html: emailHtml,
                    });

                    if (emailResult.success) {
                        console.log(`Re-send: Email successfully sent to ${participant.email}`);
                    } else {
                        console.error(`Re-send: Email failed to send to ${participant.email}:`, emailResult.error);
                    }
                } catch (emailError) {
                    console.error('Error in re-sending email process:', emailError);
                }
            }

            return NextResponse.json({
                success: true,
                data: {
                    name,
                    assignedTo: participant.assignedTo,
                    emailSent: true,
                },
                message: 'Your assignment has been re-sent to your email!',
            });
        }

        let assignedTo: string;

        // Special pairing: Asif <-> MayRin
        if (SPECIAL_PAIRINGS[name]) {
            assignedTo = SPECIAL_PAIRINGS[name];
        } else {
            // Get all participants who have been assigned to someone (in real mode)
            const assignedParticipants = await Participant.find({
                isDemoMode: isDemoMode || false,
                assignedTo: { $exists: true, $ne: null },
            });

            const alreadyAssigned = assignedParticipants.map((p) => p.assignedTo);

            // Build list of reserved targets from special pairings
            const reservedTargets = Object.values(SPECIAL_PAIRINGS);

            // 1. Initial candidates: not current player, not assigned to someone else, not reserved
            let candidates = PARTICIPANTS.filter(
                (p) =>
                    p !== name &&
                    !alreadyAssigned.includes(p) &&
                    !reservedTargets.includes(p)
            );

            // 2. Deadlock Prevention: Look ahead to ensure remaining players have valid slots
            const playersWhoPicked = await Participant.find({
                isDemoMode: isDemoMode || false,
                assignedTo: { $exists: true, $ne: null },
            });
            const namesWhoPicked = playersWhoPicked.map(p => p.name);

            const remainingVoters = PARTICIPANTS.filter(p =>
                !SPECIAL_PAIRINGS[p] &&
                p !== name &&
                !namesWhoPicked.includes(p)
            );

            if (remainingVoters.length > 0) {
                // If we pick 'candidate', will the last remaining voter be left with themselves?
                candidates = candidates.filter(candidate => {
                    const nextAvailableTargets = PARTICIPANTS.filter(p =>
                        !SPECIAL_PAIRINGS[p] &&
                        !alreadyAssigned.includes(p) &&
                        p !== candidate
                    );

                    if (remainingVoters.length === 1) {
                        const lastVoter = remainingVoters[0];
                        // If I pick this candidate, the 1 person left must have 1 target that isn't them
                        return nextAvailableTargets.length === 1 && nextAvailableTargets[0] !== lastVoter;
                    }

                    // If 2 voters left, ensure at least one doesn't pick the other's only target? 
                    // Actually, for 5 people, the 1-person lookahead is the most critical.
                    return true;
                });
            }

            if (candidates.length === 0) {
                // Should not happen, but fallback to all available
                candidates = PARTICIPANTS.filter(p => p !== name && !alreadyAssigned.includes(p) && !reservedTargets.includes(p));
            }

            // Randomly select from available pool
            const randomIndex = Math.floor(Math.random() * candidates.length);
            assignedTo = candidates[randomIndex];
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
