import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
//? Context API
import { Context1 } from "./../App.js";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "orange" ? "white" : "")};
  padding: 10px;
`;
// <button> 태그 생성

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Detail(props) {
  //? ContextAPI
  let { shoes, 재고 } = useContext(Context1);
  // 보관함 해체해줌 : {state1, state2}

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (v) {
    return v.id == id;
  });

  return (
    <div className="container">
      <Box>
        <YellowBtn bg="orange">버튼</YellowBtn>
        <YellowBtn bg="white">버튼</YellowBtn>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      {shoes[0].title}
    </div>
  );
}
export default Detail;
