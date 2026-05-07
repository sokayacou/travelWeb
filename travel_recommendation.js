const div2 = document.getElementById('home_page');
const div1 = document.getElementById('home_bg');
const container_result = document.createElement('div');
container_result.className = 'container';
var data_list = [];
async function resultSearch(){

    try{
        const response = await fetch('./travel_recommendation_api.json');

        if(!response.ok){
            throw new Error(`Error HTTP! Status :  ${response.status}`);
        }

        const data = await response.json();

        data_list = [...data.beaches, 
            ...data.countries.flatMap(c => c.cities), 
            ...data.temples,
            ]
        let data_filter = []
        
        const word_search = document.getElementById('search').value.toLowerCase();
        if(word_search === ''){
            alert('Enter a word , please');
        }else{
            container_result.innerHTML = '';
            const home2 = document.getElementById('home_2');
            if(home2){
                home2.innerHTML = '';
                home2.style.cssText = `
                    gap : 0;
                    margin:0;
                    padding:0;
                `
            }

            social_medias_div = document.querySelector('.social_medias');
            social_medias_div.style.cssText = `
                margin-top : 0px;
                float : top;
                `;

            const div_seach = document.createElement('div');
            div_seach.setAttribute('class', 'result');
            container_result.innerHTML = `<h1 style = 'color:orangered; font-style:bold; padding:10px;'>Search Results</h1>`;

            if(word_search === 'beaches' || word_search === 'beach'){
                data_filter = data.beaches;
            }
            else if(word_search === 'temples' || word_search === 'temple'){
                data_filter = data.temples;
            }
            else if(['countries','country','cities','city'].includes(word_search)){
                data_filter = data.countries.flatMap(c => c.cities);
            }
            else{ 
                data_filter = data_list.filter(item => item.name.toLowerCase().includes(word_search));
            }
            if(data_filter.length === 0){
                div_seach.innerHTML = '<h4 > No Results found</h4>';
            }
            data_filter.forEach(d => {
                    const div_item = document.createElement('div');
                    div_item.setAttribute('class', 'item');
                    div_item.innerHTML = `<img src = ${d.imageUrl} style = 'height : 5cm; width:auto;' />
                        <h2 style ='color :black; font-style : bold;' >${d.name}</h2>
                        <p style= 'color:black;'>${d.description}</p>`;
                    div_item.style.cssText = `
                        display: flex;
                        flex-flow: column nowrap;
                        height : 8cm;
                        border : 1px solid white;
                        border-radius : 6px;
                        background-color : white ;
                        justify-content : start;
                    `
                    div_seach.appendChild(div_item); 
                });
            container_result.appendChild(div_seach);
            div2.appendChild(container_result);
        }
    }catch(error){
        alert("Impossible de charger le fichier :",error);

        }
    return;
}

function reset_page(){
    location.reload();   
}
document.getElementById('searchBtn').addEventListener('click',resultSearch);
document.getElementById('resetBtn').addEventListener('click', reset_page);