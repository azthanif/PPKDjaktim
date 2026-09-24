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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        aria-label="Buka chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Asisten PPKD</h3>
            <p className="text-xs text-blue-100">Siap membantu kamu</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-white text-blue-600 hover:bg-gray-100 p-2 rounded-full transition-colors shadow-md"
          aria-label="Tutup chat"
          title="Tutup chat"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            aria-label="Voice input"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={isListening ? 'Mendengarkan...' : 'Ketik pesan atau gunakan mic...'}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            disabled={isListening}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Kirim pesan"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {isListening && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Sedang mendengarkan... Klik mic lagi untuk berhenti
          </p>
        )}
      </form>
    </div>
  );
}
