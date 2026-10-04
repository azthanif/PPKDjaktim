import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya asisten virtual PPKD Jakarta Timur. Ada yang bisa saya bantu?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'id-ID';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Browser kamu tidak mendukung voice input. Silakan gunakan Chrome atau Edge.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        setIsListening(false);
      }
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        alert('Tidak dapat memulai voice input. Pastikan microphone sudah diaktifkan.');
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('program') || input.includes('pelatihan') || input.includes('jurusan')) {
      return 'Kami memiliki berbagai program pelatihan seperti Teknisi Komputer, Jaringan & Multimedia, Operator Komputer, Desain Grafis, dan masih banyak lagi. Kamu bisa lihat daftar lengkapnya di menu Program dan Jadwal Pelatihan. Mau saya bantu carikan program yang cocok untukmu?';
    }

    if (input.includes('daftar') || input.includes('pendaftaran') || input.includes('cara daftar')) {
      return 'Untuk mendaftar, kamu bisa klik menu Pelatihan > Pendaftaran. Persyaratannya: fotokopi KTP, fotokopi ijazah terakhir, pas foto, dan mengisi formulir pendaftaran. Semua pelatihan gratis dan bersertifikat BNSP lho!';
    }

    if (input.includes('syarat') || input.includes('persyaratan')) {
      return 'Persyaratan pendaftaran:\n- Fotokopi KTP\n- Fotokopi ijazah terakhir\n- Pas foto 3x4 (2 lembar)\n- Mengisi formulir pendaftaran\n\nSemua file bisa diunggah secara online saat pendaftaran!';
    }

    if (input.includes('gratis') || input.includes('biaya') || input.includes('bayar')) {
      return '100% GRATIS! Semua program pelatihan di PPKD Jakarta Timur tidak dipungut biaya apapun. Kamu juga akan mendapat sertifikat BNSP yang diakui secara nasional. Yuk daftar sekarang!';
    }

    if (input.includes('jadwal') || input.includes('kapan') || input.includes('waktu')) {
      return 'Jadwal pelatihan bervariasi tergantung program yang kamu pilih. Biasanya tersedia jadwal pagi (08.00-12.00) dan siang (13.00-17.00). Untuk info lengkap, cek menu Program dan Jadwal Pelatihan ya!';
    }

    if (input.includes('lokasi') || input.includes('alamat') || input.includes('dimana')) {
      return 'PPKD Jakarta Timur berlokasi di Jakarta Timur. Untuk alamat lengkap dan informasi kontak, kamu bisa cek di menu Tentang Kami atau hubungi kami langsung!';
    }

    if (input.includes('sertifikat') || input.includes('bnsp')) {
      return 'Setiap peserta yang menyelesaikan pelatihan akan mendapat sertifikat resmi dari BNSP (Badan Nasional Sertifikasi Profesi) yang diakui secara nasional dan bisa digunakan untuk melamar pekerjaan. Keren kan?';
    }

    if (input.includes('alumni') || input.includes('lulusan')) {
      return 'Alumni PPKD Jakarta Timur sudah lebih dari 5.000 orang! Banyak yang berhasil bekerja di perusahaan ternama atau membuka usaha sendiri. Kamu bisa lihat data alumni di menu Pusat Data > Data Alumni.';
    }

    if (input.includes('halo') || input.includes('hai') || input.includes('hi')) {
      return 'Hai! Senang bisa membantu kamu hari ini. Ada yang ingin kamu tanyakan tentang program pelatihan kami?';
    }

    if (input.includes('terima kasih') || input.includes('thanks') || input.includes('makasih')) {
      return 'Sama-sama! Jangan ragu untuk bertanya lagi kalau ada yang ingin kamu ketahui. Semangat untuk masa depanmu!';
    }

    return 'Terima kasih atas pertanyaannya! Untuk informasi lebih detail, kamu bisa:\n- Lihat menu Program dan Jadwal Pelatihan\n- Hubungi kami langsung\n- Atau coba tanyakan dengan kata kunci: "program", "pendaftaran", "syarat", "jadwal", atau "sertifikat"';
  };

  return (
    <>
      {/* Tab toggle — menempel di tepi kanan */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white px-2 py-5 rounded-l-xl shadow-lg flex flex-col items-center gap-2 transition-colors"
          aria-label="Buka chat assistant"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide writing-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
            Tanya Kami
          </span>
        </button>
      )}

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white flex flex-col z-50 shadow-2xl border-l border-gray-200 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Asisten PPKD</h3>
              <p className="text-xs text-blue-200">Siap membantu kamu</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Tutup chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pesan */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2 rounded-full transition-all flex-shrink-0 ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              aria-label="Voice input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isListening ? 'Mendengarkan...' : 'Ketik pesan...'}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              disabled={isListening}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Kirim pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {isListening && (
            <p className="text-xs text-gray-400 mt-2 text-center">Sedang mendengarkan... klik mic lagi untuk berhenti</p>
          )}
        </form>
      </div>
    </>
  );
}
