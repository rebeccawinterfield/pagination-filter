//define variables
let currentPage = 1;
let pageLength = 10;
let count = 0 
let students = $('.student-list').children();
let numberOfPages = Math.ceil(students.length / 10);
//append student search bar and button
$('.page-header').append('<div class="student-search"><input class="searchInput" type="text" placeholder = "Search for students..."</div>');
$('.student-search').append('<button class="searchBtn">Search</button>');
//append page buttons to pagination div at bottom of page
function appendPageLinks() {
    $('.pagination').append('<ul></ul>');
    for (let i = 1; i < numberOfPages + 1; i++) {
        $( ".pagination > ul" ).append('<li><a href="#" class="btn">'+[i]+'</a><li>');
    };
};
//call the function to add page buttons
appendPageLinks();

//create functions to be used repeatedly
    //hide the students
function removeStudents() {
    $('.student-item').hide();
}

    //reveal an error message beneath the h2 when no students match search
function errorMessage() {
    let errorMessage = "";
    errorMessage = $('.page h2').append('<p>Sorry, no students found.</p');
}

    //add correct students to page and paginate
function addStudents(){
    let start = pageLength * (currentPage - 1);    
    for (let i = start; i < (start +10); i++) {
        console.log(i);
        $('.student-item').eq(i).show();
    }
}

//when document loads remove full list of students and call add students/paginate function
$( document ).ready(function() {
    removeStudents();
    addStudents();
});

// button click event. first remove active class and add it to the clicked button.
// then remove students from page, and add students to the page corresponding to 
// what button was clicked by checking the text of the button and converting it to a 
//number
$('.btn').on('click', function(event) {
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
    removeStudents();    
    currentPage = parseInt($(event.target).text())
    addStudents()
});

//Event listener for searching using the keyup event handler, listenes for each letter input
//searches the student list for corresponding students and dynamically shows the found students
//the search buttons are removed. If no students are found the 'no student found' message appears
//if the textinput is empty the students are removed and the pagination buttons and correct
//students are shown.
$(".searchInput").on('keyup', function(event) {
    removeStudents(); 
    $('.pagination').hide();
    let search;
    let result;
    search = $(this).val().toLowerCase();
    result = $('.student-list').find("h3:contains("+ search +")").parent().parent().show();
    if(search === '' ){
        removeStudents();
        addStudents();
        $('.pagination').show();
    } else {
    if ( result.length === 0) {
        if (count === 0 ){
        count = 1
        $('.student-list').append('<p class="studentOff">No Stuents Match Your Search</p>');
        }
     }
        else {
            $('.studentOff').hide();
            count = 0
        }
    }
}); 
