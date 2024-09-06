import animeImage1 from './card1.png';
import animeImage2 from './card2.png';
import animeImage3 from './card3.png';
import animeImage4 from './card4.png';
import animeImage5 from './card5.png';
import animeImage6 from './card6.png';



interface AnimeImages {
    [key: string]: string; 
  }

const animeImages: AnimeImages = {
  '1': animeImage1,
  '2': animeImage2,
  '3': animeImage3,
  '4': animeImage4,
  '5': animeImage5,
  '6': animeImage6,
  

};

export default animeImages;

