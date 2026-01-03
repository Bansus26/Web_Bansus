import { theme } from "@/lib/theme";
import { BookOpen, Calendar, Clock, Database, Users } from "lucide-react";

const LabkomLanding = () => {
  const mainFeatures = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-400" />,
      title: "Modul Jadwal Praktikum",
      description:
        "Pembuatan dan pengelolaan jadwal praktikum (CRUD), pencarian jadwal by dosen/mata kuliah, dan open recruitment asisten dosen",
    },
    {
      icon: <Database className="w-8 h-8 text-green-400" />,
      title: "Dataset Research Collection",
      description:
        "Upload data penelitian, organisasi dan kategorisasi data, pencarian dataset by topik/jenis/nama, serta unduh/akses data",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Modul Layanan Lab",
      description:
        "Contact person, reservasi ruangan lab (pelatihan, etc.), peminjaman alat/perangkat, dan post berita/blog/modul",
    },
  ];

  return (
    <div className={`min-h-screen ${theme.root_background}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center bg-white/10 border ${theme.hover_glow_light} rounded-full px-6 py-2 mb-8 backdrop-blur`}>
              <BookOpen className={`w-4 h-4 ${theme.text_title} mr-2`} />
              <span className={`${theme.text_title} text-sm`}>
                Sistem Praktikum Digital {new Date().getFullYear()}
              </span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold ${theme.text_gradasi_cyan_sky} mb-8 leading-tight`}>
              Web <span className="">Labkom</span>
              <br />
              <span className="">Praktikum</span>
            </h1>

            <p
              className={`text-xl ${theme.text_default} mb-12 max-w-3xl mx-auto leading-relaxed`}
            >
              Platform terintegrasi untuk pengelolaan praktikum Jurusan Ilmu
              Komputer. Jadwal, dataset research, dan layanan laboratorium dalam
              satu sistem.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_gradasi_cyan_sky} mb-6`}>
              Modul <span className="">Utama</span>
            </h2>
            <p className={`text-xl ${theme.text_default} max-w-3xl mx-auto`}>
              Tiga modul inti yang dirancang khusus untuk kebutuhan praktikum
              dan penelitian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${theme.card_background} ${theme.hover_default} rounded-2xl p-6 ${theme.card_shadow} transition-all duration-300 group`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className={`${theme.text_title} text-2xl`}>{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-semibold mb-2 text-left ${theme.text_title}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`${theme.text_default} text-justify leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`${theme.card_modal} border border-slate-700/50 rounded-2xl p-12 text-center`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.logo_background} rounded-full mb-6`}>
              <Clock className={`w-8 h-8 text-white}`} />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme.text_title} mb-6`}>
              Dalam Tahap Pengembangan
            </h2>
            <p className={`${theme.text_default} text-xl mb-8 max-w-2xl mx-auto`}>
              *untuk pengembangan selanjutnya - Sistem ini sedang dikembangkan
              untuk memenuhi kebutuhan praktikum yang lebih efisien dan
              terintegrasi
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabkomLanding;
