// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

// const BarcodeScanner = () => {
//   const webcamRef = useRef(null);
//   const [result, setResult] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//     if (imageSrc) {
//       decodeBarcode(imageSrc);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result);
//         decodeBarcode(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const decodeBarcode = async (imageSrc) => {
//     try {
//       const codeReader = new BrowserMultiFormatReader();
//       const result = await codeReader.decodeFromImageUrl(imageSrc);
//       setResult(result.text);
//     } catch (err) {
//       if (err instanceof NotFoundException) {
//         console.warn('No barcode found:', err);
//         setResult('No barcode found');
//       } else {
//         console.error('Error decoding barcode:', err);
//         setResult('Error decoding barcode');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Barcode Scanner</h1>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width="100%"
//         videoConstraints={{
//           width: 1280,
//           height: 720,
//           facingMode: "environment"
//         }}
//       />
//       <button onClick={captureImage}>Capture</button>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {capturedImage && <img src={capturedImage} alt="Captured" width="100%" />}
//       {uploadedImage && <img src={uploadedImage} alt="Uploaded" width="100%" />}
//       <p>{result ? `Scanned Result: ${result}` : "Scanning..."}</p>
//     </div>
//   );
// };

// export default BarcodeScanner;

import React, { useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const BarcodeScanner = () => {
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageSrc = reader.result;
        setUploadedImage(imageSrc);
        try {
          const codeReader = new BrowserMultiFormatReader();
          const result = await codeReader.decodeFromImage(undefined, imageSrc);
          setResult(result.text);
        } catch (err) {
          if (err instanceof NotFoundException) {
            console.warn('No barcode found:', err);
            setResult('No barcode found');
          } else {
            console.error('Error decoding barcode:', err);
            setResult('Error decoding barcode');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />}
      <p>{result ? `Scanned Result: ${result}` : "Upload an image to scan"}</p>
    </div>
  );
};

export default BarcodeScanner;
