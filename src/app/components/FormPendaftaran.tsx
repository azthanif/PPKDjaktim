import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Phone, Upload, FileText, CheckCircle, X, AlertCircle, GraduationCap, Shield, Clock, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UploadedFile { name: string; size: number; }

interface FormData {
  nama: string;
  email: string;
  noHp: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat: string;
  program: string;
}

interface FileUploads {
  ktp: UploadedFile | null;
  ijazah: UploadedFile | null;
  suratSehat: UploadedFile | null;
}

type FormKey = keyof FormData;
type FileKey = keyof FileUploads;
type ErrorKey = FormKey | FileKey;

const MAX_MB = 5;
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

const PROGRAMS = [
  'Barista',
  'Pastry & Bakery',
  'Tata Boga',
  'Pengolahan Makanan Sehat',
  'Digital Marketing',
  'Data Analysis',
  'Web Development',
  'Desain UI/UX',
  'Desain Grafis',
  'Fotografi & Videografi',
  'Animasi Digital',
];

function UploadBox({ label, hint, number, file, error, onFile, onClear }: {
  label: string; hint: string; number: number;
  file: UploadedFile | null; error?: string;
  onFile: (f: UploadedFile) => void; onClear: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const fmt = (b: number) => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  const processFile = useCallback((f: File) => {
    if (!ALLOWED.includes(f.type)) return;
    if (f.size > MAX_MB * 1024 * 1024) return;
    onFile({ name: f.name, size: f.size });
  }, [onFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{number}</span>
        <div>
          <p className="text-sm font-semibold text-gray-800">{label} <span className="text-red-500">*</span></p>
          <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
        </div>
      </div>
      {file ? (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 ml-9">
          <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800 truncate">{file.name}</p>
            <p className="text-xs text-green-500">{fmt(file.size)}</p>
          </div>
          <button type="button" onClick={onClear} className="p-1 rounded-full text-green-400 hover:bg-green-100 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => ref.current?.click()}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && ref.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`ml-9 w-full border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-2 cursor-pointer transition-all select-none focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            dragging
              ? 'border-blue-500 bg-blue-50 scale-[1.01]'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <Upload className={`w-6 h-6 flex-shrink-0 transition-colors ${dragging ? 'text-blue-500' : error ? 'text-red-400' : 'text-gray-400'}`} />
          <div className="text-center">
            <p className={`text-sm font-medium ${dragging ? 'text-blue-600' : error ? 'text-red-500' : 'text-gray-500'}`}>
              {dragging ? 'Lepaskan untuk mengunggah' : 'Klik atau seret file ke sini'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, PDF · Maks. {MAX_MB} MB</p>
          </div>
        </div>
      )}
      {error && !file && (
        <p className="ml-9 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
      <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleChange} />
    </div>
  );
}

export default function FormPendaftaran() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<FormData>({
    nama: user?.fullName || '',
    email: user?.email || '',
    noHp: user?.phone || '',
    tanggalLahir: '',
    jenisKelamin: '',
    alamat: user?.address || '',
    program: '',
  });
  const [files, setFiles] = useState<FileUploads>({ ktp: null, ijazah: null, suratSehat: null });
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Partial<Record<ErrorKey, string>> => {
    const errs: Partial<Record<ErrorKey, string>> = {};
    if (!form.nama.trim()) errs.nama = 'Nama wajib diisi';
    if (!form.email.trim()) errs.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid';
    if (!form.noHp.trim()) errs.noHp = 'Nomor HP wajib diisi';
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.noHp)) errs.noHp = 'Nomor HP tidak valid';
    if (!form.tanggalLahir) errs.tanggalLahir = 'Tanggal lahir wajib diisi';
    if (!form.jenisKelamin) errs.jenisKelamin = 'Jenis kelamin wajib dipilih';
    if (!form.alamat.trim()) errs.alamat = 'Alamat wajib diisi';
    if (!form.program) errs.program = 'Program pelatihan wajib dipilih';
    if (!files.ktp) errs.ktp = 'Wajib diunggah';
    if (!files.ijazah) errs.ijazah = 'Wajib diunggah';
    if (!files.suratSehat) errs.suratSehat = 'Wajib diunggah';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    // Simpan ke localStorage agar bisa ditampilkan di Status Pendaftaran
    const existing = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
    const entry = {
      email: form.email,
      nama: form.nama,
      program: form.program,
      tanggal: new Date().toISOString(),
      status: 'menunggu_verifikasi',
    };
    const idx = existing.findIndex((r: typeof entry) => r.email === form.email);
    if (idx >= 0) existing[idx] = entry; else existing.push(entry);
    localStorage.setItem('ppkd_registrations', JSON.stringify(existing));
    setSubmitted(true);
  };

  const inputClass = (key: ErrorKey) =>
    `w-full py-3 rounded-xl border text-sm outline-none transition-all ${
      errors[key]
        ? 'border-red-400 bg-red-50'
        : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
    }`;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendaftaran Terkirim!</h2>
          <p className="text-gray-600 mb-1">Terima kasih, <span className="font-semibold text-gray-900">{form.nama}</span>.</p>
          <p className="text-sm text-blue-600 font-medium mb-1">Program: {form.program}</p>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Tim PPKD Jakarta Timur akan segera memverifikasi data Anda dan menghubungi melalui email atau nomor HP yang didaftarkan.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/')} className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors">
              Kembali ke Beranda
            </button>
            <button onClick={() => navigate('/pendaftaran')} className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm transition-colors">
              Info Pendaftaran
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      {/* Panel kiri */}
      <div className="hidden lg:flex lg:w-2/5 bg-white border-r border-gray-100 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-50 rounded-full" />
        <div className="absolute -bottom-24 -right-12 w-80 h-80 bg-blue-50 rounded-full" />

        <div className="relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-12 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
            <GraduationCap className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4 text-gray-900">Formulir Pendaftaran Pelatihan</h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Isi data diri dan unggah dokumen persyaratan untuk mendaftar program pelatihan PPKD Jakarta Timur.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Pelatihan 100% gratis untuk peserta terpilih</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Proses verifikasi 3–5 hari kerja</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Data Anda aman dan terjaga kerahasiaannya</p>
          </div>
        </div>
      </div>

      {/* Panel kanan — form */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="min-h-full flex flex-col">
          <div className="lg:hidden px-6 pt-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
          </div>

          <div className="flex-1 px-6 lg:px-12 py-8 max-w-xl w-full mx-auto lg:mx-0">
            <div className="mb-8 lg:mt-4">
              <h2 className="text-2xl font-bold text-gray-900">Data Pendaftar</h2>
              <p className="text-gray-400 text-sm mt-1">Semua kolom bertanda <span className="text-red-500">*</span> wajib diisi</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-8 pb-12">

              {/* === Data Diri === */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Informasi Diri</h3>

                {/* Nama */}
                <div data-error={!!errors.nama}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={form.nama} onChange={setField('nama')} placeholder="Sesuai KTP"
                      className={`${inputClass('nama')} pl-10 pr-4`} />
                  </div>
                  {errors.nama && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.nama}</p>}
                </div>

                {/* Email */}
                <div data-error={!!errors.email}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={form.email} onChange={setField('email')} placeholder="contoh@email.com"
                      className={`${inputClass('email')} pl-10 pr-4`} />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>

                {/* No HP */}
                <div data-error={!!errors.noHp}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nomor HP <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" value={form.noHp} onChange={setField('noHp')} placeholder="08xxxxxxxxxx"
                      className={`${inputClass('noHp')} pl-10 pr-4`} />
                  </div>
                  {errors.noHp && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.noHp}</p>}
                </div>

                {/* Tanggal Lahir */}
                <div data-error={!!errors.tanggalLahir}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="date" value={form.tanggalLahir} onChange={setField('tanggalLahir')}
                      max={new Date().toISOString().split('T')[0]}
                      className={`${inputClass('tanggalLahir')} pl-10 pr-4`} />
                  </div>
                  {errors.tanggalLahir && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.tanggalLahir}</p>}
                </div>

                {/* Jenis Kelamin */}
                <div data-error={!!errors.jenisKelamin}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    {['Laki-laki', 'Perempuan'].map(jk => (
                      <label key={jk}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                          form.jenisKelamin === jk
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : errors.jenisKelamin
                              ? 'border-red-300 bg-red-50 text-gray-500'
                              : 'border-gray-200 bg-white text-gray-500 hover:border-blue-300'
                        }`}
                      >
                        <input type="radio" name="jenisKelamin" value={jk} checked={form.jenisKelamin === jk}
                          onChange={setField('jenisKelamin')} className="sr-only" />
                        {jk === 'Laki-laki' ? '♂' : '♀'} {jk}
                      </label>
                    ))}
                  </div>
                  {errors.jenisKelamin && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.jenisKelamin}</p>}
                </div>

                {/* Alamat */}
                <div data-error={!!errors.alamat}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea value={form.alamat} onChange={setField('alamat')} placeholder="Jl. Nama Jalan, No, RT/RW, Kelurahan, Kecamatan, Kota"
                      rows={3}
                      className={`${inputClass('alamat')} pl-10 pr-4 resize-none`} />
                  </div>
                  {errors.alamat && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.alamat}</p>}
                </div>
              </div>

              {/* === Program === */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Program Pelatihan</h3>

                <div data-error={!!errors.program}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pilih Program <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select value={form.program} onChange={setField('program')}
                      className={`${inputClass('program')} pl-10 pr-4 appearance-none`}>
                      <option value="">-- Pilih program pelatihan --</option>
                      {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</div>
                  </div>
                  {errors.program && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.program}</p>}
                </div>
              </div>

              {/* === Dokumen === */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Dokumen Persyaratan</h3>
                  <p className="text-xs text-gray-400">Format: JPG, PNG, PDF · Maks. {MAX_MB} MB per file</p>
                </div>
                <UploadBox number={1} label="Fotokopi KTP atau Kartu Identitas" hint="Scan atau foto KTP yang jelas dan terbaca"
                  file={files.ktp} error={errors.ktp}
                  onFile={f => { setFiles(p => ({ ...p, ktp: f })); setErrors(p => ({ ...p, ktp: undefined })); }}
                  onClear={() => setFiles(p => ({ ...p, ktp: null }))} />
                <UploadBox number={2} label="Fotokopi Ijazah Terakhir" hint="Ijazah SMP, SMA, SMK, D3, atau S1 yang telah dilegalisir"
                  file={files.ijazah} error={errors.ijazah}
                  onFile={f => { setFiles(p => ({ ...p, ijazah: f })); setErrors(p => ({ ...p, ijazah: undefined })); }}
                  onClear={() => setFiles(p => ({ ...p, ijazah: null }))} />
                <UploadBox number={3} label="Surat Keterangan Sehat dari Dokter" hint="Dari puskesmas atau klinik resmi yang masih berlaku"
                  file={files.suratSehat} error={errors.suratSehat}
                  onFile={f => { setFiles(p => ({ ...p, suratSehat: f })); setErrors(p => ({ ...p, suratSehat: undefined })); }}
                  onClear={() => setFiles(p => ({ ...p, suratSehat: null }))} />
              </div>

              {/* Submit */}
              <div>
                <button type="submit"
                  className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-base transition-colors shadow-lg shadow-blue-200">
                  Kirim Pendaftaran
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Dengan mendaftar, Anda menyetujui syarat dan ketentuan PPKD Jakarta Timur
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
