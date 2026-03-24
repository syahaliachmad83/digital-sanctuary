import { useEffect, useState } from 'react';
import apiClient from '../services/api';

// Tipe Data
interface User {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);
  
  // State untuk Modal Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // State untuk Form di dalam Modal
  const [editRole, setEditRole] = useState('Pengguna Biasa');
  const [isSaving, setIsSaving] = useState(false);

  // Fungsi READ: Ambil semua data user
  const fetchUsers = async () => {
    setLoading(true);
    setAccessError(null);
    try {
      const response = await apiClient.get('/api/v1/users');
      setUsers(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setAccessError("🔒 Akses Ditolak: Halaman ini khusus untuk Administrator.");
      } else {
        console.error("Gagal mengambil data user", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi untuk membuka Modal Edit
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditRole(user.role || 'Pengguna Biasa'); // Set default role saat modal dibuka
    setIsModalOpen(true);
  };

  // Fungsi UPDATE: Simpan perubahan ke FastAPI
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsSaving(true);
    try {
      // Panggil endpoint PUT yang baru kita buat
      await apiClient.put(`/api/v1/users/${editingUser.id}`, {
        role: editRole,
      });
      
      setIsModalOpen(false); // Tutup modal
      fetchUsers(); // Refresh tabel agar data terbaru muncul
      alert("✅ Data User berhasil diperbarui!");
      
    } catch (error) {
      console.error("Gagal update user", error);
      alert("❌ Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-on-surface-variant">Memuat data pengguna...</div>;

  // Tampilan jika User BUKAN Admin
  if (accessError) return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto font-body flex justify-center items-center min-h-[60vh]">
      <div className="bg-red-50 text-error p-10 rounded-3xl border border-red-100 shadow-sm text-center max-w-lg">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">gpp_bad</span>
        </div>
        <h2 className="text-2xl font-bold font-headline mb-3">Akses Terbatas</h2>
        <p className="text-sm font-medium leading-relaxed opacity-90">{accessError}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto font-body">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-on-surface">User Management</h1>
        <p className="text-on-surface-variant">Kelola peran dan akses pengguna dalam sistem Sanctuary.</p>
      </div>

      {/* Tabel Data User */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-tonal overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-widest border-b border-surface-container-highest">
              <th className="p-4 font-bold">ID</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Role</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-surface-container-highest/50 hover:bg-surface-container-low/30 transition-colors">
                <td className="p-4 text-on-surface-variant">#{user.id}</td>
                <td className="p-4 font-bold text-on-surface">{user.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user.role === 'Admin' ? 'bg-primary/10 text-primary' : 
                    user.role === 'Operator' ? 'bg-secondary/10 text-secondary' : 
                    'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    {user.role || 'Pengguna Biasa'}
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2 text-green-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Aktif
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => openEditModal(user)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span> Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL EDIT USER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md p-8 border border-surface-container-highest animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-xl font-bold text-on-surface">Edit Data User</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdateUser} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email Pengguna (Hanya Baca)</label>
                <input 
                  type="email" 
                  value={editingUser?.email} 
                  disabled
                  className="w-full p-3 rounded-xl bg-surface-container text-on-surface-variant border-none outline-none opacity-70 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Ubah Hak Akses (Role)</label>
                {/* DROPDOWN UNTUK KATEGORI ROLE */}
                <select 
                  value={editRole} 
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="Pengguna Biasa">Pengguna Biasa</option>
                  <option value="Operator">Operator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-surface-container-highest">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-surface-container hover:bg-surface-container-high rounded-full font-semibold text-on-surface transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 py-3 bg-primary hover:bg-primary-dim text-white rounded-full font-semibold shadow-md transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}