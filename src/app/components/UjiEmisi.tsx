import { Car, CheckCircle, FileText, Clock, MapPin, AlertCircle } from 'lucide-react';

export default function UjiEmisi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Uji Emisi Kendaraan</h1>
          <p className="text-xl text-blue-100">Layanan pengujian emisi gas buang kendaraan bermotor</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Info Umum */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang Uji Emisi</h2>
            <p className="text-gray-700 mb-4">
              PPKD Jakarta Timur menyediakan layanan uji emisi kendaraan bermotor untuk memastikan kendaraan Anda memenuhi standar emisi gas buang yang ditetapkan pemerintah. Layanan ini penting untuk menjaga kualitas udara dan lingkungan di Jakarta.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Semua Jenis Kendaraan</h3>
                <p className="text-sm text-gray-600">Motor & Mobil</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Proses Cepat</h3>
                <p className="text-sm text-gray-600">15-30 menit</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Sertifikat Resmi</h3>
                <p className="text-sm text-gray-600">Terakreditasi</p>
              </div>
            </div>
          </div>

          {/* Tarif */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tarif Uji Emisi</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Sepeda Motor</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Rp 50.000</div>
                <p className="text-gray-600">Per kendaraan</p>
              </div>
              <div className="border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Mobil</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Rp 100.000</div>
                <p className="text-gray-600">Per kendaraan</p>
              </div>
            </div>
          </div>

          {/* Persyaratan */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Persyaratan</h2>
            <div className="space-y-3">
              {[
                'STNK asli dan fotokopi',
                'KTP pemilik kendaraan',
                'Kendaraan dalam kondisi baik dan siap uji',
                'Mesin kendaraan dalam keadaan panas (sudah dipakai minimal 10 menit)'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal & Lokasi */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Jam Operasional</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Senin - Jumat:</span> 08:00 - 16:00 WIB</p>
                  <p><span className="font-medium">Sabtu:</span> 08:00 - 12:00 WIB</p>
                  <p><span className="font-medium">Minggu & Libur:</span> Tutup</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Lokasi</h3>
                </div>
                <p className="text-gray-700">
                  PPKD Jakarta Timur<br />
                  Jl. Pelatihan No. 123<br />
                  Jakarta Timur, DKI Jakarta 13000
                </p>
              </div>
            </div>
          </div>

          {/* Alur Pengujian */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Alur Pengujian</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pendaftaran</h3>
                <p className="text-sm text-gray-600">Daftar dan serahkan dokumen</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pembayaran</h3>
                <p className="text-sm text-gray-600">Bayar biaya uji emisi</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pengujian</h3>
                <p className="text-sm text-gray-600">Kendaraan diuji emisi</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Sertifikat</h3>
                <p className="text-sm text-gray-600">Terima hasil & sertifikat</p>
              </div>
            </div>
          </div>

          {/* Info Penting */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Informasi Penting</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Jika kendaraan tidak lulus uji emisi, harus dilakukan perbaikan terlebih dahulu</li>
                  <li>• Uji ulang dapat dilakukan setelah 7 hari dengan biaya yang sama</li>
                  <li>• Sertifikat uji emisi berlaku selama 6 bulan</li>
                  <li>• Disarankan melakukan servis kendaraan sebelum uji emisi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
