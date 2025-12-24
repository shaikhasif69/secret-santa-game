import mongoose from 'mongoose';

export interface IParticipant {
    name: string;
    email: string;
    character: string;
    assignedTo?: string;
    selectedAt?: Date;
    isDemoMode: boolean;
}

const ParticipantSchema = new mongoose.Schema<IParticipant>(
    {
        name: {
            type: String,
            required: true,
            enum: ['Asif', 'Mehreen', 'Tahir', 'Simran', 'Sobia'],
        },
        email: {
            type: String,
            required: true,
        },
        character: {
            type: String,
            required: true,
            enum: ['santa', 'elf', 'reindeer', 'snowman', 'gingerbread'],
        },
        assignedTo: {
            type: String,
            enum: ['Asif', 'Mehreen', 'Tahir', 'Simran', 'Sobia'],
        },
        selectedAt: {
            type: Date,
            default: Date.now,
        },
        isDemoMode: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure one character per person in real mode
ParticipantSchema.index({ name: 1, isDemoMode: 1 }, { unique: true });

export default mongoose.models.Participant ||
    mongoose.model<IParticipant>('Participant', ParticipantSchema);
