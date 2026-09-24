import { useState } from 'react';
import { Building2, MapPin, Phone, Globe, Search, X, Users } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const LOC_COLORS: Record<string, string> = {
  'Jakarta':   '#2563EB',
  'Tangerang': '#7C3AED',
  'Karawang':  '#EA580C',
  'Bandung':   '#16A34A',
};

const perusahaanMitra = [
  {
    nama: 'PT Astra International',
    bidang: 'Otomotif & Manufaktur',
    lokasi: 'Jakarta',
    penempatan: 45,
    alamat: 'Jl. Gaya Motor Raya No.8, Sunter, Jakarta Utara',
  },
  {
    nama: 'PT Unilever Indonesia',
    bidang: 'FMCG & Konsumen',
    lokasi: 'Tangerang',
    penempatan: 32,
    alamat: 'Jl. BSD Boulevard Barat, Green Office Park, Tangerang',
  },
  {
    nama: 'PT Indofood CBP',
    bidang: 'Kuliner & Makanan',
    lokasi: 'Jakarta',
    penempatan: 28,
    alamat: 'Sudirman Plaza, Indofood Tower Lt.23, Jakarta Pusat',
  },
  {
    nama: 'PT Toyota Motor Manufacturing',
    bidang: 'Otomotif',
    lokasi: 'Karawang',
    penempatan: 51,
    alamat: 'Jl. Permata Raya Lot.BB-1, KIIC, Karawang, Jawa Barat',
  },
  {
    nama: 'PT Pertamina',
    bidang: 'Energi & Migas',
    lokasi: 'Jakarta',
    penempatan: 15,
    alamat: 'Jl. Medan Merdeka Timur No.1A, Jakarta Pusat',
  },
  {
    nama: 'PT Bank Mandiri',
    bidang: 'Perbankan & Keuangan',
    lokasi: 'Jakarta',
    penempatan: 22,
    alamat: 'Plaza Mandiri, Jl. Jend. Gatot Subroto Kav.36-38, Jakarta Selatan',
  },
  {
    nama: 'PT Garuda Indonesia',
    bidang: 'Transportasi & Logistik',
    lokasi: 'Tangerang',
    penempatan: 18,
    alamat: 'Gedung Management Building, Bandara Soekarno-Hatta, Tangerang',
  },
  {
    nama: 'PT Telkom Indonesia',
    bidang: 'Teknologi & Telekomunikasi',
    lokasi: 'Bandung',
    penempatan: 38,
    alamat: 'Jl. Japati No.1, Citarum, Bandung, Jawa Barat',
  },
];

function BarTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[160px]">
      <p className="font-semibold text-gray-800 mb-2 leading-tight">{label}</p>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-sm" style={{ background: '#2563EB' }} />
        <span className="text-gray-500">Alumni ditempatkan:</span>
        <span className="font-semibold text-gray-900">{payload[0].value}</span>
      </div>
    </div>
  );
}

function PieTooltipContent({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.payload.fill }} />
        <span className="font-semibold text-gray-800">{d.name}</span>
      </div>
      <p className="text-gray-500">
        Perusahaan: <span className="font-semibold text-gray-900">{d.value}</span>
      </p>
    </div>
  );
}

export default function DataPerusahaan() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery.trim()
    ? perusahaanMitra.filter(p =>
        p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bidang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.alamat.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : perusahaanMitra;

  const totalAlumni = perusahaanMitra.reduce((s, p) => s + p.penempatan, 0);

  // ── Chart data ───────────────────────────────────────────────
  const penempatanData = [...perusahaanMitra]
    .sort((a, b) => b.penempatan - a.penempatan)
    .map(p => {
      const shortName = p.nama.replace(/^PT\s+/, '');
      return {
        name: shortName.length > 22 ? shortName.slice(0, 22) + '…' : shortName,
        fullName: p.nama,
        'Alumni': p.penempatan,
      };
    });

  const lokasiCounts = perusahaanMitra.reduce((acc, p) => {
    acc[p.lokasi] = (acc[p.lokasi] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lokasiData = Object.entries(lokasiCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value, fill: LOC_COLORS[name] ?? '#6B7280' }));
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Summary cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { Icon: Building2, color: 'blue',   value: '50+',         label: 'Total Perusahaan Mitra' },
              { Icon: Users,     color: 'green',  value: totalAlumni,   label: 'Alumni Ditempatkan' },
              { Icon: MapPin,    color: 'orange', value: lokasiData.length, label: 'Kota & Wilayah' },
              { Icon: Globe,     color: 'purple', value: perusahaanMitra.length, label: 'Sektor Industri' },
            ].map(({ Icon, color, value, label }) => (
              <div key={label} className="bg-white rounded-xl shadow-md p-6">
                <Icon className={`w-8 h-8 text-${color}-600 mb-2`} />
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>

          {/* ── Charts ─────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-6 mb-8">

            {/* Bar: alumni per perusahaan */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 leading-tight">Alumni Ditempatkan per Perusahaan</h3>
              <p className="text-xs text-gray-400 mt-0.5 mb-5">Jumlah lulusan PPKD yang bekerja di setiap mitra</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={penempatanData}
                  layout="vertical"
                  barSize={13}
                  margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={162}
                    tick={{ fill: '#374151', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<BarTooltipContent />} cursor={{ fill: '#F9FAFB' }} />
                  <Bar key="bar-alumni" dataKey="Alumni" name="Alumni" fill="#2563EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut: distribusi per lokasi */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 flex flex-col">
              <h3 className="font-semibold text-gray-900 leading-tight">Distribusi per Kota</h3>
              <p className="text-xs text-gray-400 mt-0.5 mb-4">Jumlah perusahaan mitra per wilayah</p>

              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={lokasiData}
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={88}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {lokasiData.map((entry, i) => (
                        <Cell key={`lokasi-cell-${i}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 leading-none">{perusahaanMitra.length}</div>
                    <div className="text-[10px] text-gray-400 mt-1 tracking-wide uppercase">Mitra</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2.5">
                {lokasiData.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.fill }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {d.value} perusahaan
                    </span>
                  </div>
                ))}
              </div>

              {/* Alumni total per kota */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2.5">Alumni per kota</p>
                {lokasiData.map(d => {
                  const count = perusahaanMitra
                    .filter(p => p.lokasi === d.name)
                    .reduce((s, p) => s + p.penempatan, 0);
                  const pct = Math.round((count / totalAlumni) * 100);
                  return (
                    <div key={d.name} className="mb-2">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="text-gray-600">{d.name}</span>
                        <span className="font-semibold text-gray-800">{count} alumni</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: d.fill }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* ────────────────────────────────────────────────── */}

          {/* Daftar Perusahaan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Daftar Perusahaan Mitra</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Alumni PPKD Jakarta Timur telah bekerja di berbagai perusahaan ternama berikut:
                </p>
              </div>
              <div className="relative sm:ml-auto w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari perusahaan..."
                  className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {searchQuery && (
              <div className="px-6 py-2 bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                Menampilkan <span className="font-semibold text-blue-600">{filtered.length}</span> hasil untuk "{searchQuery}"
              </div>
            )}

            <div className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <div className="py-14 text-center text-gray-400">
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                  <p className="text-sm">Tidak ada perusahaan yang cocok dengan "{searchQuery}"</p>
                </div>
              )}
              {filtered.map((p, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{p.nama}</p>
                    <div className="flex items-start gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-500 leading-snug">{p.alamat}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                      {p.bidang}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {p.penempatan} alumni
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Ingin bermitra dengan PPKD Jakarta Timur?</h3>
              <p className="text-sm text-gray-600">Hubungi kami untuk informasi kerjasama penempatan tenaga kerja terlatih.</p>
            </div>
            <a
              href="tel:02112345678"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
