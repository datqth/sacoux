import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Bell,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Car,
  AlertCircle,
  Download,
  Calendar,
  Plus,
  CheckCircle2,
  FileText,
  Database,
  ShieldCheck,
  MoreVertical,
  Lock,
  Unlock,
  Verified,
  Receipt,
  ArrowRight,
  Mail,
  Save,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
type Page = 'dashboard' | 'drivers' | 'finance' | 'settings';

interface Stat {
  label: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'critical';
  capacity?: string;
}

interface Activity {
  time: string;
  user: string;
  userInitials: string;
  action: string;
  target: string;
  status: 'success' | 'warning' | 'info';
  statusText: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  htx: string;
  status: 'active' | 'locked' | 'pending';
  wallet: number;
  deposit: number;
  expiry: string;
}

interface WithdrawalRequest {
  id: string;
  driverName: string;
  driverId: string;
  amount: number;
  available: number;
  bank: string;
  account: string;
  date: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  reason?: string;
}

// --- Mock Data ---
const REVENUE_DATA = [
  { day: 'T2', actual: 24, plan: 32 },
  { day: 'T3', actual: 40, plan: 48 },
  { day: 'T4', actual: 16, plan: 24 },
  { day: 'T5', actual: 48, plan: 56 },
  { day: 'T6', actual: 32, plan: 40 },
  { day: 'T7', actual: 56, plan: 64 },
  { day: 'CN', actual: 44, plan: 52 },
];

const ACTIVITIES: Activity[] = [
  {
    time: '14:30 - 24/05/2024',
    user: 'Quách Thành Đạt',
    userInitials: 'QT',
    action: 'Xuất dữ liệu MISA',
    target: 'Kỳ đối soát 20/05 - 24/05',
    status: 'success',
    statusText: 'Thành công'
  },
  {
    time: '12:15 - 24/05/2024',
    user: 'Nguyễn Văn A',
    userInitials: 'NV',
    action: 'Cập nhật hồ sơ tài xế',
    target: 'TX-2041 (Trần Văn B)',
    status: 'success',
    statusText: 'Hoàn thành'
  },
  {
    time: '09:45 - 24/05/2024',
    user: 'Lê Thị C',
    userInitials: 'LT',
    action: 'Báo cáo công nợ quá hạn',
    target: 'Tài xế TX-5510',
    status: 'warning',
    statusText: 'Cảnh báo'
  }
];

const DRIVERS: Driver[] = [
  { id: 'TX-2940', name: 'Nguyễn Văn An', phone: '0901 234 567', htx: 'HTX Sài Gòn', status: 'active', wallet: 1250000, deposit: 10000000, expiry: '15/08/2026' },
  { id: 'TX-1102', name: 'Trần Hữu Hùng', phone: '0988 776 655', htx: 'HTX Thủ Đô', status: 'active', wallet: -450000, deposit: 10000000, expiry: '12/11/2025' },
  { id: 'TX-3334', name: 'Lê Minh Tâm', phone: '0912 333 444', htx: 'HTX Miền Tây', status: 'pending', wallet: 0, deposit: 5000000, expiry: '20/12/2027' },
  { id: 'TX-5556', name: 'Phạm Đức Huy', phone: '0944 555 666', htx: 'HTX Sài Gòn', status: 'locked', wallet: 2800000, deposit: 10000000, expiry: 'Đã hết hạn' },
];

const WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  { id: 'REQ-001', driverName: 'Nguyễn Lam', driverId: '#DX2940', amount: 5200000, available: 8450000, bank: 'MB Bank', account: '0912345678 - NGUYEN LAM', date: '24/10/2023, 14:30', status: 'pending' },
  { id: 'REQ-002', driverName: 'Phạm Minh', driverId: '#DX1102', amount: 12000000, available: 14120000, bank: 'Vietcombank', account: '1029438291 - PHAM MINH', date: '24/10/2023, 10:15', status: 'approved' },
  { id: 'REQ-003', driverName: 'Hoàng Thuý', driverId: '#DX4481', amount: 2450000, available: 4100000, bank: 'Techcombank', account: '1903348122 - HOANG THUY', date: '23/10/2023, 16:45', status: 'paid' },
  { id: 'REQ-004', driverName: 'Trần Dũng', driverId: '#DX9923', amount: 8900000, available: 3200000, bank: 'Agribank', account: '4800205123 - TRAN DUNG', date: '23/10/2023, 09:12', status: 'rejected', reason: 'Số dư không đủ' },
];

// --- Components ---

const Sidebar = ({ activePage, onPageChange }: { activePage: Page, onPageChange: (page: Page) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: 'drivers', label: 'Quản lý tài xế', icon: Users },
    { id: 'finance', label: 'Quyết toán tài chính', icon: Wallet },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 flex flex-col py-6 px-4 gap-8 z-40 border-r border-slate-200">
      <div className="flex flex-col gap-1 px-2">
        <span className="text-xl font-bold text-sky-900 tracking-tighter font-headline">SACO Holdings</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Vận hành doanh nghiệp</span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id as Page)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 transition-all duration-200 font-headline text-sm tracking-tight rounded-lg text-left",
              activePage === item.id 
                ? "text-sky-700 font-bold border-r-4 border-sky-700 bg-sky-50" 
                : "text-slate-500 hover:text-sky-600 hover:bg-slate-100"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-2 border-t border-slate-100 pt-6">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-sky-600 hover:bg-slate-100 transition-colors duration-200 font-headline text-sm tracking-tight text-left rounded-lg">
          <HelpCircle size={20} />
          <span>Hỗ trợ</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-sky-600 hover:bg-slate-100 transition-colors duration-200 font-headline text-sm tracking-tight text-left rounded-lg">
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

const TopBar = ({ title }: { title: string }) => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-30 glass-header flex justify-between items-center h-16 px-8 ml-64 shadow-sm border-b border-slate-100">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            className="w-full bg-surface-container-highest/50 border-none rounded-xl pl-10 py-2 text-sm focus:ring-2 focus:ring-primary/40 transition-all outline-none" 
            placeholder="Tìm kiếm tài liệu, đối soát..." 
            type="text" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-tertiary rounded-full border border-white"></span>
        </button>
        <button className="text-slate-500 hover:text-primary transition-colors">
          <MessageSquare size={20} />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-on-surface">Quách Thành Đạt</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Quản trị viên hệ thống</p>
          </div>
          <img 
            alt="User avatar" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-container" 
            src="https://picsum.photos/seed/user/100/100" 
          />
        </div>
      </div>
    </header>
  );
};

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const isCritical = stat.variant === 'critical';
  
  return (
    <div className={cn(
      "p-6 rounded-xl flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm relative overflow-hidden",
      isCritical 
        ? "bg-tertiary-container/5 border border-tertiary-container" 
        : "bg-surface-container-lowest hover:bg-surface-container-low"
    )}>
      {isCritical && (
        <div className="absolute -right-4 -top-4 opacity-10">
          <AlertCircle size={96} />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-2 rounded-lg",
          isCritical ? "bg-tertiary-container text-on-tertiary" : "bg-primary-fixed text-primary"
        )}>
          {stat.icon}
        </div>
        {stat.trend && (
          <span className="text-secondary text-xs font-bold bg-secondary-container px-2 py-1 rounded-full">
            {stat.trend}
          </span>
        )}
        {stat.capacity && (
          <span className="text-primary text-xs font-bold bg-primary-fixed px-2 py-1 rounded-full">
            {stat.capacity}
          </span>
        )}
        {isCritical && (
          <span className="text-tertiary text-[10px] font-extrabold bg-tertiary-fixed px-2 py-1 rounded-full uppercase">
            Cảnh báo cao
          </span>
        )}
      </div>
      
      <div>
        <p className={cn(
          "text-xs font-bold uppercase tracking-widest mb-1",
          isCritical ? "text-tertiary" : "text-slate-400"
        )}>
          {stat.label}
        </p>
        <p className={cn(
          "font-headline text-2xl font-extrabold tracking-tight",
          isCritical ? "text-tertiary" : "text-on-surface"
        )}>
          {stat.value}
        </p>
      </div>
    </div>
  );
};

const DashboardView = () => {
  const stats: Stat[] = [
    { label: 'Tổng doanh thu tuần', value: '2.450.000.000 VNĐ', trend: '+12.4%', icon: <Wallet size={20} /> },
    { label: 'Tài xế đang hoạt động', value: '1.284', capacity: '85% Công suất', icon: <Car size={20} /> },
    { label: 'Tổng ký quỹ', value: '15.820.000.000 VNĐ', icon: <Database size={20} /> },
    { label: 'Công nợ quá hạn', value: '84.200.000 VNĐ', icon: <AlertCircle size={20} />, variant: 'critical' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-1">Dashboard Tổng Quan</h1>
          <p className="text-on-surface-variant text-sm">Cập nhật lúc: 14:32, 24 Tháng 5, 2024</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low transition-colors flex items-center gap-2">
            <Calendar size={18} />
            Tuần này
          </button>
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold primary-gradient text-on-primary flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <Download size={18} />
            Báo cáo tổng hợp
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
      </section>

      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">Xu hướng doanh thu</h3>
              <p className="text-sm text-on-surface-variant">Biến động doanh thu theo ngày trong tuần</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> THỰC TẾ</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-200"></span> KẾ HOẠCH</div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="plan" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="actual" fill="#006497" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container/50 p-6 rounded-xl border border-surface-container shadow-sm">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-6">Thao tác nhanh</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Duyệt hồ sơ mới', sub: '12 hồ sơ đang chờ', icon: Users, color: 'bg-primary-fixed text-primary' },
                { label: 'Chốt đối soát tuần', sub: 'Kỳ thanh toán 24/05', icon: CheckCircle2, color: 'bg-secondary-container text-on-secondary-container' },
                { label: 'Xuất dữ liệu MISA', sub: 'Định dạng XML/Excel', icon: Database, color: 'bg-surface-container-highest text-on-surface' },
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", action.color)}>
                      <action.icon size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-on-surface">{action.label}</p>
                      <p className="text-[10px] text-on-surface-variant">{action.sub}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-tertiary-container/10 border border-tertiary-container p-6 rounded-xl text-on-surface relative overflow-hidden shadow-sm">
            <div className="absolute -right-4 -top-4 opacity-10">
              <AlertCircle size={64} className="text-tertiary" />
            </div>
            <h4 className="font-headline font-bold text-tertiary mb-2 flex items-center gap-2">
              <AlertCircle size={16} />
              Rà soát cấp đổi Phù hiệu
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Có 15 tài xế sắp hết hạn phù hiệu. Cần thực hiện rà soát để chuyển đổi sang <strong>Phù hiệu vận tải</strong> mới trước khi hết hạn.
            </p>
            <button className="text-xs font-extrabold uppercase tracking-widest text-tertiary border border-tertiary px-3 py-2 rounded-lg hover:bg-tertiary hover:text-white transition-all">
              Xử lý ngay
            </button>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-on-surface">Nhật ký hoạt động (Audit Trail)</h3>
          <button className="text-sm font-semibold text-primary hover:underline">Xem tất cả</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Thời gian</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Người thực hiện</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hành động</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Đối tượng</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {ACTIVITIES.map((activity, i) => (
                <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{activity.time}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-fixed-dim text-[10px] flex items-center justify-center font-bold">
                        {activity.userInitials}
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium">{activity.action}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{activity.target}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-[10px] font-extrabold uppercase",
                      activity.status === 'success' ? "bg-secondary-container text-on-secondary-container" : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                    )}>
                      {activity.statusText}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};

const DriverManagementView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Quản Lý Tài Xế</h1>
          <p className="text-on-surface-variant max-w-lg">Theo dõi hoạt động, trạng thái tài chính và phê duyệt hồ sơ đối tác vận hành của SACO Holdings.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest text-on-surface font-semibold rounded-xl shadow-sm hover:bg-surface-container-low transition-all">
            <Download size={18} />
            Xuất Báo Cáo
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 primary-gradient text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition-all">
            <Plus size={18} />
            Thêm Tài Xế
          </button>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng số tài xế</p>
            <h3 className="text-4xl font-extrabold text-primary">1,284</h3>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Car size={32} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Chờ Duyệt Hồ Sơ</p>
            <h3 className="text-4xl font-extrabold text-primary">42</h3>
          </div>
          <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary">
            <FileText size={32} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between border-l-4 border-tertiary">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cảnh Báo Ví Âm</p>
            <h3 className="text-4xl font-extrabold text-tertiary">15</h3>
          </div>
          <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-tertiary">
            <Wallet size={32} />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 flex flex-wrap gap-4 items-center bg-surface-container-low/30 border-b border-surface-container">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">HTX Hợp Tác</label>
            <select className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/40 outline-none">
              <option>Tất cả HTX</option>
              <option>HTX Sài Gòn</option>
              <option>HTX Thủ Đô</option>
              <option>HTX Miền Tây</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">Trạng Thái</label>
            <select className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/40 outline-none">
              <option>Tất cả trạng thái</option>
              <option>Hoạt động</option>
              <option>Bị khóa</option>
              <option>Chờ duyệt</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">Hết Hạn Phù Hiệu</label>
            <select className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/40 outline-none">
              <option>Tất cả</option>
              <option>Trong 30 ngày tới</option>
              <option>Đã hết hạn</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Họ Tên & Liên Hệ</th>
                <th className="px-6 py-4">HTX</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-right">Số Dư Ví (VNĐ)</th>
                <th className="px-6 py-4 text-right">Tiền Ký Quỹ (VNĐ)</th>
                <th className="px-6 py-4">Hết Hạn Phù Hiệu</th>
                <th className="px-6 py-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {DRIVERS.map((driver) => (
                <tr key={driver.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                        {driver.name.split(' ').map(n => n[0]).join('').slice(-2)}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{driver.name}</p>
                        <p className="text-xs text-slate-400">{driver.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium">{driver.htx}</td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase rounded-full",
                      driver.status === 'active' ? "bg-secondary-container text-on-secondary-container" :
                      driver.status === 'pending' ? "bg-primary-fixed text-primary" : "bg-surface-variant text-on-surface-variant"
                    )}>
                      {driver.status === 'active' ? 'Hoạt động' : driver.status === 'pending' ? 'Chờ duyệt' : 'Bị khóa'}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-5 text-right font-bold",
                    driver.wallet < 0 ? "text-tertiary" : "text-on-surface"
                  )}>
                    {driver.wallet.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-on-surface-variant">
                    {driver.deposit.toLocaleString()}
                  </td>
                  <td className={cn(
                    "px-6 py-5 text-sm",
                    driver.expiry === 'Đã hết hạn' ? "text-tertiary font-semibold" : "text-on-surface-variant"
                  )}>
                    {driver.expiry}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      {driver.status === 'pending' ? (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all">
                          <Verified size={14} />
                          Duyệt
                        </button>
                      ) : (
                        <>
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all">
                            <ArrowRight size={18} />
                          </button>
                          <button className="p-2 text-tertiary hover:bg-tertiary/10 rounded-lg transition-all">
                            {driver.status === 'locked' ? <Unlock size={18} /> : <Lock size={18} />}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};

const FinanceView = () => {
  const [activeTab, setActiveTab] = React.useState<'withdraw' | 'reconcile'>('withdraw');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-background tracking-tight">
            {activeTab === 'withdraw' ? 'Yêu Cầu Rút Tiền' : 'Đối Soát Tuần'}
          </h1>
          <p className="text-on-surface-variant mt-1">
            {activeTab === 'withdraw' 
              ? 'Quản lý và phê duyệt các yêu cầu thanh toán từ tài xế đối tác.' 
              : 'Quản lý và phê duyệt quyết toán tài chính định kỳ hàng tuần.'}
          </p>
        </div>
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('withdraw')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeTab === 'withdraw' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            Rút tiền
          </button>
          <button 
            onClick={() => setActiveTab('reconcile')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeTab === 'reconcile' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            Đối soát
          </button>
        </div>
      </section>

      {activeTab === 'withdraw' ? (
        <>
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 bg-primary rounded-xl p-6 text-white shadow-xl flex flex-col justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium uppercase tracking-widest">TỔNG CHỜ DUYỆT</p>
                <p className="font-headline text-4xl font-extrabold mt-2">1,240.5 <span className="text-xl font-normal opacity-70">trđ</span></p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1 rounded-full">
                <TrendingUp size={14} />
                <span>+12% so với hôm qua</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Đã chi trong tháng', value: '842.0 trđ', icon: CheckCircle2, color: 'text-secondary bg-secondary/10' },
                { label: 'Bị từ chối', value: '15 yêu cầu', icon: X, color: 'text-tertiary bg-tertiary/10' },
                { label: 'Đang chờ xử lý', value: '32 yêu cầu', icon: TrendingUp, color: 'text-primary bg-primary/10', border: 'border-l-4 border-primary' },
              ].map((item, i) => (
                <div key={i} className={cn("bg-surface-container-low p-6 rounded-xl", item.border)}>
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="font-headline text-2xl font-bold mt-1 text-on-surface">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container">
            <div className="p-4 bg-surface-container-low/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {['Tất cả', 'Chờ xử lý', 'Đã duyệt', 'Đã chi', 'Bị từ chối'].map((tab, i) => (
                  <button 
                    key={tab} 
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-full transition-all",
                      i === 0 ? "bg-primary text-white" : "hover:bg-surface-variant text-on-surface-variant"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-xs font-bold text-on-surface-variant px-4 py-2 rounded-lg hover:bg-surface-variant">
                  <Calendar size={14} />
                  7 ngày qua
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-on-surface-variant px-4 py-2 rounded-lg hover:bg-surface-variant border border-outline-variant/30">
                  <Search size={14} />
                  Lọc nâng cao
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-surface-container-low/30">
                    <th className="px-6 py-4">Tài xế</th>
                    <th className="px-6 py-4">Số tiền yêu cầu</th>
                    <th className="px-6 py-4">Số dư khả dụng</th>
                    <th className="px-6 py-4">Thông tin ngân hàng</th>
                    <th className="px-6 py-4">Ngày yêu cầu</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {WITHDRAWAL_REQUESTS.map((req) => (
                    <tr key={req.id} className={cn("hover:bg-surface-container-low/20 transition-colors", req.status === 'approved' && "bg-secondary-container/5")}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">
                            {req.driverName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{req.driverName}</p>
                            <p className="text-xs text-on-surface-variant">ID: {req.driverId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-primary tracking-tight">{req.amount.toLocaleString()} VNĐ</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className={cn("text-sm", req.available < req.amount ? "text-tertiary font-bold" : "text-on-surface-variant")}>
                          {req.available.toLocaleString()} VNĐ
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-xs">
                          <p className="font-semibold">{req.bank}</p>
                          <p className="text-on-surface-variant mt-0.5">{req.account}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">{req.date}</td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          req.status === 'pending' ? "bg-primary-fixed text-primary" :
                          req.status === 'approved' ? "bg-secondary-container text-on-secondary-container" :
                          req.status === 'paid' ? "bg-surface-container-high text-on-surface-variant" : "bg-tertiary-container text-on-tertiary-container"
                        )}>
                          {req.status === 'pending' ? 'Chờ xử lý' : req.status === 'approved' ? 'Đã duyệt' : req.status === 'paid' ? 'Đã chi' : 'Bị từ chối'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {req.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 hover:bg-secondary-container/20 text-secondary rounded-lg transition-colors">
                              <CheckCircle2 size={18} />
                            </button>
                            <button className="p-1.5 hover:bg-tertiary-container/20 text-tertiary rounded-lg transition-colors">
                              <X size={18} />
                            </button>
                          </div>
                        )}
                        {req.status === 'approved' && (
                          <button className="bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ml-auto hover:shadow-lg transition-all active:scale-[0.98]">
                            <Receipt size={14} />
                            Xác nhận đã chi
                          </button>
                        )}
                        {req.status === 'paid' && <div className="text-[10px] text-on-surface-variant italic font-medium">#FT29148821</div>}
                        {req.status === 'rejected' && <p className="text-[10px] text-tertiary font-medium">{req.reason}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Doanh thu gộp', value: '1,245,600,000 VNĐ', sub: '+12.4% so với tuần trước', icon: Wallet, color: 'text-primary' },
              { label: 'Phí nền tảng XanhSM', value: '186,840,000 VNĐ', sub: 'Cố định 15% doanh thu gộp', icon: TrendingUp, color: 'text-tertiary' },
              { label: 'Phí HTX (3%)', value: '37,368,000 VNĐ', sub: 'Phí quản lý vận hành HTX', icon: Database, color: 'text-primary-container' },
              { label: 'Thu nhập ròng tài xế', value: '1,021,392,000 VNĐ', sub: 'Sẵn sàng quyết toán', icon: CheckCircle2, color: 'text-secondary', variant: 'highlight' },
            ].map((item, i) => (
              <div key={i} className={cn(
                "p-6 rounded-xl flex flex-col justify-between min-h-[160px] border border-slate-100 shadow-sm relative overflow-hidden",
                item.variant === 'highlight' ? "bg-secondary-container/20" : "bg-surface-container-lowest"
              )}>
                <div className="flex justify-between items-start">
                  <p className={cn("text-xs font-bold uppercase tracking-wider", item.variant === 'highlight' ? "text-on-secondary-container" : "text-slate-400")}>
                    {item.label}
                  </p>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <h3 className={cn("text-2xl font-extrabold font-headline", item.variant === 'highlight' ? "text-on-secondary-container" : "text-on-surface")}>
                    {item.value.split(' ')[0]} <span className="text-sm font-medium opacity-60">VNĐ</span>
                  </h3>
                  <p className={cn("text-[10px] font-bold mt-1", item.variant === 'highlight' ? "text-on-secondary-container" : "text-slate-400")}>
                    {item.sub}
                  </p>
                </div>
                {item.variant === 'highlight' && (
                  <div className="absolute -right-4 -bottom-4 opacity-5">
                    <ShieldCheck size={120} />
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="bg-surface-container-low rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 border-b border-slate-100">
              <div className="flex gap-4">
                <button className="bg-surface-container-lowest text-on-surface border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                  <Lock size={14} /> Khóa sổ dữ liệu
                </button>
                <button className="bg-surface-container-lowest text-on-surface border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                  <FileText size={14} /> Kết xuất MISA
                </button>
              </div>
              <div className="flex gap-2">
                <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-500 cursor-pointer hover:border-primary/30 transition-colors">
                  Lọc theo trạng thái: <span className="text-on-surface font-bold">Tất cả</span>
                  <ChevronRight size={14} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-high/50 text-slate-500">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Tài xế / Mã định danh</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Tổng chuyến</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Doanh thu gộp</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Phí hệ thống</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Thu nhập ròng</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Trạng thái</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { name: 'Nguyễn Lâm Nhật', id: 'SACO-TX-9921', trips: 42, gross: 12450000, fee: 2241000, net: 10209000, status: 'valid' },
                    { name: 'Trần Hoàng Anh', id: 'SACO-TX-8842', trips: 38, gross: 10120000, fee: 1821600, net: 8298400, status: 'valid' },
                    { name: 'Phạm Văn Đồng', id: 'SACO-TX-7731', trips: 51, gross: 15600000, fee: 2808000, net: 12792000, status: 'check' },
                    { name: 'Lê Minh Tuấn', id: 'SACO-TX-6622', trips: 29, gross: 8900000, fee: 1602000, net: 7298000, status: 'valid' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{row.name}</p>
                            <p className="text-[10px] text-slate-400">{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-medium text-sm text-on-surface">{row.trips}</td>
                      <td className="px-6 py-5 text-right font-medium text-sm text-on-surface">{row.gross.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-medium text-sm text-tertiary">{row.fee.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-bold text-sm text-secondary">{row.net.toLocaleString()}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-tight",
                          row.status === 'valid' ? "bg-secondary-container text-on-secondary-container" : "bg-tertiary-container text-on-tertiary-container"
                        )}>
                          {row.status === 'valid' ? 'Hợp lệ' : 'Cần kiểm tra'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-slate-300 group-hover:text-primary transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
};


const SettingsView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-center">
        <h2 className="font-headline text-2xl font-bold text-sky-900">Cấu hình hệ thống</h2>
      </section>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-sky-900">Cấu hình Đối soát</h3>
                <p className="text-xs text-slate-400 font-medium">Thiết lập thời gian chốt dữ liệu tài chính</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Chu kỳ đối soát tuần</label>
                <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-sm font-bold text-sky-900">Thứ 4</span>
                  <ArrowRight size={16} className="text-slate-300" />
                  <span className="text-sm font-bold text-sky-600">Thứ 3</span>
                </div>
                <p className="mt-3 text-[11px] text-slate-400 italic leading-relaxed">Hệ thống tự động chốt dữ liệu vào cuối ngày Thứ 3 hàng tuần.</p>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Hạn chốt sổ (Deadline)</label>
                <div className="relative">
                  <input className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-sky-900 focus:ring-2 focus:ring-sky-100 focus:border-sky-200 outline-none" type="text" defaultValue="17:00 Thứ 5" />
                  <TrendingUp size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Wallet size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-sky-900">Quản lý biểu phí dịch vụ</h3>
                <p className="text-xs text-slate-400 font-medium">Điều chỉnh % phí hoa hồng hệ thống</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Phí HTX', value: 15, desc: 'Áp dụng cho tất cả chuyến xe thuộc các hợp tác xã liên kết.' },
                { label: 'Phí nền tảng', value: 5, desc: 'Phí duy trì hạ tầng SACO và dịch vụ hỗ trợ tài xế.' },
              ].map((fee, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-sky-900">{fee.label}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-tight uppercase">Đang áp dụng</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <input className="bg-transparent border-none text-5xl font-black p-0 w-24 text-sky-900 focus:ring-0" type="number" defaultValue={fee.value} />
                    <span className="text-2xl font-bold text-slate-300">%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-4 leading-relaxed font-medium">{fee.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <section className="bg-white rounded-3xl h-full shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-sky-900">Danh mục Pháp nhân</h3>
                  <p className="text-xs text-slate-400 font-medium">Danh sách các đơn vị trong hệ sinh thái</p>
                </div>
                <button className="bg-sky-600 text-white text-[11px] font-bold px-5 py-2.5 rounded-xl hover:bg-sky-700 transition-colors shadow-lg shadow-sky-100 uppercase tracking-wider">Thêm mới</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Tên pháp nhân</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Loại hình</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Holdings Saco', id: '0312456789', type: 'Công ty mẹ', badge: true },
                    { name: 'Vận tải Saco', id: '0312456790', type: 'Đơn vị vận hành' },
                    { name: 'HTX Toàn Cầu', id: '0312456791', type: 'Thành viên' },
                    { name: 'HTX Sài Gòn', id: '-', type: 'Thành viên' },
                    { name: 'HTX Bình Dương', id: '-', type: 'Thành viên' },
                  ].map((entity, i) => (
                    <tr key={i} className="hover:bg-sky-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-sm text-sky-900 group-hover:text-sky-700">{entity.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">MST: {entity.id}</div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {entity.badge ? (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sky-100 text-sky-700 uppercase">{entity.type}</span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400">{entity.type}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-50/50 to-transparent -mr-40 -mt-40 rounded-full"></div>
        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Mail size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-sky-900 tracking-tight">Thiết lập thông báo tự động</h3>
              <p className="text-sm text-slate-400 font-medium">Cấu hình luồng email phản hồi tự động cho đối tác tài xế</p>
            </div>
          </div>
          
          <div className="space-y-12">
            {[
              { 
                case: '01', 
                title: 'Tài xế bị khóa tài khoản', 
                desc: 'Kích hoạt khi hệ thống phát hiện vi phạm quy tắc an toàn hoặc nợ quá hạn chốt sổ.',
                template: 'LOCK_APP_NOTIFICATION',
                content: 'Chào Quý đối tác, Tài khoản của bạn đã tạm thời bị khóa do vi phạm chính sách của SACO Enterprise... Vui lòng liên hệ tổng đài để được hỗ trợ mở khóa và hướng dẫn chi tiết.'
              },
              { 
                case: '02', 
                title: 'Từ chối hồ sơ đăng ký', 
                desc: 'Gửi phản hồi khi hồ sơ không đạt yêu cầu về chứng từ hoặc kinh nghiệm vận tải.',
                template: 'REJECT_DOC_REASON',
                content: 'Rất tiếc, hồ sơ của bạn không đủ điều kiện xét duyệt tham gia đội ngũ đối tác SACO. Lý do: [Lý do từ chối]. Quý đối tác vui lòng cập nhật lại hồ sơ đúng chuẩn sau 30 ngày.'
              }
            ].map((item) => (
              <div key={item.case} className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                <div className="md:col-span-4">
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] block mb-3">Trường hợp {item.case}</span>
                  <h4 className="text-lg font-bold text-sky-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between px-6 py-3 bg-slate-50/80 rounded-t-2xl border-x border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mẫu: <span className="text-sky-600">{item.template}</span></span>
                    <div className="w-11 h-6 bg-sky-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <textarea 
                    className="w-full bg-white border border-slate-100 rounded-b-2xl p-6 text-sm text-slate-600 font-medium min-h-[140px] focus:ring-2 focus:ring-sky-50 focus:border-sky-200 outline-none leading-relaxed shadow-inner"
                    defaultValue={item.content}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-50 flex justify-end items-center gap-6">
            <button className="px-8 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-sky-900 hover:bg-slate-50 transition-all">Hủy thay đổi</button>
            <button className="px-10 py-3.5 rounded-2xl text-sm font-bold text-white bg-sky-600 shadow-xl shadow-sky-100 hover:bg-sky-700 hover:-translate-y-0.5 transition-all">Lưu cấu hình hệ thống</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = React.useState<Page>('dashboard');

  return (
    <div className="min-h-screen bg-surface selection-primary">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="ml-64 min-h-screen">
        <TopBar title={activePage} />
        
        <div className="pt-24 pb-12 px-8">
          <AnimatePresence mode="wait">
            {activePage === 'dashboard' && <DashboardView key="dashboard" />}
            {activePage === 'drivers' && <DriverManagementView key="drivers" />}
            {activePage === 'finance' && <FinanceView key="finance" />}
            {activePage === 'settings' && <SettingsView key="settings" />}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 primary-gradient text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        {activePage === 'settings' ? <Save size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
}
