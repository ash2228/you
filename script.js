function displayWords(words) {
    var outputElement = document.getElementById("output");
    
    function displayWord(index) {
        if (index < words.length) {
            setTimeout(function () {
                outputElement.innerHTML += words[index] + " ";
                displayWord(index + 1);
            }, 400); // Adjust the delay here (1 second in this case)
        }
    }

    // Start displaying words when the page loads
    displayWord(0);
}

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Perform reverse geocoding using the OpenCage Geocoding API
        fetch(`https://api.opencagedata.com/geocode/v1/json?key=244ea11b19f3435e9216fe6ed5b19238&q=${latitude}+${longitude}`)
        .then(response => response.json())
        .then(data => {
            var city;
            if (data.results && data.results.length > 0) {
                city = data.results[0].components.city || data.results[0].components.town;
            } else {
                city = "City information not available.";
            }

            // Display the location information
            var locationElement = document.getElementById("location");

            // Display the city name
            var cityElement = document.getElementById("city");

            // Once you have the city value, update the words array
            var words = ["Your", "Location", "is", city,"<br>Seats", "In","Nearby","Hospitals", "are:","<br>All India Institute of Medical Sciences (AIIMS):56","<br>Apollo Hospital:24","<br>Fortis Hospital:45","<br>Max Super Speciality Hospital:10","<br>Sir Ganga Ram Hospital:0"];
            
            // Call the displayWords function with the updated words array
            displayWords(words);
        })
        .catch(error => {
            var cityElement = document.getElementById("city");
            cityElement.textContent = "Error fetching city information.";
        });
    });
} else {
    var cityElement = document.getElementById("city");
    cityElement.textContent = "Geolocation is not available in this browser.";
}
