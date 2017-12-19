let currentPageStudents = [];
let currentPage = 1;
let pageLength = 10;
let students = $('.student-list').children();
let numberOfPages = Math.ceil(students.length / 10);

function removeStudents() {
    $('.student-item').hide();
}

function errorMessage() {
    let errorMessage = "";
    errorMessage = $('.page h2').append('<p>Sorry, no students found.</p');
}

/*
Function to hide students and then show first 10 on document load.
*/
$( document ).ready(function() {
    console.log(students)
    console.log(numberOfPages)
    removeStudents();
    for (let i = 0; i < pageLength; i++) {
        let start = pageLength * (currentPage - 1);
        $('.student-item').slice(start, pageLength).show();
    }
});

// Add html and buttons to page dynamically. adding active class to active button. 
// Append search bar to header on doc load.

function appendPageLinks() {
    $('.pagination').append('<ul></ul>');
    for (let i = 1; i < numberOfPages + 1; i++) {
        $( ".pagination > ul" ).append('<li><a href="#" class="btn">'+[i]+'</a><li>');
    };
    $('.pagination ul li a').click(function(){
        $(".pagination ul li a").removeClass();
        $(this).addClass("active");
    });
    $('.page-header').append('<div class="student-search"><input class="searchInput" type="text" placeholder = "Search for students..."</div>');
    $('.student-search').append('<button class="searchBtn">Search</button>');
};
//calling the function
appendPageLinks();

// button click event. first hide all student-items. then set target as 
// a clicked buttons number. the math formula starts each page at the correct
// student index. then loop through the ten students to show on each page and 
// turn their display on.

$('.btn').on('click', function(event) {
    removeStudents();    
    let target = parseInt($(event.target).text())
    let start = pageLength * (target - 1);    
    for (let i = start; i < (start +10); i++) {
        console.log(i);
        $('.student-item').eq(i).show();
    }
});
var count = 0 
$(".searchInput").on('keyup', function(event) {
    removeStudents(); 
    let search;
    let result;
    search = $(this).val().toLowerCase();
    console.log(search);
    result = $('.student-list').find("h3:contains("+ search +")").parent().parent().show();
    console.log(result);
    if ( result.length === 0) {
        if (count != 1 ){
        count = 1
        $('.student-list').append('<p class="studentOff">No Stuents Match Your Search</p>');
        }
     }
        else {
            $('.studentOff').hide();
        }
    
}); 
