import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Vehicle } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface PriceEditDialogProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (price: number) => void;
  isLoading?: boolean;
}

export const PriceEditDialog = ({ vehicle, isOpen, onClose, onSubmit, isLoading }: PriceEditDialogProps) => {
  const [price, setPrice] = useState(vehicle?.dailyPrice || 0);

  useEffect(() => {
    if (vehicle) {
      setPrice(vehicle.dailyPrice);
    }
  }, [vehicle]);

  const handleSubmit = () => {
    if (price > 0) {
      onSubmit(price);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Vehicle Price</DialogTitle>
        </DialogHeader>

        {vehicle && (
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{vehicle.make} {vehicle.model}</p>
              <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.type}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPrice">New Daily Price ($)</Label>
              <Input
                id="newPrice"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                autoFocus
              />
              <p className="text-sm text-gray-500">
                Current price: {formatCurrency(vehicle.dailyPrice)}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || price <= 0}
                className="bg-[#f15e2b] hover:bg-[#d14e1f]"
              >
                {isLoading ? 'Updating...' : 'Update Price'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
