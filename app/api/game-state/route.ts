import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Participant from '@/models/Participant';

export async function GET() {
    try {
        await dbConnect();

        // Get all real mode participants (not demo)
        const participants = await Participant.find({ isDemoMode: false });

        // Extract selected characters
        const selectedCharacters = participants.map((p) => p.character);

        // Extract participants who have been assigned to someone
        const assignedParticipants = participants
            .filter((p) => p.assignedTo)
            .map((p) => p.assignedTo);

        return NextResponse.json({
            success: true,
            data: {
                selectedCharacters,
                assignedParticipants,
                totalParticipants: participants.length,
                fullDetails: participants.map(p => ({
                    name: p.name,
                    character: p.character,
                    assignedTo: p.assignedTo,
                    email: p.email
                }))
            },
        });
    } catch (error) {
        console.error('Error fetching game state:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch game state' },
            { status: 500 }
        );
    }
}
