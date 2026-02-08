import React, { useState } from 'react';

function ReferralForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    resumeLink: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.jobTitle) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '', jobTitle: '', resumeLink: '' });
  };

  return (
    <div className="form-container">
      <h2>Refer a Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10 digit number"
            required
          />
        </div>
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Resume Link</label>
          <input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://example.com/resume.pdf"
          />
        </div>
        <button type="submit" className="btn-submit">Submit Referral</button>
      </form>
    </div>
  );
}

export default ReferralForm;
