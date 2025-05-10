import React from 'react';

const Card = ({ data, onSave, onDelete, isSavedView }) => {
  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) return null;
        return (
          <div className='card' key={index}>
            <img src={curItem.urlToImage} alt="News Thumbnail" />
            <div className='content'>
              <a className='title' onClick={() => window.open(curItem.url)}>{curItem.title}</a>
              <p>{curItem.description}</p>
              <button onClick={() => window.open(curItem.url)}>Read More</button>

              {isSavedView ? (
                <button
                  onClick={() => onDelete(curItem)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#b30000',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              ) : (
                <button
                  onClick={() => onSave(curItem)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#003366',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    cursor: 'pointer'
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;