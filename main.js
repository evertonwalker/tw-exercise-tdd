const hotels = require('./hoteis.json');

const mappedDays = {
    mon: 'W',
    tue: 'W',
    wed: 'W',
    thu: 'W',
    fri: 'W',
    sat: 'WE',
    sun: 'WE'
}

function getHowManyDaysOnWeekAndWeekend(dates) {

    let daysOnWeek = 0;
    let daysOnWeekend = 0;

    dates.forEach(it => {
        mappedDays[it] === 'W' ? ++daysOnWeek : ++daysOnWeekend;
    });

    return { daysOnWeek, daysOnWeekend };

}

function getValuesToHotelByType(typeClient, quantifyDays) {

    const hotelValues = [];

    hotels.forEach(hotel => {

        let valueTotal;

        if (typeClient) {
            valueTotal = (hotel.regularValues.week * quantifyDays.daysOnWeek) + (hotel.regularValues.weekend * quantifyDays.daysOnWeekend)
        } else {
            valueTotal = (hotel.fidelityValues.week * quantifyDays.daysOnWeek) + (hotel.fidelityValues.weekend * quantifyDays.daysOnWeekend)
        }

        hotelValues.push({
            name: hotel.name,
            rank: hotel.rank,
            valueTotal
        });
    });

    return hotelValues;

}

function getBestHotel(typeClient, daysToAccomodation) {

    const dates = daysToAccomodation.map(it => it.split('(')[1].substring(0, 3));

    const daysToCalculated = getHowManyDaysOnWeekAndWeekend(dates);
    const hotelsWithValues = getValuesToHotelByType(typeClient, daysToCalculated);

    let minorHotel = { rank: 0, name:'', valueTotal: 99999999 };

    hotelsWithValues.forEach(hotel => {
        if (hotel.valueTotal <= minorHotel.valueTotal && hotel.rank > minorHotel.rank) {
            minorHotel = hotel;
        }
    });

    return minorHotel;

}


const regular = true;
const days = ['16Mar2020(mon)', '17Mar2020(tue)', '18Mar2020(wed)'];
const bestHotel = getBestHotel(regular, days);


const regularTwo = true;
const daysTwo = ['20Mar2020(fri)', '21Mar2020(sat)', '22Mar2020(sun)'];
const bestHotelTwo = getBestHotel(regularTwo, daysTwo);

const regularThree = false;
const daysThree = ['26Mar2020(thu)', '27Mar2020(fri)', '28Mar2020(sat)'];
const bestHotelThree = getBestHotel(regularThree, daysThree)


console.log(bestHotel, bestHotelTwo, bestHotelThree);


