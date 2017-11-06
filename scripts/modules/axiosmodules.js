import axios from 'axios';

const fetchAllCountries = () =>axios.get('https://restcountries.eu/rest/v2/all');

const getCountriesByFields = (fields) =>axios.get('https://restcountries.eu/rest/v2/all?fields='+fields.join(';'));

const getCountryByFields = (fields, countryName) =>axios.get('https://restcountries.eu/rest/v2/name/'+countryName+'?fields='+fields.join(';'));

module.exports ={getCountriesByFields, getCountryByFields, fetchAllCountries}