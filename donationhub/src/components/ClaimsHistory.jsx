import React from 'react';
import { useApp } from '../context/AppContext';
import './ClaimsHistory.css';

const ClaimsHistory = () => {
  const { claims, user } = useApp();
  if (!user) return <div className="unauthorized">Please login to view your claims.</div>;

  const userClaims = claims.filter(c => c.userId === user.id);

  return (
    <div className="claims-container">
      <h1>My Claims History</h1>
      {userClaims.length === 0 ? (
        <p>No claims yet. Browse donations and claim something!</p>
      ) : (
        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Donor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userClaims.map(claim => (
              <tr key={claim.id}>
                <td>{claim.claimDate}</td>
                <td>{claim.item}</td>
                <td>{claim.quantity}</td>
                <td>{claim.donor}</td>
                <td>
                  <span className={`status-badge ${claim.status}`}>
                    {claim.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClaimsHistory;