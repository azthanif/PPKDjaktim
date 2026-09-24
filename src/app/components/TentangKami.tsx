import { Building2, Target, Award, ChevronRight, GraduationCap, Briefcase, Eye, Users, PlayCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ppkdImage from '../../imports/IMG_5046-scaled.jpg';

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-medium text-sm">
                Tentang Kami
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Mencetak Tenaga Kerja <span className="text-blue-600">Berkualitas</span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Pusat Pelatihan Kerja Daerah (PPKD) Jakarta Timur adalah Unit Pelaksana Teknis yang berada di bawah Dinas Tenaga Kerja, Transmigrasi, dan Energi Provinsi DKI Jakarta.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Dibentuk berdasarkan Pergub Provinsi DKI Jakarta Nomor 40 Tahun 2021, PPKD Jakarta Timur adalah lembaga resmi yang fokus menyiapkan tenaga kerja terampil dan siap bersaing.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Dengan sertifikasi SKKNI (Standar Kompetensi Kerja Nasional Indonesia), lulusan kami diakui dan dibutuhkan oleh industri.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { Icon: Target,        text: 'Pelatihan Berbasis Kompetensi', color: 'blue' },
                  { Icon: GraduationCap, text: 'Instruktur Bersertifikat',      color: 'purple' },
                  { Icon: Building2,     text: 'Fasilitas Modern',              color: 'green' },
                  { Icon: Briefcase,     text: 'Konsultasi Karir',              color: 'orange' },
                ].map((item) => (
                  <div key={item.text} className={`flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-${item.color}-500`}>
                    <item.Icon className={`w-6 h-6 text-${item.color}-500 flex-shrink-0`} />
                    <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2">
                Lihat Program Pelatihan
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
                <ImageWithFallback
                  src={ppkdImage}
                  alt="Gedung PPKD Jakarta Timur"
                  className="rounded-2xl shadow-2xl relative z-10 w-full h-auto"
                  style={{ minHeight: '500px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Profil Lembaga ── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Profil Lembaga</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              PPKD Jakarta Timur fokus menyiapkan calon tenaga kerja yang terampil, siap kerja, dan mampu bersaing di dunia industri yang terus berubah. Melalui pelatihan berbasis kompetensi, peserta didukung dengan peralatan praktik yang lengkap, instruktur berpengalaman, serta kesempatan mengikuti sertifikasi dari BNSP.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Building2, title: 'Fasilitas Modern',      desc: 'Dilengkapi dengan peralatan praktik yang lengkap dan modern untuk mendukung pembelajaran.' },
              { Icon: Target,    title: 'Pelatihan Berkualitas', desc: 'Program pelatihan berbasis kompetensi sesuai kebutuhan industri saat ini.' },
              { Icon: Award,     title: 'Sertifikasi BNSP',      desc: 'Kesempatan mendapatkan sertifikat kompetensi dari Badan Nasional Sertifikasi Profesi.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Profil ── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4 font-medium text-sm">
              <PlayCircle className="w-4 h-4" />
              Video Profil
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Kenali PPKD Jakarta Timur</h2>
            <p className="text-gray-500">Saksikan profil lengkap dan kegiatan pelatihan di PPKD Jakarta Timur</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
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
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Visi &amp; Misi</h2>
            <p className="text-gray-500">Arah dan tujuan PPKD Jakarta Timur dalam melayani masyarakat</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Visi</h3>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed">
                Menjadi pusat pelatihan kerja yang unggul dan terpercaya dalam menghasilkan tenaga kerja terampil, kompeten, dan berdaya saing tinggi di Jakarta Timur.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Menyelenggarakan pelatihan kerja berbasis kompetensi sesuai dengan kebutuhan industri dan perkembangan teknologi',
                  'Meningkatkan kualitas instruktur dan tenaga kependidikan melalui pengembangan kompetensi berkelanjutan',
                  'Menyediakan fasilitas dan peralatan praktik yang modern dan memadai',
                  'Memfasilitasi peserta pelatihan untuk mendapatkan sertifikasi kompetensi dari lembaga yang berwenang',
                  'Menjalin kemitraan dengan dunia usaha dan dunia industri untuk penyerapan lulusan',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Struktur Organisasi ── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Struktur Organisasi</h2>
            <p className="text-gray-500">Susunan pimpinan dan unit kerja PPKD Jakarta Timur</p>
          </div>

          {/* Kepala PPKD */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 text-white rounded-2xl px-10 py-6 text-center shadow-lg w-72">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-lg">Kepala PPKD</div>
              <div className="text-blue-200 text-sm mt-1">Pimpinan Pusat Pelatihan Kerja Daerah</div>
            </div>
          </div>

          {/* connector line */}
          <div className="flex justify-center mb-6">
            <div className="w-0.5 h-10 bg-blue-300"></div>
          </div>

          {/* Sub-units */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Sub Bagian Tata Usaha',  desc: 'Administrasi dan tata kelola lembaga', color: 'blue' },
              { title: 'Seksi Pelatihan',          desc: 'Pengelolaan program pelatihan kerja',  color: 'purple' },
              { title: 'Seksi Sarana Prasarana',  desc: 'Pengelolaan fasilitas dan peralatan',  color: 'green' },
            ].map(({ title, desc, color }) => (
              <div key={title} className={`bg-white rounded-2xl p-6 text-center shadow-md border-t-4 border-${color}-500 hover:shadow-lg transition-shadow`}>
                <div className={`w-16 h-16 bg-${color}-100 rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <Users className={`w-8 h-8 text-${color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
