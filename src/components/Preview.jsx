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

    try {
      // Scroll to top to avoid canvas offset issues
      window.scrollTo(0, 0);

      // Ensure fonts are loaded
      if (document.fonts) {
        await document.fonts.ready;
      }

      const pages = proposalRef.current.querySelectorAll('.proposal-page');
      if (pages.length === 0) return null;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        const canvas = await html2canvas(page, {
          scale: 1.5, // Slightly lower to save memory on mobile
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 794, // Fixed A4 width at 96dpi
          height: 1123, // Fixed A4 height at 96dpi
          onclone: (clonedDoc) => {
            // CRITICAL: Reset any transforms on the wrapper or pages in the clone
            const clonedWrapper = clonedDoc.querySelector('.proposal-wrapper > div');
            if (clonedWrapper) {
              clonedWrapper.style.transform = 'none';
              clonedWrapper.style.margin = '0';
              clonedWrapper.style.padding = '0';
            }
            
            const clonedPages = clonedDoc.querySelectorAll('.proposal-page');
            clonedPages.forEach(p => {
              p.style.transform = 'none';
              p.style.margin = '0';
              p.style.display = 'block';
            });
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        
        // Clean up to save memory
        canvas.width = 0;
        canvas.height = 0;
      }

      return pdf;
    } catch (err) {
      console.error('PDF Generation Internal Error:', err);
      throw err;
    }
  };

  // Download PDF
  const handleExportPDF = async () => {
    if (isExporting || isSharing) return;
    setIsExporting(true);
    try {
      const pdf = await generatePdfBlob();
      if (pdf) {
        pdf.save(`Ekvarta_Solar_Proposal_${Date.now()}.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Share Proposal (Generic Share)
  const handleShare = async () => {
    if (isSharing || isExporting) return;
    setIsSharing(true);
    try {
      const pdf = await generatePdfBlob();
      if (!pdf) return;

      const pdfBlob = pdf.output('blob');
      const fileName = `Ekvarta_Solar_Proposal.pdf`;
      const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

      const message = 
        '🌞 *Solar Proposal - Ekvarta Energy Solutions*\n\n' +
        'Namaste! Please find attached the solar proposal prepared for you.\n\n' +
        '📞 For queries, call: 8551800208\n' +
        '📧 Email: energyekvarta@gmail.com\n\n' +
        '_Powered by Ekvarta Energy Solutions_';

      // Try native Web Share API first
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: 'Solar Proposal',
          text: message,
          files: [pdfFile]
        });
      } else {
        // Fallback: Download and provide instructions
        pdf.save(fileName);
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        
        // Open WhatsApp as a common fallback, but alert the user
        alert('Sharing directly is not supported on this browser. The PDF has been downloaded. You can now share it manually.');
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        alert('Could not share directly. The PDF has been downloaded.');
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
            className="btn-share" 
            onClick={handleShare}
            disabled={isSharing}
          >
            {isSharing ? <Loader2 size={18} className="spin" /> : <Share2 size={18} />}
            <span className="btn-text">Share</span>
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
          className="fab fab-share" 
          onClick={handleShare}
          disabled={isSharing}
          title="Share Proposal"
        >
          {isSharing ? <Loader2 size={22} className="spin" /> : <Share2 size={22} />}
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
