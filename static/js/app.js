// Import data from data.js and store its table body
var tableData = data;

// Store table body as variable
var tbody = d3.select("tbody");

// Display data.js data in console
console.log(tableData);

// Store data column names in an array
var dataColumns = ["datetime" , "city" , "state" , "country" , "shape" , "durationMinutes" , "comments"];

// Define function to append each row of the data to the webpage table
function loadData(){
    tableData.forEach(sighting => {
        var row = tbody.append("tr");
        dataColumns.forEach(column => {
            row.append("td").text(sighting[column]); 
        });
    });
};

// Load data into screen table
loadData();

// Store references to user input fields by their ids 
var inputDate = d3.select("#datetime")
var inputCity = d3.select("#city")
var inputState = d3.select("#state")
var inputCountry = d3.select("#country")
var inputShape = d3.select("#shape")

// Store reference to the Filter Table button by its id
var filterTable = d3.select("#filter-btn")

// Store reference to the Reset Table button by its id
var resetTable = d3.select("#reset-btn")

// Define function to filter the data to display based on user criteria
function filterData(){

    // Don't allow page refresh
    d3.event.preventDefault()

    // Store user inputs as variables
    var userDate = inputDate.property("value")
    var userCity = inputCity.property("value")
    var userState = inputState.property("value")
    var userCounty = inputCountry.property("value")
    var userShape = inputShape.property("value")

    // Filter the data according to user inputs and store results in a variable
    var filteredData = tableData.filter(filterBy => {
       return ((filterBy.datetime === userDate || userDate == "" ) &&
                (filterBy.city === userCity || userCity == "") &&
                (filterBy.state === userState || userState == "") &&
                (filterBy.country === userCounty || userCounty == "") &&
                (filterBy.shape === userShape || userShape == "")
            )
    })

    // Display filtered data in console
    console.log(filteredData);

    // Clear the table 
    tbody.text("");

    // Repopulate table with user filtered data    
    filteredData.forEach(sighting => {
        var row = tbody.append("tr")
        dataColumns.forEach(column => {
            row.append("td").text(sighting[column])    
        })
    })
}
// Run filterData function when user clicks Filter Table button
filterTable.on("click", filterData);

// Define function to re-display original full dataset in table 
function resetData(){
    tbody.text("")
    loadData()
    }
    
// Run resetData function when user clicks Reset Table button
resetTable.on("click", resetData);