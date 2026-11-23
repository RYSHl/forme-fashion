import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Check, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Lock,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { formatINR } from '../utils/formatters';
import { ShippingAddress, DeliveryMethod } from '../types/order';

// UPI Payment Configuration (Editable)
export const UPI_CONFIG = {
  payeeName: 'HIF CHY',
  upiId: 'hiflolllll@oksbi',
  qrImageUrl: '/upi-qr.jpg',
};

const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: 'standard',
    name: 'Standard Surface Delivery',
    description: '3–5 business days. Safe contactless delivery via BlueDart.',
    cost: 0,
    estimatedDays: '3–5 Days',
  },
  {
    id: 'express',
    name: 'Priority Air Express',
    description: '1–2 business days. Dispatched within 12 hours via Delhivery Air.',
    cost: 250,
    estimatedDays: '1–2 Days',
  },
];

export const Checkout: React.FC = () => {
  const { items, summary, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  
  // Default address if user has one
  const defaultAddr = user?.savedAddresses?.find(a => a.isDefault) || user?.savedAddresses?.[0];

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: defaultAddr?.fullName || user?.name || '',
    email: email,
    phone: phone,
    addressLine1: defaultAddr?.addressLine1 || '',
    addressLine2: defaultAddr?.addressLine2 || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || '',
    pincode: defaultAddr?.pincode || '',
    country: 'India',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(DELIVERY_METHODS[0]);
  const [upiRefNumber, setUpiRefNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyUpiId = () => {
    navigator.clipboard?.writeText(UPI_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // If cart is empty, redirect to cart
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-light uppercase tracking-widest mb-3">Your Bag is Empty</h2>
        <p className="text-xs text-brand-muted mb-6">Add items to your bag before proceeding to checkout.</p>
        <Link to="/category/t-shirts" className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest">
          Shop Catalog
        </Link>
      </div>
    );
  }

  // Adjusted total considering selected delivery method
  const effectiveShipping = deliveryMethod.id === 'express' ? 250 : summary.shipping;
  const grandTotal = summary.subtotal - summary.discount + effectiveShipping;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email is required.';
    if (!phone || phone.length < 10) errs.phone = 'Valid phone number is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'Full recipient name is required.';
    if (!address.addressLine1.trim()) errs.addressLine1 = 'Street address is required.';
    if (!address.city.trim()) errs.city = 'City is required.';
    if (!address.state.trim()) errs.state = 'State is required.';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode.trim())) {
      errs.pincode = 'Please enter a valid 6-digit Indian PIN code.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handlePlaceDemoOrder = () => {
    const newErrors: Record<string, string> = {};
    if (!upiRefNumber.trim() || upiRefNumber.trim().length < 6) {
      newErrors.upiRef = 'Please enter your 12-digit UPI Reference (UTR) number after scanning & paying.';
    }
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms of service.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = orderService.createOrder({
        items,
        shippingAddress: {
          ...address,
          email,
          phone,
        },
        deliveryMethod,
        paymentMethod: `UPI QR (${UPI_CONFIG.upiId})`,
        paymentStatus: 'demo_authorized',
        subtotal: summary.subtotal,
        discount: summary.discount,
        shippingFee: effectiveShipping,
        total: grandTotal,
        notes: `UPI UTR / Ref: ${upiRefNumber.trim()} | Paid to: ${UPI_CONFIG.payeeName}`,
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 900);
  };

  const stepsList = [
    { num: 1, label: 'Contact' },
    { num: 2, label: 'Address' },
    { num: 3, label: 'Delivery' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Payment' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Checkout Title and Step Breadcrumb */}
      <div className="mb-8 pb-4 border-b border-neutral-200">
        <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mb-4">
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs overflow-x-auto">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step > s.num
                      ? 'bg-black text-white'
                      : step === s.num
                      ? 'border-2 border-black text-black'
                      : 'border border-neutral-300 text-neutral-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </span>
                <span className={`uppercase tracking-wider ${step === s.num ? 'font-semibold text-black' : 'text-neutral-500'}`}>
                  {s.label}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Area (7 Cols) */}
        <div className="lg:col-span-7 bg-white">
          {/* STEP 1: CONTACT DETAILS */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-2 border-b">
                Step 1: Contact Information
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  {errors.email && <p className="text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Mobile Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  {errors.phone && <p className="text-rose-600 mt-1">{errors.phone}</p>}
                  <p className="text-[11px] text-neutral-400 mt-1">For delivery OTP and shipment dispatch updates.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  Continue to Address
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-2 border-b">
                Step 2: Shipping Destination
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Recipient Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="First and last name"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  {errors.fullName && <p className="text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Address Line 1</label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    placeholder="Flat/House No., Building, Street Name"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  {errors.addressLine1 && <p className="text-rose-600 mt-1">{errors.addressLine1}</p>}
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={address.addressLine2}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    placeholder="Landmark, Area, Colony"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="e.g. Mumbai"
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                    />
                    {errors.city && <p className="text-rose-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">State</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                    />
                    {errors.state && <p className="text-rose-600 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="6 digits"
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black font-mono"
                    />
                    {errors.pincode && <p className="text-rose-600 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-neutral-300 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  Continue to Delivery
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY METHOD */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-2 border-b">
                Step 3: Select Delivery Speed
              </h2>

              <div className="space-y-3">
                {DELIVERY_METHODS.map((method) => {
                  const cost = method.id === 'standard' ? summary.shipping : method.cost;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setDeliveryMethod(method)}
                      className={`p-4 border cursor-pointer flex items-start justify-between transition-colors ${
                        deliveryMethod.id === method.id ? 'border-black bg-brand-soft' : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod.id === method.id}
                          onChange={() => setDeliveryMethod(method)}
                          className="mt-1 accent-black"
                        />
                        <div>
                          <p className="text-xs uppercase font-semibold text-black tracking-wider">
                            {method.name} ({method.estimatedDays})
                          </p>
                          <p className="text-xs text-brand-muted mt-0.5">{method.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-black">
                        {cost === 0 ? 'Complimentary' : formatINR(cost)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-neutral-300 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER REVIEW */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-2 border-b">
                Step 4: Order Review & Verification
              </h2>

              {/* Destination Card */}
              <div className="p-4 bg-brand-soft border border-neutral-200 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="uppercase font-semibold tracking-wider text-black">Shipping To:</span>
                  <button onClick={() => setStep(2)} className="text-[11px] underline text-neutral-600 hover:text-black">
                    Edit
                  </button>
                </div>
                <p className="font-medium text-black">{address.fullName}</p>
                <p className="text-neutral-600">
                  {address.addressLine1}, {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-neutral-500">Contact: {phone} • {email}</p>
              </div>

              {/* Items in Review */}
              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-neutral-100" />
                      <div>
                        <p className="font-medium text-black">{item.name}</p>
                        <p className="text-brand-muted">{item.size} / {item.color.name} (Qty: {item.quantity})</p>
                      </div>
                    </div>
                    <span className="font-semibold text-black">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border border-neutral-300 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: UPI QR PAYMENT */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b">
                <h2 className="text-sm font-medium uppercase tracking-widest text-black">
                  Step 5: UPI Instant Payment (Scan & Pay)
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-black text-white px-2 py-0.5">
                  Direct UPI
                </span>
              </div>

              {/* UPI QR Payment Container */}
              <div className="border border-neutral-300 bg-brand-soft p-6 space-y-6 text-center">
                {/* Payee & Amount Headline */}
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-brand-muted block">
                    Paying to verified merchant
                  </span>
                  <h3 className="text-lg font-semibold text-black uppercase tracking-wide mt-0.5">
                    {UPI_CONFIG.payeeName}
                  </h3>
                  <div className="mt-2 inline-block bg-black text-white px-4 py-1 text-sm font-medium">
                    Total Amount: {formatINR(grandTotal)}
                  </div>
                </div>

                {/* QR Code Image Display */}
                <div className="max-w-[260px] mx-auto bg-white p-4 border border-neutral-200 shadow-md">
                  <img
                    src={UPI_CONFIG.qrImageUrl}
                    alt={`UPI QR Code for ${UPI_CONFIG.payeeName}`}
                    className="w-full h-auto object-contain mx-auto"
                  />
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-2 font-medium">
                    Scan with any UPI app
                  </p>
                </div>

                {/* UPI ID and 1-Click Copy */}
                <div className="max-w-sm mx-auto bg-white p-3 border border-neutral-200 flex items-center justify-between gap-2">
                  <div className="text-left overflow-hidden">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">UPI ID</span>
                    <span className="font-mono text-xs font-semibold text-black truncate block">
                      {UPI_CONFIG.upiId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpiId}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-colors text-xs font-medium uppercase tracking-wider flex items-center gap-1 shrink-0"
                  >
                    {copiedUpi ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Step Instructions */}
                <div className="max-w-md mx-auto text-left text-[11px] text-neutral-600 space-y-1.5 bg-white p-4 border border-neutral-200">
                  <p className="font-semibold uppercase tracking-wider text-black text-[10px] mb-1">
                    How to complete payment:
                  </p>
                  <p>1. Open Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app.</p>
                  <p>2. Scan the QR code above or pay directly to <strong className="font-mono">{UPI_CONFIG.upiId}</strong>.</p>
                  <p>3. Transfer the exact amount of <strong className="text-black">{formatINR(grandTotal)}</strong>.</p>
                  <p>4. Enter the 12-digit UPI Reference / UTR Number from your payment app below.</p>
                </div>

                {/* 12-digit UTR Input */}
                <div className="max-w-md mx-auto text-left pt-2">
                  <label className="block uppercase tracking-wider text-black mb-1 font-semibold text-xs">
                    UPI Reference / UTR Number (12 Digits) *
                  </label>
                  <input
                    type="text"
                    value={upiRefNumber}
                    onChange={(e) => {
                      setUpiRefNumber(e.target.value);
                      if (errors.upiRef) setErrors({ ...errors, upiRef: '' });
                    }}
                    placeholder="e.g. 432109876543"
                    className="w-full px-4 py-2.5 text-xs font-mono bg-white border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  {errors.upiRef && (
                    <p className="text-rose-600 text-xs mt-1 font-medium">{errors.upiRef}</p>
                  )}
                  <p className="text-[10px] text-neutral-400 mt-1">
                    You can find the 12-digit UTR/Reference number in the transaction details of your UPI app.
                  </p>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 accent-black rounded-none"
                  />
                  <span>
                    I confirm that I have transferred {formatINR(grandTotal)} to {UPI_CONFIG.payeeName} ({UPI_CONFIG.upiId}) and provided the correct reference number.
                  </span>
                </label>
                {errors.terms && <p className="text-rose-600 text-xs mt-1">{errors.terms}</p>}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 border border-neutral-300 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handlePlaceDemoOrder}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Verifying Reference...' : `Confirm & Place Order (${formatINR(grandTotal)})`}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Order Summary Column (5 Cols) */}
        <div className="lg:col-span-5 bg-brand-soft border border-neutral-200 p-6 md:p-8 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black pb-3 border-b border-neutral-200">
            Cart Summary ({items.length} unique styles)
          </h3>

          <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                <div>
                  <p className="font-medium text-black line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-brand-muted">{item.size} / {item.color.name} (x{item.quantity})</p>
                </div>
                <span className="font-medium text-black shrink-0 ml-2">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs text-brand-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-black font-medium">{formatINR(summary.subtotal)}</span>
            </div>
            {summary.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Voucher Discount</span>
                <span>-{formatINR(summary.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-black font-medium">
                {effectiveShipping === 0 ? 'Complimentary' : formatINR(effectiveShipping)}
              </span>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-black">
              <span>Total Payable</span>
              <span>{formatINR(grandTotal)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 space-y-1.5">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>Complimentary 15-day return and exchange policy</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-neutral-700 inline" />
              <span>Free doorstep pickup across all Indian pincodes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
