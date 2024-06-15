import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';

const Home = () => {
  const offers = [
    {
      image: "src/Assets/Images/lightbulb.png",
      title: "Interactive Tests",
      description: "Check your knowledge across various subjects, from mathematics to history. Each test is carefully crafted not only to assess your skills but also to provide new insights and inspire further learning."
    },
    {
      image: "src/Assets/Images/test.png",
      title: "Science Forum",
      description: "Join our community, ask questions, share your knowledge, and participate in discussions on topics that interest you. You'll find like-minded individuals who share your passion for learning and are eager to help with any questions you have."
    },
    {
      image: "src/Assets/Images/ailogo.png",
      title: "AI Planner",
      description: "Plan your learning journey with the help of our AI-powered planner. Set your goals, track your progress, and receive personalized recommendations on what to learn next. The planner will help you stay motivated and focused on your learning objectives."
    }
  ];
  return (
    <div className=''>
      <Navbar user=""/>
      <div className='pt-10 w-[1240px] flex flex-wrap items-center m-auto'>
        <img className="m-auto h-60 w-72" src="src/Assets/Images/logo.png" alt="logo" />
        <div className='w-full text-center text-3xl text-primary pt-8'>Welcome to KnowledgeHub!</div>
        <div className='text-xl text-center w-1/2 m-auto mt-6'>
          You're at the place where learning becomes an adventure! 
          KnowledgeHub is an interactive platform designed for all 
          knowledge enthusiasts and learners. Whether you're a student, 
          teacher, or simply a curious self-learner, you'll find something valuable here.
        </div>        
      </div>
      <div className='w-full text-center text-3xl text-primary pt-12'>What do we offer:</div>
      {
        offers.map((offer, index) => (
          <div key={index} className='flex flex-wrap items-center m-auto w-[1240px] pt-6'>
            <div className='w-1/2 text-center m-auto'>
              <div className='inline-flex items-center'>
                <img className="m-auto h-12 w-12" src={offer.image} alt="offer" />
                <div className='text-2xl text-secondary'>{offer.title}</div>                
              </div>

              <div className='text-xl pt-4'>{offer.description}</div>
            </div>
          </div>
        ))
      }
    <Footer />
    </div>
  )
}

export default Home