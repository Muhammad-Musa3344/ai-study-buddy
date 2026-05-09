import React, { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file) {
      alert("Please select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setResult(response.data.result);

    } catch (error) {

      console.error(error);
      alert("Error uploading file");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold mb-4">
            AI Study Buddy
          </h1>

          <p className="text-gray-300 text-lg">
            Upload notes and generate smart summaries + quizzes
          </p>

        </div>

        {/* Glass Card */}
        <div
          className="
            bg-white/10
            backdrop-blur-lg
            border border-white/20
            rounded-3xl
            p-8
            shadow-2xl
          "
        >

          {/* Upload Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="
                w-full
                bg-black/20
                border border-white/20
                rounded-xl
                p-3
              "
            />

            <button
              onClick={uploadFile}
              className="
                bg-blue-600
                hover:bg-blue-700
                transition
                px-6
                py-3
                rounded-xl
                font-semibold
                w-full md:w-auto
              "
            >
              Upload PDF
            </button>

          </div>

          {/* Loading */}
          {
            loading && (
              <div className="mt-6 text-blue-400">
                AI is analyzing your notes...
              </div>
            )
          }

          {/* Result */}
          {
            result && (
              <div
                className="
                  mt-8
                  bg-black/20
                  border border-white/10
                  rounded-2xl
                  p-6
                  whitespace-pre-wrap
                "
              >
                {result}
              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default App;