import { ChevronRight } from 'lucide-react';

interface Crumb { label: string }

interface PageHeaderProps {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
}

export default function PageHeader({ crumbs, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {crumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3 flex-wrap">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
                <span className={i === crumbs.length - 1 ? 'text-blue-600 font-medium' : ''}>
                  {c.label}
                </span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </section>
  );
}
