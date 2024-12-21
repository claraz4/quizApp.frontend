import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer({ noteLink }) {
    // Initialize the default layout plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbar: {
            renderPrintButton: false,
        },
        sidebarTabs: (defaultTabs) => [
            defaultTabs[0] // keep only the thumbnails tab
        ],
    });

    return (
        <div className="pdf-viewer--container">
           <div className="pdf--container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl={noteLink} plugins={[defaultLayoutPluginInstance]}/>
                </Worker>
            </div>
        </div>
    );
}
