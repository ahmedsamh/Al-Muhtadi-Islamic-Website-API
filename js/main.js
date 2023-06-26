let exploreBtn = document.querySelector('.title .btn'),
hadithSection =document.querySelector('.hadith');
exploreBtn.addEventListener('click' , ()=>{
    hadithSection.scrollIntoView({
        behavior : "smooth"
    })
})


let fixedNav = document.querySelector('.header');
let scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active')
})
scrollBtn.addEventListener('click', ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})


/// hadith
let hadithContainer = document.querySelector('.hadithContainer'),
next = document.querySelector('.buttons .next'),
prev = document.querySelector('.buttons .prev'),
number = document.querySelector('.buttons .number');
let hadithIndex = 299;   

HadithChanger();
function HadithChanger(){
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
    .then(response => response.json())
    .then(data =>{
        let hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener('click', ()=>{
            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            changeHadith();
        })
        prev.addEventListener('click', ()=>{
            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            changeHadith();
        })
        function changeHadith(){
            hadithContainer.innerHTML = hadiths[hadithIndex].arab;
            number.innerHTML = `300 - ${hadithIndex + 1}`
        }
        
    })
}

// link sections 
let sections = document.querySelectorAll("section"),
links = document.querySelectorAll(".header ul li");
links.forEach(link =>{
    link.addEventListener('click' , ()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section =>{
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    })
})

///surah api
let SurahsContainer = document.querySelector('.surhasContainer');
getSurahs()
function getSurahs(){
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data =>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        for(let i = 0 ; i< numberOfSurahs ; i++){
            SurahsContainer.innerHTML +=
            `
            <div class="surah">
            <p>${surahs[i].name}</p>
            <p>${surahs[i].englishName}</p>
        </div>
            `
        }
        let SurahsTitles = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup');
        let opacity = document.querySelector('.opacity');
        AyatContainer = document.querySelector('.ayat');
        SurahsTitles.forEach((title , index)=>{
            title.addEventListener('click', ()=>{
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(response => response.json())
                .then(data=>{
                    AyatContainer.innerHTML = "";
                    let Ayat = data.data.ayahs;
                    Ayat.forEach(aya=>{
                        popup.classList.add('active');
                        opacity.classList.add('active');
                        AyatContainer.innerHTML +=`
                        <p>(${aya.numberInSurah}) - (${aya.text}) </p>
                        `
                    })
                })
            })
        })
        let closePopup = document.querySelector('.close-popup');
        closePopup.addEventListener('click', ()=>{
            popup.classList.remove('active');
            opacity.classList.remove('active');
        })
    })
}

let play = document.querySelector('.player .btn2');
let  playerApp = document.querySelector('.player1');

let close = document.querySelector('.player1 .wrapper .close ');

play.addEventListener('click', ()=>{
    playerApp.classList.add('active');
})

close.addEventListener('click', ()=>{
    playerApp.classList.remove('active');
})


// praytime
let ara = ["الفجر", "وقت الشروق", "الظهر", "العصر", "وقت الغروب", "المغرب", "العشاء", "وقت الامساك", "منتصف الليلة", "الثلث الأول", "الثلث الأخير"];
let cards = document.querySelector('.cards');
getPrayTimes();

function getPrayTimes() {
  fetch("https://api.aladhan.com/v1/timingsByCity?city=assuit&country=egypt&method=8")
    .then(response => response.json())
    .then(data => {
      let times = data.data.timings;
      cards.innerHTML = "";

      let index = 0; // Initialize index variable outside the loop

      for (let time in times) {
        cards.innerHTML +=
          `
        <div class="card">
          <div class="circle">
            <svg>
              <circle cx="100" cy="100" r="100"></circle>
            </svg>
            <div class="praytime">${times[time]}</div>
          </div>
          <p>${time}</p>
          <p>${ara[index]}</p>
        </div>
        `;

        index++; // Increment index after each iteration
      }
    })
}

// active sidebar
let bars = document.querySelector('.bars'),
sideBar = document.querySelector('.header ul');
bars.addEventListener('click' , ()=>{
    sideBar.classList.toggle("active")
})