import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 변수 from "./img/bg.png";
import { useState } from "react";
import data from "./data.js";
import Detail from "./components/detail";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate(); // 안에 페이지 이동하는 함수가 들어 있음

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">👠 ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
                // navigate 함수 실행하면, 페이지 이동됨.
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + 변수 + ")" }}
      ></div>
      <div className="container">
        <div className="row">
          {shoes.map((v, i) => {
            return <Modal shoes={shoes[i]} i={i} />;
          })}
        </div>
      </div>
      <Routes>
        <Route path="/detail" element={<Detail />}>
          상세페이지
        </Route>
        <Route path="*" element={<div>404</div>} />
        {/* * : 이외의 모든 것 */}

        {/* Nested Routes */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          {/* <Route path="/about/member" element={<About />} /> */}
          {/* Nested Routes 사용 시 : <About> & <div> 둘다 보임 */}
          {/* <div> 어디에 보여줄지 자리 작성해야함 = Outlet (구멍) */}
          <Route path="location" element={<div>위치정보임</div>} />
          {/* <Route path="/about/location" element={<About />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
      {/* div 태그 보여줄 자리 */}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        // js 문법으로 교체 { }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      {/* 복잡한 자료에서 데이터 뽑을 땐, 시작기호만 잘 보면 됩니다. */}
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
