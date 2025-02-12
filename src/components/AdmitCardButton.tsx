'use client';

import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AdmitCardPDF from './AdmitCardPDF';
import { MdDownload } from 'react-icons/md';

const AdmitCardButton = ({ studentId, className }: { studentId: string, className: string }) => {
  const [loading, setLoading] = useState(false);

  return (
    <PDFDownloadLink
      document={<AdmitCardPDF studentId={studentId} className={className} />}
      fileName={`admit_card_${studentId}.pdf`}
    >
      {({ blob, url, loading, error }) => (
        <button
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Generating...' : <><MdDownload className="inline-block mr-2" /> Admit Card</>}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default AdmitCardButton; 