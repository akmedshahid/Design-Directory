import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { mockGroupBuys, type GroupBuy, type GroupBuyStatus } from '../../data/groupBuysData';
import { GroupBuyCard } from './GroupBuyComponents';
import EmptyStatePanel from '../../components/EmptyState';

interface GroupBuysFilteredProps {
  title: string;
  subtitle: string;
  statuses: GroupBuyStatus[];
  emptyTitle?: string;
  emptyDesc?: string;
  personal?: boolean;
}

const GroupBuysFiltered = ({ title, subtitle, statuses, emptyTitle, emptyDesc, personal }: GroupBuysFilteredProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let items = mockGroupBuys.filter(gb => statuses.includes(gb.status));
    if (personal) {
      items = items.filter(gb => gb.participants.some(p => p.userId === 'viewer' || p.username === 'invited'));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(gb =>
        gb.title.toLowerCase().includes(q) ||
        gb.type.toLowerCase().includes(q) ||
        gb.shortDescription.toLowerCase().includes(q)
      );
    }
    return items;
  }, [query, statuses, personal]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 34px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
              borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filtered.map(gb => (
            <GroupBuyCard key={gb.id} gb={gb} />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: '32px' }}>
          <EmptyStatePanel
            title={emptyTitle || `No ${title.toLowerCase()} found`}
            description={emptyDesc || `There are currently no group-buys matching this filter.`}
          />
        </div>
      )}
    </div>
  );
};

export const GroupBuysRequests = () => (
  <GroupBuysFiltered
    title="Requests & Voting"
    subtitle="Group-buys awaiting approval or currently in the voting phase."
    statuses={['Requested', 'Under Review', 'Needs License Review', 'Approved for Voting', 'Voting']}
    emptyTitle="No active requests"
    emptyDesc="All requests have been processed. Submit a new request to start a group-buy."
  />
);

export const GroupBuysScheduled = () => (
  <GroupBuysFiltered
    title="Scheduled"
    subtitle="Group-buys that have been approved and are scheduled to start."
    statuses={['Scheduled']}
    emptyTitle="Nothing scheduled"
    emptyDesc="No group-buys are currently scheduled. Check back soon."
  />
);

export const GroupBuysActive = () => (
  <GroupBuysFiltered
    title="Active Buys"
    subtitle="Group-buys currently in progress — collecting payments or ready to purchase."
    statuses={['Active', 'Collecting Payments', 'Purchase Ready']}
    emptyTitle="No active buys"
    emptyDesc="There are no active group-buys right now."
  />
);

export const GroupBuysCompleted = () => (
  <GroupBuysFiltered
    title="Completed"
    subtitle="Group-buys that have been purchased and delivered."
    statuses={['Purchased', 'Delivered', 'Completed']}
    emptyTitle="No completed buys yet"
    emptyDesc="Once group-buys are delivered, they'll appear here."
  />
);

export const GroupBuysMine = () => (
  <GroupBuysFiltered
    title="My Participation"
    subtitle="Group-buys you've joined or expressed interest in."
    statuses={['Requested', 'Under Review', 'Voting', 'Scheduled', 'Active', 'Collecting Payments', 'Purchase Ready', 'Purchased', 'Delivered', 'Completed']}
    personal
    emptyTitle="You haven't joined any group-buys"
    emptyDesc="Browse active group-buys and join one to see it here."
  />
);

export const GroupBuysPayments = () => (
  <GroupBuysFiltered
    title="My Payments"
    subtitle="Track your payment status across all group-buys."
    statuses={['Active', 'Collecting Payments', 'Purchase Ready', 'Purchased', 'Delivered', 'Completed']}
    personal
    emptyTitle="No payments yet"
    emptyDesc="Once you join a group-buy and make a payment, it will appear here."
  />
);

export default GroupBuysFiltered;
