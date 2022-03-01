console.clear();

// Initialize Work
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

// Displaying All products on UI
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
          <div class='w-6/12 py-[40px]'>
             <h2 class='text-center font-xl font-semibold'> ${phone_name}</h2>
             <div class='flex justify-around'> 
               <span> Brand : <bold> ${brand} </bold><span>
               <button onclick="getDetails('${slug}')"class='bg-pink-600 py-2 px-4 rounded-md text-white transition-all hover:bg-pink-700'>View Details </button>
             </div>
          </div>    
        </div>
       
       `;
      resultContainer.appendChild(div);
    });
  } else {
    resultContainer.innerHTML = `
    <img src='https://cdn0.iconfinder.com/data/icons/interface-1-5/200/Page-not-found-1-512.png' class='w-10/12 auto'/>
    `;
  }
  document.querySelector('input').value = '';
};

// Product Details Fetch
const getDetails = (slug) => {
  const hidden = document.querySelector('.hidden');
  hidden.classList.remove('hidden');
  hidden.classList.add('bottom-10');
  hidden.classList.add('block');
  setTimeout(() => {
    hidden.classList.remove('block');
    hidden.classList.add('hidden');
  }, 500);
  window.location.href = '#';
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getDetailsData(data.data));
};

// Function for Details Data By cliking details button on product
const getDetailsData = (data) => {
  const details = document.querySelector('.details');
  details.textContent = '';
  const { image, name, releaseDate, brand, mainFeatures, others } = data;
  console.log(mainFeatures, others);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class='md:flex m-4 shadow-lg p-4'>
      <div class='w-full md:w-8/12 mt-2' >
        <h2 class='text-2xl font-[poppins]'> ${name} </h2> 
        <h3 class='font-[poppins] text-xl'> Main Features</h3>
        <p> Release on ${releaseDate} </p>
        <p><span class='font-[poppins]'> Memory :  </span> ${mainFeatures.storage} </p>
        <p> <span class='font-[poppins]'>Display Size : </span> ${mainFeatures.displaySize} </p>
        <p> <span class='font-[poppins]'>Chip Set : </span> ${mainFeatures.chipSet} </p>
        <p> <span class='font-[poppins]'>Memory : </span> ${mainFeatures.memory} </p>
        <h3 class='font-[poppins] text-xl mt-4'> Other Features</h3>
        <ul> 
            <li> <span class='font-[poppins]'>GPS : </span> ${others.GPS}</li>
            <li> <span class='font-[poppins]'>WLAN : </span> ${others.WLAN}</li>
        </ul>
      </div>
      <div class='w-full mt-4 md:w-4/12'> 
        <img src='${image}'/>
        <p class='mt-2'> Powered by <span class='font-[poppins]'>${brand}</span> </p>
      </div>
  </div>
  
  `;
  details.appendChild(div);
};

// Dark Mode Button not toggling - just added in ui
const darkMode = () => {
  const darkBtn = document.querySelector('.dark-btn');
  const text = darkBtn.querySelector('span');
  if (!(text.innerHTML = 'nightlight')) {
    text.innerHTML = 'nightlight';
  } else {
    text.innerHTML = 'light_mode';
  }
};

// custom console-----------------------
console.log(
  '%c Welcome to Hr Meheraj Website Console',
  'background:pink;color:black;padding:5px 10px; font-size:18px;border-radius:20px;'
);
