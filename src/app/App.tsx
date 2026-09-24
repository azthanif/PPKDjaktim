import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router';
import { ChevronDown, User, LogOut, ClipboardList, X, CheckCircle, Clock, FileText, BookOpen } from 'lucide-react';
import LoadingBar from './components/LoadingBar';
import ChatbotAssistant from './components/ChatbotAssistant';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoDKI from '../imports/content--20230330031636.png';
import logoPPKD from '../imports/logo-ppkd-jaktim.png';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import pages
import Home from './components/Home';
import TentangKami from './components/TentangKami';
import Pendaftaran from './components/Pendaftaran';
import ProgramJadwal from './components/ProgramJadwal';
import OnlineTest from './components/OnlineTest';
import DataPelatihan from './components/DataPelatihan';
import DataAlumni from './components/DataAlumni';
import DataPerusahaan from './components/DataPerusahaan';
import ProfilPengguna from './components/ProfilPengguna';
import FormPendaftaran from './components/FormPendaftaran';
import KelasSaya from './components/KelasSaya';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AccessibilityWidget from './components/AccessibilityWidget';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [pelatihanDropdownOpen, setPelatihanDropdownOpen] = useState(false);
  const [pusatDataDropdownOpen, setPusatDataDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [regTick, setRegTick] = useState(0);

  const getRegistrationStatus = () => {
    if (!user) return null;
    try {
      const list = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
      return list.find((r: { email: string }) => r.email === user.email) || null;
    } catch { return null; }
  };

  // Auto-verify registration 1 minute after submission
  useEffect(() => {
    if (!user) return;
    const reg = getRegistrationStatus();
    if (!reg || reg.status === 'selesai') return;
    const elapsed = Date.now() - new Date(reg.tanggal).getTime();
    const remaining = 60_000 - elapsed;
    const verify = () => {
      try {
        const list = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
        const updated = list.map((r: { email: string }) =>
          r.email === user.email ? { ...r, status: 'selesai' } : r
        );
        localStorage.setItem('ppkd_registrations', JSON.stringify(updated));
        setRegTick(t => t + 1);
      } catch {}
    };
    if (remaining <= 0) { verify(); return; }
    const timer = setTimeout(verify, remaining);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, regTick]);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  // Determine active menu based on current path
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path === '/') return 'Beranda';
    if (path.includes('/tentang-kami') || path.includes('/visi-misi') || path.includes('/struktur-organisasi') || path.includes('/profil-lembaga')) return 'Profil Lembaga';
    if (path.includes('/pendaftaran') || path.includes('/program-jadwal')) return 'Pelatihan';
    if (path.includes('/online-test')) return 'Online Test';
    if (path.includes('/data-pelatihan') || path.includes('/data-alumni') || path.includes('/data-perusahaan')) return 'Pusat Data';
    return 'Beranda';
  };

  const activeMenu = getActiveMenu();

  return (
    <div className="min-h-screen bg-white">
      <LoadingBar />
      <div id="a11y-main">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3">
              <ImageWithFallback src={logoDKI} alt="Logo Provinsi DKI Jakarta" className="h-12 w-12 object-contain" />
              <ImageWithFallback src={logoPPKD} alt="Logo PPKD Jakarta Timur" className="h-12 w-12 object-contain" />
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold text-gray-800">PPKD Jakarta Timur</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md text-base transition-all ${
                  activeMenu === 'Beranda'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Beranda
              </Link>

              <Link
                to="/tentang-kami"
                className={`px-4 py-2 rounded-md text-base transition-all ${
                  activeMenu === 'Profil Lembaga'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Profil Lembaga
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setPelatihanDropdownOpen(true)}
                onMouseLeave={() => setPelatihanDropdownOpen(false)}
              >
                <button
                  className={`px-4 py-2 rounded-md text-base transition-all flex items-center gap-1 ${
                    activeMenu === 'Pelatihan'
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Pelatihan
                  <ChevronDown className="w-4 h-4" />
                </button>

                {pelatihanDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <Link
                        to="/pendaftaran"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setPelatihanDropdownOpen(false)}
                      >
                        Pendaftaran
                      </Link>
                      <Link
                        to="/program-jadwal"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setPelatihanDropdownOpen(false)}
                      >
                        Program dan Jadwal Pelatihan
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/online-test"
                className={`px-4 py-2 rounded-md text-base transition-all ${
                  activeMenu === 'Online Test'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Online Test
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setPusatDataDropdownOpen(true)}
                onMouseLeave={() => setPusatDataDropdownOpen(false)}
              >
                <button
                  className={`px-4 py-2 rounded-md text-base transition-all flex items-center gap-1 ${
                    activeMenu === 'Pusat Data'
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Pusat Data
                  <ChevronDown className="w-4 h-4" />
                </button>

                {pusatDataDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <Link
                        to="/data-pelatihan"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setPusatDataDropdownOpen(false)}
                      >
                        Data Pelatihan
                      </Link>
                      <Link
                        to="/data-alumni"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setPusatDataDropdownOpen(false)}
                      >
                        Data Alumni
                      </Link>
                      <Link
                        to="/data-perusahaan"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setPusatDataDropdownOpen(false)}
                      >
                        Data Perusahaan
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Auth area */}
            {user ? (
              /* Avatar profil pengguna */
              <div
                className="relative"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <button className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all">
                    {getInitials(user.fullName)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute top-full right-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {/* Info pengguna */}
                      <div className="px-5 py-4 bg-blue-50 border-b border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {getInitials(user.fullName)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{user.fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      {/* Menu */}
                      <div className="py-2">
                        <button
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => { setProfileDropdownOpen(false); navigate('/profil'); }}
                        >
                          <User className="w-4 h-4 text-blue-500" />
                          Lihat Profil
                        </button>
                        <button
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => { setProfileDropdownOpen(false); setShowStatusModal(true); }}
                        >
                          <ClipboardList className="w-4 h-4 text-purple-500" />
                          Status Pendaftaran
                        </button>
                        {(() => {
                          const reg = getRegistrationStatus();
                          const enabled = reg?.status === 'selesai';
                          return enabled ? (
                            <button
                              className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                              onClick={() => { setProfileDropdownOpen(false); navigate('/kelas-saya'); }}
                            >
                              <BookOpen className="w-4 h-4 text-green-500" />
                              Kelas Saya
                            </button>
                          ) : (
                            <div className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-300 cursor-not-allowed select-none" title="Selesaikan pendaftaran terlebih dahulu">
                              <BookOpen className="w-4 h-4 text-gray-300" />
                              Kelas Saya
                              <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">Terkunci</span>
                            </div>
                          );
                        })()}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Keluar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Tombol Login/Daftar */
              <div
                className="relative"
                onMouseEnter={() => setLoginDropdownOpen(true)}
                onMouseLeave={() => setLoginDropdownOpen(false)}
              >
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-base transition-colors shadow-sm flex items-center gap-1">
                  Login/Daftar
                  <ChevronDown className="w-4 h-4" />
                </button>
                {loginDropdownOpen && (
                  <div className="absolute top-full right-0 pt-2 w-40 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <Link
                        to="/login"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setLoginDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setLoginDropdownOpen(false)}
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />
      </div>{/* end #a11y-main */}

      {/* Chatbot Assistant */}
      <ChatbotAssistant />

      {/* Accessibility Widget */}
      <AccessibilityWidget />

      {/* Modal Status Pendaftaran */}
      {showStatusModal && (() => {
        const reg = getRegistrationStatus();
        const steps = [
          { key: 'dikirim', label: 'Formulir Dikirim', desc: 'Data pendaftaran telah diterima sistem', icon: FileText },
          { key: 'verifikasi', label: 'Menunggu Verifikasi', desc: 'Tim PPKD sedang memverifikasi data Anda', icon: Clock },
          { key: 'selesai', label: 'Pendaftaran Selesai', desc: 'Selamat! Pendaftaran Anda telah disetujui', icon: CheckCircle },
        ];
        const activeStep = reg
          ? reg.status === 'selesai' ? 2 : 1
          : -1;

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] px-4" onClick={() => setShowStatusModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Status Pendaftaran</h3>
                </div>
                <button onClick={() => setShowStatusModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reg ? (
                <>
                  {/* Info program */}
                  <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6">
                    <p className="text-xs text-blue-500 font-medium mb-0.5">Program yang didaftarkan</p>
                    <p className="text-sm font-semibold text-blue-800">{reg.program}</p>
                    <p className="text-xs text-blue-400 mt-0.5">
                      {new Date(reg.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="relative mb-2">
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200" />
                    <div
                      className="absolute top-4 left-4 h-0.5 bg-blue-500 transition-all duration-700"
                      style={{ width: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%' }}
                    />
                    <div className="relative flex justify-between">
                      {steps.map((step, i) => {
                        const Icon = step.icon;
                        const done = i <= activeStep;
                        const active = i === activeStep;
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-2" style={{ width: '33%' }}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all ${
                              done
                                ? active
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-300 bg-white text-gray-300'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <p className={`text-xs font-semibold text-center leading-tight ${done ? 'text-gray-800' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Keterangan status aktif */}
                  <div className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                    activeStep === 2 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {steps[activeStep]?.desc}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">Anda belum melakukan pendaftaran pelatihan.</p>
                  <button
                    onClick={() => { setShowStatusModal(false); navigate('/pendaftaran'); }}
                    className="mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isFullscreenPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/form-pendaftaran';

  if (isFullscreenPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form-pendaftaran" element={<FormPendaftaran />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/visi-misi" element={<TentangKami />} />
        <Route path="/struktur-organisasi" element={<TentangKami />} />
        <Route path="/pendaftaran" element={<Pendaftaran />} />
        <Route path="/program-jadwal" element={<ProgramJadwal />} />
        <Route path="/online-test" element={<OnlineTest />} />
        <Route path="/data-pelatihan" element={<DataPelatihan />} />
        <Route path="/data-alumni" element={<DataAlumni />} />
        <Route path="/data-perusahaan" element={<DataPerusahaan />} />
        <Route path="/profil" element={<ProfilPengguna />} />
        <Route path="/kelas-saya" element={<KelasSaya />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
