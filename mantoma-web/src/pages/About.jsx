import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang Mantoma
            </h1>
            <p className="text-xl text-gray-700">
              Sistem Deteksi Dini Penyakit Daun Tomat Berbasis Convolutional Neural Network (CNN)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>Pernyataan Masalah</h2>
              <p>
                Saat ini, banyak petani tomat di Indonesia mengalami kesulitan dalam mendeteksi dini penyakit daun pada tanaman mereka. Penyakit tanaman seperti karat daun dan serangan jamur Phytophthora sering kali menyebar dengan cepat tanpa disadari sejak awal, dan gejala antar penyakit tampak serupa, sehingga menyulitkan identifikasi tanpa pengetahuan agronomis yang memadai.
              </p>
              <p>
                Akibatnya, banyak petani melakukan penanganan yang tidak tepat, termasuk penggunaan pestisida secara berlebihan, yang justru memperburuk kondisi tanaman serta meningkatkan biaya produksi.
              </p>

              <h2>Solusi Mantoma</h2>
              <p>
                Mantoma hadir sebagai solusi teknologi untuk membantu petani mengenali jenis penyakit daun tomat secara dini dan akurat, agar mereka dapat melakukan penanganan yang sesuai sejak awal.
              </p>
              <p>
                Dengan menggunakan teknologi machine learning, khususnya Convolutional Neural Network (CNN), Mantoma mampu menganalisis gambar daun tomat dan mengidentifikasi jenis penyakit yang menyerang dengan tingkat akurasi yang tinggi.
              </p>

              <h2>Fitur Utama</h2>
              <ul>
                <li>Deteksi beberapa jenis penyakit daun tomat umum (Early Blight, Late Blight, Leaf Mold, dll.)</li>
                <li>Antarmuka pengguna yang sederhana dan mudah digunakan</li>
                <li>Hasil diagnosis instan dengan rekomendasi penanganan</li>
                <li>Tidak memerlukan registrasi atau login</li>
                <li>Dapat diakses dari perangkat smartphone maupun desktop</li>
                <li>Kemampuan untuk mengambil foto langsung dari kamera atau menggunggah dari galeri</li>
              </ul>

              <h2>Visi Kami</h2>
              <p>
                Kami percaya bahwa teknologi dapat menjadi jembatan yang efektif untuk mengatasi kesenjangan pengetahuan dalam bidang pertanian. Dengan Mantoma, kami berharap dapat memberikan kontribusi nyata dalam meningkatkan produktivitas petani tomat dan mendukung ketahanan pangan lokal melalui penerapan teknologi kecerdasan buatan yang tepat guna.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;