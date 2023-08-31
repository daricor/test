import axios from 'axios';
import dayjs from 'dayjs';
const wantedDistricts = [
    'Port Marianne - Richter',
    'La Pompignane',
    'Millénaire',
    'Aiguelongue',
    'Les Aubes',
];
try {
    const response = await axios.get('https://www.bienici.com/realEstateAds.json?filters={"size":100,"from":0,"showAllModels":false,"filterType":"rent","propertyType":["house","flat","loft","castle","townhouse"],"minPrice":650,"maxPrice":720,"minRooms":2,"minArea":35,"isNotGroundFloor":true,"page":1,"sortBy":"publicationDate","sortOrder":"desc","onTheMarket":[true],"mapMode":"enabled","limit":"gz|iGa||U?{tl@bbl@R?rsl@","newProperty":false,"blurInfoType":["disk","exact"],"zoneIdsByTypes":{"zoneIds":["-28810","-28722","-28815"]}}');
    const filteredData = response.data.realEstateAds.filter((flat) => {
        if (dayjs(flat.modificationDate).isAfter(dayjs().subtract(48, 'hour'))) {
            if (flat.city !== 'Montpellier') {
                return flat;
            }
            else if (flat.city === 'Montpellier' &&
                wantedDistricts.some(district => district === flat.district.libelle)) {
                return flat;
            }
        }
    });
    console.log(filteredData);
    console.log(filteredData.length);
}
catch (error) {
    console.error(error);
}
