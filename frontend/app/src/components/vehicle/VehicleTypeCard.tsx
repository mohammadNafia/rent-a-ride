import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { VehicleTypeInfo } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface VehicleTypeCardProps {
  typeInfo: VehicleTypeInfo;
}

export const VehicleTypeCard = ({ typeInfo }: VehicleTypeCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/vehicles?type=${typeInfo.type}`)}
      className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={typeInfo.imageUrl}
          alt={typeInfo.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{typeInfo.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{typeInfo.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-lg font-bold text-[#f15e2b]">
              {formatCurrency(typeInfo.startingPrice)}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{typeInfo.vehicleCount}</p>
            <p className="text-xs text-gray-500">vehicles</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
          <span className="text-gray-600 group-hover:text-[#f15e2b] transition-colors">
            View Collection
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#f15e2b] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
