import React, { useState } from 'react'
// import { userList } from '../assets/dummyData'
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import { modalData } from '../assets/dummyData';
import { useNavigate } from 'react-router-dom';
function QuizDetail() {
const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)

  function ModalHandler() {
    // console.log("close button clicked")
    setIsModalVisible(!isModalVisible)
  }

  const rate = 4.6;

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
          <FaStar className='star-icon' />
        ) : e === "half" ? <FaStarHalfAlt className='star-icon' /> : <FaRegStar className='star-icon' />
      }
      )}
    </div>
  }
  return (
    <section className="app-container" >
      <div className='detail-section'>
        <h1 className='heading'>The Daily MS Excel Quiz</h1>
        <div className="action-container">
          <div className="left center">
            <a className="text-link">leave a comment</a>
            <a className="text-link">save quiz</a>
            <a className="text-link">challenge friends</a>
          </div>
          <div className="right">
            {/* <div className="enrolled-showcase">
              {
                userList?.map((e, i) => {
                  if (i < 5) {
                    return (
                      <img src={e} alt="" className='enrolled-user-image' style={{ marginLeft: `${i * 20}px` }} />
                    )
                  }
                  else if (i == 5) {
                    return (
                      <div className='center enrolled-user-image '>
                        <span>{`${i - 3}+`}</span>
                      </div>
                    )
                  } else {
                    // break;
                  }
                })
              }
            </div> */}
            <div className="rating_container">
              <p className="sub_title">Top rated quiz</p>
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
        <button onClick={ModalHandler} >let's play</button>
      </div>
      <div className="modal" style={{ display: isModalVisible ? 'flex' : 'none' }} >
        <div className="modal-inner-box">
          <AiOutlineClose onClick={ModalHandler} className='close-button' />
          <h1 className='heading'>Quiz rules</h1>
          {
            modalData.map((e, i) => (
              <div className="modal-row">
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
          <button onClick={()=>navigate("QuizScreen",{navigate:navigate})} >Start</button>
        </div>
      </div>
    </section>
  )
}

export default QuizDetail