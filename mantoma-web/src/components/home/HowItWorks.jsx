import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Ambil Foto',
    description: 'Gunakan kamera smartphone Anda untuk mengambil foto daun tomat yang ingin dianalisis, atau pilih dari galeri.'
  },
  {
    number: '02',
    title: 'Unggah Gambar',
    description: 'Unggah gambar melalui aplikasi web kami yang mudah digunakan, tidak perlu login atau registrasi.'
  },
  {
    number: '03',
    title: 'Proses Analisis',
    description: 'Sistem AI kami menganalisis gambar menggunakan teknologi CNN untuk mengidentifikasi potensi penyakit.'
  },
  {
    number: '04',
    title: 'Dapatkan Hasil',
    description: 'Terima hasil deteksi beserta rekomendasi penanganan yang sesuai dengan jenis penyakit yang terdeteksi.'
  }
];

const HowItWorks = () => {
  return (
    <section className="section bg-gray-50" id="how-it-works">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja Mantoma
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Deteksi penyakit daun tomat dengan mudah hanya dalam 4 langkah sederhana
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-primary-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="/detection" className="btn btn-primary">
            Mulai Deteksi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;