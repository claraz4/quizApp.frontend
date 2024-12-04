import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    // Initialize the default layout plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbar: {
            renderPrintButton: false,
        },
        sidebarTabs: (defaultTabs) => [
            defaultTabs[0] // keep only the thumbnails tab
        ],
    });

    // Update fileUrl when a file is selected
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);

            // Clean up the URL when the component unmounts or the file changes
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    return (
        <div className="pdf-viewer--container">
            {!fileUrl && <div style={{ marginBottom: '20px' }}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </div>}

            {fileUrl && (
                <div className="pdf--container">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]}/>
                    </Worker>
                </div>
            )}
        </div>
    );
}
