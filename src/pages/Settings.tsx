import React, { useState } from 'react';
import { User, Sliders, Monitor, HardDrive, Shield, AlertTriangle, Save, Key, LogOut } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

type SettingsTab = 'profile' | 'preferences' | 'security' | 'appearance' | 'data';

const Settings = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Form states
  const [profile, setProfile] = useState({ name: 'Alex Designer', email: 'alex@example.com', role: 'Curator' });
  const [prefs, setPrefs] = useState({ density: 'compact', defaultView: 'grid', notifications: true });
  const [appearance, setAppearance] = useState({ theme: 'dark', accent: 'blue', reducedMotion: false });
  const [security, setSecurity] = useState({ autoMaskPasswords: true, requireAuthToReveal: false });
  
  const handleSave = () => {
    toast('Settings saved successfully.', 'success');
  };

  const handleClearData = () => {
    if (confirm("Are you sure? This will clear all local storage including bookmarks and collections.")) {
      toast('Local data cleared.', 'info');
    }
  };

  const handleClearVault = () => {
    if (confirm("Are you sure? This will clear all saved Sites and Vault credentials permanently.")) {
      toast('Vault credentials cleared safely.', 'success');
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account, preferences, and local data.</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <button className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={16} /> Account
          </button>
          <button className={`settings-nav-item ${activeTab === 'preferences' ? 'active' : ''}`} onClick={() => setActiveTab('preferences')}>
            <Sliders size={16} /> Preferences
          </button>
          <button className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <Key size={16} /> Vault Security
          </button>
          <button className={`settings-nav-item ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>
            <Monitor size={16} /> Appearance
          </button>
          <button className={`settings-nav-item ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>
            <HardDrive size={16} /> Data & Privacy
          </button>
        </div>

        <div className="settings-content-wrapper">
          {activeTab === 'profile' && (
            <div className="settings-section slide-in">
              <h2>Account Details</h2>
              <p className="settings-desc">View your private invite-only account details.</p>
              
              <div className="settings-card">
                <div className="settings-field">
                  <label>Username</label>
                  <input type="text" value={user?.username || ''} disabled className="disabled-input" />
                </div>
                <div className="settings-field">
                  <label>Email Address</label>
                  <input type="email" value={user?.email || ''} disabled className="disabled-input" />
                </div>
                <div className="settings-field">
                  <label>Access Type</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.2)', borderRadius: '12px', color: 'var(--accent-color)', fontWeight: 600 }}>
                    <Shield size={16} />
                    {user?.role || 'Invited Member'}
                  </div>
                  <span className="field-hint">This directory is a private invite-only workspace.</span>
                </div>
                
                <div className="divider" />
                
                <div className="settings-field-row">
                  <div className="toggle-text">
                    <label>Sign Out</label>
                    <span>Securely log out of this device.</span>
                  </div>
                  <button className="action-btn" onClick={() => { logout(); navigate('/login'); }}>
                    <LogOut size={16} style={{ marginRight: 6 }} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section slide-in">
              <h2>Preferences</h2>
              <p className="settings-desc">Customize how the directory behaves.</p>
              
              <div className="settings-card">
                <div className="settings-field">
                  <label>Default View Mode (Resources)</label>
                  <div className="segmented-control">
                    <button className={`segment ${prefs.defaultView === 'grid' ? 'active' : ''}`} onClick={() => setPrefs({...prefs, defaultView: 'grid'})}>Grid</button>
                    <button className={`segment ${prefs.defaultView === 'list' ? 'active' : ''}`} onClick={() => setPrefs({...prefs, defaultView: 'list'})}>List</button>
                    <button className={`segment ${prefs.defaultView === 'compact' ? 'active' : ''}`} onClick={() => setPrefs({...prefs, defaultView: 'compact'})}>Compact</button>
                  </div>
                </div>

                <div className="settings-field">
                  <label>Interface Density</label>
                  <select value={prefs.density} onChange={e => setPrefs({...prefs, density: e.target.value})}>
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact (Dense)</option>
                  </select>
                </div>

                <div className="settings-field-toggle">
                  <div className="toggle-text">
                    <label>In-App Notifications</label>
                    <span>Show toast notifications for actions.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={prefs.notifications} onChange={e => setPrefs({...prefs, notifications: e.target.checked})} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="settings-actions">
                  <button className="action-btn primary-btn" onClick={handleSave}>Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section slide-in">
              <h2>Vault Security</h2>
              <p className="settings-desc">Configure credential visibility and vault safety.</p>
              
              <div className="settings-card">
                <div className="settings-field-toggle">
                  <div className="toggle-text">
                    <label>Auto-mask Passwords</label>
                    <span>Always obscure passwords (••••••) in the Site Detail UI by default.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={security.autoMaskPasswords} onChange={e => setSecurity({...security, autoMaskPasswords: e.target.checked})} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="settings-field-toggle">
                  <div className="toggle-text">
                    <label>Require Auth to Reveal</label>
                    <span>Prompt for OS biometric or master password before revealing credentials. (Mock)</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={security.requireAuthToReveal} onChange={e => setSecurity({...security, requireAuthToReveal: e.target.checked})} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="divider" />

                <div className="settings-field-row">
                  <div className="toggle-text">
                    <label className="text-danger">Clear Vault</label>
                    <span className="text-danger">Delete all saved Sites and credentials permanently.</span>
                  </div>
                  <button className="action-btn danger-outline" onClick={handleClearVault}>Clear Vault</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section slide-in">
              <h2>Appearance</h2>
              <p className="settings-desc">Change the look and feel of the application.</p>
              
              <div className="settings-card">
                <div className="settings-field">
                  <label>Theme</label>
                  <div className="segmented-control">
                    <button className={`segment ${appearance.theme === 'dark' ? 'active' : ''}`} onClick={() => setAppearance({...appearance, theme: 'dark'})}>Dark Mode (Default)</button>
                    <button className={`segment ${appearance.theme === 'light' ? 'active' : ''}`} disabled onClick={() => toast('Light mode is not supported by the strict dark mode requirement.', 'error')}>Light Mode</button>
                  </div>
                  <span className="field-hint">This directory strictly follows a premium dark-mode aesthetic.</span>
                </div>

                <div className="settings-field-toggle">
                  <div className="toggle-text">
                    <label>Reduced Motion</label>
                    <span>Disable non-essential animations.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={appearance.reducedMotion} onChange={e => setAppearance({...appearance, reducedMotion: e.target.checked})} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="settings-actions">
                  <button className="action-btn primary-btn" onClick={handleSave}>Save Appearance</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="settings-section slide-in">
              <h2>Data & Privacy</h2>
              <p className="settings-desc">Manage your local storage and exports.</p>
              
              <div className="settings-card danger-zone">
                <div className="danger-header">
                  <Shield size={20} className="danger-icon" />
                  <h3>Local Data Management</h3>
                </div>
                
                <div className="settings-field-row">
                  <div className="toggle-text">
                    <label>Export Data</label>
                    <span>Download your bookmarks and collections as JSON.</span>
                  </div>
                  <button className="action-btn" onClick={() => toast('Data exported to downloads.', 'success')}>Export JSON</button>
                </div>

                <div className="settings-field-row">
                  <div className="toggle-text">
                    <label>Reset Onboarding</label>
                    <span>Show the onboarding questionnaire again.</span>
                  </div>
                  <button className="action-btn" onClick={() => toast('Onboarding reset.', 'info')}>Reset State</button>
                </div>

                <div className="divider" />

                <div className="settings-field-row">
                  <div className="toggle-text">
                    <label className="text-danger">Clear Local Storage</label>
                    <span className="text-danger">Permanently delete all saved bookmarks and collections on this device.</span>
                  </div>
                  <button className="action-btn danger-outline" onClick={handleClearData}>Clear Data</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
