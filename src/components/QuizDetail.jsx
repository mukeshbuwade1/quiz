import React, { useState } from 'react'
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa"
import { BiTrophy, BiQuestionMark, BiTime } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import { modalData } from '../assets/dummyData';
function QuizDetail(props) {
  // react state
  const [isModalVisible, setIsModalVisible] = useState(false)

  // constant data 
  const rate = 4.6;

  // helper function - modal show/hide 
  function ModalHandler(e) {
    e.stopPropagation();
    setIsModalVisible(!isModalVisible)
  }

  // react component to show rating 
  const RatingCom = ({ _rate }) => {
    const rating_stack = []
    if (_rate) {
      for (let i = 1; i <= 5; i++) {
        if (i <= _rate) {
          rating_stack.push("full")
        } else if ((i - 1) < _rate && i > _rate) {
          rating_stack.push("half")
        } else {
          rating_stack.push("empty")
        }
      }
    }
    return <div style={{ borderWidth: 1, borderColor: "red" }}>
      {rating_stack?.map((e, i) => {
        return e === "full" ? (
          <FaStar className='star-icon' key={i} />
        ) : e === "half" ? <FaStarHalfAlt className='star-icon' key={i} /> : <FaRegStar className='star-icon' key={i} />
      }
      )}
    </div>
  }
  return (
    <section className="app-container" >
      <div className='detail-section'>
        <h1 className='heading'>The Daily MS Excel Quiz</h1>
        <div className="action-container">
          <ul className="left center">
            <li ><BiTrophy /> <span>50%  passing percentage</span> </li>
            <li><BiQuestionMark /> <span>10 questions</span> </li>
            <li><BiTime /> <span>1 Min per Question</span> </li>
          </ul>

          <div className="right">
            <div className="rating_container">
              <p className="sub_title" style={{fontWeight:"500"}}>Top rated quiz</p>
              <RatingCom _rate={rate} />
              <p className="sub_title">{rate} out of 5</p>
            </div>
          </div>
        </div>
        <div className="info-container">
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          </p>
        </div>
        <button className='button' onClick={ModalHandler} >let's play</button>
      </div>
      <div onClick={ModalHandler} className="modal" style={{ display: isModalVisible ? 'flex' : 'none' }} >
        <div className="modal-inner-box">
          <AiOutlineClose onClick={ModalHandler} className='close-button' />
          <h1 className='heading'>Quiz rules</h1>
          {
            modalData.map((e, i) => (
              <div className="modal-row" key={e.heading + i}>
                <div className="modal-img-container">
                  <img src={e.icon} alt="image" className='modal-icon' />
                </div>
                <div className="modal-right">
                  <h4 className='modal-heading'>{e.heading}</h4>
                  <p className='modal-p'>{e.info}</p>
                </div>
              </div>
            ))
          }
          <button className='button' onClick={() => props?.setScreenName("Quiz")} >Start</button>
        </div>
      </div>
    </section>
  )
}

export default QuizDetail