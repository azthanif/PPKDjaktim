import { Briefcase, TrendingUp, Building2 } from 'lucide-react';
import PageHeader from './PageHeader';

const TOTAL_ALUMNI = 20_450;
const LAKI = 12_270;   // 60%
const PEREMPUAN = 8_180; // 40%
const PER_IKON = 500;  // 1 ikon = 500 orang

function IkonLaki({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 40" width="18" height="30" fill={active ? '#3b82f6' : '#e2e8f0'}>
      {/* kepala */}
      <circle cx="12" cy="6" r="5" />
      {/* badan persegi panjang */}
      <rect x="6" y="13" width="12" height="14" rx="2" />
      {/* kaki kiri */}
      <rect x="6" y="27" width="4.5" height="11" rx="2" />
      {/* kaki kanan */}
      <rect x="13.5" y="27" width="4.5" height="11" rx="2" />
    </svg>
  );
}

function IkonPerempuan({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 40" width="18" height="30" fill={active ? '#ec4899' : '#e2e8f0'}>
      {/* kepala */}
      <circle cx="12" cy="6" r="5" />
      {/* rok segitiga */}
      <polygon points="4,13 20,13 22,38 2,38" />
      {/* pinggang */}
      <rect x="7" y="13" width="10" height="6" rx="1" />
    </svg>
  );
}

function GrafikPiktogram() {
  const jmlIkonLaki = Math.round(LAKI / PER_IKON);
  const jmlIkonPerempuan = Math.round(PEREMPUAN / PER_IKON);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Komposisi Alumni</h2>
        <p className="text-sm text-gray-500 mt-1">1 ikon = {PER_IKON.toLocaleString('id-ID')} alumni &nbsp;·&nbsp; Total: {TOTAL_ALUMNI.toLocaleString('id-ID')} alumni</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Laki-laki */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            <span className="font-semibold text-blue-700">Laki-laki</span>
            <span className="ml-auto text-2xl font-bold text-gray-900">{LAKI.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: jmlIkonLaki }).map((_, i) => (
              <IkonLaki key={i} active={true} />
            ))}
          </div>
        </div>

        {/* Perempuan */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span>
            <span className="font-semibold text-pink-600">Perempuan</span>
            <span className="ml-auto text-2xl font-bold text-gray-900">{PEREMPUAN.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: jmlIkonPerempuan }).map((_, i) => (
              <IkonPerempuan key={i} active={true} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default function DataAlumni() {
  const alumniByYear = [
    { tahun: 2024, total: 3842, bekerja: 3251, wirausaha: 298, melanjutkan: 187 },
    { tahun: 2023, total: 4125, bekerja: 3512, wirausaha: 341, melanjutkan: 164 },
    { tahun: 2022, total: 3987, bekerja: 3378, wirausaha: 312, melanjutkan: 201 },
    { tahun: 2021, total: 3654, bekerja: 3089, wirausaha: 274, melanjutkan: 183 },
    { tahun: 2020, total: 2891, bekerja: 2430, wirausaha: 231, melanjutkan: 142 },
    { tahun: 2019, total: 1951, bekerja: 1643, wirausaha: 156, melanjutkan: 98 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Pusat Informasi' }, { label: 'Data Alumni' }]}
        title="Data Alumni"
        subtitle="Sebaran dan data alumni PPKD Jakarta Timur"
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Piktogram */}
          <GrafikPiktogram />

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Briefcase className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-3xl font-bold text-gray-900">84.5%</div>
              <div className="text-sm text-gray-600">Tingkat Penyerapan Kerja</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-gray-900">7.8%</div>
              <div className="text-sm text-gray-600">Wirausaha</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Building2 className="w-8 h-8 text-orange-600 mb-2" />
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Perusahaan Mitra</div>
            </div>
          </div>

          {/* Tabel Alumni per Tahun */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Data Alumni per Tahun</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Tahun Lulus</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Total Alumni</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Bekerja</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Wirausaha</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Melanjutkan Studi</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">% Terserap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {alumniByYear.map((item, index) => {
                    const terserap = (((item.bekerja + item.wirausaha) / item.total) * 100).toFixed(1);
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.tahun}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-900">{item.total}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-900">{item.bekerja}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-900">{item.wirausaha}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-900">{item.melanjutkan}</td>
                        <td className="px-6 py-4 text-sm text-center">
                          <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {terserap}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
