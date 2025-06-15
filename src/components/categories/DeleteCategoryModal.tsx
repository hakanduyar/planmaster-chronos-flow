
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Category } from '@/types/category';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  category: Category | null;
  isLoading?: boolean;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  category,
  isLoading = false,
}) => {
  if (!category) return null;

  const taskCount = category.task_count || 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-900/95 backdrop-blur-sm border-white/10">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <AlertDialogTitle className="text-white">
              Kategoriyi Sil
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-white/70 space-y-3">
            <div>
              <strong className="text-white">{category.name}</strong> kategorisini silmek istediğinizden emin misiniz?
            </div>
            {taskCount > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-yellow-400 text-sm">
                  ⚠️ Bu kategorideki <strong>{taskCount} görev</strong> "Diğer" kategorisine taşınacak.
                </p>
              </div>
            )}
            <div className="text-red-400 text-sm">
              Bu işlem geri alınamaz.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-white/10 text-white hover:bg-white/20 border-white/20"
          >
            İptal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? 'Siliniyor...' : 'Evet, Sil'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryModal;
