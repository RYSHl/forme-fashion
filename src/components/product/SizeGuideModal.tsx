import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'tops' | 'bottoms';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'tops',
}) => {
  const [tab, setTab] = useState<'tops' | 'bottoms'>(defaultCategory);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white shadow-2xl p-6 md:p-8 border border-neutral-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-black" />
              <h3 className="text-sm uppercase tracking-widest font-medium text-black">
                Size & Fit Guide
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-black transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit & Category Switchers */}
          <div className="flex items-center justify-between py-4 border-b border-neutral-100">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTab('tops')}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  tab === 'tops' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Tops & Hoodies
              </button>
              <button
                type="button"
                onClick={() => setTab('bottoms')}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  tab === 'bottoms' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Pants & Trousers
              </button>
            </div>

            <div className="flex items-center text-xs border border-neutral-300">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 ${unit === 'cm' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'}`}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 ${unit === 'in' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'}`}
              >
                IN
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="py-4 overflow-x-auto">
            {tab === 'tops' ? (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
                    <th className="py-2.5 font-medium">Size</th>
                    <th className="py-2.5 font-medium">Chest</th>
                    <th className="py-2.5 font-medium">Shoulder</th>
                    <th className="py-2.5 font-medium">Length</th>
                    <th className="py-2.5 font-medium">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2.5 font-semibold">XS</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '96' : '37.8'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '46' : '18.1'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '68' : '26.8'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '21' : '8.3'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">S</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '102' : '40.2'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '48' : '18.9'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '70' : '27.6'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '22' : '8.7'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="py-2.5 font-semibold">M</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '108' : '42.5'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '50' : '19.7'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '72' : '28.3'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '23' : '9.1'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">L</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '114' : '44.9'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '52' : '20.5'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '74' : '29.1'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '24' : '9.4'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">XL</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '120' : '47.2'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '54' : '21.3'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '76' : '29.9'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '25' : '9.8'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">XXL</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '126' : '49.6'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '56' : '22.0'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '78' : '30.7'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '26' : '10.2'}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
                    <th className="py-2.5 font-medium">Size</th>
                    <th className="py-2.5 font-medium">Waist</th>
                    <th className="py-2.5 font-medium">Hip</th>
                    <th className="py-2.5 font-medium">Inseam</th>
                    <th className="py-2.5 font-medium">Leg Opening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2.5 font-semibold">XS (28)</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '74' : '29.1'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '98' : '38.6'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '76' : '29.9'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '21' : '8.3'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">S (30)</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '78' : '30.7'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '102' : '40.2'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '78' : '30.7'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '22' : '8.7'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="py-2.5 font-semibold">M (32)</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '84' : '33.1'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '108' : '42.5'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '80' : '31.5'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '23' : '9.1'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">L (34)</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '90' : '35.4'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '114' : '44.9'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '81' : '31.9'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '24' : '9.4'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">XL (36)</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '96' : '37.8'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '120' : '47.2'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '82' : '32.3'}</td>
                    <td className="py-2.5 text-neutral-600">{unit === 'cm' ? '25' : '9.8'}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Fit Advice */}
          <div className="mt-4 p-4 bg-brand-soft border border-neutral-200 text-xs text-brand-muted space-y-1.5">
            <p className="font-semibold text-black uppercase tracking-wider text-[11px]">Fitting Philosophy</p>
            <p>• <strong>Boxy & Oversized Styles:</strong> Designed with dropped shoulders and generous body volume. If you prefer a tailored fit, choose one size smaller.</p>
            <p>• <strong>Tailored & Slim Styles:</strong> Cut true to European sizing with clean architectural lines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
