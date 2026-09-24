import { Target, ChevronRight, Eye, Users, CheckCircle } from 'lucide-react';
import PageHeader from './PageHeader';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ppkdImage from '../../imports/IMG_5046-scaled.jpg';

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        crumbs={[{ label: 'Profil Lembaga' }]}
        title="Tentang Kami"
        subtitle="Pusat Pelatihan Kerja Daerah Jakarta Timur"
      />

      {/* ── Hero ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Deskripsi Singkat
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Pusat Pelatihan Kerja Daerah (PPKD) Jakarta Timur adalah Unit Pelaksana Teknis yang berada di bawah Dinas Tenaga Kerja, Transmigrasi, dan Energi Provinsi DKI Jakarta.
              </p>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Dibentuk berdasarkan Pergub Provinsi DKI Jakarta Nomor 40 Tahun 2021, PPKD Jakarta Timur adalah lembaga resmi yang fokus menyiapkan tenaga kerja terampil dan siap bersaing.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Dengan sertifikasi SKKNI (Standar Kompetensi Kerja Nasional Indonesia), lulusan kami diakui dan dibutuhkan oleh industri.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  'Pelatihan Berbasis Kompetensi',
                  'Instruktur Bersertifikat',
                  'Fasilitas Modern',
                  'Konsultasi Karir',
                ].map(text => (
                  <div key={text} className="flex items-center gap-2.5 py-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2 text-sm">Lihat Program Pelatihan<ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="order-1 lg:order-2">
              <ImageWithFallback
                src={ppkdImage}
                alt="Gedung PPKD Jakarta Timur"
                className="rounded-2xl shadow-lg w-full"
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Profil ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Kenali PPKD Jakarta Timur</h2>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/-1zpqjAMtAo"
                title="Video Profil PPKD Jakarta Timur"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Visi &amp; Misi</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Visi</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Menjadi pusat pelatihan kerja yang unggul dan terpercaya dalam menghasilkan tenaga kerja terampil, kompeten, dan berdaya saing tinggi di Jakarta Timur.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Misi</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Menyelenggarakan pelatihan kerja berbasis kompetensi sesuai kebutuhan industri dan perkembangan teknologi',
                  'Meningkatkan kualitas instruktur dan tenaga kependidikan melalui pengembangan kompetensi berkelanjutan',
                  'Menyediakan fasilitas dan peralatan praktik yang modern dan memadai',
                  'Memfasilitasi peserta pelatihan untuk mendapatkan sertifikasi kompetensi dari lembaga berwenang',
                  'Menjalin kemitraan dengan dunia usaha dan industri untuk penyerapan lulusan',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-600 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Struktur Organisasi ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Struktur Organisasi</h2>
          </div>

          {/* Kepala PPKD */}
          <div className="flex justify-center mb-6">
            <div className="bg-white border border-gray-200 rounded-2xl px-10 py-6 text-center shadow-sm w-72 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-gray-900">Kepala PPKD</div>
              <div className="text-gray-400 text-sm mt-1">Pimpinan Pusat Pelatihan Kerja Daerah</div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center mb-6">
            <div className="w-px h-10 bg-gray-300" />
          </div>

          {/* Sub-units */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Sub Bagian Tata Usaha', desc: 'Administrasi dan tata kelola lembaga' },
              { title: 'Seksi Pelatihan',        desc: 'Pengelolaan program pelatihan kerja'  },
              { title: 'Seksi Sarana Prasarana', desc: 'Pengelolaan fasilitas dan peralatan'  },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center border border-gray-200 border-t-2 border-t-blue-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 bg-gray-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
