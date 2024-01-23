import './App.css';
import { useEffect, useState } from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

function App() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [location, setLocation] = useState('');
  const [entries, setEntries] = useState([]);
  const [locations, setLocations] = useState([]);
  
  useEffect(() => {
    async function fetchLocations() {
      let response = await getLocations();
      setLocations(response)
      setLocation(locations[0])
    }

    fetchLocations();
  }, [])

  useEffect(() => {
    setLocation(locations[0])
  }, [locations])
  
  const changeName = (e) => {
    isNameValid(e.target.value)
    .then((res) => {
      setNameError(res ? '' : 'this name has already been taken')
    })
    setName(e.target.value);
  }
  
  const changeLocation = (e) => {
    setLocation(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(location)
    setEntries([...entries, { name: name, location: location }]);
    clearForm();
  }

  const clearForm = () => {
    setName('');
    setLocation('Canada');
    setNameError('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='form-container sketch-border'>
          <form onSubmit={submitForm}>
            <div className='name-input-container'>
              <div>
                <label htmlFor='name' className='input-label'>Name</label>
                <input id='name' type='text' className='sketch-border-input' onChange={(e) => changeName(e)} value={name}/>
              </div>
              <div className='error-text'>{ nameError }</div>
            </div>
            <div>
              <label htmlFor='loco' className='input-label'>Location</label>
              <select id='loco' name='locations' placeholder='Select a location' className='sketch-border-input' onChange={(e) => changeLocation(e)} value={location}>
                {
                  locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='btn-group'>
              <button type='button' onClick={() => clearForm()} className='sketch-border-input btn first-btn'>Clear</button>
              {/* MADE ASSUMPTION THAT ADD BUTTON SHOULD ONLY BE CLICKABLE WITH VALID INPUTS */}
              <button type='submit' className='sketch-border-input btn' disabled={(nameError || !name)}>Add</button>
            </div>
          </form>

          <table className='sketch-border'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{ entry.name }</td>
                    <td>{ entry.location }</td>
                  </tr>
                ))
              }
              {/* MADE ASSUMPTION THAT AN EXTRA ROW SHOULD BE DISPLAYED TO INDICATE TO USER THAT THEIR INPUTS WOULD DISPLAY HERE */}
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
