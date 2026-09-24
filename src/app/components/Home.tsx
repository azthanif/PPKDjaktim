import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ppkdImage from '../../imports/IMG_5046-scaled.jpg';


const PROGRAMS = [
  {
    title: 'Kuliner & Barista',
    image: 'https://images.unsplash.com/photo-1615949394813-ba42de383eb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    description: 'Tata boga, pastry, dan teknik penyeduhan kopi standar industri',
  },
  {
    title: 'Teknologi Digital',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    description: 'Web development, digital marketing, dan analisis data',
  },
  {
    title: 'Teknik & Mesin',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    description: 'Las, service sepeda motor, dan mechanical electrical',
  },
  {
    title: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    description: 'Housekeeping dan food & beverage service hotel bintang',
  },
  {
    title: 'Kecantikan & Spa',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    description: 'Perawatan kecantikan, make up artist, dan terapis spa',
  },
  {
    title: 'Kreatif & Desain',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    description: 'Desain grafis, fotografi, dan animasi digital',
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white pt-16 pb-10 lg:pt-24 lg:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Teks */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                Siapkan Diri Untuk Karir Terbaikmu
              </h1>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                PPKD Jakarta Timur membuka pelatihan kerja berbasis kompetensi secara gratis, bersertifikat BNSP, dan langsung tersalurkan ke ratusan mitra industri di seluruh Indonesia.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/pendaftaran"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-9 py-3.5 rounded-full font-semibold transition-colors"
                >
                  Daftar Sekarang — Gratis
                </Link>
                <Link
                  to="/program-jadwal"
                  className="text-gray-600 hover:text-gray-900 px-7 py-3 rounded-full font-semibold text-sm border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  Lihat Program
                </Link>
              </div>
            </div>

            {/* Foto */}
            <div>
              <ImageWithFallback
                src={ppkdImage}
                alt="Gedung PPKD Jakarta Timur"
                className="w-full rounded-2xl shadow-lg object-cover"
                style={{ height: '480px' }}
              />
            </div>

          </div>
        </div>
      </section>

  

      {/* ── Program ── */}
      <section id="pelatihan" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Program Pelatihan
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map(p => (
              <div
                key={p.title}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/program-jadwal"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full font-semibold transition-colors"
            >
              Lihat semua 27 program
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white border-t border-gray-100 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Mulai Perjalanan Karirmu
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Ribuan orang sudah membuktikannya. Pelatihan gratis, sertifikat BNSP, langsung bekerja ke industri.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pendaftaran"
              className="bg-blue-600 hover:bg-blue-700 text-white px-9 py-3.5 rounded-full font-semibold transition-colors"
            >
              Daftar Sekarang
            </Link>
          
          </div>
        </div>
      </section>

    </>
  );
}
