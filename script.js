// -----------------------------User Birthday and Zodiac Sign -----------------------------------
let day = $("#day")
let month = $("#month")
let dayValue = day.val()
let monthValue = month.val()

const signs =[{
    sign: "Aries",
    startDate: "03/21",
    endDate: "04/20"
},
    {sign: "Taurus",
    startDate: "04/20",
    endDate: "05/20"
},
    {sign: "Gemini",
    startDate: "05/21",
    endDate: "06/20"
},
    {sign: "Cancer",
    startDate: "06/21",
    endDate: "07/22"
},
    {sign: "Leo",
    startDate: "07/23",
    endDate: "08/22"
},
    {sign: "Virgo",
    startDate: "08/23",
    endDate: "09/22"
},
    {sign: "Libra",
    startDate: "09/23",
    endDate: "10/22"
},
    {sign: "Scorpio",
    startDate: "10/23",
    endDate: "11/21"
},
    {sign: "Sagittarius",
    startDate: "11/22",
    endDate: "12/21"
},
    {sign: "Capricorn",
    startDate: "12/22",
    endDate: "12/31"
},
    {sign: "Capricorn",
    startDate: "01/01",
    endDate: "01/19"
},
    {sign: "Aquarius",
    startDate: "01/20",
    endDate: "02/18"
},
    {sign: "Pisces",
    startDate: "02/19",
    endDate: "03/20"
}];

$(day).on("change", function(){
    dayValue=this.value;
    console.log(dayValue);
    //if dayValue is not not a number (is a number) and monthValue is not not a number then 
    if (!isNaN(dayValue) && !isNaN(monthValue)) {
        let sign=signFinder(dayValue, monthValue)
        }
})

$(month).on("change", function(){
    monthValue=this.value;
    console.log(monthValue)
    if (!isNaN(dayValue) && !isNaN(monthValue)) {
    let sign=signFinder(dayValue, monthValue)
    }
})

let signFinder = function (day, month) {
    let monthDay = `${month}/${day}`
    let starSign;
    for (let i=0; i<signs.length; i++) {
        if (signs[i].startDate<= monthDay && monthDay <= signs[i].endDate) {
            starSign=signs[i].sign
            console.log(`Sign ${signs[i].sign}`)
            break;
        }} console.log(starSign);
        
        if(starSign){
             $.ajax({
            type:'POST',
            url:`https://aztro.sameerkumar.website?sign=${starSign}&day=today`,
            success:function(data){
            console.log(data);
            }
            
            }).then(function (data) {
            $("#star-sign").text(`${starSign} (${data.date_range})`);
            $("#description").text(`${data.description}`);
            $("#compatibility").text(`You may experience increased compatibility with ${data.compatibility} signs`);
            $("#mood").text(`You may be feeling ${data.mood} today`);
            $("#color").text(`Color: ${data.color}`);
       })
    }   

// ------------------------- NASA Pic/Video of the day - NH -------------------------------------------

// -------------------convert birthdate for Query URL.------------
var urlDate = moment(monthDay, "MM/DD").format("MM-DD");
var queryURL = "https://api.nasa.gov/planetary/apod?api_key=dS2HzlrfOwnYcGBTKbyf8Vz1QzgxwCbH2dLQ1uJ5&date=2018-" + urlDate

//---------------- API pull.--------------------
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

//-------------- Checking to see what the media type is-------------
    var media = response.media_type

//--------------------Show cards and Hide dropdowns-------------------
$(".card").removeClass("hidden");

// ---------------in case date pulls video.-----------------------------------
if (media != "image") {
// ------------------Populating card,----------------------
  $(".vid").text("Your 'Picture of the Day' is actually a video.   Please click the link below to watch.");
  $("#bDayImg").attr("src","");
  $("#imgLink").text("Click here to watch video"); 
  $("#imgLink").attr("href", response.url); 
} else {  
  $("#bDayImg").attr("src", response.url);

// -------------function opens link in new tab-------------------------------
  $("a.pop").click(function() {
    window.open(this.href);
    return false;
  });
  $("#imgLink").attr("href", response.url); 
}
  $(".card-title2").text(response.title); 
  $(".card-content2").text(response.explanation);
  $(".card-content2").text(response.explanation);  
});

//make a .then call to get the description from the returned ajax call and populate a corresponding html div class///id
    
// ------------------------ Wikipedia Born on This Day - LA --------------------------------------

// append variables to Wikipedia queryURL search 
    var queryURLWikipedia = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/" + monthDay;

// check queryURL
    console.log(queryURLWikipedia);

// return response object data to card
    $.ajax({
        url: queryURLWikipedia,
        method: "GET"
    }).then(function(Wikipediaresponse) {
        console.log(Wikipediaresponse); 
    // card text
        let cardText = Wikipediaresponse.births[75].text;
        console.log(cardText);
        $("#text").text(cardText);
    // card year
        let cardYear = Wikipediaresponse.births[75].year;
        console.log(cardYear);
        $("#year1").text(cardYear);
    // card image 
        if (Wikipediaresponse.births[75].pages[0].originalimage) {
            let cardThumbnail = Wikipediaresponse.births[75].pages[0].originalimage.source;
            console.log(cardThumbnail);
            $("#thumbnail1").attr("src" , cardThumbnail);  
        } else { // error image and message if there is no image on wikipedia. test using 08/07 (august 7)
            console.log("No Wikipedia image!"); 
            $("#thumbnail1").attr("src", "assets/giraffe-error-meme.jpeg");
            //$("#photoError").text("Your birthday buddy does not have an image on their Wikipedia page. Please enjoy these giraffes instead!")
        };
    // card more info button
        $("#h2").text(`Born on this day in ${cardYear}`)
        let cardMoreInfo = Wikipediaresponse.births[75].pages[0].content_urls.desktop.page;
        console.log(cardMoreInfo);
        $("#moreInfo").attr("href", cardMoreInfo);

    }); // end ajax call

// ---------------------------------- Horoscope ----------------------------------------------
         
}

