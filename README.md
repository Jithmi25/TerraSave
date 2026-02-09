# 🌱 TerraSave

TerraSave is a sustainability-focused digital platform that connects real-world tree planting with a meaningful digital experience. It helps individuals and communities track their environmental impact, stay motivated through gamification, and contribute toward a greener planet.

---

## 🌍 Vision

To empower people to take small eco-friendly actions that collectively create a big environmental impact.

---

## ✨ Key Features

### 🌳 Real-World Tree to Digital Tree Mapping

- Every planted or donated tree is represented digitally
- Unique Tree ID / QR code for each tree
- Creates a strong connection between action and impact

### 🌲 Personal Virtual Forest Dashboard

- Personal virtual garden or forest
- Tree count and growth stages
- Estimated CO₂ absorption and oxygen production
- Simple and visually engaging UI

### 🎮 Gamification & Rewards

- Tree growth stages: Seed → Sapling → Mature Tree
- Achievement badges:
  - Eco Starter
  - Forest Guardian
  - Climate Hero
- Streaks for continuous eco actions

### 📊 Impact Visualization & Analytics

- Real-time impact tracking
- Trees planted and carbon reduction estimates
- User contribution history

### 🌍 Community & Team Challenges

- Join teams (schools, universities, companies)
- Participate in reforestation challenges
- Leaderboards for friendly competition

### 🤖 AI-Powered Eco Assistant

- Daily eco-friendly action suggestions
- Sustainable lifestyle tips
- Predicts environmental impact over time

### 🔐 Secure & Scalable Architecture

- Secure user authentication
- No sensitive payment data stored
- Scalable from individuals to institutions

---

## 🚀 Future Scope (Not MVP)

- NGO and tree verification system
- AR view of planted trees
- Metaverse-style forest exploration

---

## 🛠️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS 4
- **Authentication:** Supabase Auth
- **Backend:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **Build Tool:** React Scripts

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (for authentication and database)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TerraSave
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```
     REACT_APP_SUPABASE_URL=your_supabase_url_here
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Run the development server**

   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
TerraSave/
├── public/
│   ├── index.html
│   └── image/
│       └── logo.png
├── src/
│   ├── app.tsx              # Main App component
│   ├── index.tsx            # Entry point
│   ├── index.css            # Global styles
│   ├── components/
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── index.ts
│   ├── lib/
│   │   └── supabase.ts      # Supabase client config
│   ├── scenes/
│   │   ├── SignIn.tsx       # Sign in page
│   │   └── SignUp.tsx       # Sign up page
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 UI/UX Highlights

- Nature-inspired color palette
- Clean and minimal design
- Smooth animations and micro-interactions
- Mobile-friendly layout

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💚 Final Note

TerraSave shows how technology can help protect nature.  
Every small step counts toward a greener future.

🌱 _Plant today. Protect tomorrow._
