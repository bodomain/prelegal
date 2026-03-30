'use client';

import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

export default function Home() {
  const [formData, setFormData] = useState({
    party1Name: 'Party 1 Name',
    party1Company: 'Party 1 Company',
    party2Name: 'Party 2 Name',
    party2Company: 'Party 2 Company',
    purpose: 'Evaluating a potential business relationship',
    effectiveDate: new Date().toISOString().split('T')[0],
    governingLaw: 'Delaware',
    jurisdiction: 'New Castle County, DE'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const documentContent = `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (the “MNDA”) is entered into as of ${formData.effectiveDate} (the “Effective Date”) by and between:

${formData.party1Name} of ${formData.party1Company} (“Party 1”)
and
${formData.party2Name} of ${formData.party2Company} (“Party 2”).

1. Introduction. This Mutual Non-Disclosure Agreement allows each party (“Disclosing Party”) to disclose or make available information in connection with the Purpose: [${formData.purpose}] which (1) the Disclosing Party identifies to the receiving party (“Receiving Party”) as “confidential”, “proprietary”, or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure (“Confidential Information”).

2. Use and Protection of Confidential Information. The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party’s prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose.

3. Exceptions. The Receiving Party’s obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.

4. Governing Law and Jurisdiction. This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of ${formData.governingLaw}, without regard to the conflict of laws provisions of such ${formData.governingLaw}. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in ${formData.jurisdiction}.

By acknowledging this electronic agreement, both parties accept these terms.`;

  const downloadDocument = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(documentContent, 180);
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    
    // Add text with simple pagination if it exceeds the page length
    let y = 20;
    const pageHeight = doc.internal.pageSize.height;
    
    splitText.forEach((line: string) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 15, y);
      y += 6; // line spacing
    });

    doc.save(`Mutual_NDA_${formData.party1Company.replace(/\s+/g, '_')}_${formData.party2Company.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <main className="container">
      <div className="header">
        <h1>Mutual NDA Generator</h1>
        <p>Instantly generate standard CommonPaper Mutual NDAs with your specifics. Just fill out the details and download your custom document.</p>
      </div>

      <div className="app-grid">
        <div className="glass-panel form-panel">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", marginBottom: '1.5rem', color: '#6ee7b7' }}>Agreement Details</h2>
          
          <div className="form-group">
            <label>Purpose of NDA</label>
            <textarea 
              name="purpose" 
              value={formData.purpose} 
              onChange={handleInputChange} 
              rows={3}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Effective Date</label>
              <input 
                type="date" 
                name="effectiveDate" 
                value={formData.effectiveDate} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Governing Law (State)</label>
              <input 
                type="text" 
                name="governingLaw" 
                value={formData.governingLaw} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Jurisdiction (County/Court)</label>
            <input 
              type="text" 
              name="jurisdiction" 
              value={formData.jurisdiction} 
              onChange={handleInputChange} 
            />
          </div>

          <h3 style={{ fontFamily: "'Outfit', sans-serif", marginTop: '2rem', marginBottom: '1rem', color: '#6ee7b7' }}>Party 1</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="party1Name" 
                value={formData.party1Name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input 
                type="text" 
                name="party1Company" 
                value={formData.party1Company} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <h3 style={{ fontFamily: "'Outfit', sans-serif", marginTop: '1.5rem', marginBottom: '1rem', color: '#6ee7b7' }}>Party 2</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="party2Name" 
                value={formData.party2Name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input 
                type="text" 
                name="party2Company" 
                value={formData.party2Company} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <button className="primary-button" onClick={downloadDocument}>
            Download Document
          </button>
        </div>

        <div className="glass-panel">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", marginBottom: '1.5rem', color: '#3b82f6' }}>Live Preview</h2>
          <div className="preview-container">
            <div className="document-preview">
              {documentContent}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
