import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { greatHallRooms } from '../data/greatHallData';
import './GreatHallRooms.css';

const GreatHallRooms = () => {
  const [query, setQuery] = useState('');

  const filteredRooms = useMemo(
    () => greatHallRooms.filter((room) => {
      const haystack = `${room.name} ${room.description}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    }),
    [query],
  );

  const publicRooms = filteredRooms.filter((room) => room.access === 'Open' || room.access === 'Member');
  const privateRooms = filteredRooms.filter((room) => room.access === 'Collector' || room.access === 'Patron');

  const renderRoomGrid = (rooms: typeof greatHallRooms, title: string) => {
    if (rooms.length === 0) return null;

    return (
      <section>
        <h3 className="gh-cat-title">{title}</h3>
        <div className="gh-cat-grid">
          {rooms.map((room) => (
            <Link key={room.id} to={`/app/great-hall/rooms/${room.id}`} className="gh-dir-card">
              <div className="gh-dir-card-header">
                <div className="gh-dir-icon" style={{ background: room.accent }}>
                  {room.iconLabel}
                </div>
                <div className="gh-dir-meta">
                  <span>{room.memberCount} members</span>
                  <span className="online">
                    <span className="dot" />
                    {room.onlineCount} online
                  </span>
                </div>
              </div>

              <h4>{room.name}</h4>
              <p>{room.description}</p>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="page-container gh-rooms-directory">
      <div className="gh-dir-header">
        <div className="gh-dir-title-area">
          <h1>Browse Rooms</h1>
          <p>Open spaces, premium discussions, and live collaboration areas across the Great Hall.</p>
        </div>

        <div className="gh-dir-actions">
          <div className="gh-dir-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search rooms..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="gh-rooms-list">
        {renderRoomGrid(publicRooms, 'Public Rooms')}
        {renderRoomGrid(privateRooms, 'Private Rooms')}
      </div>
    </div>
  );
};

export default GreatHallRooms;
