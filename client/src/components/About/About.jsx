import React from "react";
import Header from "../Header/Header";
import QuizDivImg from "../../assets/QuizDivImg.png";
import AiImg from "../../assets/AiImg.png";
import GraphicalImg from "../../assets/GraphicalImg.png";

const About = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="w-11/12 relative h-full flex flex-col justify-center items-center my-0 mx-auto md:text-lg text-md">
        <div className="w-full min-h-min flex md:flex-row flex-col justify-between items-center py-4 px-6 m-2 shadow-md rounded-md border-b-3 border-dashed flex-wrap-reverse">
          <div className=" w-11/12 md:w-[65%] text-justify text-pretty  leading-7 ">
            Welcome to Quizfinity, your one-stop destination for mastering CSE
            subjects! Dive into a diverse collection of quizzes tailored to
            programming, core, and technical subjects designed to enhance your
            knowledge and prepare you for academic and professional challenges.
            With Quizfinity, learning becomes an engaging experience where you
            can not only test your skills but also refine them by revisiting and
            exploring detailed explanations for every question and answer.
          </div>
          <div className="md:w-[30%] h-[300px] w-11/12 ">
            <img src={QuizDivImg} className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="w-full min-h-min flex md:flex-row flex-col justify-between items-center py-4 px-6 shadow-md rounded-md border-b-3 border-dashed flex-wrap">
          <div className="w-11/12 md:w-[30%] h-[300px]">
            <img src={GraphicalImg} className="w-full h-full object-contain" />
          </div>
          <div className="w-11/12 md:w-[65%] text-justify text-pretty leading-7">
            Quizfinity stands out by providing powerful tools to help you track
            your progress like never before. With every quiz attempt, you get
            detailed graphs and analytics that showcase your growth, pinpoint
            areas for improvement, and highlight your strengths. Additionally,
            you can curate your learning experience by saving quiz questions to
            your favorites for later review. This unique feature ensures you can
            revisit challenging questions at your convenience and stay ahead in
            your preparation.
          </div>
        </div>
        <div className="w-full min-h-min flex md:flex-row flex-col justify-between items-center py-4 px-6 shadow-md rounded-md flex-wrap-reverse">
          <div className="w-11/12 md:w-[65%] text-justify text-pretty leading-7">
            To make your learning journey even more seamless, Quizfinity
            integrates a smart, built-in chatbot. Whether you're stuck on a
            tricky question, need further clarification, or want a deeper
            understanding of specific topics, our chatbot is here to cater to
            all your queries. It provides concise explanations and guides you
            toward more detailed information, ensuring you’re never left in
            doubt. Quizfinity is more than just a quiz platform; it’s your
            personalized companion for success in the world of computer science!
          </div>
          <div className="w-11/12 md:w-[30%] h-[300px]">
            <img src={AiImg} className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
