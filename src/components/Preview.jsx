import React, { useRef, useState } from 'react';
import ProposalTemplate from './ProposalTemplate';
import { Download, Loader2, FileText, Share2, MessageCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './Preview.css';

const Preview = () => {
  const proposalRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Core PDF generation — returns a jsPDF instance or blob
  const generatePdfBlob = async () => {
    if (!proposalRef.current) return null;

    const pages = proposalRef.current.querySelectorAll('.proposal-page');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: page.scrollWidth,
        height: page.scrollHeight
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }

    return pdf;
  };

  // Download PDF
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = await generatePdfBlob();
      if (pdf) {
        pdf.save('Ekvarta_Solar_Proposal.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Share on WhatsApp
  const handleWhatsAppShare = async () => {
    setIsSharing(true);
    try {
      const pdf = await generatePdfBlob();
      if (!pdf) return;

      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], 'Ekvarta_Solar_Proposal.pdf', { type: 'application/pdf' });

      // Try native Web Share API first (works on mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: 'Solar Proposal - Ekvarta Energy Solutions',
          text: 'Here is your solar power proposal from Ekvarta Energy Solutions. Please review the attached document.',
          files: [pdfFile]
        });
      } else {
        // Fallback: Download PDF first, then open WhatsApp with a message
        pdf.save('Ekvarta_Solar_Proposal.pdf');
        
        const message = encodeURIComponent(
          '🌞 *Solar Proposal - Ekvarta Energy Solutions*\n\n' +
          'Namaste! Please find attached the solar proposal prepared for you.\n\n' +
          '📞 For queries, call: 8551800208\n' +
          '📧 Email: energyekvarta@gmail.com\n\n' +
          '_Powered by Ekvarta Energy Solutions_'
        );
        
        // Small delay to let the PDF download complete
        setTimeout(() => {
          window.open(`https://wa.me/?text=${message}`, '_blank');
        }, 1000);
      }
    } catch (error) {
      // User cancelled the share or an error occurred
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        alert('Could not share. The PDF has been downloaded instead.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="preview-container">
      {/* Toolbar */}
      <div className="preview-toolbar glass">
        <div className="toolbar-info">
          <span className="live-badge">Live Preview</span>
          <span className="doc-type"><FileText size={14} /> 5 Pages</span>
        </div>
        <div className="toolbar-actions">
          <button 
            className="btn-whatsapp" 
            onClick={handleWhatsAppShare}
            disabled={isSharing}
          >
            {isSharing ? <Loader2 size={18} className="spin" /> : <MessageCircle size={18} />}
            <span className="btn-text">WhatsApp</span>
          </button>
          <button 
            className="btn-export" 
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 size={18} className="spin" /> : <Download size={18} />}
            <span className="btn-text">PDF</span>
          </button>
        </div>
      </div>

      {/* Proposal Pages */}
      <div className="proposal-wrapper">
        <div ref={proposalRef}>
          <ProposalTemplate />
        </div>
      </div>

      {/* Mobile Floating Action Buttons */}
      <div className="mobile-fab-container">
        <button 
          className="fab fab-whatsapp" 
          onClick={handleWhatsAppShare}
          disabled={isSharing}
          title="Share on WhatsApp"
        >
          {isSharing ? <Loader2 size={22} className="spin" /> : <MessageCircle size={22} />}
        </button>
        <button 
          className="fab fab-download" 
          onClick={handleExportPDF}
          disabled={isExporting}
          title="Download PDF"
        >
          {isExporting ? <Loader2 size={22} className="spin" /> : <Download size={22} />}
        </button>
      </div>
    </div>
  );
};

export default Preview;
