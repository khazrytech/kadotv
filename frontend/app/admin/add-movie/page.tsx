const handleSave = async () => {
    if (!movieData) return;
    
    // Hakikisha jina la fields (kama title, poster_path, overview) 
    // linaendana na jina ulioloweka kwenye Mongoose model yako ya Media
    const payload = { 
      title: movieData.title,
      poster_path: movieData.poster_path || movieData.backdrop_path, // Jaribu zote mbili
      overview: movieData.overview,
      category: category, 
      downloads: downloads,
      // Ongeza field nyingine zozote ambazo Media model yako inazihitaji
    };

    try {
      const res = await fetch('https://kadotv.onrender.com/api/admin/add-movie', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-key': 'KADOTV_SECRET_2026' 
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData);
      }
      
      alert(`Muvi imehifadhiwa!`);
      // ...
