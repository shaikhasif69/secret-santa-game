# 🎅 Secret Santa Game

A fun, interactive Secret Santa web application built with Next.js for Christmas 2024! Perfect for friend groups to organize a Secret Santa gift exchange with character selection, games, and automated email notifications.

## ✨ Features

- 🎨 **Character Selection**: Choose from 5 festive characters (Santa, Elf, Reindeer, Snowman, Gingerbread)
- 🎮 **Interactive Game**: Spin the wheel or play slot machine to reveal your Secret Santa assignment
- 📧 **Email Notifications**: Automatic email sent with your Secret Santa assignment
- 🎯 **Demo Mode**: Try the game without saving data
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🎄 **Christmas Themed**: Beautiful animations and festive design

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB (Mongoose)
- **Email**: NodeMailer
- **UI Libraries**: 
  - React Confetti
  - Lucide Icons
  - Radix UI

## 📦 Installation

1. Clone the repository:
\`\`\`bash
cd secret-santa-game
npm install
\`\`\`

2. Set up environment variables:
Create a \`.env.local\` file in the root directory (see \`env.example\`):

\`\`\`env
MONGODB_URI="your-mongodb-connection-string"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="Secret Santa <your-email@gmail.com>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How It Works

### For Players:
1. Visit the game website
2. Select your character (each character can only be chosen once)
3. Enter your email address
4. Try the demo mode to understand the game
5. Play for real and spin the wheel!
6. Get your Secret Santa assignment via email

### Game Logic:
- Each player is assigned someone from the remaining pool
- As people play, the pool shrinks (but players don't see this)
- Special rule: Asif and Mehreen are always paired together 💑
- Email sent immediately with assignment details

## 👥 Participants

- Asif
- Mehreen
- Tahir
- Simran
- Sobia

## 🎨 Project Structure

\`\`\`
secret-santa-game/
├── app/
│   ├── api/
│   │   ├── participants/     # Character selection endpoint
│   │   ├── play/             # Game play and assignment logic
│   │   └── send-email/       # Email sending endpoint
│   ├── page.tsx              # Landing page
│   ├── select/               # Character selection page
│   └── play/                 # Game play page
├── components/               # React components
├── lib/
│   ├── db.ts                # MongoDB connection
│   ├── email.ts             # Email utilities
│   ├── constants.ts         # Game constants
│   └── utils.ts             # Helper functions
├── models/
│   └── Participant.ts       # Mongoose schema
└── public/
    └── sounds/              # Game sound effects
\`\`\`

## 🔧 Configuration

### MongoDB Setup:
1. Create a MongoDB Atlas account (free tier)
2. Create a new cluster
3. Get your connection string
4. Add it to \`.env.local\`

### Email Setup (Gmail):
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
3. Use this password in \`.env.local\`

## 🚀 Deployment

### Vercel (Recommended):
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

Add environment variables in Vercel dashboard.

## 📝 License

MIT

## 🎄 Merry Christmas!

Built with ❤️ for Christmas 2024
