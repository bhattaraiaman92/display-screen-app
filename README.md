# easyJet Display Screen Hosting

Hi there,

This application leverages the ThoughtSpot SDK along with JavaScript and CSS to create a simple interface for displaying a ThoughtSpot Liveboard in full-screen mode within the customer.

You can modify the script to adjust the refresh interval based on your requirements. It will automatically refresh the page to fetch the latest data from the Liveboard.

For deployment, you can either use third-party services like Vercel or host the code on your internal platform to take it further into production.

Please note that this project is developed as a side initiative and is not officially supported by ThoughtSpot. However, if you have any questions or need modifications, feel free to reach out to Aman Bhattarai at [aman.bhattarai@thoughtspot.com]. Alternatively, you are welcome to clone the repository and customize the script as needed.

How to change the frequency of refresh?

Within the Dashboard.js file you will find this code:

    // Set interval to refresh every X minutes (time in ms)
    const intervalId = setInterval(refreshLiveboard, 1800000);

1800000 ms [milliseconds] is equal to 30 minutes. If you want to refresh this with 60 minutes, just edit it accordingly and publish the code.
