const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultContainer = document.getElementById('result-container');


searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const word = searchInput.value;
  if (word) {
    searchDictionary(word);
  }
});

function searchDictionary(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
 
  fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      if (data.length > 0) {
        

        const apiResponse = {
          deff: data[0].meanings[0],
        };
        displayResult(apiResponse);
      } else {
        displayError('No results found.');
      }
    })
    .catch(error => {
      displayError('An error occurred. Please try again.');
      console.error(error);
    });
}

function displayResult(result) {
  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `
    <p><strong>Definition:</strong> ${result.deff.definitions[0].definition}</p>
    <p><strong>Example:</strong> ${result.deff.definitions[0].example}</p>
    <p><strong>Synonyms:</strong> ${result.deff.synonyms[0]}</p>
    <p><strong>Antonyms:</strong> ${result.deff.antonyms[0]}</p>

  `;


}

function displayError(message) {
  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `<p id="error-message">${message}</p>`;
}
