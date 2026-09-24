import { Users } from 'lucide-react';

export default function StrukturOrganisasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Kepala PPKD Jakarta Timur</h2>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Kepala PPKD</h3>
              <p className="text-gray-600">Pimpinan Pusat Pelatihan Kerja Daerah</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Sub Bagian Tata Usaha</h3>
                <p className="text-sm text-gray-600">Administrasi dan tata kelola</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Seksi Pelatihan</h3>
                <p className="text-sm text-gray-600">Pengelolaan program pelatihan</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Seksi Sarana Prasarana</h3>
                <p className="text-sm text-gray-600">Pengelolaan fasilitas dan peralatan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
