[![NPM](https://nodei.co/npm/weatherterm.png)](https://nodei.co/npm/weatherterm/)

# About

Weatherterm is a simple cli client to get the weather for your location. Once installed all you have to do is enter `weather` in your terminal and the information will be printed.

# Installation

`npm i -g weatherterm`

# Features

1. Display the following for your current location
- Temperature
- Wind Speed
- Humidity 
- Condition (Raining, Cloudy, etc)

2. The above fields for a specified zip code. To specify a zip code just enter `weather <ZIP CODE>` (Note: You must be in the same country that the zip code specifies or the lookup will fail). For Example:

`weather 10108`



More to come!! If you have a specific feature request just let me know in the issues page

# Future Development/Notes

Right now I use the Open Weather Map API to get the information. They provide png file names in their response and I want to get these to be displayed in the body as well. Additionally, other options such as getting weather for the week, or specifiying another location are also in the works.

If the arrow characters are not displayed correctly in your terminal you may need to switch the font you are using. A setup I know works is to use iTerm2 with a font from https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts

I personally use DroidSansMono font. Just download and install which ever font you want though and set it as the default font for your terminal and you should be good to go. If you have any problems with it just post an issue.

# Contributions

Feel free to send PRs or make issues in the repo. Enjoy

![alt Image showing example use of weather tool](https://raw.githubusercontent.com/sbernheim4/weatherterm/master/images/Example.png)
