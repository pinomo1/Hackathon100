import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useAddress } from './AddressProvider';

const Home = () => {
    const { setAddress } = useAddress();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAddress = event.target.elements[1].value;
        setAddress(newAddress);
        navigate("/order");
      };

    return (
        <div className="Home">
            <div className="content">
                <div>
                    <h1 className='reallyBigText'><span className='customSpan1'>GREEN</span><span className='customSpan2'>&PRETTY</span></h1>
                </div>
            </div>
            <div className='content2'>
                <div className='someText'>
                    <h1>Welcome to Green&Pretty!</h1>
                    <p>
                        We excel in crafting green roofing systems that not only enhance the aesthetic appeal of urban spaces in Baku but also champion a sustainable urban future. Our tailored solutions are designed to seamlessly blend with modern architecture while contributing positively to the environment. At Green&Pretty, our commitment to sustainability goes beyond aesthetics. We take pride in using cutting-edge technologies and eco-friendly materials to create roofing systems that reduce energy consumption, mitigate the urban heat island effect, and promote biodiversity in Baku's urban landscape. With our dedication to both beauty and environmental responsibility, we are your trusted partner in creating a greener and more vibrant urban future.
                    </p>
                </div>
                <div className='flexSpace'/>
                    <div className='formColumn' id="form" >
                        <p className='formTitle'>Make your space green and pretty</p>
                        <form className='formColumn' onSubmit={handleSubmit}>
                            <input className='formInput' type="text" placeholder="Full Name" minLength={3} required/> {/* Bonjour */}
                            <input className='formInput' type="text" placeholder="Address" minLength={4} required/>
                            <select className='formInput' name="typespace" id="typespace">
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="office">Office</option>
                            </select>
                            <button className="order-button" type='submit'>Order Now</button>
                        </form>
                    </div>
                </div>
                <div className='flex2'>
                    <div className='someImage'>
                        <img src="https://media.discordapp.net/attachments/1162645310783377410/1163045778575593562/DALLE_2023-10-15_13.18.21_-_Technical_illustration_with_a_background_of_a_green_rooftop_garden._In_the_foreground_are_five_icons_each_signifying_an_ecological_benefit._For_Stor.png?ex=653e25c9&is=652bb0c9&hm=323736086da7229c526bfa10a5343b16453152e3b83fb41a6447739b5f5a2d40&=&width=1174&height=671" alt="Green Roof"/>
                    </div>
                    <div className='someText2'>
                        <h1>Ecology Advantages</h1>
                        <p>Our green roofing solutions are more than just a visual upgrade; they are a testament to eco-conscious living and sustainability. Here are the core ecological benefits:</p>
                        <ul>
                            <li><strong>Stormwater Management:</strong> Effectively mitigate runoff and promote water recycling.</li>
                            <li><strong>Urban Heat Island Reduction:</strong> Contribute to a cooler city environment by reducing urban heat effects.</li>
                            <li><strong>Biodiversity:</strong> Foster habitats for local flora and fauna, enhancing urban biodiversity.</li>
                            <li><strong>Improved Air Quality:</strong> Absorb pollutants and provide cleaner, fresher air.</li>
                            <li><strong>Energy Efficiency:</strong> Reduce energy costs with natural insulation, making your space more energy-efficient.</li>
                        </ul>
                    </div>
                </div>
            </div>
    );
} 

export default Home; 