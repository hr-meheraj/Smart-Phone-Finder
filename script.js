const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('input').value;
  const detailsContainer = document.querySelector('.details');
  const resultContainer = document.querySelector('.result');
  resultContainer.textContent = '';
  detailsContainer.textContent = '';
  const textLowerCase = inputValue.toLowerCase();
  const url = `https://openapi.programming-hero.com/api/phones?search=${textLowerCase}`;
  if (inputValue) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => getData(data?.data));
  }
});

const getData = (data) => {
  const resultContainer = document.querySelector('.result');
  if (data.length >= 1) {
    data.forEach((eachData, index) => {
      //brand,phone_name, slug,image
      const { brand, phone_name, slug, image } = eachData;
      const div = document.createElement('div');
      div.innerHTML = `
        <div class='p-4 shadow-lg rounded m-4 flex'>
          <div class='w-6/12'> 
            <img src='${image}' class='full p-2 rounded-lg'/>  
          </div> 
          <div class='w-6/12'>
             <h2 class='text-center font-xl font-semibold'> ${phone_name} (${index})</h2>
             <div class='flex justify-around'> 
               <span> Brand : <bold> ${brand} </bold><span>
               <button onclick="getDetails('${slug}')"class='bg-blue-400 py-2 px-4'>View More </button>
             </div>
          </div>    
        </div>
       
       `;
      resultContainer.appendChild(div);
    });
  } else {
    resultContainer.innerHTML = 'Data is not found';
  }
  document.querySelector('input').value = '';
};

const getDetails = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getDetailsData(data.data));
};

const getDetailsData = (data) => {
  const details = document.querySelector('.details');
  details.textContent = '';
  console.log(data);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class='m-4'>
    
  <h2 class='text-2xl'> ${data.name} </h2> 
  </div>
  
  `;

  details.appendChild(div);
};
