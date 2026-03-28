fullstack_project/
├── backend/                    # ---> [AREA FASTAPI] (Kode Anda sebelumnya)
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py
│   │   │   └── v1/endpoints/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── crud/
│   │   ├── db/
│   │   │   └── session.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   ├── requirements.txt
│   └── .env
│
├── frontend/                   # ---> [AREA REACT] (Menggunakan Vite)
│   ├── public/                 # File statis publik (favicon, robots.txt, dll)
│   │   └── vite.svg
│   ├── src/                    # Direktori utama kode sumber React
│   │   ├── assets/             # Gambar, font, global CSS
│   │   ├── components/         # Komponen UI yang bisa dipakai ulang (Reusable)
│   │   │   ├── layout/         # Header, Sidebar, Footer, Layout Utama
│   │   │   └── ui/             # Button, Modal, Input, Card (Dumb components)
│   │   ├── pages/              # Komponen halaman (Home, Dashboard, Login)
│   │   ├── hooks/              # Custom React Hooks (misal: useAuth, useFetch)
│   │   ├── services/           # Konfigurasi Axios/Fetch untuk memanggil FastAPI
│   │   │   └── api.ts          # Base URL & Interceptor untuk token JWT
│   │   ├── store/              # State Management Global (Zustand / Redux / Context)
│   │   ├── utils/              # Fungsi helper (format tanggal, regex, dll)
│   │   ├── types/              # Definisi tipe TypeScript (Interface/Types)
│   │   ├── App.tsx             # Root Component & Konfigurasi Routing (React Router)
│   │   ├── main.tsx            # Titik masuk React (Entry point) & Provider
│   │   └── index.css           # Styling dasar (atau Tailwind entry)
│   ├── index.html              # HTML template utama
│   ├── package.json            # Daftar dependency Node.js (React, Axios, dll)
│   ├── vite.config.ts          # Konfigurasi bundler Vite
│   └── .env                    # Variabel environment React (misal: VITE_API_URL)
│
├── .gitignore                  # Mengabaikan node_modules, venv, .env di level root
└── README.md                   # Dokumentasi cara menjalankan Backend & Frontend