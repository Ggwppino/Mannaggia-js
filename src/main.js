class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `Select ?saint ?nome ?sesso
Where{
  ?saint wdt:P411 wd:Q3464126.
  ?saint wdt:P19 ?citta.
  ?citta wdt:P17 wd:Q38.
  ?saint rdfs:label ?nome.
  ?saint wdt:P21 ?gender.
  ?gender rdfs:label ?sesso.
  FILTER(LANG(?nome) = "it")
  FILTER(LANG(?sesso) = "en")
}`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
let data = [];

casa = queryDispatcher.query( sparqlQuery );

console.log(casa);
