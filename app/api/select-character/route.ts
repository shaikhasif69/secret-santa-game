import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Participant from '@/models/Participant';
import { PARTICIPANTS, CHARACTERS } from '@/lib/constants';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, character, isDemoMode } = body;

        // Validation
        if (!name || !email || !character) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
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

        // Validate character is valid
        const validCharacters = CHARACTERS.map((c) => c.id);
        if (!validCharacters.includes(character)) {
            return NextResponse.json(
                { success: false, error: 'Invalid character selection' },
                { status: 400 }
            );
        }

        // In real mode, check if character is already taken
        if (!isDemoMode) {
            const existingCharacter = await Participant.findOne({
                character,
                isDemoMode: false,
            });

            if (existingCharacter) {
                return NextResponse.json(
                    { success: false, error: 'This character has already been selected' },
                    { status: 409 }
                );
            }

            // Check if this participant has already selected a character
            const existingParticipant = await Participant.findOne({
                name,
                isDemoMode: false,
            });

            if (existingParticipant) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'You have already selected a character',
                        data: { character: existingParticipant.character },
                    },
                    { status: 409 }
                );
            }
        }

        // Create new participant
        const participant = await Participant.create({
            name,
            email,
            character,
            isDemoMode: isDemoMode || false,
            selectedAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            data: {
                id: participant._id,
                name: participant.name,
                character: participant.character,
            },
            message: 'Character selected successfully',
        });
    } catch (error) {
        console.error('Error selecting character:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to select character' },
            { status: 500 }
        );
    }
}
