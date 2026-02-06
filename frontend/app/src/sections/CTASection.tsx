import { useNavigate } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="Open road"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Hit the Road?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Book your perfect vehicle today and start your journey. 
          Our team is ready to help you find the ideal car for your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/vehicles')}
            className="bg-[#f15e2b] hover:bg-[#d14e1f] text-white font-semibold px-8 py-6 text-lg group"
          >
            Rent Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:1-800-123-4567'}
            className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg"
          >
            <Phone className="mr-2 w-5 h-5" />
            Call Us
          </Button>
        </div>
      </div>
    </section>
  );
};
