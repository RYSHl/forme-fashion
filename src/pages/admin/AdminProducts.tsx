import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X 
} from 'lucide-react';
import { productService } from '../../services/productService';
import { Product, ProductCategory, ProductSize, ProductFit, ProductColor } from '../../types/product';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const ALL_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ALL_FITS: ProductFit[] = ['Boxy', 'Relaxed', 'Regular', 'Slim', 'Straight', 'Wide-Leg'];

export const AdminProducts: React.FC = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>(() => productService.getAllProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 't-shirts' as ProductCategory,
    subcategory: '',
    price: 1490,
    originalPrice: 0,
    description: '',
    composition: '100% Combed Cotton',
    fit: 'Regular' as ProductFit,
    stock: 20,
    isNew: true,
    isBestseller: false,
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'],
    imageInput: '',
    sizes: ['S', 'M', 'L'] as ProductSize[],
    colorName: 'Classic Black',
    colorHex: '#111111',
  });

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `FRM-${Math.floor(100 + Math.random() * 900)}`,
      category: 't-shirts',
      subcategory: 'Essentials',
      price: 1990,
      originalPrice: 2490,
      description: 'Engineered for seamless everyday movement and timeless aesthetic posture.',
      composition: '100% Heavy Combed Cotton',
      fit: 'Relaxed',
      stock: 25,
      isNew: true,
      isBestseller: false,
      images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'],
      imageInput: '',
      sizes: ['S', 'M', 'L', 'XL'],
      colorName: 'Obsidian Black',
      colorHex: '#111111',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      subcategory: prod.subcategory || '',
      price: prod.price,
      originalPrice: prod.originalPrice || 0,
      description: prod.description,
      composition: prod.composition,
      fit: prod.fit,
      stock: prod.stock,
      isNew: !!prod.isNew,
      isBestseller: !!prod.isBestseller,
      images: prod.images,
      imageInput: '',
      sizes: prod.sizes,
      colorName: prod.colors[0]?.name || 'Natural',
      colorHex: prod.colors[0]?.hex || '#000000',
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const colors: ProductColor[] = [
      { name: formData.colorName, hex: formData.colorHex },
    ];

    if (editingProduct) {
      // Update
      const updated = productService.updateProduct({
        ...editingProduct,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description,
        composition: formData.composition,
        fit: formData.fit,
        stock: Number(formData.stock),
        isNew: formData.isNew,
        isBestseller: formData.isBestseller,
        images: formData.images.filter(Boolean),
        sizes: formData.sizes,
        colors: colors.length > 0 ? colors : editingProduct.colors,
      });

      setProducts(productService.getAllProducts());
      showToast('Garment Updated', 'success', updated.name);
    } else {
      // Create
      const created = productService.createProduct({
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description,
        details: ['Tailored contemporary fit', 'Ethically sourced natural fibers', 'Pre-shrunk fabric'],
        composition: formData.composition,
        careInstructions: ['Machine wash cold', 'Line dry in shade'],
        fit: formData.fit,
        stock: Number(formData.stock),
        isNew: formData.isNew,
        isBestseller: formData.isBestseller,
        images: formData.images.filter(Boolean),
        sizes: formData.sizes,
        colors: colors,
      });

      setProducts(productService.getAllProducts());
      showToast('New Garment Added', 'success', created.name);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    productService.deleteProduct(id);
    setProducts(productService.getAllProducts());
    setDeleteConfirmId(null);
    showToast('Product Removed', 'info', 'Garment removed from catalog.');
  };

  const toggleSize = (size: ProductSize) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleAddImage = () => {
    if (formData.imageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, prev.imageInput.trim()],
        imageInput: '',
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white p-6 border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-light uppercase tracking-tight text-black">
            Garment Catalog Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Create, update, and manage inventory stock across all four seasonal silhouettes.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 flex items-center gap-2 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-neutral-200 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full pl-9 pr-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="uppercase tracking-wider text-neutral-500 text-[11px]">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 bg-white uppercase tracking-wider font-medium cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            <option value="t-shirts">T-Shirts</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="hoodies">Hoodies</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">Image</th>
              <th className="py-3 px-4 font-semibold">Name & SKU</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Fit</th>
              <th className="py-3 px-4 font-semibold">Price</th>
              <th className="py-3 px-4 font-semibold">Stock</th>
              <th className="py-3 px-4 font-semibold">Badges</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                {/* Image Thumbnail */}
                <td className="py-3 px-4">
                  <div className="w-12 h-14 bg-neutral-100 overflow-hidden border border-neutral-200">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                </td>

                {/* Name & SKU */}
                <td className="py-3 px-4">
                  <p className="font-semibold text-black">{prod.name}</p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{prod.sku}</p>
                </td>

                {/* Category */}
                <td className="py-3 px-4 uppercase tracking-wider text-[11px] font-medium text-neutral-700">
                  {prod.category}
                </td>

                {/* Fit */}
                <td className="py-3 px-4 text-neutral-600">
                  {prod.fit}
                </td>

                {/* Price */}
                <td className="py-3 px-4 font-semibold text-black">
                  {formatINR(prod.price)}
                </td>

                {/* Stock Level */}
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                    prod.stock <= 5 ? 'bg-rose-100 text-rose-800' :
                    prod.stock <= 12 ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {prod.stock} Units
                  </span>
                </td>

                {/* Badges */}
                <td className="py-3 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {prod.isNew && (
                      <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 bg-neutral-100 text-neutral-800">
                        New
                      </span>
                    )}
                    {prod.isBestseller && (
                      <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 bg-black text-white">
                        Bestseller
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditModal(prod)}
                      className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      title="Edit product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(prod.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-brand-muted text-xs">
            No products match your search or filter selection.
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white p-6 md:p-8 max-w-2xl w-full border border-neutral-300 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-black">
                {editingProduct ? 'Edit Garment Specifications' : 'Add New Seasonal Garment'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Garment Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Heavyweight Boxy Tee"
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 border border-neutral-300 uppercase tracking-wider font-medium cursor-pointer"
                  >
                    <option value="t-shirts">T-Shirts</option>
                    <option value="shirts">Shirts</option>
                    <option value="pants">Pants</option>
                    <option value="hoodies">Hoodies</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Fit / Cut</label>
                  <select
                    value={formData.fit}
                    onChange={(e) => setFormData({ ...formData, fit: e.target.value as ProductFit })}
                    className="w-full px-3 py-2 border border-neutral-300 uppercase tracking-wider font-medium cursor-pointer"
                  >
                    {ALL_FITS.map(fit => (
                      <option key={fit} value={fit}>{fit}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Stock Units</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Price (INR ₹)</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Original Price (INR ₹ - Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                />
              </div>

              {/* Sizes Available */}
              <div>
                <label className="block uppercase tracking-wider text-neutral-600 mb-2 font-medium">Select Sizes Offered</label>
                <div className="flex gap-2">
                  {ALL_SIZES.map(size => {
                    const active = formData.sizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
                          active ? 'bg-black text-white border-black' : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Primary Color Name</label>
                  <input
                    type="text"
                    value={formData.colorName}
                    onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Color Hex Code</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.colorHex}
                      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                      className="w-9 h-9 p-0.5 border border-neutral-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.colorHex}
                      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                      className="flex-1 px-3 py-2 border border-neutral-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Product Photography URL</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={formData.imageInput}
                    onChange={(e) => setFormData({ ...formData, imageInput: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-neutral-900 text-white font-semibold uppercase tracking-wider"
                  >
                    Add URL
                  </button>
                </div>

                {/* Previews of added images */}
                <div className="flex gap-2 overflow-x-auto py-1">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-20 bg-neutral-100 border shrink-0">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute -top-1 -right-1 bg-black text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="uppercase tracking-wider font-medium">Mark as New Season</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="uppercase tracking-wider font-medium">Mark as Bestseller</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-6 border-t border-neutral-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-neutral-300 uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  {editingProduct ? 'Save Changes' : 'Create Garment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-6 max-w-sm w-full border border-neutral-300 shadow-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-black mb-2">
              Confirm Garment Removal
            </h3>
            <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
              Are you sure you want to remove this garment from the active catalog? This action will persist in your local storage.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 border border-neutral-300 text-xs uppercase tracking-wider font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 bg-rose-600 text-white text-xs uppercase tracking-wider font-semibold hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
