# FYF - Fuck Your Future

A modern web application for life visualization, goal setting, and personal development.

## 🚀 Features

- **Life in Weeks Visualization** - See your life in a powerful grid format
- **Goal Setting & Tracking** - Set and monitor your personal goals
- **Content Feed** - Curated resources for personal growth
- **Events & Workshops** - Join community events
- **Pause Reminder** - Built-in break reminders for healthy usage
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom FYF Design System
- **Deployment:** Vercel (recommended)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd fyf-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set project name (e.g., "fyf-app")
   - Configure settings

4. **Your app will be live at:** `https://your-app.vercel.app`

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and deploy

### Option 3: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy

## 🔧 Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
cp env.example .env.local
```

## 📁 Project Structure

```
src/
├── app/
│   ├── login/           # Login page
│   ├── life-weeks/      # Life visualization
│   ├── profile/         # Goal setting
│   ├── guide/           # Content feed
│   ├── events/          # Events & workshops
│   ├── people/          # Community
│   ├── credits/         # Credits & monetization
│   ├── transparenz/     # Ethics & FAQ
│   ├── fallback/        # 404 page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
```

## 🎨 Design System

The app uses a custom FYF design system with:

- **Colors:** Coral (#FF6B6B), Mint (#4ECDC4), Noir (#0A0A0A)
- **Fonts:** Space Grotesk (headings), Inter (body)
- **Components:** Responsive, accessible, modern

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 📱 Features

### Life in Weeks
- Interactive grid visualization
- Customizable age and life expectancy
- Statistics and progress tracking
- Pause reminder after 30 minutes

### Goal Setting
- Personal information management
- Goal creation and tracking
- Progress visualization
- Achievement statistics

### Content Feed
- Curated articles and resources
- Category-based browsing
- Newsletter subscription
- Featured content

## 🔒 Privacy & Ethics

- No data selling
- User data ownership
- Transparent monetization
- Evidence-based recommendations

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or feedback, please contact the development team.

---

**FYF - Fuck Your Future** - Transform your life with powerful visualization tools.