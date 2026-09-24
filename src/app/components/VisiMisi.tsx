import { Eye, Target } from 'lucide-react';

export default function VisiMisi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Visi</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Menjadi pusat pelatihan kerja yang unggul dan terpercaya dalam menghasilkan tenaga kerja terampil, kompeten, dan berdaya saing tinggi di Jakarta Timur.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Misi</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                  <span className="text-gray-700">
                    Menyelenggarakan pelatihan kerja berbasis kompetensi sesuai dengan kebutuhan industri dan perkembangan teknologi
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                  <span className="text-gray-700">
                    Meningkatkan kualitas instruktur dan tenaga kependidikan melalui pengembangan kompetensi berkelanjutan
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                  <span className="text-gray-700">
                    Menyediakan fasilitas dan peralatan praktik yang modern dan memadai
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                  <span className="text-gray-700">
                    Memfasilitasi peserta pelatihan untuk mendapatkan sertifikasi kompetensi dari lembaga yang berwenang
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">5</span>
                  <span className="text-gray-700">
                    Menjalin kemitraan dengan dunia usaha dan dunia industri untuk penyerapan lulusan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
