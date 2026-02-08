import React from 'react';

// Admin Features:
// - View all candidates with referrer information
// - Update candidate status (Pending/Reviewed/Hired)
// - Delete candidates
// Regular users can only view their own referrals

function Dashboard({ candidates, onStatusUpdate, onDelete, userRole }) {
  if (candidates.length === 0) {
    return <div className="empty-state">
      {userRole === 'admin' ? 'No referrals yet' : 'You haven\'t referred any candidates yet'}
    </div>;
  }

  return (
    <div className="dashboard">
      {candidates.map(candidate => (
        <div key={candidate._id} className="candidate-card">
          <h3>{candidate.name}</h3>
          <p><strong>Job Title:</strong> {candidate.jobTitle}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Phone:</strong> {candidate.phone}</p>
          {userRole === 'admin' && candidate.referredBy && (
            <p><strong>Referred By:</strong> {candidate.referredBy.name} ({candidate.referredBy.email})</p>
          )}
          <span className={`status-badge ${candidate.status}`}>
            {candidate.status}
          </span>
          {candidate.resumeName && <p><strong>Resume:</strong> {candidate.resumeName}</p>}
          {userRole === 'admin' && (
            <div className="card-actions">
              <select
                value={candidate.status}
                onChange={(e) => onStatusUpdate(candidate._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Hired">Hired</option>
              </select>
              <button className="btn-delete" onClick={() => onDelete(candidate._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
