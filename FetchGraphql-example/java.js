const contSelect = document.getElementById('continent-select')
const countryList = document.getElementById('countries-list')


        queryFetch( `
        query {
            continents {
              name
              code  
            }
          }
        `).then(data => {
    data.data.continents.forEach(continent => {
        const option = document.createElement('option')
        option.value = continent.code
        option.innerText = continent.name
        contSelect.append(option)
    })
})

contSelect.addEventListener('change', async e => {
   const countCode =  e.target.value
   const countries = await  getContinentCountries(countCode)
   console.log(countries)
   countryList.innerHTML = ''
   countries.forEach(country => {
    const element = document.createElement('div')
    element.innerText = country.name
    countryList.append(element)
   })
})

function getContinentCountries(countCode)
{
  return  queryFetch(`
    query getCountries($code: ID!) {
        continent(code: $code) {
          countries {
            name
          }
        }
      }
    
    `, {code: countCode }).then(data => {
        return data.data.continent.countries
    })
}


function queryFetch(query, variables) {
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query,
            variables: variables
            
        })
    }).then(res => res.json())
}