
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from '@/components/categories/CategoryCard';
import CategoryModal from '@/components/categories/CategoryModal';
import DeleteCategoryModal from '@/components/categories/DeleteCategoryModal';
import CategoryStats from '@/components/categories/CategoryStats';
import { Category, CreateCategoryData, UpdateCategoryData } from '@/types/category';

const Categories = () => {
  const {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCategories();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const handleCreateCategory = (data: CreateCategoryData) => {
    createCategory(data);
    setShowCreateModal(false);
  };

  const handleUpdateCategory = (data: UpdateCategoryData) => {
    if (editingCategory) {
      updateCategory({ id: editingCategory.id, data });
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id);
      setDeletingCategory(null);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDeleteClick = (category: Category) => {
    setDeletingCategory(category);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Kategoriler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Kategorilerim</h1>
            <p className="text-white/70 text-lg">
              Görevlerinizi düzenlemek için kategorileri yönetin
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="planmaster-button group"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Yeni Kategori Ekle
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Ana İçerik - Kategori Kartları */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <div className="flex items-center text-white/70 mb-4">
                <Grid3X3 className="w-4 h-4 mr-2" />
                <span>{categories.length} kategori</span>
              </div>
            </motion.div>

            {categories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  Henüz kategori yok
                </h3>
                <p className="text-white/60 mb-6">
                  İlk kategorinizi oluşturarak başlayın
                </p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="planmaster-button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Kategori Ekle
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CategoryCard
                      category={category}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - İstatistikler */}
          <div className="lg:col-span-1">
            <CategoryStats categories={categories} />
          </div>
        </div>

        {/* Modal'lar */}
        <CategoryModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCategory}
          isLoading={isCreating}
        />

        <CategoryModal
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onSubmit={handleUpdateCategory}
          category={editingCategory || undefined}
          isLoading={isUpdating}
        />

        <DeleteCategoryModal
          isOpen={!!deletingCategory}
          onClose={() => setDeletingCategory(null)}
          onConfirm={handleDeleteCategory}
          category={deletingCategory}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
};

export default Categories;
