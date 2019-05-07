const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

// search states.json and filter it

const searchState = async searchText =>{
    const res = await fetch('../data/states.json');
    const states = await res.json();

    // get matches to current text input
    let matches = states.filter(state =>{
        const regex =  new RegExp(`^${searchText}`,'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    //condition if input empty return empty []
    if(searchText.length ===0){
        matches = [];
        matchList.innerHTML = '';
    }
    
    //show results in HTML
    const ouptutHTML = matches =>{
        if (matches.length > 0) {
            const html = matches.map(match =>`
            <div class="">
            <h4>${match.name} (${match.abbr})  <span class="">${match.capital}</span> </h4>
            <h3>Lat: ${match.lat} / Long: ${match.long}</h3>
            </div>
            `).join('');

            matchList.innerHTML = html;
        }
    }
    ouptutHTML(matches);
    
};

search.addEventListener('input', ()=> {
    searchState(search.value)
   }
);