import React, { useState, useRef } from 'react';

const Detection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    
    // Simulasi deteksi (ini akan diganti dengan panggilan API ke backend nanti)
    setTimeout(() => {
      // Simulasi hasil deteksi
      const sampleResults = [
        {
          disease: "Early Blight (Alternaria solani)",
          confidence: 96.7,
          description: "Penyakit ini disebabkan oleh jamur Alternaria solani dan ditandai dengan bercak coklat berbentuk konsentris pada daun yang lebih tua.",
          treatment: [
            "Hapus dan musnahkan daun terinfeksi",
            "Gunakan fungisida berbahan dasar tembaga",
            "Tingkatkan sirkulasi udara di sekitar tanaman",
            "Hindari menyiram daun secara langsung"
          ]
        },
        {
          disease: "Late Blight (Phytophthora infestans)",
          confidence: 88.3,
          description: "Disebabkan oleh jamur Phytophthora infestans, ditandai dengan bercak hijau pucat hingga coklat dengan area putih berspora di bawah daun.",
          treatment: [
            "Gunakan fungisida protektif sebelum infeksi",
            "Pastikan drainase tanah yang baik",
            "Tanam pada jarak yang cukup",
            "Gunakan varietas tahan penyakit jika tersedia"
          ]
        },
        {
          disease: "Leaf Mold (Fulvia fulva)",
          confidence: 77.5,
          description: "Disebabkan oleh jamur Fulvia fulva, ditandai dengan bercak kuning di bagian atas daun dan lapisan jamur berwarna hijau zaitun di bawah daun.",
          treatment: [
            "Kurangi kelembaban di sekitar tanaman",
            "Tingkatkan ventilasi rumah kaca",
            "Gunakan fungisida yang sesuai",
            "Hindari menanam terlalu rapat"
          ]
        }
      ];
      
      // Pilih hasil dengan confidence tertinggi
      const detectionResult = sampleResults.sort((a, b) => b.confidence - a.confidence)[0];
      
      setResult(detectionResult);
      setIsLoading(false);
    }, 2000);
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Deteksi Penyakit Daun Tomat
            </h1>
            <p className="text-lg text-gray-700">
              Upload foto daun tomat untuk mendeteksi penyakit dan mendapatkan rekomendasi penanganan
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {!selectedImage && (
              <div className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Foto Daun Tomat
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Pilih dari galeri Anda
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleUpload}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Pilih dari Galeri
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedImage && !result && (
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Pratinjau Gambar
                  </h3>
                  <div className="relative rounded-lg overflow-hidden max-h-96 flex justify-center border border-gray-200">
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-contain max-h-96"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={resetDetection}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-white text-primary-600 border border-primary-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Pilih Gambar Lain
                  </button>
                  <button
                    onClick={handleDetect}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Deteksi Penyakit
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {result && (
              <div className="p-8">
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="rounded-lg overflow-hidden max-h-80 border border-gray-200">
                      <img
                        src={preview}
                        alt="Daun terdeteksi"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900">Terdeteksi</h3>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {result.disease}
                      </h2>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-700">
                          Tingkat kepercayaan:
                          <span className="font-medium text-primary-600 ml-1">
                            {result.confidence.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                      <p className="text-gray-700">{result.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Rekomendasi Penanganan
                  </h3>
                  <ul className="space-y-2">
                    {result.treatment.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6 flex justify-between">
                  <button
                    onClick={resetDetection}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-white text-primary-600 border border-primary-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Deteksi Gambar Lain
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;