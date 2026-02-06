import { Shield, Clock, Wallet, Award } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All our vehicles come with comprehensive insurance coverage for your peace of mind.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to assist you.',
  },
  {
    icon: Wallet,
    title: 'Best Prices',
    description: 'We offer competitive rates with no hidden fees or surprise charges.',
  },
  {
    icon: Award,
    title: 'Quality Fleet',
    description: 'All vehicles are regularly maintained and inspected for safety.',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-[#f15e2b]">Rent-A-Ride</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the best car rental experience with premium service and unmatched convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="w-16 h-16 bg-[#f15e2b]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#f15e2b] transition-colors">
                <benefit.icon className="w-8 h-8 text-[#f15e2b] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
