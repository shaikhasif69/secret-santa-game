import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Participant from '@/models/Participant';

export async function POST() {
    try {
        await dbConnect();

        // Delete all participants
        const result = await Participant.deleteMany({});

        return NextResponse.json({
            success: true,
            message: 'Database cleared successfully',
            count: result.deletedCount
        });
    } catch (error) {
        console.error('Error resetting database:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to reset database' },
            { status: 500 }
        );
    }
}
