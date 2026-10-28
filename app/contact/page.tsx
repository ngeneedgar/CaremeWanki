import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Careme Nchang Wanki | Real Estate Advisor Bethesda MD & DMV',
  description:
    'Start the conversation with Careme Nchang Wanki. Reach out directly for strategic real estate guidance across Washington D.C., Maryland, and Virginia.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#1C1C1E]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Page Hero */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#EDEDED] font-normal tracking-tight mb-4">
            Let&apos;s start the conversation.
          </h1>
          <p className="text-base text-[#8A8A8E] leading-relaxed">
            Whether you&apos;re ready to buy, sell, invest, or just exploring your options across Washington
            D.C., Maryland, or Northern Virginia, I&apos;m here to provide strategic, transparent counsel.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Direct Phone */}
          <div className="p-6 bg-[#242426] border border-[#2E2E30] rounded-lg">
            <div className="w-10 h-10 rounded-[4px] bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center text-[#F3DFA2] mb-4">
              <Phone className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8A8A8E] font-medium mb-1">
              Direct Phone &amp; Text
            </h3>
            <a
              href="tel:5715367054"
              className="text-lg font-semibold text-[#EDEDED] hover:text-[#F3DFA2] transition-colors tabular-nums block"
            >
              571.536.7054
            </a>
            <p className="text-xs text-[#8A8A8E] mt-2">
              Available Monday – Friday, 9:00 AM – 6:00 PM Eastern.
            </p>
          </div>

          {/* Card 2: Direct Email */}
          <div className="p-6 bg-[#242426] border border-[#2E2E30] rounded-lg">
            <div className="w-10 h-10 rounded-[4px] bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center text-[#F3DFA2] mb-4">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8A8A8E] font-medium mb-1">
              Direct Email
            </h3>
            <a
              href="mailto:caremewanki9@gmail.com"
              className="text-lg font-semibold text-[#EDEDED] hover:text-[#F3DFA2] transition-colors block truncate"
            >
              caremewanki9@gmail.com
            </a>
            <p className="text-xs text-[#8A8A8E] mt-2">
              Detailed inquiries and relocation questions answered promptly.
            </p>
          </div>

          {/* Card 3: Office Address */}
          <div className="p-6 bg-[#242426] border border-[#2E2E30] rounded-lg">
            <div className="w-10 h-10 rounded-[4px] bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center text-[#F3DFA2] mb-4">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8A8A8E] font-medium mb-1">
              Bethesda Office
            </h3>
            <div className="text-sm font-semibold text-[#EDEDED] leading-snug">
              5021 Wilson Ln, Bethesda, MD 20814
            </div>
            <p className="text-xs text-[#8A8A8E] mt-2">
              By appointment.
            </p>
          </div>
        </div>

        {/* Direct Contact Form Section */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="mb-4 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#F3DFA2] font-semibold block mb-1">
              Direct Inquiry
            </span>
            <h2 className="font-serif text-3xl text-soft-white font-normal">
              Send a Message
            </h2>
            <p className="text-xs text-stone-gray mt-1">
              Fill out the form below and Careme will get back to you directly within 24 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
