import { HeroSection } from '@/sections/HeroSection';
import { SearchSection } from '@/sections/SearchSection';
import { BenefitsSection } from '@/sections/BenefitsSection';
import { VehicleTypesSection } from '@/sections/VehicleTypesSection';
import { FeaturedVehiclesSection } from '@/sections/FeaturedVehiclesSection';
import { StatsSection } from '@/sections/StatsSection';
import { CTASection } from '@/sections/CTASection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SearchSection />
      <BenefitsSection />
      <VehicleTypesSection />
      <FeaturedVehiclesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};
