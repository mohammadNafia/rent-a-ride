import { useEffect, useState, useRef } from 'react';
import { Car, Users, MapPin, Headphones } from 'lucide-react';

const stats = [
  { icon: Car, value: 500, suffix: '+', label: 'Vehicles Available' },
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers' },
  { icon: MapPin, value: 50, suffix: '+', label: 'Locations' },
  { icon: Headphones, value: 24, suffix: '/7', label: 'Customer Support' },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(easeOut * end);
      setCount(countRef.current);
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, start]);

  return count;
};

const StatItem = ({ icon: Icon, value, suffix, label, inView }: {
  icon: typeof Car;
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) => {
  const count = useCountUp(value, 2000, inView);
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  );
};

export const StatsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#f15e2b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
