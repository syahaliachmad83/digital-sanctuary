import { useEffect, useState } from 'react';
import apiClient from '../services/api';

// Tipe Data
interface UserProfile {
  email?: string;
  role?: string;
  nodesProtected?: number;
  integrityScore?: number;
}

interface NodeData {
  id: number;
  endpoint: string;
  traffic_type: string;
  status: string;
  throughput: string;
}

export default function Dashboard() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Modal Tambah Node
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNode, setNewNode] = useState({ endpoint: '', traffic_type: 'Encrypted HTTPS', throughput: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Fungsi READ: Ambil Data User & Data Node sekaligus
  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, nodesRes] = await Promise.all([
        apiClient.get('/api/v1/users/me'),
        apiClient.get('/api/v1/nodes')
      ]);

      const fetchedNodes = nodesRes.data;
      
      setData({
        ...userRes.data,
        nodesProtected: fetchedNodes.length, // ANGKA INI SEKARANG DINAMIS!
        integrityScore: 98, // (Bisa dibuat dinamis nanti)
      });
      setNodes(fetchedNodes);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi CREATE: Tambah Node Baru
  const handleAddNode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.post('/api/v1/nodes', {
        ...newNode,
        status: 'Active'
      });
      setIsModalOpen(false);
      setNewNode({ endpoint: '', traffic_type: 'Encrypted HTTPS', throughput: '' }); // Reset form
      fetchData(); // Refresh tabel dan angka di Bento Card
    } catch (error) {
      alert('Gagal menambah node. Pastikan server menyala.');
    } finally {
      setIsSaving(false);
    }
  };

  // Fungsi DELETE: Hapus Node
  const handleDeleteNode = async (id: number, endpointName: string) => {
    if (!window.confirm(`Matikan dan hapus node ${endpointName}?`)) return;
    try {
      await apiClient.delete(`/api/v1/nodes/${id}`);
      fetchData(); // Refresh data
    } catch (error) {
      alert('Gagal menghapus node.');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
        <p className="text-on-surface-variant font-medium animate-pulse">Menyinkronkan data Sanctuary...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in-up font-body">
      
      {/* 1. HERO SECTION */}
      <section className="space-y-4">
        <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest uppercase">Secured Session Active</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface font-headline tracking-tight">Protected Dashboard Shell</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
           Welcome back, <span className="text-primary font-bold">{data?.email}</span>. Your digital perimeter is active.
        </p>
      </section>

      {/* 2. BENTO GRID CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Security Status Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between min-h-[220px] shadow-sm border border-surface-container">
            <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                </div>
                <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">Secure</span>
            </div>
            <div>
                <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Security Status</h3>
                <p className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">99.9% Protected</p>
            </div>
        </div>

        {/* Active Nodes Card (DINAMIS) */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between min-h-[220px] shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <div>
                <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Active Nodes</h3>
                <div className="flex items-baseline gap-2">
                    {/* Mengambil panjang array nodes dari database */}
                    <p className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">{data?.nodesProtected}</p>
                    <span className="text-xs font-medium text-on-surface-variant mt-1">Global Hubs</span>
                </div>
            </div>
        </div>

        {/* Integrity Score Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between min-h-[220px] shadow-sm border border-surface-container">
            <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
                <div>
                    <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Integrity Score</h3>
                    <p className="font-headline text-3xl font-extrabold tracking-tight text-tertiary">{data?.integrityScore}<span className="text-2xl text-on-surface-variant/50">/100</span></p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. MAIN DATA TABLE (DINAMIS) */}
      <section className="bg-surface-container-lowest rounded-[2rem] p-8 lg:p-12 shadow-sm border border-surface-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
                <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Active Data Endpoints</h3>
                <p className="text-on-surface-variant text-sm mt-1">Real-time packet inspection from SQLite Database.</p>
            </div>
            {/* Tombol Add Node */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-md hover:bg-primary-dim hover:shadow-lg transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">add</span> Add New Node
            </button>
        </div>

        {/* Tabel Data - overflow-x-auto untuk mencegah pecah di Mobile */}
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
                <thead>
                    <tr className="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest border-b border-surface-container-low">
                        <th className="pb-4">Endpoint</th>
                        <th className="pb-4">Traffic Type</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Throughput</th>
                        <th className="pb-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {nodes.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-on-surface-variant italic">Belum ada node yang dilindungi. Tambahkan node baru.</td>
                        </tr>
                    ) : (
                        nodes.map((node) => (
                            <tr key={node.id} className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50 last:border-0">
                                <td className="py-4 font-bold text-on-surface">{node.endpoint}</td>
                                <td className="py-4 text-on-surface-variant">{node.traffic_type}</td>
                                <td className="py-4">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                        {node.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right font-headline text-on-surface">{node.throughput}</td>
                                <td className="py-4 text-center">
                                    <button 
                                        onClick={() => handleDeleteNode(node.id, node.endpoint)}
                                        className="text-error/60 hover:text-error hover:bg-error-container/10 p-2 rounded-lg transition-colors"
                                        title="Matikan Node"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </section>

      {/* 4. MODAL ADD NODE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up border border-surface-container-highest">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-xl font-bold text-on-surface">Deploy New Node</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddNode} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Endpoint Name</label>
                <input 
                  type="text" required
                  value={newNode.endpoint} 
                  onChange={(e) => setNewNode({...newNode, endpoint: e.target.value})}
                  placeholder="e.g. Jakarta-Core-01"
                  className="w-full p-3.5 rounded-xl bg-surface-container-low text-on-surface border border-transparent focus:border-primary/30 focus:bg-surface-container-lowest focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Traffic Type</label>
                <select 
                  value={newNode.traffic_type} 
                  onChange={(e) => setNewNode({...newNode, traffic_type: e.target.value})}
                  className="w-full p-3.5 rounded-xl bg-surface-container-low text-on-surface border border-transparent focus:border-primary/30 outline-none font-medium cursor-pointer"
                >
                  <option value="Encrypted HTTPS">Encrypted HTTPS</option>
                  <option value="Internal API">Internal API</option>
                  <option value="WebSocket Stream">WebSocket Stream</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Estimated Throughput</label>
                <input 
                  type="text" required
                  value={newNode.throughput} 
                  onChange={(e) => setNewNode({...newNode, throughput: e.target.value})}
                  placeholder="e.g. 500 GB/d"
                  className="w-full p-3.5 rounded-xl bg-surface-container-low text-on-surface border border-transparent focus:border-primary/30 focus:bg-surface-container-lowest focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 bg-surface-container hover:bg-surface-container-high rounded-full font-semibold text-on-surface transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 py-3.5 bg-primary hover:bg-primary-dim text-white rounded-full font-bold shadow-md shadow-primary/20 transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Deploying...' : 'Deploy Node'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}