import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="section bg-white" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/farmers.jpg"
              alt="Petani Tomat"
              className="rounded-xl shadow-lg w-full h-auto"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Petani+Tomat";
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tentang Mantoma
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Mantoma adalah sistem deteksi dini penyakit daun tomat berbasis Teknologi Machine Learning dengan Algoritma Convolutional Neural Network (CNN).
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Proyek ini dikembangkan untuk membantu petani tomat di Indonesia mendeteksi penyakit tanaman mereka secara cepat dan akurat melalui analisis gambar,
              Sehingga mereka dapat melakukan penanganan yang tepat sejak dini.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Didukung oleh teknologi kecerdasan buatan terkini, Mantoma dapat mengidentifikasi berbagai jenis penyakit umum pada daun tomat seperti Early Blight,
              Late Blight, Leaf Mold, dan lainnya, sehingga petani dapat melakukan tindakan preventif yang tepat untuk menyelamatkan hasil panen mereka.
            </p>
            <div className="mt-8">
              <Link to="/about" className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;