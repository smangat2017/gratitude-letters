# Gratitude Letters Web App

A beautiful, heartfelt web application for creating gratitude letters using Claude AI. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎨 Beautiful Design**: Stunning gradient backgrounds, glassmorphism effects, and smooth animations
- **🤖 Claude AI Integration**: Advanced AI that transforms bullet points into heartfelt gratitude letters
- **📄 PDF Export**: Download beautiful, formatted PDFs to share with loved ones
- **💝 Bullet Point Input**: Simply list what you're grateful for and let AI do the rest
- **👁️ Live Preview**: See your letter as it's being generated
- **📱 Responsive Design**: Works perfectly on all devices
- **⚡ Fast & Simple**: One-page experience with no complex navigation
- **📊 Analytics Tracking**: Monitor poem generation, edits, and saves with detailed analytics

## 🚀 Key Features

### Beautiful UI/UX
- **Glassmorphism Design**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Beautiful pink-to-purple-to-blue gradients
- **Smooth Animations**: Subtle hover effects and loading states
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Heartfelt Typography**: Warm, inviting fonts and spacing

### Advanced Claude AI Integration
- **Custom System Prompt**: Optimized for creating heartfelt gratitude letters
- **Bullet Point Processing**: Intelligently transforms your points into flowing text
- **Personalized Content**: Uses recipient name naturally throughout
- **Emotional Intelligence**: Creates warm, meaningful, and personal letters
- **High-Quality Output**: Professional, heartfelt writing style

### Professional PDF Export
- **Server-Side Generation**: No client-side color function issues
- **Beautiful Formatting**: Clean typography and proper spacing
- **Custom Filenames**: PDFs named after the recipient
- **Print-Ready**: Perfect for sharing or printing
- **Professional Layout**: Header, content, and footer sections

### Analytics & Insights
- **Event Tracking**: Monitor poem generation, edits, and saves
- **User Behavior**: Track engagement patterns and user journeys
- **Performance Metrics**: Measure conversion rates and user satisfaction
- **Real-time Dashboard**: Beautiful analytics interface at `/analytics`
- **Privacy-First**: Client-side tracking with optional server-side storage

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI**: Claude API (Anthropic)
- **PDF Generation**: jsPDF (server-side)
- **Icons**: Lucide React
- **UI Components**: Headless UI, Heroicons

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Claude API key from Anthropic

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gratitude-letters
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Claude API key:
   - Get your API key from [Anthropic Console](https://console.anthropic.com/)
   - Edit `.env.local` and replace `your_claude_api_key_here` with your actual API key

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Analytics Setup

The app includes comprehensive analytics tracking with Vercel Analytics:

1. **Vercel Analytics**: Automatically tracks page views and custom events
2. **Custom Events**: Tracks poem generation, edits, and saves
3. **Dashboard**: Visit `/analytics` to see the analytics dashboard
4. **Real-time Data**: View live analytics in your Vercel dashboard

**Analytics Events Tracked:**
- `poem_generated`: When a new poem is created
- `poem_edited`: When a poem is revised or manually edited
- `poem_saved`: When a poem is downloaded as PDF

**To view analytics:**
- **Vercel Dashboard**: Visit your Vercel project dashboard for real-time analytics
- **Local Dashboard**: Visit `/analytics` in your app for a custom dashboard
- **API Endpoint**: `/api/analytics/dashboard` for programmatic access

**To extend analytics:**
- Edit `/app/api/analytics/route.ts` to add custom processing
- Connect to databases or other analytics services
- See `/lib/analytics-db.ts` for integration examples

## 📁 Project Structure

```
gratitude-letters/
├── app/
│   ├── api/
│   │   ├── analytics/
│   │   │   ├── route.ts          # Analytics tracking endpoint
│   │   │   └── dashboard/
│   │   │       └── route.ts      # Dashboard data endpoint
│   │   ├── generate-poem/
│   │   │   └── route.ts          # Claude AI poem generation
│   │   ├── revise-poem/
│   │   │   └── route.ts          # Poem revision endpoint
│   │   └── generate-pdf/
│   │       └── route.ts          # PDF generation
│   ├── analytics/
│   │   └── page.tsx              # Analytics dashboard
│   ├── components/
│   │   └── Navigation.tsx        # Navigation component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main gratitude letter composer
├── lib/
│   ├── analytics.ts              # Analytics utility functions
│   └── analytics-db.ts           # Database integration examples
├── .env.local                    # Environment variables
├── package.json
└── README.md
```

## 🎯 User Experience Flow

### 1. Beautiful Input Interface
- **Clean Design**: Glassmorphism cards with gradient backgrounds
- **Simple Input**: Just name and bullet points
- **Clear Guidance**: Helpful placeholder text and instructions
- **Smooth Interactions**: Hover effects and loading states

### 2. AI-Powered Generation
- **Smart Processing**: Claude analyzes your bullet points
- **Natural Transformation**: Converts points into flowing gratitude text
- **Personal Touch**: Maintains the personal nature of your points
- **Live Preview**: See the letter as it's being generated

### 3. Professional PDF Export
- **One-Click Download**: Generate PDF instantly
- **Custom Naming**: PDF named after recipient
- **High Quality**: Professional formatting and layout
- **Share Ready**: Perfect for sharing with loved ones

## 🔧 Claude AI Integration

### Custom System Prompt
The app uses a carefully crafted system prompt that:
- **Specializes in gratitude letters**: Optimized for heartfelt writing
- **Maintains personal tone**: Creates genuine, intimate letters
- **Transforms bullet points**: Converts simple points into flowing text
- **Uses recipient names**: Naturally incorporates names throughout
- **Creates emotional depth**: Builds meaningful, touching content

### Example Input/Output
**Input:**
```
• their kindness and patience
• the way they always listen
• their sense of humor
• their unwavering support
```

**Output:**
```
Dear Sarah,

I wanted to take a moment to express my deepest gratitude for all that you mean to me. Your presence in my life has been nothing short of a blessing, and I find myself constantly amazed by your kindness, wisdom, and unwavering support.

I'm grateful for your kindness and patience that never seems to waver, even in the most challenging moments. The way you always listen with such genuine care and attention makes me feel truly seen and understood. Your sense of humor has the incredible ability to lift my spirits and bring light to even the darkest days. And your unwavering support has been the foundation that has helped me grow and become the person I am today.

There are so many moments I cherish - the way you always know exactly what to say when I need encouragement, the countless times you've been there for me without hesitation, and the love you've shown me in ways both big and small.

Thank you for being you, for sharing your light with the world, and for making my life richer and more meaningful simply by being in it. You are truly appreciated more than words can express.

With love and gratitude,
[Your name]
```

## 🚀 Development

### Running in Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🎨 Design Features

### Beautiful UI Elements
- **Glassmorphism Cards**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Multi-color gradients for visual appeal
- **Smooth Animations**: Hover effects and loading states
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Color Harmony**: Pink, purple, and blue color scheme

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and proper spacing
- **Flexible Layout**: Adapts beautifully to different devices
- **Performance**: Fast loading and smooth interactions

## 🚀 Deployment

This app can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

### Environment Variables for Production
Make sure to set your Claude API key in production:
```env
CLAUDE_API_KEY=your_actual_claude_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 💝 Support

For support, please open an issue in the repository or contact the development team.

---

Made with ❤️ to spread gratitude and joy through heartfelt letters.
