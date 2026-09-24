import { FileText, CheckCircle, Users, Calendar, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Pendaftaran() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Syarat Pendaftaran */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Siapa Saja yang Bisa Bergabung?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Usia</h3>
                  <p className="text-gray-600">Berusia 17-35 tahun</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Pendidikan</h3>
                  <p className="text-gray-600">Minimal Lulusan SMP/sederajat </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Domisili</h3>
                  <p className="text-gray-600">Tinggal di Jakarta dan sekitarnya</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Kesehatan</h3>
                  <p className="text-gray-600">Sehat Jasmani dan Rohani</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dokumen yang Diperlukan */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Dokumen Yang Diperlukan</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-center">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                <span className="text-gray-900 font-medium">Fotokopi KTP atau Kartu Identitas</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                <span className="text-gray-900 font-medium">Fotokopi ijazah terakhir</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                <span className="text-gray-900 font-medium">Pas foto ukuran 3x4</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                <span className="text-gray-900 font-medium">Surat keterangan sehat dari dokter</span>
              </li>
            </ul>
          </div>

          {/* Alur Pendaftaran */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Cara Daftar
            </h2>
            <p className="text-gray-600 mb-6">
              4 Langkah Pendaftaran
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">1. Isi Formulir</h3>
                <p className="text-sm text-gray-600">Lengkapi data diri secara online</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">2. Verifikasi</h3>
                <p className="text-sm text-gray-600">Tim PPKD Jakarta Timur akan verifikasi data calon peserta</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">3. Ikuti Seleksi</h3>
                <p className="text-sm text-gray-600">Ikuti seleksi calon peserta</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">4. Pengumuman</h3>
                <p className="text-sm text-gray-600">Cek hasilnya secara online</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white rounded-xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Yuk, Wujudkan Mimpimu Sekarang!
            </h2>
            <p className="text-xl mb-3">
              Ribuan alumni kami sudah berhasil. Sekarang giliranmu!
            </p>
            <p className="text-lg mb-6 text-blue-100">
              Pelatihan berkualitas, <span className="font-bold">GRATIS</span>, dan langsung tersalurkan ke dunia kerja
            </p>
            <button
              onClick={() => navigate('/form-pendaftaran')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              DAFTAR SEKARANG - GRATIS!
            </button>
            <p className="text-sm mt-4 text-blue-100">
              Kuota terbatas! Jangan sampai menyesal karena kehabisan kuota
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
