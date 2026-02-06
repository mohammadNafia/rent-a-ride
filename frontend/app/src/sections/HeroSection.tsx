import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
          alt="Premium car rental"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f15e2b]/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#f15e2b] rounded-full animate-pulse" />
            <span className="text-[#f15e2b] font-medium text-sm tracking-wide uppercase">
              Premium Car Rental
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect{' '}
            <span className="text-[#f15e2b]">Ride</span>{' '}
            Today
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
            Explore our wide range of premium vehicles at affordable prices. 
            Book online in minutes and hit the road with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              onClick={() => navigate('/vehicles')}
              className="bg-[#f15e2b] hover:bg-[#d14e1f] text-white font-semibold px-8 py-6 text-lg group"
            >
              Browse Vehicles
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/about')}
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5 text-[#f15e2b]" />
              <span className="text-sm">Fully Insured</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5 text-[#f15e2b]" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Headphones className="w-5 h-5 text-[#f15e2b]" />
              <span className="text-sm">Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};
