// Doc ready funct
$(document).ready(function () {
  // quotesApi(); // load quotes carousel (trying something that i didn't like?)
  tutorialsApi(); // load tutorial videos carousel
  latestVids(); //load latest vids carousel
})

// Task one - Quotes

function createQuoteSlide(quote) {
  const { pic_url, name, title, text } = quote;

  const slide = $('<div>').addClass('carousel-item');
  const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(slide);
  const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').appendTo(row);
  const img = $('<img>').attr({
    'src': pic_url,
    'alt': 'Carousel Pic'
  }).addClass('d-block align-self-center').appendTo(imgCol);
  const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').appendTo(row);
  const quoteText = $('<div>').addClass('quote-text').appendTo(textCol);
  const p = $('<p>').addClass('text-white').text(text).appendTo(quoteText);
  const h4 = $('<h4>').addClass('text-white font-weight-bold').text(name).appendTo(quoteText);
  const span = $('<span>').addClass('text-white').text(title).appendTo(quoteText);

  return slide;
}

$(document).ready(function () {
  const carouselQuotes = $('.carousel-quotes');
  const loader = $('.loader');

  loader.show();

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    type: 'GET',
    success: function (quotes) {
      loader.hide();
      carouselQuotes.empty();

      $.each(quotes, function (index, quote) {
        const slide = createQuoteSlide(quote);
        if (index === 0) {
          slide.addClass('active');
        }
        carouselQuotes.append(slide);
      });
    },
    error: function (error) {
      loader.hide();
      console.error('Error:', error);
    }
  });
});

// Task two - Popular tutorials

function tutorialsApi() {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    type: 'GET',
    success: function(data) {
      let cards = '';
      data.forEach((item, index) => {
        $('#tuts').append(`
          <div class="h-100 col-12 col-sm-6 col-md-4 card-deck">
            <div class="card border-0 d-flex flex-column">

              <div class="card-img-top">
                <img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
                <img src="images/play.png" alt="Play Button" class="play-button">
              </div>

              <div class="card-body px-2">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item['sub-title']}</p>
              </div>

              <class='card-footer' style="flex:1;">
                <div class="row">
                  <img src="${item.author_pic_url}" alt="tiny profile" style="height: 20px;" class="ml-4 mr-3 rounded-circle">
                  <h6 class="purple">${item.author}</h6>
                </div>
                <div class="row ml-2 mr-0">
                ${(function stars() {
                  let stars = '';
                  for (let i = 1; i <= 5; i++)
                  {
                    if (i < item.star) {
                      stars += `<img src="./images/star_on.png" height="15px" width="15px">`
                    } else {
                      stars += `<img src="./images/star_off.png" height="15px" width="15px">`
                    }
                  }
                  return stars;
                })
                ()}
                <p class='ml-auto mr-3 purple'>${item.duration}</p>
              </div>
            </div>
          </div>
          `);
      });
      $('#tuts').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    },
    error: function (error) {
      loader.hide();
      console.error('Error:', error);
    }
  });
};

// slick carousel

  // $('.multiple-items').slick({
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1
  // });

// Task two - Popular tutorials

function latestVids() {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/latest-videos',
    type: 'GET',
    success: function(data) {
      let cards = '';
      data.forEach((item, index) => {
        $('#latest').append(`
          <div class="h-100 col-12 col-sm-6 col-md-4 card-deck">
            <div class="card border-0 d-flex flex-column">

              <div class="card-img-top">
                <img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
                <img src="images/play.png" alt="Play Button" class="play-button">
              </div>

              <div class="card-body px-2">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item['sub-title']}</p>
              </div>

              <class='card-footer' style="flex:1;">
                <div class="row">
                  <img src="${item.author_pic_url}" alt="tiny profile" style="height: 20px;" class="ml-4 mr-3 rounded-circle">
                  <h6 class="purple">${item.author}</h6>
                </div>
                <div class="row ml-2 mr-0">
                ${(function stars() {
                  let stars = '';
                  for (let i = 1; i <= 5; i++)
                  {
                    if (i < item.star) {
                      stars += `<img src="./images/star_on.png" height="15px" width="15px">`
                    } else {
                      stars += `<img src="./images/star_off.png" height="15px" width="15px">`
                    }
                  }
                  return stars;
                })
                ()}
                <p class='ml-auto mr-3 purple'>${item.duration}</p>
              </div>
            </div>
          </div>
          `);
      });
      $('#latest').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    },
    error: function (error) {
      loader.hide();
      console.error('Error:', error);
    }
  });
};