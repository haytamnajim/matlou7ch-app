import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './EditProduct.css';

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États du formulaire
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  
  // Catégories disponibles
  const categories = [
    'Ameublement', 
    'Électronique', 
    'Vêtements', 
    'Livres', 
    'Jouets', 
    'Décoration', 
    'Sports', 
    'Multimédia'
  ];
  
  // États disponibles
  const conditions = [
    'comme neuf', 
    'très bon état', 
    'bon état', 
    'état moyen', 
    'à bricoler'
  ];

  // Charger les données du produit
  useEffect(() => {
    // Simuler le chargement des données du produit
    // Dans une application réelle, vous feriez un appel API ici
    setTimeout(() => {
      try {
        // Simuler les données du produit
        const mockProduct = {
          id: productId,
          title: "Table d'enfant",
          category: "Ameublement",
          condition: "très bon état",
          description: "Table d'enfant en bois massif, idéale pour les activités créatives.",
          location: "Casablanca",
          image: "/images/table-enfant.jpg"
        };
        
        // Mettre à jour les états avec les données du produit
        setTitle(mockProduct.title);
        setCategory(mockProduct.category);
        setCondition(mockProduct.condition);
        setDescription(mockProduct.description);
        setLocation(mockProduct.location);
        setCurrentImage(mockProduct.image);
        
        setLoading(false);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des données du produit");
        setLoading(false);
      }
    }, 500);
  }, [productId]);

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Créer un objet FormData pour gérer l'upload d'image
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('description', description);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }
    
    // Simuler la mise à jour du produit
    // Dans une application réelle, vous feriez un appel API ici
    console.log("Données du produit à mettre à jour:", {
      title,
      category,
      condition,
      description,
      location,
      image: image ? 'Nouvelle image' : 'Image inchangée'
    });
    
    // Rediriger vers la page du produit après la mise à jour
    alert("Produit mis à jour avec succès!");
    navigate(`/produit/${productId}`);
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      // Créer une URL pour prévisualiser l'image
      setCurrentImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (loading) {
    return (
      <div className="edit-product-page">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-product-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <div className="edit-product-container">
        <div className="edit-product-header">
          <Link to={`/produit/${productId}`} className="back-button">
            <FaArrowLeft />
            <span>Retour</span>
          </Link>
          <h1 className="edit-product-title">Modifier l'annonce</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-product-form">
          <div className="form-group">
            <label htmlFor="title">Titre de l'annonce</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="condition">État</label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="">Sélectionner un état</option>
              {conditions.map((cond) => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={1000}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Lieu</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Photo du produit</label>
            <div className="image-upload-container">
              {currentImage && (
                <div className="current-image-preview">
                  <img 
                    src={currentImage} 
                    alt="Aperçu du produit" 
                    className="product-image-preview"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(title)}`;
                    }}
                  />
                </div>
              )}
              <div className="image-upload-button">
                <label htmlFor="image-upload" className="custom-file-upload">
                  Changer l'image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate(`/produit/${productId}`)}>
              Annuler
            </button>
            <button type="submit" className="save-button">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;