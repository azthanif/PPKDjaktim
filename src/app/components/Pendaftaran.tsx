import { FileText, CheckCircle, Users, Calendar, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import PageHeader from './PageHeader';

export default function Pendaftaran() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Pelatihan' }, { label: 'Pendaftaran' }]}
        title="Pendaftaran"
        subtitle="Daftarkan diri Anda untuk mengikuti program pelatihan PPKD Jakarta Timur"
      />
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
          <div className="bg-white rounded-xl shadow-md px-6 py-10 sm:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Yuk, Wujudkan Mimpimu Sekarang!
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Ribuan alumni kami sudah berhasil. Sekarang giliranmu!
            </p>
 
            <ul className="flex flex-wrap justify-center gap-3 mt-6">
              {['Pelatihan berkualitas', 'Gratis, tanpa biaya', 'Tersalurkan ke dunia kerja'].map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full"
                >
                  <CheckCircle className="w-4 h-4" />
                  {item}
                </li>
              ))}
            </ul>
 
            <button
              onClick={() => navigate('/form-pendaftaran')}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Daftar Gratis Sekarang
            </button>
 
            <p className="block w-fit mx-auto mt-5 bg-amber-50 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full">
              Kuota terbatas, daftar sebelum penuh!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
