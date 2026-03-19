import React, { useState, useEffect } from 'react';
import { Users, Mail, BarChart3, Clock, Shield, Eye, RefreshCw, Bell, Send } from 'lucide-react';

const API_BASE = '/api';
const ADMIN_KEY = 'khosha2026';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  goal: string;
  source: string;
  created_at: string;
}

interface Visitor {
  id: number;
  session_id: string;
  ip_address: string;
  referrer: string;
  pages_viewed: string;
  page_count: number;
  first_seen: string;
  last_seen: string;
  time_on_site: number;
  qualified: number;
}

interface PushSubscriber {
  id: number;
  endpoint: string;
  user_agent: string;
  created_at: string;
}

interface Stats {
  totalLeads: number;
  totalVisitors: number;
  qualifiedVisitors: number;
  todayLeads: number;
  pushSubscribers: number;
  sources: { source: string; count: number }[];
}

export const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState('');
  const [tab, setTab] = useState<'leads' | 'visitors' | 'push'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [pushSubs, setPushSubs] = useState<PushSubscriber[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  // Push notification form
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');
  const [pushUrl, setPushUrl] = useState('https://khoshasystems.com');
  const [pushImage, setPushImage] = useState('');
  const [pushIcon, setPushIcon] = useState('');
  const [pushSending, setPushSending] = useState(false);
  const [pushResult, setPushResult] = useState<string | null>(null);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === ADMIN_KEY) setAuthed(true);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, visitorsRes, statsRes, pushRes] = await Promise.all([
        fetch(`${API_BASE}/leads?key=${ADMIN_KEY}`),
        fetch(`${API_BASE}/visitors?key=${ADMIN_KEY}`),
        fetch(`${API_BASE}/stats?key=${ADMIN_KEY}`),
        fetch(`${API_BASE}/push/subscribers?key=${ADMIN_KEY}`),
      ]);
      setLeads(await leadsRes.json());
      setVisitors(await visitorsRes.json());
      setStats(await statsRes.json());
      setPushSubs(await pushRes.json());
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  const sendPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setPushSending(true);
    setPushResult(null);
    try {
      const res = await fetch(`${API_BASE}/push/send?key=${ADMIN_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: pushTitle, body: pushBody, url: pushUrl, image: pushImage || undefined, icon: pushIcon || undefined }),
      });
      const data = await res.json();
      setPushResult(`Sent: ${data.sent}, Failed: ${data.failed}, Total: ${data.total}`);
      setPushTitle('');
      setPushBody('');
    } catch (err) {
      setPushResult('Failed to send notifications');
    }
    setPushSending(false);
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-stone-900 border border-stone-800 rounded-lg p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={24} className="text-bronze-500" />
            <h1 className="text-white text-xl font-serif">Admin Access</h1>
          </div>
          <input
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="Enter admin key"
            className="w-full bg-stone-800 border border-stone-700 text-white p-3 rounded-md text-sm mb-4 focus:outline-none focus:border-bronze-500"
          />
          <button type="submit" className="w-full bg-bronze-600 text-white py-3 rounded-md text-sm font-medium hover:bg-bronze-500 transition-colors">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  const formatDate = (d: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (s: number) => {
    if (!s) return '0s';
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  };

  const getBrowserFromUA = (ua: string) => {
    if (!ua) return 'Unknown';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    return 'Other';
  };

  const getDeviceFromUA = (ua: string) => {
    if (!ua) return 'Unknown';
    if (ua.includes('Mobile') || ua.includes('Android')) return 'Mobile';
    if (ua.includes('Tablet') || ua.includes('iPad')) return 'Tablet';
    return 'Desktop';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <div className="border-b border-stone-800 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-bronze-500 font-serif text-lg font-bold">K</span>
            <h1 className="text-white text-sm font-semibold uppercase tracking-wider">Khosha Admin</h1>
          </div>
          <button onClick={fetchData} disabled={loading} className="flex items-center gap-2 text-stone-400 hover:text-white text-xs transition-colors">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-2">
                <Mail size={13} /> Total Leads
              </div>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-2">
                <Clock size={13} /> Today
              </div>
              <div className="text-2xl font-bold">{stats.todayLeads}</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-2">
                <Eye size={13} /> Visitors
              </div>
              <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-2">
                <Users size={13} /> Qualified
              </div>
              <div className="text-2xl font-bold">{stats.qualifiedVisitors}</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-2">
                <Bell size={13} /> Push Subs
              </div>
              <div className="text-2xl font-bold">{stats.pushSubscribers}</div>
            </div>
          </div>
        )}

        {/* Source Breakdown */}
        {stats && stats.sources.length > 0 && (
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-3">
              <BarChart3 size={13} /> Lead Sources
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.sources.map(s => (
                <span key={s.source} className="bg-stone-800 px-3 py-1 rounded-full text-xs text-stone-300">
                  {s.source || 'Unknown'}: <strong className="text-white">{s.count}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-4">
          <button onClick={() => setTab('leads')} className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${tab === 'leads' ? 'bg-bronze-600 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'}`}>
            Leads ({leads.length})
          </button>
          <button onClick={() => setTab('visitors')} className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${tab === 'visitors' ? 'bg-bronze-600 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'}`}>
            Visitors ({visitors.length})
          </button>
          <button onClick={() => setTab('push')} className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${tab === 'push' ? 'bg-bronze-600 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'}`}>
            Push ({pushSubs.length})
          </button>
        </div>

        {/* Leads Table */}
        {tab === 'leads' && (
          <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-500 text-[11px] uppercase tracking-wider">
                    <th className="text-left p-3">#</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Company</th>
                    <th className="text-left p-3">Goal</th>
                    <th className="text-left p-3">Source</th>
                    <th className="text-left p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                      <td className="p-3 text-stone-500 text-xs">{lead.id}</td>
                      <td className="p-3 text-white font-medium">{lead.name || '—'}</td>
                      <td className="p-3"><a href={`mailto:${lead.email}`} className="text-bronze-400 hover:underline">{lead.email}</a></td>
                      <td className="p-3 text-stone-400">{lead.company || '—'}</td>
                      <td className="p-3 text-stone-400">{lead.goal || '—'}</td>
                      <td className="p-3"><span className="bg-stone-800 text-stone-300 text-[11px] px-2 py-0.5 rounded">{lead.source || '—'}</span></td>
                      <td className="p-3 text-stone-500 text-xs whitespace-nowrap">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={7} className="p-8 text-center text-stone-600">No leads yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Visitors Table */}
        {tab === 'visitors' && (
          <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-500 text-[11px] uppercase tracking-wider">
                    <th className="text-left p-3">Session</th>
                    <th className="text-left p-3">IP</th>
                    <th className="text-left p-3">Pages</th>
                    <th className="text-left p-3">Time</th>
                    <th className="text-left p-3">Qualified</th>
                    <th className="text-left p-3">Referrer</th>
                    <th className="text-left p-3">Last Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(v => (
                    <tr key={v.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                      <td className="p-3 text-stone-400 text-xs font-mono">{v.session_id?.substring(0, 8)}...</td>
                      <td className="p-3 text-stone-400 text-xs">{v.ip_address || '—'}</td>
                      <td className="p-3 text-white font-medium">{v.page_count}</td>
                      <td className="p-3 text-stone-400">{formatDuration(v.time_on_site)}</td>
                      <td className="p-3">{v.qualified ? <span className="text-emerald-400 text-xs font-semibold">Yes</span> : <span className="text-stone-600 text-xs">No</span>}</td>
                      <td className="p-3 text-stone-500 text-xs max-w-[150px] truncate">{v.referrer || 'Direct'}</td>
                      <td className="p-3 text-stone-500 text-xs whitespace-nowrap">{formatDate(v.last_seen)}</td>
                    </tr>
                  ))}
                  {visitors.length === 0 && (
                    <tr><td colSpan={7} className="p-8 text-center text-stone-600">No visitors tracked yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Push Subscribers Tab */}
        {tab === 'push' && (
          <div className="space-y-4">
            {/* Send Notification Form */}
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-stone-500 text-[11px] uppercase tracking-wider mb-3">
                <Send size={13} /> Send Push Notification
              </div>
              <form onSubmit={sendPush} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={pushTitle}
                    onChange={e => setPushTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="flex-1 bg-stone-800 border border-stone-700 text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-bronze-500"
                  />
                  <input
                    type="text"
                    value={pushBody}
                    onChange={e => setPushBody(e.target.value)}
                    placeholder="Message body"
                    required
                    className="flex-[2] bg-stone-800 border border-stone-700 text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={pushUrl}
                    onChange={e => setPushUrl(e.target.value)}
                    placeholder="Link URL"
                    className="flex-1 bg-stone-800 border border-stone-700 text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-bronze-500"
                  />
                  <input
                    type="url"
                    value={pushImage}
                    onChange={e => setPushImage(e.target.value)}
                    placeholder="Banner image URL (optional)"
                    className="flex-1 bg-stone-800 border border-stone-700 text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={pushIcon}
                    onChange={e => setPushIcon(e.target.value)}
                    placeholder="Icon URL (optional — defaults to Khosha logo)"
                    className="flex-1 bg-stone-800 border border-stone-700 text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-bronze-500"
                  />
                  <button
                    type="submit"
                    disabled={pushSending}
                    className="px-5 py-2.5 bg-bronze-600 text-white rounded-md text-sm font-medium hover:bg-bronze-500 transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    {pushSending ? 'Sending...' : 'Send to All'}
                  </button>
                </div>
                {(pushImage || pushIcon) && (
                  <div className="flex items-center gap-4">
                    {pushIcon && (
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 text-xs">Icon:</span>
                        <img src={pushIcon} alt="Icon preview" className="h-10 w-10 rounded border border-stone-700 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                      </div>
                    )}
                    {pushImage && (
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 text-xs">Banner:</span>
                        <img src={pushImage} alt="Banner preview" className="h-16 rounded border border-stone-700 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                      </div>
                    )}
                  </div>
                )}
              </form>
              {pushResult && (
                <p className="mt-3 text-xs text-stone-400">{pushResult}</p>
              )}
            </div>

            {/* Subscribers Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-500 text-[11px] uppercase tracking-wider">
                      <th className="text-left p-3">#</th>
                      <th className="text-left p-3">Browser</th>
                      <th className="text-left p-3">Device</th>
                      <th className="text-left p-3">Endpoint</th>
                      <th className="text-left p-3">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pushSubs.map(sub => (
                      <tr key={sub.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                        <td className="p-3 text-stone-500 text-xs">{sub.id}</td>
                        <td className="p-3 text-white font-medium">{getBrowserFromUA(sub.user_agent)}</td>
                        <td className="p-3 text-stone-400">{getDeviceFromUA(sub.user_agent)}</td>
                        <td className="p-3 text-stone-500 text-xs font-mono max-w-[250px] truncate">{sub.endpoint}</td>
                        <td className="p-3 text-stone-500 text-xs whitespace-nowrap">{formatDate(sub.created_at)}</td>
                      </tr>
                    ))}
                    {pushSubs.length === 0 && (
                      <tr><td colSpan={5} className="p-8 text-center text-stone-600">No push subscribers yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
