import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  subtext?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, subtext?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success', subtext?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    const newToast: ToastItem = { id, type, message, subtext };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-black text-white p-4 shadow-2xl flex items-start justify-between gap-3 border border-neutral-800 transition-all duration-300 transform translate-y-0"
          >
            <div className="flex items-start gap-3">
              {toast.type === 'success' && <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />}
              <div>
                <p className="text-xs uppercase tracking-wider font-medium">{toast.message}</p>
                {toast.subtext && <p className="text-[11px] text-neutral-400 mt-0.5">{toast.subtext}</p>}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-500 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
