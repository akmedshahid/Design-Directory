import React from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle, FileText, Scale } from 'lucide-react';
import './GroupBuysRules.css';

const GroupBuysRules = () => {
  return (
    <div className="page-container gb-rules-page">
      <div className="gb-rules-header">
        <Scale size={32} style={{ color: 'var(--accent-color)', marginBottom: 16 }} />
        <h1>Rules & Legal Guidelines</h1>
        <p>Please read these guidelines carefully. We strictly prohibit piracy and unauthorized sharing.</p>
      </div>

      <div className="gb-rules-content">
        <section className="gb-rules-section">
          <h2><ShieldAlert size={20} /> 1. No Piracy or Unauthorized Sharing</h2>
          <p>This platform does not support, endorse, or allow the illegal distribution of copyrighted materials. You must never upload, request, or share cracked software, nulled plugins, or stolen assets.</p>
          <p>If you request a Group-Buy for a product that explicitly forbids team use or sharing, the request will be permanently rejected.</p>
        </section>

        <section className="gb-rules-section">
          <h2><CheckCircle2 size={20} /> 2. Legitimate Collective Purchasing</h2>
          <p>Group-Buys are intended for products where the creator offers:</p>
          <ul>
            <li><strong>Team Licenses</strong> (e.g., "5-Seat Agency License")</li>
            <li><strong>Extended/Commercial Licenses</strong> with distribution rights</li>
            <li><strong>Multi-seat allocations</strong> explicitly mentioned in their terms</li>
          </ul>
          <p>If the terms are ambiguous, an Admin will contact the seller directly to request written permission for a collective buy.</p>
        </section>

        <section className="gb-rules-section">
          <h2><FileText size={20} /> 3. The Review Process</h2>
          <p>Every Group-Buy request goes through a strict review process:</p>
          <ol>
            <li><strong>Request:</strong> A member submits a request and links the product's terms.</li>
            <li><strong>License Review:</strong> Admins review the license terms. If it requires contacting the seller, the status changes to "Needs Review".</li>
            <li><strong>Approval:</strong> If the license permits collective buying, it is approved for voting.</li>
            <li><strong>Scheduling:</strong> Once the vote goal is reached, Admins schedule the buy and open it for joining.</li>
          </ol>
        </section>

        <section className="gb-rules-section">
          <h2><AlertCircle size={20} /> 4. Payments and Refunds</h2>
          <p>All payments are handled securely. If a Group-Buy fails to reach its minimum participant count by the deadline, or if the purchase cannot be completed for any reason, all participants will receive a full refund.</p>
          <p>Once a purchase is completed and the product is delivered, refunds are generally not possible.</p>
        </section>
      </div>
    </div>
  );
};

export default GroupBuysRules;