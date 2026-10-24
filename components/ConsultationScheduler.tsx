'use client';

import { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function ConsultationScheduler() {
  const [format, setFormat] = useState<'video' | 'phone' | 'in-person'>('video');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('morning');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setErrorMessage('Please select a preferred date.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const formatLabel =
        format === 'video'
          ? 'Google Meet Video'
          : format === 'phone'
          ? 'Phone Call'
          : 'In-Person at Bethesda Office';

      const timeSlotLabel =
        timeSlot === 'morning'
          ? 'Morning (9:00 AM - 12:00 PM ET)'
          : timeSlot === 'early-afternoon'
          ? 'Early Afternoon (12:00 PM - 3:00 PM ET)'
          : 'Late Afternoon (3:00 PM - 6:00 PM ET)';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          interest: `Consultation Request: ${formatLabel}`,
          consultationDate: date,
          consultationTime: timeSlotLabel,
          message: `Consultation Format: ${formatLabel} | Window: ${timeSlotLabel} | Notes: ${notes || 'None'}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation request.');
      }

      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to send request. Please contact me directly.'
      );
    }
  };

  return (
    <div id="schedule" className="bg-[#242426] border border-[#2E2E30] rounded-lg p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F3DFA2] font-semibold mb-1">
          <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Appointment Scheduling</span>
        </div>
        <h3 className="font-display text-2xl text-[#EDEDED] font-normal tracking-tight">
          Request a 30-Minute Consultation
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A8E] mt-1 leading-relaxed">
          Select your preferred day, time window, and meeting format. I&apos;ll review my calendar
          and send you a confirmation with meeting details within 24 hours.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-[#1C1C1E] border border-[#F3DFA2]/40 rounded-lg space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#F3DFA2] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h4 className="text-base font-medium text-[#EDEDED]">
                Consultation Request Submitted
              </h4>
              <p className="text-xs text-[#8A8A8E] mt-1 leading-relaxed">
                Thank you, <strong className="text-[#EDEDED]">{name}</strong>. I&apos;ve received your
                request for <strong className="text-[#EDEDED]">{date}</strong> ({timeSlot}). I&apos;ll
                review my calendar and confirm your appointment by email at{' '}
                <strong className="text-[#EDEDED]">{email}</strong>.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2E2E30] flex flex-wrap gap-4 text-xs text-[#8A8A8E]">
            <span>Need immediate assistance?</span>
            <a href="tel:5715367054" className="text-[#F3DFA2] hover:underline font-mono">
              Call 571.536.7054
            </a>
            <span>·</span>
            <a href="mailto:Careme@onestreet.one" className="text-[#F3DFA2] hover:underline">
              Careme@onestreet.one
            </a>
          </div>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-xs text-[#8A8A8E] hover:text-[#EDEDED] underline pt-2 block"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-3 bg-red-950/30 border border-red-500/40 rounded text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Meeting Format */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A8E] mb-2 font-medium">
              1. Meeting Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'video', label: 'Google Meet Video', icon: Video },
                { id: 'phone', label: 'Phone Call', icon: Phone },
                { id: 'in-person', label: 'Bethesda Office', icon: MapPin },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = format === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormat(item.id as typeof format)}
                    className={`flex items-center gap-2.5 p-3 rounded-[4px] border text-left transition-colors text-xs ${
                      isSelected
                        ? 'border-[#F3DFA2] text-[#F3DFA2] bg-[#F3DFA2]/10'
                        : 'border-[#2E2E30] text-[#8A8A8E] hover:border-[#8A8A8E] hover:text-[#EDEDED]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Day & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sched-date" className="block text-xs uppercase tracking-wider text-[#8A8A8E] mb-2 font-medium">
                2. Preferred Date <span className="text-[#F3DFA2]">*</span>
              </label>
              <input
                id="sched-date"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1C1C1E] border border-[#2E2E30] focus:border-[#F3DFA2] rounded-[4px] px-3.5 py-2.5 text-xs text-[#EDEDED] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="sched-timeslot" className="block text-xs uppercase tracking-wider text-[#8A8A8E] mb-2 font-medium">
                3. Preferred Window
              </label>
              <select
                id="sched-timeslot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#1C1C1E] border border-[#2E2E30] focus:border-[#F3DFA2] rounded-[4px] px-3.5 py-2.5 text-xs text-[#EDEDED] focus:outline-none transition-colors"
              >
                <option value="morning">Morning (9:00 AM – 12:00 PM ET)</option>
                <option value="early-afternoon">Early Afternoon (12:00 PM – 3:00 PM ET)</option>
                <option value="late-afternoon">Late Afternoon (3:00 PM – 6:00 PM ET)</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-2 border-t border-[#2E2E30]">
            <label className="block text-xs uppercase tracking-wider text-[#8A8A8E] font-medium">
              4. Your Contact Details
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1C1C1E] border border-[#2E2E30] focus:border-[#F3DFA2] rounded-[4px] px-3.5 py-2 text-xs text-[#EDEDED] placeholder-[#8A8A8E]/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1C1C1E] border border-[#2E2E30] focus:border-[#F3DFA2] rounded-[4px] px-3.5 py-2 text-xs text-[#EDEDED] placeholder-[#8A8A8E]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number (for call confirmation)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1C1C1E] border border-[#2E2E30] focus:border-[#F3DFA2] rounded-[4px] px-3.5 py-2 text-xs text-[#EDEDED] placeholder-[#8A8A8E]/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="What would you like to discuss? (e.g. Buying in Bethesda, selling timeline, market valuation)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#1C1C1E] border border-[#2E2E30] focus:border-[#F3DFA2] rounded-[4px] px-3.5 py-2 text-xs text-[#EDEDED] placeholder-[#8A8A8E]/50 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action & Disclaimers */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 px-6 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] disabled:opacity-50 rounded-[4px] transition-colors"
            >
              {status === 'submitting' ? 'Submitting Request...' : 'Request Consultation Time'}
            </button>
            <p className="text-[11px] text-[#8A8A8E] text-center">
              I&apos;ll personally confirm your booking by email or phone within 24 hours.
            </p>
          </div>
        </form>
      )}

      {/* Alternative Direct Channels */}
      <div className="pt-6 border-t border-[#2E2E30] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8A8E]">
        <span>Prefer to reach out immediately?</span>
        <div className="flex items-center gap-4">
          <a
            href="tel:5715367054"
            className="flex items-center gap-1.5 text-[#EDEDED] hover:text-[#F3DFA2] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={1.5} />
            <span className="tabular-nums">571.536.7054</span>
          </a>
          <span>·</span>
          <a
            href="mailto:Careme@onestreet.one"
            className="text-[#EDEDED] hover:text-[#F3DFA2] transition-colors"
          >
            Careme@onestreet.one
          </a>
        </div>
      </div>
    </div>
  );
}
