import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const trends = [
    { img: 'https://sbfindia.org/wp-content/uploads/2021/06/201085013_2586274251675097_1615532398646337329_n.jpg', title: 'Save Lives', location: 'Blood Donation Camp' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lm-4RWmmAKPwYcirMQYKbKXp61NrwYIfK6NrqWFLvNex9kUqHCY3BEdTcsUQHCX8x1g&usqp=CAU', title: 'Donate Blood', location: 'Local Hospital' },

    

    { img: 'https://www.bracu.ac.bd/sites/default/files/news-image/2022/06/blood%20donation.jpg', title: 'Be a Hero', location: 'Community Center' },
    { img: 'https://baif.org.in/wp-content/uploads/2023/03/Boold-donation-2023-1.jpeg', title: 'Blood Drive', location: 'University Campus' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSka07Ti1LHpXSaUK0xEoKeEil17qSmb8BNrrmat3O66zFqRaha2wpjls3oLQJPQK6K3JU&usqp=CAU', title: 'Blood Donor', location: 'Medical Center' },
    { img: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/ANI-20240624150445.jpg', title: 'Volunteer Today', location: 'Charity Event' },
    
    
  ];

const TrendingBoard = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div className={dark ? ' text-white' : 'bg-white text-gray-900'}>
      <h2 className="text-3xl font-bold text-center py-6">Trending Photos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 auto-rows-fr">
        {trends.map((trend, index) => (
          <div 
            key={index} 
            className={`card shadow-xl hover:scale-105 transition-transform overflow-hidden rounded-2xl ${index % 5 === 0 ? 'row-span-2 col-span-2' : (index % 3 === 0 ? 'col-span-2' : 'col-span-1')}`}
          >
            <figure className="relative group w-full h-full overflow-hidden rounded-xl object-cover">
              <img src={trend.img} alt={trend.title} className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:opacity-75" />
              <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-gray-800">{trend.title}</h3>
                <p className="text-sm text-gray-600">{trend.location}</p>
              </div>
            </figure>
            
          </div>
        ))
    }
      </div>
      
    </div>
  );
};

export default TrendingBoard;
