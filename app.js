const puppeteer = require("puppeteer");

(async()=>{


const movieUrl  = "https://www.smashwords.com/profile/view/Funsoodesola";
const browser = await puppeteer.launch();
const page = await browser.newPage()
await page.goto(movieUrl, {waitUntil: "networkidle2"});

let data = await page.evaluate(()=>{
    let images = document.querySelectorAll('div[class="library-book row p-2"] > div > a img');
    let titles = document.querySelectorAll('div[class="library-book row p-2"] div[class = "text col-md-10"] >a')
    const urls = Array.from(images).map((v)=>v.src);
    const names = Array.from(titles).map((v)=>v.innerHTML);
    let modifiedData = urls.map((data, index)=>{
            console.log(index);
            return {image: data, title: names[index]}
    })
    return modifiedData;
})

// await page.screenshot({path: "screenshot.png"})
console.log(data);

// debugger;
await browser.close();

})()