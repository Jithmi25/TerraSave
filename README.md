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

### Frontend

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Build Tool:** React Scripts (Create React App)

### Backend & Database

- **Backend as a Service:** Supabase
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth
- **Real-time Updates:** Supabase Realtime

### Key Libraries & Tools

- **React Router:** For navigation and routing
- **TypeScript:** For type safety and better developer experience
- **PostCSS:** CSS processing with Tailwind
- **ESLint & Prettier:** Code quality and formatting

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js:** v14 or higher (v18+ recommended)
- **npm:** v6 or higher (comes with Node.js)
- **Supabase Account:** For authentication and database ([Sign up here](https://supabase.com))
- **Git:** For cloning the repository

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/TerraSave.git
   cd TerraSave
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all required packages including React, TypeScript, Tailwind CSS, and Supabase.

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory:
     ```bash
     cp .env.example .env
     ```
   - Add your Supabase credentials to `.env`:
     ```env
     REACT_APP_SUPABASE_URL=your_supabase_project_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Get these credentials from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

4. **Set up Supabase Database**
   - Create the required tables in your Supabase project
   - Run the SQL schema (if provided in `database/schema.sql`)
   - Configure authentication providers in Supabase Dashboard

5. **Run the development server**

   ```bash
   npm start
   ```

   The application will open at [http://localhost:3000](http://localhost:3000)

6. **Build for production**

   ```bash
   npm run build
   ```

   The optimized build will be created in the `build/` directory.

### Troubleshooting

- **Port already in use:** If port 3000 is busy, the app will prompt to use another port
- **Environment variables not loading:** Ensure `.env` is in the root directory and restart the dev server
- **Supabase connection errors:** Verify your Supabase URL and anon key are correct

---

## 🎨 UI/UX Highlights

- Nature-inspired color palette
- Clean and minimal design
- Smooth animations and micro-interactions
- Mobile-friendly layout

---

## 👥 Team Members

This project was developed by:

- **Jithmi Pranamya Wickramasinghe**
- **Kithmi Githara Beddage**
- **Hiruni Yashoda Sethmini**
- **Nithini Nethma Kasthuriarachchi**

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💚 Final Note

TerraSave shows how technology can help protect nature.  
Every small step counts toward a greener future.

🌱 _Plant today. Protect tomorrow._
