import React, { useState, useEffect } from 'react';
import Card from './Card';
import ProfileModal from './ProfileModal';


const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [viewSaved, setViewSaved] = useState(false);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [showProfile, setShowProfile] = useState(false);
 const userDetails = JSON.parse(localStorage.getItem("user"));



  const API_KEY = 'ac9918f4926142c6b10cffeb70505f56';

  const getData = async () => {
    setLoading(true);
    setError(null);
    setNewsData([]);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
      const jsonData = await response.json();
      if (jsonData.status === "ok") {
        setNewsData(jsonData.articles);
      } else {
        setError("Failed to fetch news");
      }
    } catch (err) {
      setError("Something went wrong while fetching news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSaveArticle = (article) => {
    const alreadySaved = savedArticles.find((item) => item.url === article.url);
    if (!alreadySaved) {
      setSavedArticles([...savedArticles, article]);
      showNotification("Article saved!");
    }
  };

  const handleDeleteArticle = (article) => {
    const updated = savedArticles.filter((item) => item.url !== article.url);
    setSavedArticles(updated);
    showNotification("Article deleted.");
  };

  const handleSettingsClick = () => setViewSaved(true);
  const handleBackClick = () => setViewSaved(false);
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
  <h1 style={{ margin: 0 }}>Flash News</h1>
  <button onClick={() => setShowProfile(true)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" width="30" height="30" />
  </button>
</div>

  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* Settings Button */}
    <button
  onClick={handleSettingsClick}
  className="settings-button"
>
  Settings
</button>


    {/* Search Input & Buttons */}
    <div className='searchBar' style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type='text'
        placeholder='Search News'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={viewSaved}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        onClick={getData}
        disabled={viewSaved}
        style={{ marginLeft: '5px', padding: '8px 12px', cursor: 'pointer' }}
      >
        Search
      </button>
      <button
  onClick={handleLogout}
  className="logout-button"
>
  Logout
</button>

    </div>
  </div>
</nav>
{notification && (
  <div className="notification-banner">
    {notification}
  </div>
)}
      {!viewSaved ? (
        <>
          <p className='head'>Stay update with Trendy news</p>
          <div className='categoryBtn'>
            {["sports", "politics", "entertainment", "health", "fitness"].map((cat) => (
              <button
                key={cat}
                value={cat}
                className={activeCategory === cat ? 'active-category' : ''}
                onClick={(e) => {
                  setSearch(e.target.value);
                  setActiveCategory(e.target.value);
                  getData();
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {loading && <p style={{ textAlign: 'center' }}>Loading news...</p>}
          {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
          {!loading && newsData.length === 0 && <p style={{ textAlign: 'center' }}>No news found.</p>}
          {!loading && newsData.length > 0 && (
            <Card data={newsData} onSave={handleSaveArticle} isSavedView={false} />
          )}
        </>
      ) : (
        <>
          <p className='head'>Saved Articles</p>
          <button onClick={handleBackClick} style={{ display: 'block', margin: '0 auto 20px' }}>
            ← Back to News
          </button>
          {savedArticles.length > 0 ? (
            <Card
              data={savedArticles}
              onDelete={handleDeleteArticle}
              isSavedView={true}
            />
          ) : (
            <p style={{ textAlign: 'center' }}>No saved articles yet.</p>
          )}
        </>
      )}
      {showProfile && (
  <ProfileModal user={userDetails} onClose={() => setShowProfile(false)} />
)}

    </div>
  );
};

export default Newsapp;