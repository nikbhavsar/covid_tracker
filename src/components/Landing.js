import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Symptomps_image from '../images/corona_symptoms.jpg';
import Corona_preventions from '../images/corona_preventions.jpg';
import Wash_hands from '../images/wash_hands.png';

const Landing = () => {
  let [cases, setCases] = useState({});

  let [elementsToShow, setToggle] = useState(10);

  let [imageType, setImageType] = useState(Wash_hands);

  //fetch the data in useEffect hook

  useEffect(() => {
    const getTopTenCountries = async () => {
      const result = await axios('https://api.covid19api.com/summary');
      setCases(result.data);
    };
    getTopTenCountries();
  }, [setCases]);

  //sort object by total number of cases

  if (JSON.stringify(cases) !== '{}') {
    var sortedObjectByTotalConfiormed = cases.Countries.sort(function (a, b) {
      return a.TotalConfirmed > b.TotalConfirmed
        ? -1
        : b.TotalConfirmed > a.TotalConfirmed
        ? 1
        : 0;
    });
  }

  return (
    <div className='main-div'>
      <div className='information-section'>
        <div className='information-section__buttons-div'>
          <div className='information-section__symptoms__button-div'>
            <a
              className='info-btn symptoms-btn'
              href='/'
              onClick={(e) => {
                e.preventDefault();
                setImageType(Symptomps_image);
              }}>
              Symptoms
            </a>
          </div>
          <div className='information-section__preventions__button-div'>
            <a
              className='info-btn preventions-btn'
              href='/'
              onClick={(e) => {
                e.preventDefault();
                setImageType(Corona_preventions);
              }}>
              Preventions
            </a>
          </div>
        </div>
        <div className='information-section__image-div'>
          <img
            src={imageType}
            alt='symptoms'
            className='information-section__image'></img>
        </div>
      </div>

      <div className='list-by-countries-section'>
        <div className='global-data'>
          <div className='global-total-cases'>
            <h1>
              {JSON.stringify(cases) !== '{}' && cases.Global.TotalConfirmed}
            </h1>
            <h4>Total Cases</h4>
          </div>
          <div className='global-recovered-cases'>
            <h1>
              {JSON.stringify(cases) !== '{}' && cases.Global.TotalRecovered}
            </h1>
            <h4>Total Recovered</h4>
          </div>
        </div>
        <div className='country-data'>
          <table className='country-list'>
            <tr>
              <th className='list-span country-list__country'>Country</th>
              <th className='list-span country-list__total'>Total Cases</th>
              <th className='list-span country-list__recovered'>Recovered</th>
            </tr>
            {JSON.stringify(cases) !== '{}' &&
              sortedObjectByTotalConfiormed
                .slice(0, elementsToShow)
                .map((item, index) => (
                  <tr key={index} className='country-item'>
                    <td className='list-span country-list__country'>
                      {item.Country}
                    </td>
                    <td className='list-span country-list__total'>
                      {item.TotalConfirmed}
                    </td>
                    <td className='list-span country-list__recovered'>
                      {item.TotalRecovered}
                    </td>
                  </tr>
                ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Landing;
