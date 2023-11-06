// Conversion factors households (per 1m^2) ref: https://ecotree.green/nl/calculate-home-co2
var house_after_elec = 20.8         // house + recent (after 1975) + electricity heating = 20.8 kg CO2 (per 1m^2)
var house_after_fuel = 62.3         // house + recent (after 1975) + fuel oil heating = 62.3 kg CO2 (per 1m^2)
var house_after_gas = 48.6          // house + recent + gas heating = 48.6 kg CO2 (per 1m^2)
var house_before_elec = 25.2        // house + old (pre 1975) + electricity heating = 25.2 kg CO2 (per 1m^2)
var house_before_fuel = 78.1        // house + old + fuel oil = 78.1 kg CO2 (per 1m^2)
var house_before_gas = 60.4         // house + old + gas = 60.4 kg CO2 (per 1m^2)
var apart_after_elec = 18.0         // apartment + recent + electricity = 18.0 kg CO2 (per 1m^2)
var apart_after_fuel = 49.7         // apartment + recent + fuel oil = 49.7 kg CO2 (per 1m^2)
var apart_after_gas = 40.8          // apartment + recent + gas = 40.8 kg CO2 (per 1m^2)
var apart_before_elec = 23.2        // apartment + old + electricity = 23.2 kg CO2 (per 1m^2)
var apart_before_fuel = 55.9        // apartment + old + fuel oil = 55.9 kg CO2 (per 1m^2)
var apart_before_gas = 54.6         // apartment + old + gas = 54.6 kg CO2 (per 1m^2)

// Average annual electricity use per household (in kWh) ref: https://www.carbonfootprint.com/docs/2019_06_emissions_factors_sources_for_2019_electricity.pdf
var elec_avg_1 = 1850 // kWh annually for 1-person household
var elec_avg_2 = 2860 // kWh annually for 2-person household
var elec_avg_3 = 3400 // kWh annually for 3-person household
var elec_avg_4 = 3930 // kWh annually for 4-person household
var elec_avg_5 = 4180 // kWh annually for 5-person household
var elec_emission = 0.4570 // electricity mission factor for Netherlands in kg CO2e/kWh

// Food conversion factor ref: https://www.rivm.nl/bibliotheek/rapporten/2016-0195.pdf page 35
var food_weight_meat = 0.25 // (kg) average daily intake for meat
var food_emission_meat = 17 // (kg CO2 eq) emission factor per kg of meat
var food_weight_dairy = 0.7 // (kg) average daily intake for dairy
var food_emission_dairy = 6 // (kg CO2 eq) emission factor per kg of dairy

// Car conversion factor ref: https://www.eea.europa.eu/data-and-maps/indicators/average-co2-emissions-from-motor-vehicles/assessment-2
var carbon_emission_diesel = 3.32 // (kg CO2) average emission per liter diesel
var carbon_emission_petrol = 2.74 // (kg CO2) average emission per liter gasoline
var carbon_emission_electric = 9.5 // (kg CO2) average emission per 100 km

// Public transport conversion factor ref: co2emissiefactoren.nl/wp-content/uploads/2017/12/Emissiecijfers-openbaar-vervoer-dec-2017.pdf
var weeks_per_year = 48 // weeks per year
var publictransport_emission = 0.0266 // (kg CO2) average per passenger km

// Plane conversion factor ref: https://www.statista.com/statistics/1113177/co2-emissions-by-airline-europe/
var plane_avg_speed = 907 // average cruising speed airplane
var plane_emission_km = 125 // (g CO2) average per passenger km

// Clothes conversion factor ref: https://www.researchgate.net/publication/276193965_Carbon_Footprint_of_Textile_and_Clothing_Products
var clothes_weight = 0.4 // (kg) average weight of piece of clothing
var clothes_emission = 14.42 // (kg CO2) average emission per kg of fabric (average of multiple fabric categories)
var clothes_quarter = 4 // quartiles per year

// Final emission scores
var emission_housing            // total CO2 emission housing category
var emission_electricity        // total CO2 emission electricity category
var emission_meat_dairy         // total CO2 emission food consumption category
var emission_car                // total CO2 emission car travel category
var emission_public_transport   // total CO2 emission public transport category
var emission_plane              // total CO2 emission plane travel category
var emission_clothes            // total CO2 emission clothing category
var emission_total              // total CO2 emission all categories

// Definining default visualization verification code
var verification_code = "..."

// SurveyJS initialization
Survey
    .StylesManager
    .applyTheme("modern");

Survey
    .Serializer
    .addProperty("page", {
        name: "navigationTitle:string",
        isLocalizable: true
    });
Survey
    .Serializer
    .addProperty("page", {
        name: "navigationDescription:string",
        isLocalizable: true
    });

// Survey JSON-object
var json = {
    "pages": [
        {
            // Landing page
            "name": "page1",
            "navigationTitle": "Introduction",
            "elements": [
                {
                    type: "html",
                    html: "<p style='text-align: center'> You are about to fill in a carbon footprint calculator questionnaire. Based on information you provide about your lifestyle (e.g. eating habits, electricity use, consumer behaviour, etc.) the calculator is able to compute your personal carbon footprint. This is an objective representation of the total amount of greenhouse gas emissions that result from and reflect your personal lifestyle. </p>" +
                        "<p style='text-align: center'><b>This webpage is displayed properly in desktop browsers only</b></p>"

                }
            ],
        }, {
            // Household emission category page
            "name": "page2",
            "navigationTitle": "Heating",
            "elements": [
                {
                    type: "dropdown",
                    name: "household_number",
                    title: "How many people live in your household (including you)?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "More"
                    ]
                }, {
                    type: "dropdown",
                    name: "household_type",
                    title: "What type of house are you living in? When is it built?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Apartment, before 1975",
                        "Apartment, after 1975",
                        "House, before 1975",
                        "House, after 1975",
                    ]
                }, {
                    type: "dropdown",
                    name: "household_heat",
                    title: "How do you heat the house?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Electricity heating",
                        "Fuel oil heating",
                        "Gas heating",
                    ]
                }, {
                    type: "bootstrapslider",
                    name: "household_size",
                    title: "What is the size of your home (in m2)?",
                    isRequired: true,
                    colCount: 0,
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 500,
                }
            ]
        }, {
            // Electricity consumption emission category page
            "name": "page3",
            "navigationTitle": "Electricity",
            "elements": [
                {
                    type: "dropdown",
                    name: "electricity_type",
                    title: "What kind of electricity do you use?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Green electricity",
                        "Grey electricity"
                    ]
                }, {
                    "type": "nouislider",
                    name: "electricity_amount_1",
                    title: "Do you think your household of 1 uses more or less electricity than average annually (in kWh)? For reference, the center value is the average annual electricity consumption (in kWh) for your household size.",
                    isRequired: true,
                    visibleIf: "{household_number}='1'",
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 2 * elec_avg_1,
                }, {
                    type: "nouislider",
                    name: "electricity_amount_2",
                    title: "Do you think your household of 2 uses more or less electricity than average annually (in kWh)? For reference, the center value is the average annual electricity consumption (in kWh) for your household size.",
                    isRequired: true,
                    visibleIf: "{household_number}='2'",
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 2 * elec_avg_2,
                }, {
                    type: "nouislider",
                    name: "electricity_amount_3",
                    title: "Do you think your household of 3 uses more or less electricity than average annually (in kWh)? For reference, the center value is the average annual electricity consumption (in kWh) for your household size.",
                    isRequired: true,
                    visibleIf: "{household_number}='3'",
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 2 * elec_avg_3,
                }, {
                    type: "nouislider",
                    name: "electricity_amount_4",
                    title: "Do you think your household of 4 uses more or less electricity than average annually (in kWh)? For reference, the center value is the average annual electricity consumption (in kWh) for your household size.",
                    isRequired: true,
                    visibleIf: "{household_number}='4'",
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 2 * elec_avg_4,
                }, {
                    type: "nouislider",
                    name: "electricity_amount_5",
                    title: "Do you think your household of more than 4 people uses more or less electricity than average annually (in kWh)? For reference, the center value is the average annual electricity consumption (in kWh) for your household size.",
                    isRequired: true,
                    visibleIf: "{household_number}='More'",
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 2 * elec_avg_5,
                }
            ]
        }, {
            // Food consumption emission category page
            "name": "page4",
            "navigationTitle": "Food",
            "elements": [
                {
                    type: "dropdown",
                    name: "food_meat",
                    title: "How often do you eat meat or fish per week?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Never",
                        "Very seldom, once per week",
                        "Seldom, twice per week",
                        "Sometimes, three times per week",
                        "Sometimes, four times per week",
                        "Regularly, five times per week",
                        "Very regularly, six times per week",
                        "Daily"
                    ]
                }, {
                    type: "dropdown",
                    name: "food_dairy",
                    title: "How often do you eat dairy products (milk, cheese, eggs...)?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Never",
                        "Very seldom, once per week",
                        "Seldom, twice per week",
                        "Sometimes, three times per week",
                        "Sometimes, four times per week",
                        "Regularly, five times per week",
                        "Very regularly, six times per week",
                        "Daily"
                    ]
                }
            ]
        }, {
            // Travel emission category page
            "name": "page5",
            "navigationTitle": "Travel",
            "elements": [
                {
                    type: "radiogroup",
                    name: "car_travel",
                    title: "Do you ever travel by car (i.e. even if you don't own one)?",
                    isRequired: true,
                    choices: [
                        "Yes",
                        "No"
                    ],
                    colCount: 0
                }, {
                    type: "bootstrapslider",
                    name: "car_distance",
                    title: "How many km do you travel by car each week?",
                    visibleIf: "{car_travel}='Yes'",
                    isRequired: true,
                    colCount: 0,
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 500
                }, {
                    type: "radiogroup",
                    name: "car_type",
                    title: "What type of car do you normally travel in?",
                    visibleIf: "{car_travel}='Yes'",
                    isRequired: true,
                    choices: [
                        "Electric", "Petrol", "Diesel"
                    ],
                    colCount: 0
                }, {
                    type: "radiogroup",
                    name: "car_share",
                    title: "Do you mostly drive alone or share a car?",
                    visibleIf: "{car_travel}='Yes'",
                    isRequired: true,
                    choices: [
                        "Alone", "Share"
                    ],
                    colCount: 0
                }, {
                    type: "bootstrapslider",
                    name: "train_distance",
                    title: "How many km do you travel by train each week?",
                    isRequired: true,
                    colCount: 0,
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 500
                }, {
                    type: "bootstrapslider",
                    name: "publictransport_distance",
                    title: "How many km do you travel by any other means of public transportation each week (e.g. bus, tram, metro)?",
                    isRequired: true,
                    colCount: 0,
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 500
                }, {
                    type: "bootstrapslider",
                    name: "plane_distance",
                    title: "How many hours do you travel by plane each year?",
                    isRequired: true,
                    colCount: 0,
                    step: 1,
                    rangeMin: 0,
                    rangeMax: 100
                }
            ]
        }, {
            // Clothing emission category page
            "name": "page6",
            "navigationTitle": "Clothing",
            "elements": [
                {
                    type: "dropdown",
                    name: "clothes_amount",
                    title: "How often do you buy clothes per quarter (i.e. 3 months)?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Less than 1 piece per quarter",
                        "1 piece per quarter",
                        "2 pieces per quarter",
                        "3 pieces per quarter",
                        "4 pieces per quarter",
                        "5 pieces per quarter",
                        "6 pieces per quarter",
                        "7 pieces per quarter",
                        "8 pieces per quarter",
                        "9 pieces per quarter",
                        "10 pieces per quarter",
                        "More than 10 pieces per quarter"
                    ]
                }, {
                    type: "dropdown",
                    name: "clothes_used",
                    title: "Do you prefer buying new clothes or second-hand?",
                    isRequired: true,
                    colCount: 0,
                    choices: [
                        "Usually second-hand clothes",
                        "I buy both equally often",
                        "Usually new clothes"
                    ]
                },
            ]
        }
    ]
};

// Initialize survey JSON-object
window.survey = new Survey.Model(json);

// Do when survey completed
survey
    .onComplete
    .add(function (result) {
        // Get survey input values and save to new variables
        var household_number = result.getValue("household_number");
        var household_type = result.getValue("household_type");
        var household_heat = result.getValue("household_heat");
        var household_size = result.getValue("household_size");
        var electricity_type = result.getValue("electricity_type");
        var electricity_amount_1 = result.getValue("electricity_amount_1");
        var electricity_amount_2 = result.getValue("electricity_amount_2");
        var electricity_amount_3 = result.getValue("electricity_amount_3");
        var electricity_amount_4 = result.getValue("electricity_amount_4");
        var electricity_amount_5 = result.getValue("electricity_amount_5");
        var food_meat = result.getValue("food_meat");
        var food_dairy = result.getValue("food_dairy");
        var food_vegetables = result.getValue("food_vegetables");
        var car_travel = result.getValue("car_travel");
        var car_type = result.getValue("car_type");
        var car_share = result.getValue("car_share")
        var car_distance = result.getValue("car_distance");
        var train_distance = result.getValue("train_distance");
        var publictransport_distance = result.getValue("publictransport_distance")
        var plane_distance = result.getValue("plane_distance");
        var clothes_amount = result.getValue("clothes_amount");
        var clothes_used = result.getValue("clothes_used");
        // Call calculate score function and pass survey input values as argument
        calcScore(household_number, household_type, household_heat, household_size, electricity_type,
            electricity_amount_1, electricity_amount_2, electricity_amount_3, electricity_amount_4, electricity_amount_5,
            food_meat, food_dairy, food_vegetables, car_travel, car_type, car_share, car_distance, train_distance, publictransport_distance,
            plane_distance, clothes_amount, clothes_used);
        // Generate string representation of SurveyJS JSON-object
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });
$("#surveyElement").Survey({model: survey});

// Calculate carbon footprint score
function calcScore(household_number, household_type, household_heat, household_size, electricity_type, electricity_amount_1,
                   electricity_amount_2, electricity_amount_3, electricity_amount_4, electricity_amount_5, food_meat, food_dairy,
                   food_vegetables, car_travel, car_type, car_share, car_distance, train_distance, publictransport_distance, plane_distance,
                   clothes_amount, clothes_used) {

    // Calculate household footprint
    var carbon_footprint_household
    if (household_type == "Apartment, before 1975") {
        if (household_heat == "Electricity heating") {
            carbon_footprint_household = apart_before_elec
        } else if (household_heat == "Fuel oil heating") {
            carbon_footprint_household = apart_before_fuel
        } else if (household_heat == "Gas heating") {
            carbon_footprint_household = apart_before_gas
        }
    } else if (household_type == "Apartment, after 1975") {
        if (household_heat == "Electricity heating") {
            carbon_footprint_household = apart_after_elec
        } else if (household_heat == "Fuel oil heating") {
            carbon_footprint_household = apart_after_fuel
        } else if (household_heat == "Gas heating") {
            carbon_footprint_household = apart_after_gas
        }
    } else if (household_type == "House, before 1975") {
        if (household_heat == "Electricity heating") {
            carbon_footprint_household = house_before_elec
        } else if (household_heat == "Fuel oil heating") {
            carbon_footprint_household = house_before_fuel
        } else if (household_heat == "Gas heating") {
            carbon_footprint_household = house_before_gas
        }
    } else if (household_type == "House, after 1975") {
        if (household_heat == "Electricity heating") {
            carbon_footprint_household = house_after_elec
        } else if (household_heat == "Fuel oil heating") {
            carbon_footprint_household = house_after_fuel
        } else if (household_heat == "Gas heating") {
            carbon_footprint_household = house_after_gas
        }
    }
    if (household_number == "More") {
        household_number = 5
    }
    emission_housing = (carbon_footprint_household * household_size) / household_number

    // Calculate electricity footprint
    var carbon_footprint_electricity
    var green_or_grey
    if (household_number == "1") {
        carbon_footprint_electricity = electricity_amount_1
    } else if (household_number == "2") {
        carbon_footprint_electricity = electricity_amount_2
    } else if (household_number == "3") {
        carbon_footprint_electricity = electricity_amount_3
    } else if (household_number == "4") {
        carbon_footprint_electricity = electricity_amount_4
    } else if (household_number == "5") {
        carbon_footprint_electricity = electricity_amount_5
    }
    if (electricity_type == "Green electricity") {
        green_or_grey = 0.4
    } else {
        green_or_grey = 1
    }
    emission_electricity = (carbon_footprint_electricity * elec_emission * green_or_grey) / household_number

    // Calculate meat and dairy consumption footprint
    var meatfish_days
    var dairy_days
    if (food_meat == "Never") {
        meatfish_days = 0
    } else if (food_meat == "Very seldom, once per week") {
        meatfish_days = 1
    } else if (food_meat == "Seldom, twice per week") {
        meatfish_days = 2
    } else if (food_meat == "Sometimes, three times per week") {
        meatfish_days = 3
    } else if (food_meat == "Sometimes, four times per week") {
        meatfish_days = 4
    } else if (food_meat == "Regularly, five times per week") {
        meatfish_days = 5
    } else if (food_meat == "Very regularly, six times per week") {
        meatfish_days = 6
    } else if (food_meat == "Daily") {
        meatfish_days = 7
    }
    if (food_dairy == "Never") {
        dairy_days = 0
    } else if (food_dairy == "Very seldom, once per week") {
        dairy_days = 1
    } else if (food_dairy == "Seldom, twice per week") {
        dairy_days = 2
    } else if (food_dairy == "Sometimes, three times per week") {
        dairy_days = 3
    } else if (food_dairy == "Sometimes, four times per week") {
        dairy_days = 4
    } else if (food_dairy == "Regularly, five times per week") {
        dairy_days = 5
    } else if (food_dairy == "Very regularly, six times per week") {
        dairy_days = 6
    } else if (food_dairy == "Daily") {
        dairy_days = 7
    }
    emission_meat_dairy = ((food_weight_meat * meatfish_days * food_emission_meat) + (food_weight_dairy * dairy_days * food_emission_dairy)) * weeks_per_year

    // Calculate car travel footprint
    var car_share_factor
    if (car_travel == "Yes"){
        if (car_share == "Alone") {
            car_share_factor = 1
        } else if (car_share == "Share") {
            car_share_factor = 0.5
        }
        if (car_type == "Electric") {
            emission_car = (car_distance / 100) * carbon_emission_electric * weeks_per_year * car_share_factor
        } else if (car_type == "Petrol") {
            emission_car = (car_distance * (6.5 / 100)) * carbon_emission_petrol * weeks_per_year * car_share_factor
        } else if (car_type == "Diesel") {
            emission_car = (car_distance * (5 / 100)) * carbon_emission_diesel * weeks_per_year * car_share_factor
        }
    } else if (car_travel == "No"){
        emission_car = 0
    }

    // Calculate public transport footprint
    emission_public_transport = publictransport_distance * publictransport_emission * weeks_per_year

    // Calculate plane travel footprint
    emission_plane = (plane_avg_speed * plane_distance * plane_emission_km) / 1000

    // Calculate clothes footprint
    var clothes_pieces
    if (clothes_amount == "Less than 1 piece per quarter") {
        clothes_pieces = 0.5
    } else if (clothes_amount == "1 piece per quarter") {
        clothes_pieces = 1
    } else if (clothes_amount == "2 pieces per quarter") {
        clothes_pieces = 2
    } else if (clothes_amount == "3 pieces per quarter") {
        clothes_pieces = 3
    } else if (clothes_amount == "4 pieces per quarter") {
        clothes_pieces = 4
    } else if (clothes_amount == "5 pieces per quarter") {
        clothes_pieces = 5
    } else if (clothes_amount == "6 pieces per quarter") {
        clothes_pieces = 6
    } else if (clothes_amount == "7 pieces per quarter") {
        clothes_pieces = 7
    } else if (clothes_amount == "8 pieces per quarter") {
        clothes_pieces = 8
    } else if (clothes_amount == "9 pieces per quarter") {
        clothes_pieces = 9
    } else if (clothes_amount == "10 pieces per quarter") {
        clothes_pieces = 10
    } else if (clothes_amount == "More than 10 pieces per quarter") {
        clothes_pieces = 11
    }
    if (clothes_used == "Usually second-hand clothes") {
        emission_clothes = 0
    } else if (clothes_used == "I buy both equally often") {
        emission_clothes = clothes_weight * clothes_emission * clothes_pieces * clothes_quarter * 0.5
    } else if (clothes_used == "Usually new clothes") {
        emission_clothes = clothes_weight * clothes_emission * clothes_pieces * clothes_quarter
    }

    // Calculate total emission footprint
    emission_total = (emission_housing + emission_electricity + emission_meat_dairy + emission_car + emission_public_transport + emission_plane + emission_clothes).toFixed(2);

    // Call show visualization function
    showVisualization(emission_total)
}

// Show visualization function
function showVisualization(emission_total) {
    // Hide SurveyJS element
    document.getElementById("surveyNavigation").style.display = "none";
    document.getElementById("surveyElement").style.display = "none";
    document.getElementById("surveyResult").style.display = "none";

    // Show load icon
    document.getElementById("load_icon").style.display = "inline-block";

    // Temporarily dim screens
    document.getElementById("overlay_1").style.display = "inline-block";
    document.getElementById("overlay_2").style.display = "inline-block";
    document.getElementById("overlay_3").style.display = "inline-block";

    // Load google charts
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // Draw piechart and set chart values
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Attribute', 'Emission'],
            ['Heating', Math.round(emission_housing)],
            ['Electricity', Math.round(emission_electricity)],
            ['Food', Math.round(emission_meat_dairy)],
            ['Car', Math.round(emission_car)],
            ['Plane', Math.round(emission_plane)],
            ['Public Transport', Math.round(emission_public_transport)],
            ['Clothing', Math.round(emission_clothes)]
        ]);
        var options = {
            'width': 450, 'height': 450,
            'backgroundColor': 'transparent',
            'colors': ['#8DD9CA', '#8EE3C1', '#9BECB1', '#B3F39C', '#D3F786', '#F9F871'],
            'legend': {
                'position': 'top',
                'maxLines': 4,
                'fontName': 'Segoe Ui',
                'textStyle':{
                    'color': '#404040',
                }
            },
            'pieSliceText': 'label',
            'pieSliceTextStyle': {
                'fontName': 'Segoe Ui',
                'color': '#404040'
            },
            'tooltip': {
                'textStyle': {
                    'color': '#404040',
                    'fontName': 'Segoe Ui',
                },
                'showColorCode': true,
            },
        };

        // Display the chart inside <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }

    // Random number generator to randomize for one out of three possible visualizations
    var random_number = Math.floor(Math.random() * 3) + 1
    // Display globe, numerical or social comparison visualization based on random number
    if (random_number == 1) {
        // Globe visualization
        if (emission_total < 3900){
            verification_code = "GV_1";
        } else if (emission_total >= 3900 && emission_total < 6800){
            verification_code = "GV_2";
        } else if (emission_total >= 6800 && emission_total < 9700){
            verification_code = "GV_3";
        } else if (emission_total >= 9700 && emission_total < 12600){
            verification_code = "GV_4";
        } else if (emission_total >= 12600 && emission_total < 15500){
            verification_code = "GV_5";
        } else if (emission_total >= 15500 && emission_total < 18400){
            verification_code = "GV_6";
        } else if (emission_total >= 18400 && emission_total < 21300){
            verification_code = "GV_7";
        } else if (emission_total >= 21300 && emission_total < 24200){
            verification_code = "GV_8";
        } else if (emission_total >= 24200 && emission_total < 27100){
            verification_code = "GV_9";
        } else if (emission_total >= 27100){
            verification_code = "GV_10";
        }
        // Show appropriate verification code
        document.getElementById("verification_code").innerText = "VERIFICATION CODE: " + verification_code
        // Load and display correct globe visualization image
        document.getElementById("result_image").src = "globes_images/" + verification_code + ".png";
        document.getElementById("image_visualization").style.display = "inline";
    } else if (random_number == 2) {
        // Numerical visualization
        if (emission_total < 3900){
            verification_code = "NV_1";
        } else if (emission_total >= 3900 && emission_total < 6800){
            verification_code = "NV_2";
        } else if (emission_total >= 6800 && emission_total < 9700){
            verification_code = "NV_3";
        } else if (emission_total >= 9700 && emission_total < 12600){
            verification_code = "NV_4";
        } else if (emission_total >= 12600 && emission_total < 15500){
            verification_code = "NV_5";
        } else if (emission_total >= 15500 && emission_total < 18400){
            verification_code = "NV_6";
        } else if (emission_total >= 18400 && emission_total < 21300){
            verification_code = "NV_7";
        } else if (emission_total >= 21300 && emission_total < 24200){
            verification_code = "NV_8";
        } else if (emission_total >= 24200 && emission_total < 27100){
            verification_code = "NV_9";
        } else if (emission_total >= 27100){
            verification_code = "NV_10";
        }
        // Show appropriate verification code
        document.getElementById("verification_code").innerText = "VERIFICATION CODE: " + verification_code
        // Load and display correct numerical visualization value
        document.getElementById("numerical_text").innerHTML = "<b>" + emission_total + " kg CO<sub>2</sub></b>"
        document.getElementById("numerical_visualization").style.display = "inline";
    } else if (random_number == 3) {
        // Social comparison visualization
        if (emission_total < 3900){
            verification_code = "SCV_1";
        } else if (emission_total >= 3900 && emission_total < 6800){
            verification_code = "SCV_2";
        } else if (emission_total >= 6800 && emission_total < 9700){
            verification_code = "SCV_3";
        } else if (emission_total >= 9700 && emission_total < 12600){
            verification_code = "SCV_4";
        } else if (emission_total >= 12600 && emission_total < 15500){
            verification_code = "SCV_5";
        } else if (emission_total >= 15500 && emission_total < 18400){
            verification_code = "SCV_6";
        } else if (emission_total >= 18400 && emission_total < 21300){
            verification_code = "SCV_7";
        } else if (emission_total >= 21300 && emission_total < 24200){
            verification_code = "SCV_8";
        } else if (emission_total >= 24200 && emission_total < 27100){
            verification_code = "SCV_9";
        } else if (emission_total >= 27100){
            verification_code = "SCV_10";
        }
        // Show appropriate verification code
        document.getElementById("verification_code").innerText = "VERIFICATION CODE: " + verification_code
        // Load and display correct social comparison image
        document.getElementById("result_image").src = "socialcomparison_images/" + verification_code + ".png";
        document.getElementById("image_visualization").style.display = "inline";
    }

    // Show visualization
    document.getElementById("visualization").style.display = "inline";

    // Wait 2 seconds before screen dim reverted and load icon removed
    setTimeout(function () {
        // Hide fade out screens
        document.getElementById("overlay_1").style.display = "none";
        document.getElementById("overlay_2").style.display = "none";
        document.getElementById("overlay_3").style.display = "none";
        // Hide load icon
        document.getElementById("load_icon").style.display = "none";
    }, 2000);
}

// Click visualization box to copy verification code to clipboard
function copyToClipboard() {
    const elem = document.createElement('textarea');
    elem.value = verification_code;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    window.alert("Your verification code has been copied to your clipboard! You can now simply paste it elsewhere.");
}

// SurveyJS
var navTopEl = document.querySelector("#surveyNavigationTop");
navTopEl.className = "navigationContainer";
var leftImg = document.createElement("img");
leftImg.src = "/Content/Images/examples/covid/Left.svg";
leftImg.style = "width: 16px; height: 16px";
leftImg.className = "navigationProgressbarImage";
navTopEl.appendChild(leftImg);
var navProgBarDiv = document.createElement("div");
navProgBarDiv.className = "navigationProgressbarDiv";
navTopEl.appendChild(navProgBarDiv);
var navProgBar = document.createElement("ul");
navProgBar.className = "navigationProgressbar";
navProgBarDiv.appendChild(navProgBar);
leftImg.onclick = function () {
    navProgBarDiv.scrollLeft -= 70;
};
var liEls = [];
for (var i = 0; i < survey.visiblePageCount; i++) {
    var liEl = document.createElement("li");
    if (survey.currentPageNo == i) {
        liEl
            .classList
            .add("current");
    }
    liEl.onclick = function (index) {
        return function () {
            if (survey['isCompleted'])
                return;
            liEls[survey.currentPageNo]
                .classList
                .remove("current");
            if (index < survey.currentPageNo) {
                survey.currentPageNo = index;
            } else if (index > survey.currentPageNo) {
                var j = survey.currentPageNo;
                for (; j < index; j++) {
                    if (survey.visiblePages[j].hasErrors(true, true))
                        break;
                    if (!liEls[j].classList.contains("completed")) {
                        liEls[j]
                            .classList
                            .add("completed");
                    }
                }
                survey.currentPageNo = j;
            }
            liEls[survey.currentPageNo]
                .classList
                .add("current");
        };
    }(i);
    var pageTitle = document.createElement("span");
    if (!survey.visiblePages[i].navigationTitle) {
        pageTitle.innerText = survey
            .visiblePages[i]
            .name;
    } else
        pageTitle.innerText = survey
            .visiblePages[i]
            .navigationTitle;
    pageTitle.className = "pageTitle";
    liEl.appendChild(pageTitle);
    var br = document.createElement("br");
    liEl.appendChild(br);
    var pageDescription = document.createElement("span");
    if (!!survey.visiblePages[i].navigationDescription) {
        pageDescription.innerText = survey
            .visiblePages[i]
            .navigationDescription;
    }
    pageDescription.className = "pageDescription";
    liEl.appendChild(pageDescription);
    liEls.push(liEl);
    navProgBar.appendChild(liEl);
}
survey
    .onCurrentPageChanged
    .add(function (sender, options) {
        var oldIndex = options.oldCurrentPage.visibleIndex;
        var newIndex = options.newCurrentPage.visibleIndex;
        liEls[oldIndex]
            .classList
            .remove("current");
        if (newIndex > oldIndex) {
            for (var i = oldIndex; i < newIndex; i++) {
                if (sender.visiblePages[i].hasErrors(true, true))
                    break;
                if (!liEls[i].classList.contains("completed")) {
                    liEls[i]
                        .classList
                        .add("completed");
                }
            }
        }
        liEls[newIndex]
            .classList
            .add("current");
    });
survey
    .onComplete
    .add(function (sender, options) {
        liEls[sender.currentPageNo]
            .classList
            .remove("current");
        for (var i = 0; i < sender.visiblePageCount; i++) {
            if (survey.visiblePages[i].hasErrors(true, true))
                break;
            if (!liEls[i].classList.contains("completed")) {
                liEls[i]
                    .classList
                    .add("completed");
            }
        }
    });
var rightImg = document.createElement("img");
rightImg.src = "/Content/Images/examples/covid/Right.svg";
rightImg.style = "width: 16px; height: 16px";
rightImg.className = "navigationProgressbarImage";
rightImg.onclick = function () {
    navProgBarDiv.scrollLeft += 70;
};
navTopEl.appendChild(rightImg);

var updateScroller = setInterval(function () {
    if (navProgBarDiv.scrollWidth <= navProgBarDiv.offsetWidth) {
        leftImg
            .classList
            .add("hidden");
        rightImg
            .classList
            .add("hidden");
    } else {
        leftImg
            .classList
            .remove("hidden");
        rightImg
            .classList
            .remove("hidden");
    }
}, 100);