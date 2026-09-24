import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Trash2, LogOut, ShieldAlert, X, ArrowLeft, Pencil, Check, ClipboardList, FileText, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Registration {
  email: string;
  nama: string;
  program: string;
  tanggal: string;
  status: 'menunggu_verifikasi' | 'selesai';
}

export default function ProfilPengguna() {
  const { user, login, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // State edit per field
  const [editField, setEditField] = useState<'email' | 'phone' | 'address' | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const handleDeleteAccount = () => { deleteAccount(); navigate('/'); };
  const handleLogout = () => { logout(); navigate('/'); };

  const getRegistration = (): Registration | null => {
    try {
      const list: Registration[] = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
      return list.find(r => r.email === user.email) || null;
    } catch { return null; }
  };

  const reg = getRegistration();

  const startEdit = (field: 'email' | 'phone' | 'address') => {
    setEditField(field);
    setEditValue(field === 'email' ? user.email : field === 'phone' ? (user.phone || '') : (user.address || ''));
  };

  const saveEdit = () => {
    if (!editField) return;
    const updated = { ...user };
    if (editField === 'email') updated.email = editValue.trim();
    if (editField === 'phone') updated.phone = editValue.trim();
    if (editField === 'address') updated.address = editValue.trim();
    login(updated);
    setEditField(null);
  };

  const cancelEdit = () => setEditField(null);

  const EditableRow = ({
    field, label, value, icon, iconBg, inputType = 'text',
  }: {
    field: 'email' | 'phone' | 'address';
    label: string;
    value: string;
    icon: React.ReactNode;
    iconBg: string;
    inputType?: string;
  }) => {
    const isEditing = editField === field;
    return (
      <div className="flex items-center gap-4 px-6 py-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-0.5">{label}</p>
          {isEditing ? (
            <input
              autoFocus
              type={inputType}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit(); }}
              className="w-full text-sm font-medium text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent pb-0.5"
            />
          ) : (
            <p className="font-medium text-gray-900 truncate">{value || '-'}</p>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={saveEdit}
                className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                title="Simpan"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={cancelEdit}
                className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                title="Batal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => startEdit(field)}
              className="p-1.5 rounded-lg text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              title={`Edit ${label}`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali</span>
          </button>

          {/* Avatar & nama */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {getInitials(user.fullName)}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
              <p className="text-sm text-blue-600 mt-1">Peserta Pelatihan</p>
            </div>
          </div>

          {/* Info detail */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Informasi Akun</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {/* Nama — tidak bisa diedit */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">Nama Lengkap</p>
                  <p className="font-medium text-gray-900">{user.fullName}</p>
                </div>
              </div>

              <EditableRow
                field="email"
                label="Email"
                value={user.email}
                inputType="email"
                iconBg="bg-green-50"
                icon={<Mail className="w-5 h-5 text-green-600" />}
              />
              <EditableRow
                field="phone"
                label="Nomor Telepon"
                value={user.phone || ''}
                inputType="tel"
                iconBg="bg-purple-50"
                icon={<Phone className="w-5 h-5 text-purple-600" />}
              />
              <EditableRow
                field="address"
                label="Alamat"
                value={user.address || ''}
                iconBg="bg-orange-50"
                icon={<MapPin className="w-5 h-5 text-orange-500" />}
              />
            </div>
          </div>

          {/* Status Pendaftaran */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Status Pendaftaran Pelatihan</h3>
            </div>

            {reg ? (() => {
              const steps = [
                { label: 'Formulir Dikirim', desc: 'Data pendaftaran telah diterima', icon: FileText },
                { label: 'Menunggu Verifikasi', desc: 'Tim PPKD sedang memverifikasi data Anda', icon: Clock },
                { label: 'Pendaftaran Selesai', desc: 'Pendaftaran Anda telah disetujui', icon: CheckCircle },
              ];
              const activeStep = reg.status === 'selesai' ? 2 : 1;

              return (
                <div className="px-6 py-5 space-y-5">
                  {/* Info program */}
                  <div className="bg-blue-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-blue-500 font-medium mb-0.5">Program yang didaftarkan</p>
                    <p className="text-sm font-semibold text-blue-800">{reg.program}</p>
                    <p className="text-xs text-blue-400 mt-0.5">
                      Didaftarkan {new Date(reg.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Progress steps */}
                  <div className="relative pt-1">
                    {/* garis horizontal */}
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200" />
                    <div
                      className="absolute top-4 left-4 h-0.5 bg-blue-500 transition-all duration-700"
                      style={{ width: activeStep === 1 ? '50%' : activeStep >= 2 ? 'calc(100% - 2rem)' : '0%' }}
                    />
                    <div className="relative flex justify-between">
                      {steps.map((step, i) => {
                        const Icon = step.icon;
                        const done = i <= activeStep;
                        const active = i === activeStep;
                        return (
                          <div key={step.label} className="flex flex-col items-center gap-2" style={{ width: '33%' }}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all ${
                              done
                                ? active
                                  ? 'border-blue-500 bg-blue-500 text-white ring-4 ring-blue-100'
                                  : 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-200 bg-white text-gray-300'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <p className={`text-xs font-medium text-center leading-tight ${done ? 'text-gray-800' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Keterangan status */}
                  <div className={`rounded-xl px-4 py-3 text-sm ${
                    activeStep >= 2 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {steps[activeStep].desc}
                  </div>
                </div>
              );
            })() : (
              <div className="px-6 py-8 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Anda belum mendaftar program pelatihan.</p>
                <button
                  onClick={() => navigate('/pendaftaran')}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                >
                  Daftar Sekarang
                </button>
              </div>
            )}
          </div>

          {/* Aksi */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Pengaturan Akun</h3>
            </div>
            <div className="divide-y divide-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <LogOut className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Keluar dari Akun</p>
                  <p className="text-xs text-gray-400">Anda akan diarahkan ke beranda</p>
                </div>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium text-red-600">Hapus Akun</p>
                  <p className="text-xs text-gray-400">Akun yang dihapus tidak dapat digunakan kembali</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal konfirmasi hapus akun */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Hapus Akun?</h3>
              </div>
              <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Tindakan ini <span className="font-semibold text-red-600">tidak dapat dibatalkan</span>.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Email <span className="font-medium text-gray-700">{user.email}</span> tidak akan bisa digunakan untuk login lagi.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button onClick={handleDeleteAccount} className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors">
                Ya, Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
