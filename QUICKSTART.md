# 🎅 Secret Santa Game - Quick Start Guide

## ✅ Everything is Ready!

Your Secret Santa game is fully configured and ready to use for Christmas 2024!

---

## 🚀 How to Use

### For You (The Organizer)

1. **Start the dev server** (already running):
   ```bash
   cd /Volumes/MacExternalSSD/Dev/DevProjects/personalProject/secret-santa-game
   npm run dev
   ```

2. **Share the link** with your friends:
   ```
   http://localhost:3000
   ```
   
   Or deploy to Vercel and share the production URL!

3. **Two modes available**:
   - **Demo Mode**: For testing, no emails sent, can play multiple times
   - **Real Mode**: Saves to MongoDB, sends emails, one play per person

---

## 🎮 For Your Friends

### Step 1: Choose Mode
- Visit the link
- Click **"Play for Real!"** (or "Try Demo First" to test)

### Step 2: Select Character
- Choose your name from dropdown
- Enter your email address
- Pick a Christmas character (🎅🧝🦌⛄🍪)
- Click "Continue to Game"

### Step 3: Spin the Wheel!
- Click the glowing "Spin the Wheel!" button
- Watch it spin and slow down
- See confetti explosion! 🎊
- Your Secret Santa is revealed!
- Check your email for confirmation

---

## 👥 Participants

1. **Asif** (you)
2. **Mehreen** (your fiancé)
3. **Tahir**
4. **Simran**
5. **Sobia**

---

## 💑 Special Feature (Secret!)

You and Mehreen are **always paired together**! 

- When you play → You get Mehreen
- When Mehreen plays → She gets you
- Others get random assignments from available pool
- Nobody else knows this! 😉

---

## 📧 Email Configuration

✅ **Email is now configured!**

Emails will be sent from: **bhilaresai64@gmail.com**

Each participant will receive a beautiful HTML email with:
- 🎅 Christmas themed design
- 🎁 Their Secret Santa assignment
- 🤫 Reminder to keep it secret

---

## 🎯 Quick Test

**Try it yourself first:**

1. Open http://localhost:3000
2. Click "Try Demo First"
3. Select "Asif" and enter your email
4. Choose any character
5. Click "Continue to Game"
6. Spin the wheel!
7. You should get "Mehreen"! 💑

---

## 🚀 Deploy to Vercel (Production)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

**Environment Variables for Vercel**:
```
MONGODB_URI=mongodb+srv://theshaikhasif03_db_user:H0b0g7f2TmYrqzbw@finalcommoncluster.kpxcs6u.mongodb.net/secret-santa?retryWrites=true&w=majority&appName=FinalCommonCluster

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=bhilaresai64@gmail.com
EMAIL_PASSWORD=eqoqujrvylcmcupj
EMAIL_FROM=Secret Santa Game <bhilaresai64@gmail.com>

NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 📱 Mobile Friendly

The app is fully responsive and works perfectly on:
- ✅ Desktop
- ✅ Tablets
- ✅ Mobile phones

---

## 🎄 Features

✨ **Beautiful UI**
- Snowfall animation background
- Christmas gradient colors (red, green, gold)
- Glass morphism effects
- Smooth Framer Motion animations

🎡 **Spinning Wheel Game**
- Red/Green colored segments
- Progressive slowdown animation
- Confetti celebration
- Gift box reveal

📧 **Email Notifications**
- Professional HTML emails
- Christmas themed design
- Clear assignment details

🎮 **Demo Mode**
- Test without consequences
- No database saves
- No emails sent
- Perfect for trying first!

---

## 🎁 How the Game Works

1. **Character Selection Phase**
   - Each person picks a unique character (in real mode)
   - Characters show "Taken" badge once selected
   
2. **Assignment Logic**
   - Pool starts with all 5 participants
   - As people play, assigned participants are removed from pool
   - You can't get yourself
   - Asif ↔ Mehreen always paired
   - Others get random from available pool

3. **Email Confirmation**
   - Sent immediately after spin
   - Contains assignment details
   - Beautiful Christmas design

---

## ⚙️ Technical Details

**Built With**:
- Next.js 16.1.1
- TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB + Mongoose
- NodeMailer
- React Confetti

**Project Location**:
```
/Volumes/MacExternalSSD/Dev/DevProjects/personalProject/secret-santa-game
```

**Running On**: http://localhost:3000

---

## 🎅 Merry Christmas!

Have fun with your Secret Santa game! 🎄✨

Built with ❤️ for Christmas 2024
