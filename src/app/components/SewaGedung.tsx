import { Building2, Users, Clock, DollarSign, CheckCircle, Phone } from 'lucide-react';

export default function SewaGedung() {
  const facilities = [
    { name: 'Aula Utama', kapasitas: '200 orang', harga: 'Rp 5.000.000/hari' },
    { name: 'Ruang Meeting Besar', kapasitas: '50 orang', harga: 'Rp 2.000.000/hari' },
    { name: 'Ruang Meeting Kecil', kapasitas: '20 orang', harga: 'Rp 1.000.000/hari' },
    { name: 'Ruang Praktik', kapasitas: '30 orang', harga: 'Rp 1.500.000/hari' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Sewa Gedung</h1>
          <p className="text-xl text-blue-100">Fasilitas ruangan untuk berbagai kebutuhan acara Anda</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Info Umum */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang Layanan Sewa Gedung</h2>
            <p className="text-gray-700 mb-4">
              PPKD Jakarta Timur menyediakan layanan sewa gedung untuk berbagai keperluan seperti seminar, workshop, pelatihan, rapat, dan acara lainnya. Fasilitas kami dilengkapi dengan peralatan modern dan nyaman untuk mendukung kegiatan Anda.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Lokasi Strategis</h3>
                  <p className="text-sm text-gray-600">Mudah diakses dari berbagai wilayah Jakarta</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Kapasitas Variatif</h3>
                  <p className="text-sm text-gray-600">Tersedia ruangan berbagai ukuran</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Harga Terjangkau</h3>
                  <p className="text-sm text-gray-600">Tarif kompetitif dan transparan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Ruangan */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilihan Ruangan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Kapasitas: {facility.kapasitas}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">{facility.harga}</span>
                      </div>
                    </div>
                    <Building2 className="w-12 h-12 text-blue-600" />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Pesan Sekarang
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Fasilitas */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fasilitas yang Tersedia</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'LCD Proyektor dan Layar',
                'Sound System',
                'AC',
                'Kursi dan Meja',
                'WiFi',
                'Toilet',
                'Area Parkir',
                'Pantry/Dapur Kecil'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syarat & Ketentuan */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Syarat & Ketentuan</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span className="text-gray-700">Pemesanan minimal 7 hari sebelum tanggal acara</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span className="text-gray-700">DP 50% dari total biaya saat konfirmasi booking</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span className="text-gray-700">Pelunasan maksimal 3 hari sebelum acara</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span className="text-gray-700">Pembatalan booking maksimal 5 hari sebelum acara</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">5</span>
                <span className="text-gray-700">Penyewa bertanggung jawab atas kebersihan dan kerusakan fasilitas</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Tertarik Menyewa Gedung Kami?</h2>
            <p className="text-lg mb-6">Hubungi kami untuk informasi lebih lanjut dan pemesanan</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors inline-flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
