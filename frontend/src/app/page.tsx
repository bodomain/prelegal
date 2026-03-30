'use client';

import React, { useState } from 'react';
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

  const downloadDocument = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    const marginTop = 20;
    const textWidth = 170;
    const pageHeight = doc.internal.pageSize.height;
    let y = marginTop;

    const checkPageBreak = (spaceNeeded: number) => {
      if (y + spaceNeeded > pageHeight - 20) {
        doc.addPage();
        y = marginTop;
      }
    };

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("MUTUAL NON-DISCLOSURE AGREEMENT", 105, y, { align: "center" });
    y += 15;

    // Preamble
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    const preamble = `This Mutual Non-Disclosure Agreement (the “MNDA”) is entered into as of ${formData.effectiveDate} (the “Effective Date”) by and between:`;
    const party1 = `${formData.party1Name} of ${formData.party1Company} (“Party 1”)`;
    const party2 = `${formData.party2Name} of ${formData.party2Company} (“Party 2”).`;

    doc.text(doc.splitTextToSize(preamble, textWidth), marginLeft, y);
    y += 15;
    
    doc.setFont("times", "bold");
    doc.text(party1, marginLeft + 10, y);
    y += 6;
    doc.setFont("times", "normal");
    doc.text("and", marginLeft + 10, y);
    y += 6;
    doc.setFont("times", "bold");
    doc.text(party2, marginLeft + 10, y);
    y += 15;

    // Sections
    const sections = [
      {
        title: "1. Introduction.",
        body: `This Mutual Non-Disclosure Agreement allows each party (“Disclosing Party”) to disclose or make available information in connection with the Purpose: [${formData.purpose}] which (1) the Disclosing Party identifies to the receiving party (“Receiving Party”) as “confidential”, “proprietary”, or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure (“Confidential Information”).`
      },
      {
        title: "2. Use and Protection of Confidential Information.",
        body: `The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party’s prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose.`
      },
      {
        title: "3. Exceptions.",
        body: `The Receiving Party’s obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.`
      },
      {
        title: "4. Governing Law and Jurisdiction.",
        body: `This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of ${formData.governingLaw}, without regard to the conflict of laws provisions of such ${formData.governingLaw}. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in ${formData.jurisdiction}.`
      }
    ];

    sections.forEach(sec => {
      checkPageBreak(25);
      doc.setFont("times", "bold");
      doc.text(sec.title, marginLeft, y);
      const titleWidth = doc.getTextWidth(sec.title + " ");
      
      doc.setFont("times", "normal");
      const bodyLines = doc.splitTextToSize(sec.body, textWidth);
      doc.text(bodyLines, marginLeft, y + 6);
      y += (bodyLines.length * 5) + 8;
    });

    // Signatures
    checkPageBreak(50);
    doc.setFont("times", "normal");
    doc.text("By acknowledging this electronic agreement, both parties accept these terms.", marginLeft, y);
    y += 20;

    doc.setFont("times", "bold");
    doc.text("PARTY 1", marginLeft, y);
    doc.text("PARTY 2", marginLeft + 85, y);
    y += 12;

    doc.line(marginLeft, y, marginLeft + 60, y);
    doc.line(marginLeft + 85, y, marginLeft + 145, y);
    y += 5;
    
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text("Signature", marginLeft, y);
    doc.text("Signature", marginLeft + 85, y);

    y += 12;
    doc.text(`Name: ${formData.party1Name}`, marginLeft, y);
    doc.text(`Name: ${formData.party2Name}`, marginLeft + 85, y);

    y += 7;
    doc.text(`Company: ${formData.party1Company}`, marginLeft, y);
    doc.text(`Company: ${formData.party2Company}`, marginLeft + 85, y);

    doc.save(`Mutual_NDA_${formData.party1Company.replace(/\\s+/g, '_')}_${formData.party2Company.replace(/\\s+/g, '_')}.pdf`);
  };

  const PreviewPanel = () => (
    <div className="document-preview" style={{ textAlign: "justify" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>MUTUAL NON-DISCLOSURE AGREEMENT</h2>
      
      <p style={{ marginBottom: "1.5rem" }}>
        This Mutual Non-Disclosure Agreement (the “MNDA”) is entered into as of <strong>{formData.effectiveDate}</strong> (the “Effective Date”) by and between:
      </p>
      
      <div style={{ marginLeft: "2rem", marginBottom: "1.5rem" }}>
        <strong>{formData.party1Name}</strong> of <strong>{formData.party1Company}</strong> (“Party 1”)<br/>
        and<br/>
        <strong>{formData.party2Name}</strong> of <strong>{formData.party2Company}</strong> (“Party 2”).
      </div>

      <p style={{ marginBottom: "1rem" }}>
        <strong style={{ display: "block" }}>1. Introduction.</strong> This Mutual Non-Disclosure Agreement allows each party (“Disclosing Party”) to disclose or make available information in connection with the Purpose: [<strong>{formData.purpose}</strong>] which (1) the Disclosing Party identifies to the receiving party (“Receiving Party”) as “confidential”, “proprietary”, or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure (“Confidential Information”).
      </p>

      <p style={{ marginBottom: "1rem" }}>
        <strong style={{ display: "block" }}>2. Use and Protection of Confidential Information.</strong> The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party’s prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose.
      </p>

      <p style={{ marginBottom: "1rem" }}>
        <strong style={{ display: "block" }}>3. Exceptions.</strong> The Receiving Party’s obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.
      </p>

      <p style={{ marginBottom: "2rem" }}>
        <strong style={{ display: "block" }}>4. Governing Law and Jurisdiction.</strong> This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of <strong>{formData.governingLaw}</strong>, without regard to the conflict of laws provisions of such <strong>{formData.governingLaw}</strong>. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in <strong>{formData.jurisdiction}</strong>.
      </p>

      <p style={{ marginBottom: "2rem" }}>
        By acknowledging this electronic agreement, both parties accept these terms.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
        <div style={{ width: "45%" }}>
          <p><strong>PARTY 1</strong></p>
          <div style={{ borderBottom: "1px solid #000", height: "2rem", marginBottom: "0.5rem" }}></div>
          <p>Signature</p>
          <p style={{ marginTop: "1rem" }}>Name: {formData.party1Name}</p>
          <p>Company: {formData.party1Company}</p>
        </div>
        <div style={{ width: "45%" }}>
          <p><strong>PARTY 2</strong></p>
          <div style={{ borderBottom: "1px solid #000", height: "2rem", marginBottom: "0.5rem" }}></div>
          <p>Signature</p>
          <p style={{ marginTop: "1rem" }}>Name: {formData.party2Name}</p>
          <p>Company: {formData.party2Company}</p>
        </div>
      </div>
    </div>
  );

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
            <PreviewPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
