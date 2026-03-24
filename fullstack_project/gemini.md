# Konteks Proyek & Aturan AI (Project Context & Rules)

## 1. Identitas Proyek
- **Arsitektur:** Monorepo (Backend dan Frontend terpisah dalam satu repository).
- **Backend:** FastAPI (Python 3.10+). Berjalan di port 8000.
- **Frontend:** React + Vite + TypeScript + Tailwind CSS. Berjalan di port 5173.

## 2. Aturan Backend (FastAPI)
- **Struktur Folder:** Gunakan arsitektur berlapis (Layered Architecture).
  - API endpoints di `app/api/v1/endpoints/`
  - Model Database di `app/models/`
  - Validasi Pydantic di `app/schemas/`
  - Logika bisnis & DB di `app/crud/`
- **Autentikasi:** Menggunakan OAuth2 dengan JWT Bearer Token. Format login wajib menggunakan `application/x-www-form-urlencoded`.
- **Aturan Respon:** Selalu kembalikan JSON. Gunakan `HTTPException` standar FastAPI untuk error.

## 3. Aturan Frontend (React)
- **Styling:** WAJIB menggunakan Tailwind CSS. Buat desain yang modern, bersih, dan profesional.
- **State & Data Fetching:** - Selalu panggil API melalui instance Axios terpusat di `src/services/api.ts`.
  - Jangan pernah menulis URL `http://localhost:8000` secara *hardcode* di dalam komponen. Gunakan `apiClient`.
  - Token JWT sudah diatur untuk otomatis disisipkan ke header via *Axios Interceptors*.
- **Struktur Komponen:** Pisahkan antara `pages/` (untuk halaman utuh) dan `components/` (untuk bagian UI yang bisa dipakai ulang).

## 4. Instruksi untuk AI (Gemini)
1. **Pikirkan sebagai Senior Architect:** Sebelum memberikan kode, pastikan kode tersebut aman, modular, dan sesuai standar industri.
2. **Jangan rusak yang sudah jalan:** Jika disuruh menambah fitur, jangan mengubah file `main.py` atau `App.tsx` kecuali benar-benar diinstruksikan.
3. **Keringkasan:** Berikan penjelasan yang singkat, padat, dan langsung ke poin (*no fluff*). Tampilkan kode yang relevan saja.