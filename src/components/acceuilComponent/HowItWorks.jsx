import React from 'react';

const HowItWorks = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#222',
  };

  const featuresContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '3rem',
    gap: '1.5rem',
  };

  const featureStyle = {
    flex: 1,
    minWidth: '250px',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const featureTitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#444',
  };

  const featureTextStyle = {
    lineHeight: '1.5',
    color: '#666',
  };

  const formSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#f0f2f5',
    borderRadius: '8px',
  };

  const formFieldStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const selectStyle = {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: 'white',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>How does it work?</h1>
      
      <div style={featuresContainerStyle}>
        <div style={featureStyle}>
          <h2 style={featureTitleStyle}>Search your favourite topic</h2>
          <p style={featureTextStyle}>
            Learn your ideas and more comments, exploring the situation, complex aspects of how innovative 
            solutions can be used to achieve all approaches based on the impact on the past different 
            types of resources.
          </p>
        </div>
        
        <div style={featureStyle}>
          <h2 style={featureTitleStyle}>Bookmark & Keep It for yourself</h2>
          <p style={featureTextStyle}>
            Learn your ideas and more comments, exploring the best past innovations in process innovation, 
            new services and tips, with specific questions and more about methods such as how businesses 
            are affected.
          </p>
        </div>
        
        <div style={featureStyle}>
          <h2 style={featureTitleStyle}>Read a Enjoy</h2>
          <p style={featureTextStyle}>
            Learn the basics and some comments, exploring the future in decisions, and ultimately making 
            changes intended, can make improvements in decision bases and share each context while success.
          </p>
        </div>
      </div>
      
      <div style={formSectionStyle}>
        <div style={formFieldStyle}>
          <label style={labelStyle}>What is your name?</label>
          <input type="text" style={inputStyle} />
        </div>
        
        <div style={formFieldStyle}>
          <label style={labelStyle}>Choose Variables?</label>
          <select style={selectStyle}>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;