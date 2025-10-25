GenZ Day - Ephemeral Social Media Platform

https://placehold.co/800x400/0088cc/white?text=GenZ+Day+📸

📱 Project Overview

GenZ Day is a modern, ephemeral social media platform where users can share photos and videos that automatically disappear after 7 days. Built with a unique Telegram + WhatsApp hybrid design, it offers a fresh take on social media for the next generation.

Live Demo: gen-z-day.vercel.app

🎯 Core Features

✅ Implemented Features

· 7-Day Content Expiration - All posts automatically delete after 7 days
· Media Upload - Support for images and videos
· Telegram + WhatsApp Inspired UI - Hybrid design with blue gradients and clean interface
· Mobile-First Responsive Design - Works perfectly on all devices
· Real-time Post Interactions - Like and comment functionality
· Stories Feature - 24-hour ephemeral stories
· User Authentication - Multiple login options (Google, Phone, Email)
· No Spam Protection - Built-in verification systems

🚀 Advanced Features

· AR Filters - Augmented reality camera effects
· Music Integration - Add background music to posts
· Polls & Quizzes - Interactive content types
· Gamification - Streaks, badges, and achievements
· Group Stories - Collaborative story creation
· Real-time Notifications - Live updates and alerts

🛠 Tech Stack

Frontend

· Next.js 14 - React framework with App Router
· TypeScript - Type-safe development
· Tailwind CSS - Utility-first styling
· Framer Motion - Smooth animations
· PWA Ready - Mobile app-like experience

Backend & Infrastructure

· Vercel - Hosting and serverless functions
· Xata (PostgreSQL) - Database with auto-expiration
· Vercel Blob Storage - Media file storage
· NextAuth.js - Authentication system
· Serverless APIs - Scalable backend architecture

Authentication

· Google OAuth - Social login
· Phone Verification - SMS-based authentication
· Email/Password - Traditional signup
· Session Management - Secure user sessions

📁 Project Structure

```
genz-day/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── PostFeed.tsx
│   │   ├── CreatePostModal.tsx
│   │   ├── StoriesBar.tsx
│   │   └── QuickActions.tsx
│   ├── api/                 # Serverless API routes
│   │   ├── posts/
│   │   │   └── route.ts     # CRUD operations for posts
│   │   ├── upload/
│   │   │   └── route.ts     # File upload handling
│   │   └── auth/
│   │       └── [...nextauth]/route.ts
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── lib/
│   ├── auth.ts              # Authentication configuration
│   ├── db.ts                # Database client
│   ├── types.ts             # TypeScript definitions
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── package.json
```

🚀 Getting Started

Prerequisites

· Node.js 18+
· npm or yarn
· Xata database account
· Vercel account

Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/genz-day.git
   cd genz-day
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Environment Setup
   Create .env.local:
   ```env
   # Database
   XATA_API_KEY=your_xata_api_key
   XATA_DATABASE_URL=your_xata_database_url
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Storage
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   
   # Cron Jobs
   CRON_SECRET=your_cron_secret
   ```
4. Run development server
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

🌐 API Endpoints

Posts API

· GET /api/posts - Fetch all active posts
· POST /api/posts - Create new post
· GET /api/posts/[id] - Get specific post
· DELETE /api/posts/[id] - Delete post
· POST /api/posts/[id]/like - Like/unlike post
· GET /api/posts/[id]/comments - Get post comments
· POST /api/posts/[id]/comments - Add comment

Media API

· POST /api/upload - Upload media files
· Supports: Images (JPEG, PNG, WebP) and Videos (MP4, WebM)

Utility API

· GET /api/health - Health check endpoint
· GET /api/cron/cleanup - Auto-delete expired posts

🎨 Design System

Color Palette

```css
--telegram-blue: #0088cc;      /* Primary brand color */
--telegram-blue-dark: #006ea6; /* Dark variant */
--whatsapp-green: #25d366;     /* Accent color */
--telegram-bg: #f0f2f5;        /* Background */
--telegram-card: #ffffff;      /* Card background */
```

Typography

· Primary Font: Inter
· Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

Components

· Glass morphism effects
· Gradient backgrounds
· Smooth animations
· Mobile-optimized touch targets

📊 Database Schema

Users Table

· id - Unique user identifier
· email - User email (unique)
· phone - Phone number (unique, optional)
· name - Display name
· avatar - Profile image URL
· createdAt - Account creation date
· lastLogin - Last active timestamp

Posts Table

· id - Unique post identifier
· userId - Reference to user
· mediaUrl - Storage URL for media
· mediaType - 'image' or 'video'
· caption - Post description (optional)
· expiresAt - Auto-deletion timestamp
· createdAt - Post creation time
· views - View count
· likes - Like count
· comments - Comment count

Additional Tables

· likes - Post likes tracking
· comments - Post comments
· stories - 24-hour stories
· notifications - User notifications

🔒 Security Features

· Content Moderation - Automated spam detection
· Rate Limiting - API request throttling
· Data Encryption - End-to-end encryption for media
· Secure Authentication - OAuth2 and session management
· CORS Protection - Cross-origin request security

🚀 Deployment

Vercel Deployment

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Auto-deploy on git push

Environment Variables for Production

```env
XATA_API_KEY=production_xata_key
XATA_DATABASE_URL=production_database_url
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=production_secret
```

📈 Performance Optimizations

· Image Optimization - WebP format, lazy loading
· Code Splitting - Dynamic imports for faster loads
· CDN Distribution - Global content delivery
· Database Indexing - Optimized query performance
· Caching Strategy - Redis for frequent data

🔄 Development Workflow

Branch Strategy

· main - Production ready code
· develop - Development branch
· feature/* - Feature development
· hotfix/* - Critical bug fixes

Code Standards

· TypeScript - Strict type checking
· ESLint - Code quality enforcement
· Prettier - Consistent formatting
· Husky - Pre-commit hooks

🐛 Troubleshooting

Common Issues

1. Build Failures - Check TypeScript errors and missing dependencies
2. API Errors - Verify environment variables and database connection
3. Upload Issues - Check Vercel Blob storage configuration
4. Authentication Problems - Validate OAuth credentials

Debug Mode

Enable debug logging by setting:

```env
DEBUG=true
```

🎯 Future Roadmap

Phase 1 (Complete)

· ✅ Basic post creation and feed
· ✅ User authentication
· ✅ Mobile-responsive design
· ✅ 7-day expiration system

Phase 2 (In Progress)

· 🔄 Real-time messaging
· 🔄 Advanced AR filters
· 🔄 Music integration
· 🔄 Group features

Phase 3 (Planned)

· 📅 Advanced analytics dashboard
· 📅 Monetization features
· 📅 API for third-party integrations
· 📅 Mobile app (React Native)

👥 Contributing

1. Fork the repository
2. Create feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open Pull Request

📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

🤝 Support

For support and questions:

· 📧 Email: support@genzday.com
· 🐛 Issues: GitHub Issues
· 💬 Discord: Join our community

🙏 Acknowledgments

· Telegram - UI/UX inspiration
· WhatsApp - Design elements
· Vercel - Amazing hosting platform
· Next.js Team - Fantastic framework
· Xata - Reliable database service

---

Built with ❤️ for the GenZ community

"Your moments, your week, your way" ✨
