import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Mantoma: <span className="text-primary-600">Sistem Deteksi Dini</span> Penyakit Daun Tomat
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Deteksi penyakit daun tomat secara cepat dan akurat menggunakan teknologi Machine Learning. Cukup ambil foto dan dapatkan hasil diagnosis dalam hitungan detik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/detection" className="btn btn-primary text-center">
                Mulai Deteksi
              </Link>
              <Link to="/about" className="btn btn-secondary text-center">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="src/images/gambar1.jpg"
              alt="Tanaman Tomat Sehat"
              className="rounded-xl shadow-lg max-h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;