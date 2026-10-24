'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { DollarSign, Percent, Calendar, ShieldCheck, Home, ArrowRight } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({ initialPrice = 600000 }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(6.5);
  const [autoTax, setAutoTax] = useState<boolean>(true);
  const [customTax, setCustomTax] = useState<number>(6600);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1200);
  const [monthlyHOA, setMonthlyHOA] = useState<number>(0);

  // Computed property tax (1.1% default)
  const annualPropertyTax = autoTax ? Math.round(homePrice * 0.011) : customTax;
  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));

  // Mortgage calculation per exact spec in INTEGRATIONS.md
  const calculation = useMemo(() => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = annualInterestRate / 100 / 12;
    const numPayments = loanTermYears * 12;

    const monthlyPI =
      monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyTax = annualPropertyTax / 12;
    const monthlyIns = annualInsurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyHOA;

    return {
      loanAmount: loanAmount,
      monthlyPI: monthlyPI,
      monthlyTax: monthlyTax,
      monthlyInsurance: monthlyIns,
      monthlyHOA: monthlyHOA,
      totalMonthly: totalMonthly,
    };
  }, [
    homePrice,
    downPaymentPercent,
    loanTermYears,
    annualInterestRate,
    annualPropertyTax,
    annualInsurance,
    monthlyHOA,
  ]);

  const piPercent = calculation.totalMonthly > 0 ? (calculation.monthlyPI / calculation.totalMonthly) * 100 : 0;
  const taxPercent = calculation.totalMonthly > 0 ? (calculation.monthlyTax / calculation.totalMonthly) * 100 : 0;
  const insPercent = calculation.totalMonthly > 0 ? (calculation.monthlyInsurance / calculation.totalMonthly) * 100 : 0;
  const hoaPercent = calculation.totalMonthly > 0 ? (calculation.monthlyHOA / calculation.totalMonthly) * 100 : 0;

  return (
    <div className="bg-[#242426] border border-[#2E2E30] rounded-lg p-6 sm:p-10 text-[#EDEDED] shadow-xl">
      {/* Header */}
      <div className="border-b border-[#2E2E30] pb-6 mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#F3DFA2] font-semibold">
          Financial Planning Tool
        </span>
        <h2 className="font-display text-2xl sm:text-3xl text-[#EDEDED] font-normal tracking-tight mt-1.5">
          Estimate Your Monthly Payment
        </h2>
        <p className="text-sm text-[#8A8A8E] mt-1.5 max-w-xl">
          Model your prospective mortgage with live interest rates, down payments, property taxes,
          and HOA estimates across Washington D.C., Maryland, and Virginia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Home Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="home-price" className="text-sm font-medium text-[#EDEDED]">
                Home Purchase Price
              </label>
              <span className="text-base font-semibold font-mono text-[#F3DFA2] tabular-nums">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              id="home-price"
              type="range"
              min="150000"
              max="3500000"
              step="10000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1C1C1E] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8A8A8E] mt-1 font-mono">
              <span>$150k</span>
              <span>$1.5M</span>
              <span>$3.5M+</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="down-payment" className="text-sm font-medium text-[#EDEDED]">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-mono text-[#EDEDED] tabular-nums">
                ${downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <input
              id="down-payment"
              type="range"
              min="0"
              max="50"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1C1C1E] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex gap-2 mt-2">
              {[3.5, 5, 10, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`text-xs px-2.5 py-1 rounded-[4px] border transition-colors ${
                    downPaymentPercent === pct
                      ? 'border-[#F3DFA2] text-[#F3DFA2] bg-[#F3DFA2]/10'
                      : 'border-[#2E2E30] text-[#8A8A8E] hover:border-[#8A8A8E]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Loan Term & Interest Rate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="loan-term" className="block text-sm font-medium text-[#EDEDED] mb-2">
                Loan Term
              </label>
              <select
                id="loan-term"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-[#1C1C1E] border border-[#2E2E30] rounded-[4px] px-3 py-2 text-sm text-[#EDEDED] focus:border-[#F3DFA2] focus:outline-none"
              >
                <option value={30}>30 Years (Fixed)</option>
                <option value={20}>20 Years (Fixed)</option>
                <option value={15}>15 Years (Fixed)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="interest-rate" className="text-sm font-medium text-[#EDEDED]">
                  Interest Rate
                </label>
                <span className="text-sm font-mono text-[#F3DFA2] tabular-nums">
                  {annualInterestRate}%
                </span>
              </div>
              <input
                id="interest-rate"
                type="range"
                min="3.0"
                max="10.0"
                step="0.1"
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1C1C1E] rounded-lg appearance-none cursor-pointer mt-3"
              />
            </div>
          </div>

          {/* Secondary Expenses Accordion / Block */}
          <div className="pt-4 border-t border-[#2E2E30] space-y-4">
            <span className="text-xs uppercase tracking-wider text-[#8A8A8E] block">
              Taxes, Insurance & HOA
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-[#8A8A8E] block mb-1">
                  Annual Property Tax (~1.1%)
                </label>
                <input
                  type="number"
                  value={annualPropertyTax}
                  onChange={(e) => {
                    setAutoTax(false);
                    setCustomTax(Number(e.target.value));
                  }}
                  className="w-full bg-[#1C1C1E] border border-[#2E2E30] rounded-[4px] px-2.5 py-1.5 text-xs text-[#EDEDED] focus:border-[#F3DFA2] focus:outline-none font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="text-xs text-[#8A8A8E] block mb-1">
                  Annual Home Insurance
                </label>
                <input
                  type="number"
                  value={annualInsurance}
                  onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                  className="w-full bg-[#1C1C1E] border border-[#2E2E30] rounded-[4px] px-2.5 py-1.5 text-xs text-[#EDEDED] focus:border-[#F3DFA2] focus:outline-none font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="text-xs text-[#8A8A8E] block mb-1">
                  Monthly HOA Fee
                </label>
                <input
                  type="number"
                  value={monthlyHOA}
                  onChange={(e) => setMonthlyHOA(Number(e.target.value))}
                  className="w-full bg-[#1C1C1E] border border-[#2E2E30] rounded-[4px] px-2.5 py-1.5 text-xs text-[#EDEDED] focus:border-[#F3DFA2] focus:outline-none font-mono tabular-nums"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (5 cols) */}
        <div className="lg:col-span-5 bg-[#1C1C1E] border border-[#2E2E30] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A8A8E] font-medium block mb-1">
              Estimated Monthly Payment
            </span>
            <div className="text-4xl sm:text-5xl font-display text-[#F3DFA2] font-normal tracking-tight tabular-nums mb-3">
              ${Math.round(calculation.totalMonthly).toLocaleString()}
              <span className="text-base text-[#8A8A8E] font-sans font-normal ml-1">/mo</span>
            </div>

            <p className="text-xs text-[#8A8A8E] mb-6">
              Loan Amount: ${Math.round(calculation.loanAmount).toLocaleString()} over{' '}
              {loanTermYears} years
            </p>

            {/* Visual Breakdown Bar */}
            <div className="w-full h-2.5 bg-[#2E2E30] rounded-full overflow-hidden flex mb-6">
              <div
                style={{ width: `${piPercent}%` }}
                className="bg-[#F3DFA2] h-full transition-all duration-200"
                title="Principal & Interest"
              />
              <div
                style={{ width: `${taxPercent}%` }}
                className="bg-[#E4C878] h-full transition-all duration-200"
                title="Property Taxes"
              />
              <div
                style={{ width: `${insPercent}%` }}
                className="bg-[#B89F56] h-full transition-all duration-200"
                title="Homeowners Insurance"
              />
              {monthlyHOA > 0 && (
                <div
                  style={{ width: `${hoaPercent}%` }}
                  className="bg-[#8A8A8E] h-full transition-all duration-200"
                  title="HOA Fees"
                />
              )}
            </div>

            {/* Itemized Breakdown List */}
            <div className="space-y-3 text-xs border-b border-[#2E2E30] pb-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-[#EDEDED]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F3DFA2]" />
                  Principal & Interest
                </span>
                <span className="font-mono tabular-nums text-[#EDEDED]">
                  ${Math.round(calculation.monthlyPI).toLocaleString()}/mo
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-[#EDEDED]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E4C878]" />
                  Property Taxes
                </span>
                <span className="font-mono tabular-nums text-[#EDEDED]">
                  ${Math.round(calculation.monthlyTax).toLocaleString()}/mo
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-[#EDEDED]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B89F56]" />
                  Homeowners Insurance
                </span>
                <span className="font-mono tabular-nums text-[#EDEDED]">
                  ${Math.round(calculation.monthlyInsurance).toLocaleString()}/mo
                </span>
              </div>

              {monthlyHOA > 0 && (
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-[#EDEDED]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8A8A8E]" />
                    HOA / Condo Dues
                  </span>
                  <span className="font-mono tabular-nums text-[#EDEDED]">
                    ${Math.round(calculation.monthlyHOA).toLocaleString()}/mo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Lead-Capture Tie-In */}
          <div className="pt-2">
            <p className="text-xs text-[#8A8A8E] mb-3">
              Need a tailored lender pre-approval or competitive mortgage rate strategy?
            </p>
            <Link
              href="/contact#schedule"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
