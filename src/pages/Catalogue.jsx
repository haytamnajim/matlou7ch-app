import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Catalogue.css';

function Catalogue() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || 'Paris 10 (75) - 100 km';
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'Ameublement';

  return (
    <div className="search-results-page">
      {/* Contenu existant de la page catalogue */}
      {/* ... */}
      
      {/* Supprimez la ligne qui inclut le Footer */}
      {/* <Footer type="catalogue" /> */}
    </div>
  );
}

export default Catalogue;
