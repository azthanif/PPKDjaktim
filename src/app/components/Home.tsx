import { ChevronRight, Users, Award, BookOpen, Building2, TrendingUp, Target, GraduationCap, Briefcase, CheckCircle, ScrollText } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ppkdImage from '../../imports/IMG_5046-scaled.jpg';

export default function Home() {
  const navigate = useNavigate();
  const trainingPrograms = [
    {
      title: 'Operator Produksi',
      image: 'https://images.unsplash.com/photo-1558301204-e3226482a77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      description: 'Pelatihan operator produksi untuk industri manufaktur'
    },
    {
      title: 'Kuliner',
      image: 'https://images.unsplash.com/photo-1615949394813-ba42de383eb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      description: 'Keterampilan memasak dan pengolahan makanan profesional'
    },
    {
      title: 'Mekanik Sepeda Motor',
      image: 'https://images.unsplash.com/photo-1592220769343-8a128527c5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      description: 'Perbaikan dan perawatan sepeda motor'
    },
    {
      title: 'Las',
      image: 'https://images.unsplash.com/photo-1616992873922-94702fd40c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      description: 'Teknik pengelasan untuk konstruksi dan manufaktur'
    },
    {
      title: 'Refrigerasi',
      image: 'https://images.unsplash.com/photo-1616992954106-9c97fdc71f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      description: 'Perbaikan AC dan sistem pendingin'
    },
    {
      title: 'Desain Grafis',
      image: 'https://images.unsplash.com/photo-1558301204-e3226482a77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      description: 'Keterampilan desain digital dan multimedia'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Kiri — teks */}
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-medium text-sm">
                Pelatihan Gratis & Bersertifikat BNSP
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Wujudkan Karir
                <span className="block text-blue-600">Impianmu</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Bergabunglah dengan ribuan alumni yang sudah berhasil! PPKD Jakarta Timur menyiapkan kamu menjadi tenaga kerja terampil dengan pelatihan berbasis kompetensi, instruktur berpengalaman, dan peralatan modern.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { Icon: Target, text: 'Pelatihan Berbasis Kompetensi', color: 'blue' },
                  { Icon: GraduationCap, text: 'Instruktur Bersertifikat', color: 'purple' },
                  { Icon: Building2, text: 'Fasilitas Modern', color: 'green' },
                  { Icon: Briefcase, text: 'Konsultasi Karir', color: 'orange' },
                ].map(item => (
                  <div key={item.text} className={`flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-${item.color}-500`}>
                    <item.Icon className={`w-6 h-6 text-${item.color}-500 flex-shrink-0`} />
                    <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/pendaftaran"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
                >
                  Daftar Sekarang - Gratis!
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/program-jadwal"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-all"
                >
                  Lihat Program
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">5000+</div>
                  <div className="text-sm text-gray-500">Alumni Sukses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-500">Program Pelatihan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-500">Gratis</div>
                </div>
              </div>
            </div>

            {/* Kanan — foto */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              <ImageWithFallback
                src={ppkdImage}
                alt="Gedung PPKD Jakarta Timur"
                className="rounded-2xl shadow-2xl relative z-10 w-full h-auto"
                style={{ minHeight: '480px', objectFit: 'cover' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Dipercaya Ribuan Peserta</h2>
            <p className="text-gray-600">Angka yang membuktikan kualitas kami</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Peserta Aktif', value: '1,200+', color: 'blue', trend: '+15%' },
              { icon: Award, label: 'Program Pelatihan', value: '15+', color: 'purple', trend: 'Tersedia' },
              { icon: BookOpen, label: 'Sertifikat Diterbitkan', value: '5,000+', color: 'green', trend: '+28%' },
              { icon: Building2, label: 'Mitra Industri', value: '50+', color: 'orange', trend: 'Aktif' }
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-t-4 border-${stat.color}-500`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl mb-4`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className={`inline-flex items-center gap-1 text-xs font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-full`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section id="pelatihan" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4 font-medium">
              <Target className="w-4 h-4" />
              Program Unggulan
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pilih Program Pelatihanmu
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Semua program gratis, bersertifikat BNSP, dan tersalurkan ke dunia industri
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <div
                key={program.title}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    GRATIS
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/program-jadwal"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2"
            >
              Lihat Semua Program
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="text-sm font-medium">Kuota Terbatas - Segera Daftar!</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Mulai Perjalanan Karirmu Hari Ini!
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Ribuan orang sudah membuktikannya. Sekarang giliran kamu untuk menjadi ahli di bidangmu. <span className="font-bold">100% Gratis!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/pendaftaran"
              className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              DAFTAR SEKARANG - GRATIS
            </Link>
            <Link
              to="/program-jadwal"
              className="text-white/80 hover:text-white font-medium inline-flex items-center gap-2 transition-colors"
            >
              Lihat Program
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-sm text-blue-200">Tanpa Biaya</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-2">
                <ScrollText className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="text-sm text-blue-200">Sertifikat BNSP</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-2">
                <Briefcase className="w-6 h-6 text-blue-200" />
              </div>
              <div className="text-sm text-blue-200">Job Placement</div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
