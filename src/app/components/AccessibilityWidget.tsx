import { useState, useEffect, useCallback } from 'react';
import {
  Accessibility, X, Sun, Link2, Type, MoveHorizontal,
  BookOpen, MousePointer2,
  AlignJustify, Droplets, RotateCcw,
} from 'lucide-react';

type Options = {
  highContrast:   boolean;
  highlightLinks: boolean;
  biggerText:     boolean;
  textSpacing:    boolean;
  dyslexiaFont:   boolean;
  bigCursor:      boolean;
  lineHeight:     boolean;
  grayscale:      boolean;
};

const DEFAULT: Options = {
  highContrast:   false,
  highlightLinks: false,
  biggerText:     false,
  textSpacing:    false,
  dyslexiaFont:   false,
  bigCursor:      false,
  lineHeight:     false,
  grayscale:      false,
};

// CSS that scopes to #a11y-main so the widget itself is never affected
const A11Y_CSS = `
  /* High Contrast */
  html.a11y-high-contrast #a11y-main { filter: contrast(1.65) !important; }

  /* Grayscale */
  html.a11y-grayscale #a11y-main { filter: grayscale(100%) !important; }

  /* Both combined */
  html.a11y-high-contrast.a11y-grayscale #a11y-main {
    filter: contrast(1.65) grayscale(100%) !important;
  }

  /* Highlight links & buttons */
  html.a11y-highlight-links #a11y-main a,
  html.a11y-highlight-links #a11y-main button {
    outline: 3px solid #f59e0b !important;
    outline-offset: 2px !important;
    text-decoration: underline !important;
  }

  /* Bigger text (scales relative units) */
  html.a11y-bigger-text #a11y-main { font-size: 118% !important; }

  /* Text spacing */
  html.a11y-text-spacing #a11y-main * {
    letter-spacing: 0.12em !important;
    word-spacing:   0.16em !important;
  }

  /* Dyslexia-friendly font */
  html.a11y-dyslexia-font #a11y-main,
  html.a11y-dyslexia-font #a11y-main * {
    font-family: 'Lexend', 'Comic Sans MS', cursive !important;
    letter-spacing: 0.06em !important;
  }

  /* Big cursor */
  html.a11y-big-cursor,
  html.a11y-big-cursor * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='50' viewBox='0 0 44 50'%3E%3Cpath d='M6 2L6 40L16 30L24 46L30 43L22 27L36 27Z' fill='%23111827' stroke='white' stroke-width='2.5' stroke-linejoin='round'/%3E%3C/svg%3E") 6 4, auto !important;
  }

  /* Increased line height */
  html.a11y-line-height #a11y-main * {
    line-height: 2 !important;
  }
`;

const CLASS_MAP: Record<keyof Options, string> = {
  highContrast:   'a11y-high-contrast',
  highlightLinks: 'a11y-highlight-links',
  biggerText:     'a11y-bigger-text',
  textSpacing:    'a11y-text-spacing',
  dyslexiaFont:   'a11y-dyslexia-font',
  bigCursor:      'a11y-big-cursor',
  lineHeight:     'a11y-line-height',
  grayscale:      'a11y-grayscale',
};

const FEATURES: { key: keyof Options; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'highContrast',   label: 'Kontras Tinggi',   Icon: Sun            },
  { key: 'highlightLinks', label: 'Sorot Tautan',      Icon: Link2          },
  { key: 'biggerText',     label: 'Teks Lebih Besar',  Icon: Type           },
  { key: 'textSpacing',    label: 'Spasi Teks',        Icon: MoveHorizontal },
  { key: 'dyslexiaFont',   label: 'Font Disleksia',    Icon: BookOpen       },
  { key: 'bigCursor',      label: 'Kursor Besar',      Icon: MousePointer2  },
  { key: 'lineHeight',     label: 'Tinggi Baris',      Icon: AlignJustify   },
  { key: 'grayscale',      label: 'Skala Abu-abu',     Icon: Droplets       },
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Options>(() => {
    try {
      const raw = localStorage.getItem('ppkd_a11y');
      return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  // Inject stylesheet once on mount
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'ppkd-a11y-styles';
    el.textContent = A11Y_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // Load Lexend font on demand
  useEffect(() => {
    if (!options.dyslexiaFont) return;
    if (document.getElementById('ppkd-a11y-font')) return;
    const link = document.createElement('link');
    link.id = 'ppkd-a11y-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, [options.dyslexiaFont]);

  // Sync classes to <html> and persist
  useEffect(() => {
    const html = document.documentElement;
    (Object.keys(CLASS_MAP) as (keyof Options)[]).forEach(k => {
      html.classList.toggle(CLASS_MAP[k], options[k]);
    });
    try { localStorage.setItem('ppkd_a11y', JSON.stringify(options)); } catch {}
  }, [options]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        setOpen(p => !p);
      }
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = useCallback((key: keyof Options) => {
    setOptions(p => ({ ...p, [key]: !p[key] }));
  }, []);

  const resetAll = useCallback(() => setOptions(DEFAULT), []);

  const activeCount = Object.values(options).filter(Boolean).length;

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(p => !p)}
        aria-label={`${open ? 'Tutup' : 'Buka'} menu aksesibilitas (Alt+U)`}
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Aksesibilitas (Alt+U)"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[9999] bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white w-11 h-16 rounded-r-2xl shadow-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:w-14 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
      >
        <Accessibility className="w-6 h-6 flex-shrink-0" />
        {activeCount > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 text-gray-900 rounded-full text-[10px] font-bold flex items-center justify-center shadow"
            aria-label={`${activeCount} fitur aktif`}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        id="a11y-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Aksesibilitas"
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-[9999] flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-blue-800 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">Menu Aksesibilitas</p>
              <p className="text-blue-300 text-[11px]">Alt + U untuk buka / tutup</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup menu aksesibilitas"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active count banner */}
        {activeCount > 0 && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-5 py-2 flex items-center justify-between flex-shrink-0">
            <span className="text-xs text-yellow-800 font-medium">
              {activeCount} fitur aktif
            </span>
            <button
              onClick={resetAll}
              className="text-xs text-yellow-700 hover:text-yellow-900 underline focus:outline-none"
            >
              Reset semua
            </button>
          </div>
        )}

        {/* Feature grid */}
        <div className="flex-1 overflow-y-auto p-4" role="group" aria-label="Pilihan aksesibilitas">
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ key, label, Icon }) => {
              const active = options[key];
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  aria-pressed={active}
                  aria-label={`${active ? 'Nonaktifkan' : 'Aktifkan'} ${label}`}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    active
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  {/* Active dot */}
                  {active && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />
                  )}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                    active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button
            onClick={resetAll}
            disabled={activeCount === 0}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Semua Fitur
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-2.5 leading-tight">
            PPKD Jakarta Timur · Aksesibilitas Digital
          </p>
        </div>
      </div>
    </>
  );
}
