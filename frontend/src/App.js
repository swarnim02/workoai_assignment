import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import ReferralForm from './components/ReferralForm';
import Auth from './components/Auth';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token) {
      fetchCandidates();
    }
  }, [token]);

  useEffect(() => {
    let filtered = candidates;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    setFilteredCandidates(filtered);
  }, [searchTerm, statusFilter, candidates]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/candidates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleAddCandidate = async (candidateData) => {
    try {
      const response = await fetch('http://localhost:3001/api/candidates', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(candidateData)
      });
      if (response.ok) {
        fetchCandidates();
        setShowForm(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add candidate');
      }
    } catch (error) {
      alert('Error adding candidate');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3001/api/candidates/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchCandidates();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/candidates/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          fetchCandidates();
        }
      } catch (error) {
        console.error('Error deleting candidate:', error);
      }
    }
  };

  const handleAuthSuccess = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setCandidates([]);
    setCurrentPage('home');
  };

  if (showAuth) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (!token) {
    return (
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>Worko.ai</h1>
          </div>
          <div className="navbar-menu"></div>
          <div className="navbar-user">
            <button className="btn-secondary" onClick={() => setShowAuth(true)}>Login</button>
            <button className="btn-secondary" onClick={() => setShowAuth(true)} style={{ marginLeft: '10px' }}>Register</button>
          </div>
        </nav>
        <div className="content">
          <div className="home-page">
            <h1>Worko.ai</h1>
            <p>Candidate Referral Management System</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <h1>Worko.ai</h1>
        </div>
        <div className="navbar-menu">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'referrals' ? 'active' : ''}`}
            onClick={() => setCurrentPage('referrals')}
          >
            Referrals
          </button>
          <button 
            className={`nav-link ${currentPage === 'metrics' ? 'active' : ''}`}
            onClick={() => setCurrentPage('metrics')}
          >
            Metrics
          </button>
        </div>
        <div className="navbar-user">
          <span className="user-info">{user?.name} ({user?.role === 'admin' ? 'Admin' : 'User'})</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="content">
        {currentPage === 'home' ? (
          <div className="home-page">
            <h1>Worko.ai</h1>
            <p>Candidate Referral Management System</p>
          </div>
        ) : currentPage === 'metrics' ? (
          // Metrics and Analytics Dashboard
          // Displays total referrals and breakdown by status (Pending/Reviewed/Hired)
          <div className="metrics-page">
            <div className="metric-box large">
              <div className="metric-value">{candidates.length}</div>
              <div className="metric-label">Total Referrals</div>
            </div>
            <div className="metric-row">
              <div className="metric-box">
                <div className="metric-value">{candidates.filter(c => c.status === 'Pending').length}</div>
                <div className="metric-label">Pending</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">{candidates.filter(c => c.status === 'Reviewed').length}</div>
                <div className="metric-label">Reviewed</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">{candidates.filter(c => c.status === 'Hired').length}</div>
                <div className="metric-label">Hired</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {user?.role !== 'admin' && (
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Close Form' : 'Refer Candidate'}
                </button>
              </div>
            )}

            {user?.role !== 'admin' && showForm && <ReferralForm onSubmit={handleAddCandidate} />}

            <div className="filter-section">
              <div className="filter-row">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, email, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="filter-dropdown"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status ({candidates.length})</option>
                  <option value="Pending">Pending ({candidates.filter(c => c.status === 'Pending').length})</option>
                  <option value="Reviewed">Reviewed ({candidates.filter(c => c.status === 'Reviewed').length})</option>
                  <option value="Hired">Hired ({candidates.filter(c => c.status === 'Hired').length})</option>
                </select>
              </div>
            </div>

            <Dashboard
              candidates={filteredCandidates}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              userRole={user?.role}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
