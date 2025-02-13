import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPrediction(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);
    
    setLoading(true);
    try {
      const response = await axios.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing image');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Rice Plant Health Detector
          </h1>
          <p className="text-gray-600 mb-4">
            Powered by Inception ResNet V2
          </p>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About the Model</h2>
            <p className="text-gray-600 mb-4">
              This state-of-the-art deep learning model achieves an impressive accuracy of 97.25% in detecting nitrogen deficiency in rice plants.
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                Designed and Developed by
              </p>
              <p className="text-md font-medium text-gray-800">
                Mrs. E. Lakshmipriya
              </p>
              <p className="text-sm text-gray-600">
                Velammal College of Engineering and Technology, Madurai
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Rice Plant Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-3 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-green-50 file:text-green-700
                             hover:file:bg-green-100
                             transition-all duration-200"
                  />
                </div>
                
                {selectedImage && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full max-w-md">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!selectedImage || loading}
                  className={`px-8 py-3 rounded-full shadow-md text-sm font-medium text-white 
                    transition-all duration-200
                    ${!selectedImage || loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Analyze Image'}
                </button>
              </div>
            </form>

            {prediction && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Analysis Result</h2>
                <div className={`text-lg font-medium p-4 rounded-lg ${
                  prediction === 'Healthy' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {prediction}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Rice Plant Health Detector. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 