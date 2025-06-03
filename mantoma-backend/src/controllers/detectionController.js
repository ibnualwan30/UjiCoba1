// src/controllers/detectionController.js - Main Detection Logic
const path = require('path');
const fs = require('fs');

// Mock AI/ML prediction function (nanti akan diganti dengan model yang sesungguhnya)
const predictDisease = async (imagePath) => {
  // Simulasi delay processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock prediction results
  const diseases = [
    {
      disease: "Tanaman Sehat",
      confidence: 94.2,
      status: "healthy",
      description: "Daun tomat Anda dalam kondisi sehat! Tidak terdeteksi adanya penyakit atau gangguan pada daun ini. Pertahankan perawatan yang baik untuk menjaga kesehatan tanaman.",
      treatment: [
        "Lanjutkan penyiraman secara teratur namun tidak berlebihan",
        "Pastikan tanaman mendapat sinar matahari yang cukup (6-8 jam per hari)",
        "Berikan pupuk organik secara berkala sesuai jadwal",
        "Pantau secara rutin untuk deteksi dini jika ada perubahan",
        "Jaga kebersihan area sekitar tanaman dari gulma"
      ]
    },
    {
      disease: "Early Blight (Alternaria solani)",
      confidence: 96.7,
      status: "diseased",
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
      status: "diseased",
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
      status: "diseased",
      description: "Disebabkan oleh jamur Fulvia fulva, ditandai dengan bercak kuning di bagian atas daun dan lapisan jamur berwarna hijau zaitun di bawah daun.",
      treatment: [
        "Kurangi kelembaban di sekitar tanaman",
        "Tingkatkan ventilasi rumah kaca",
        "Gunakan fungisida yang sesuai",
        "Hindari menanam terlalu rapat"
      ]
    }
  ];
  
  // Return random prediction
  const randomIndex = Math.floor(Math.random() * diseases.length);
  return diseases[randomIndex];
};

// Controller: Analyze uploaded image
const analyzeImage = async (req, res) => {
  try {
    console.log('🔍 Starting image analysis...');
    
    if (!req.uploadedFile) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada file yang berhasil diproses'
      });
    }

    console.log('📊 Processing image:', {
      filename: req.uploadedFile.fileName,
      size: `${(req.uploadedFile.size / 1024).toFixed(2)} KB`,
      type: req.uploadedFile.mimetype
    });

    // Get prediction from AI/ML model
    const prediction = await predictDisease(req.uploadedFile.path);
    
    if (!prediction) {
      throw new Error('Model gagal memberikan prediksi');
    }

    // Validate prediction result
    if (!prediction.disease || typeof prediction.confidence !== 'number') {
      throw new Error('Format hasil prediksi tidak valid');
    }

    // Clean up uploaded file after processing
    try {
      if (fs.existsSync(req.uploadedFile.path)) {
        fs.unlinkSync(req.uploadedFile.path);
        console.log('🗑️ Cleaned up uploaded file');
      }
    } catch (cleanupError) {
      console.warn('⚠️ Failed to cleanup file:', cleanupError.message);
      // Don't fail the request if cleanup fails
    }
    
    console.log(`✅ Analysis complete: ${prediction.disease} (${prediction.confidence}%)`);
    
    // Return successful response
    res.json({
      success: true,
      message: 'Analisis gambar berhasil diselesaikan',
      data: {
        result: prediction,
        timestamp: new Date().toISOString(),
        processedFile: {
          originalName: req.uploadedFile.originalName,
          size: req.uploadedFile.size
        }
      }
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);
    
    // Clean up file if error occurs
    if (req.uploadedFile && req.uploadedFile.path && fs.existsSync(req.uploadedFile.path)) {
      try {
        fs.unlinkSync(req.uploadedFile.path);
        console.log('🗑️ Cleaned up file after error');
      } catch (cleanupError) {
        console.warn('⚠️ Failed to cleanup file after error:', cleanupError.message);
      }
    }

    // Determine appropriate error message
    let statusCode = 500;
    let userMessage = 'Terjadi kesalahan saat menganalisis gambar';

    if (error.message.includes('Model gagal')) {
      statusCode = 503;
      userMessage = 'Sistem deteksi sedang bermasalah. Silakan coba lagi dalam beberapa saat.';
    } else if (error.message.includes('timeout')) {
      statusCode = 408;
      userMessage = 'Proses analisis terlalu lama. Silakan coba dengan gambar yang lebih kecil.';
    } else if (error.message.includes('Format hasil')) {
      statusCode = 502;
      userMessage = 'Sistem mengalami kesalahan internal. Tim teknis telah diberitahu.';
    } else if (error.message) {
      userMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      message: userMessage,
      error: process.env.NODE_ENV === 'development' ? {
        details: error.message,
        stack: error.stack
      } : undefined
    });
  }
};

module.exports = {
  analyzeImage
};