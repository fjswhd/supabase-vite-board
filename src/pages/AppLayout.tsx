import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="w-screen h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}
