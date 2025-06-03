// src/middleware/uploadMiddleware.js - File Upload Middleware
const path = require('path');
const fs = require('fs');

const uploadMiddleware = (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada file gambar yang diunggah. Pastikan Anda memilih file terlebih dahulu.'
      });
    }

    const uploadedFile = req.files.image;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: `Format file tidak didukung (${uploadedFile.mimetype}). Hanya JPEG, PNG, dan WebP yang diizinkan.`
      });
    }

    // Validate file size (10MB max, 1KB min)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const minSize = 1024; // 1KB
    
    if (uploadedFile.size > maxSize) {
      const fileSizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(2);
      return res.status(413).json({
        success: false,
        message: `File terlalu besar (${fileSizeMB}MB). Maksimal ukuran file adalah 10MB.`
      });
    }

    if (uploadedFile.size < minSize) {
      return res.status(400).json({
        success: false,
        message: 'File terlalu kecil. Minimal 1KB. Pastikan ini adalah file gambar yang valid.'
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2);
    const fileExtension = path.extname(uploadedFile.name);
    const fileName = `leaf_${timestamp}_${randomString}${fileExtension}`;
    
    // Set upload path
    const uploadPath = path.join(__dirname, '../uploads', fileName);
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Log file info
    console.log('📤 Processing file upload:', {
      originalName: uploadedFile.name,
      size: `${(uploadedFile.size / 1024).toFixed(2)} KB`,
      type: uploadedFile.mimetype
    });

    // Move file to uploads directory
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.error('❌ File upload error:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal menyimpan file yang diunggah. Silakan coba lagi.'
        });
      }

      // Add file info to request object
      req.uploadedFile = {
        originalName: uploadedFile.name,
        fileName: fileName,
        path: uploadPath,
        size: uploadedFile.size,
        mimetype: uploadedFile.mimetype,
        url: `/uploads/${fileName}`
      };

      console.log(`✅ File uploaded successfully: ${fileName}`);
      next();
    });

  } catch (error) {
    console.error('❌ Upload middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses upload file.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = uploadMiddleware;