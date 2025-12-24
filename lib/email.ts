import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export function getSecretSantaEmailTemplate(name: string, assignedTo: string): string {
  // Fun gift ideas for each person
  const giftIdeas: Record<string, string[]> = {
    'Asif': [
      '💻 A cool tech gadget or accessory',
      '📚 A book on coding or entrepreneurship',
      '🎧 Premium headphones or earbuds',
      '☕ A fancy coffee mug with a witty quote',
    ],
    'Mehreen': [
      '💄 A luxurious skincare or makeup set',
      '📖 A bestselling novel or journal',
      '🌸 Scented candles or aromatherapy set',
      '👜 A stylish accessory or bag',
    ],
    'Tahir': [
      '🎮 Gaming accessories or gift card',
      '👟 Cool sneakers or sportswear',
      '🎵 Music merchandise or vinyl records',
      '🍫 A gourmet chocolate hamper',
    ],
    'Simran': [
      '🎨 Art supplies or creative kit',
      '📸 A cute polaroid camera or film',
      '🧣 A cozy winter scarf or blanket',
      '🍵 A fancy tea collection set',
    ],
    'Sobia': [
      '💅 A spa or self-care gift set',
      '🎁 A personalized photo frame or album',
      '🌺 Beautiful flowers or plant',
      '🍪 Homemade treats or bakery goodies',
    ],
  };

  const ideas = giftIdeas[assignedTo] || [
    '🎁 Something thoughtful and personal',
    '💝 A gift that shows you care',
    '✨ Something that will make them smile',
  ];

  const funFacts: Record<string, string> = {
    'Asif': 'Fun fact: Tech enthusiasts love practical gifts they can use daily!',
    'Mehreen': 'Fun fact: You can never go wrong with something that smells amazing!',
    'Tahir': 'Fun fact: The best gifts are ones that match their hobbies!',
    'Simran': 'Fun fact: Creative souls appreciate handmade or artistic gifts!',
    'Sobia': 'Fun fact: Self-care gifts are always a hit during the holidays!',
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px dashed #dc2626;
        }
        h1 {
          color: #dc2626;
          font-size: 36px;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .emoji-row {
          font-size: 40px;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 10px;
        }
        .greeting {
          font-size: 20px;
          color: #333;
          text-align: center;
          margin: 20px 0;
        }
        .assigned-box {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          color: white;
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          padding: 30px;
          border-radius: 15px;
          margin: 25px 0;
          box-shadow: 0 10px 30px rgba(22, 163, 74, 0.4);
        }
        .gift-ideas {
          background: #fef3c7;
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
          border-left: 5px solid #f59e0b;
        }
        .gift-ideas h3 {
          color: #b45309;
          margin: 0 0 15px 0;
          font-size: 20px;
        }
        .gift-ideas ul {
          margin: 0;
          padding-left: 20px;
        }
        .gift-ideas li {
          color: #78350f;
          margin: 10px 0;
          font-size: 16px;
        }
        .fun-fact {
          background: #dbeafe;
          border-radius: 12px;
          padding: 15px 20px;
          margin: 20px 0;
          font-style: italic;
          color: #1e40af;
          text-align: center;
        }
        .secret-reminder {
          background: #fce7f3;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          margin: 25px 0;
        }
        .secret-reminder h3 {
          color: #be185d;
          margin: 0 0 10px 0;
        }
        .secret-reminder p {
          color: #9d174d;
          margin: 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px dashed #16a34a;
        }
        .footer p {
          color: #666;
          margin: 10px 0;
        }
        .big-emoji {
          font-size: 60px;
          text-align: center;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="emoji-row">🎄✨🎅✨🎄</div>
          <h1>Secret Santa Assignment!</h1>
        </div>
        
        <p class="greeting">
          Hey <strong>${name}</strong>! 👋<br><br>
          The wheel has spoken and the Christmas magic has decided...
        </p>
        
        <div class="big-emoji">🎁</div>
        
        <p style="text-align: center; font-size: 18px; color: #666;">
          Your mission (if you choose to accept it) is to be the Secret Santa for:
        </p>
        
        <div class="assigned-box">
          🎁 ${assignedTo} 🎁
        </div>
        
        <div class="gift-ideas">
          <h3>💡 Gift Ideas for ${assignedTo}:</h3>
          <ul>
            ${ideas.map(idea => `<li>${idea}</li>`).join('')}
          </ul>
        </div>
        
        <div class="fun-fact">
          💭 ${funFacts[assignedTo] || 'Fun fact: The best gift is one given with love!'}
        </div>
        
        <div class="secret-reminder">
          <h3>🤫 TOP SECRET!</h3>
          <p>
            Remember, you're a <strong>SECRET</strong> Santa!<br>
            Don't tell anyone who you got - that's the fun part! 🎭
          </p>
        </div>
        
        <div class="footer">
          <div class="emoji-row">🎅🦌🎄⛄🎁</div>
          <p><strong>Gift Exchange:</strong> Christmas Day! 🎄</p>
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            Happy shopping and Merry Christmas! 🎊<br>
            May your holidays be filled with joy and laughter!
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

