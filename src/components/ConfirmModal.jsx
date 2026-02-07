import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onCancel}></div>
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 animate-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={28} />
          </div>
          <h3 className="text-lg font-black text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium">{message}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button onClick={onCancel} className="p-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 cursor-pointer transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="p-3 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 cursor-pointer shadow-lg shadow-red-100 transition-all disabled:opacity-50">
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}