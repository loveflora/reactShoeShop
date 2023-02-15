import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import 변수 from "./img/bg.png";
import { createContext, useContext, useEffect, useState } from "react";
import data from "./data.js";
import Detail from "./components/detail";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cart from "./components/Cart.js";

//? Context API 쓰면, 자식은 props 없이 state 사용가능 (굳이 여러번 props 안써도 됨)
export let Context1 = createContext();
// context : state 보관함

function App() {
  let navigate = useNavigate(); // 안에 페이지 이동하는 함수가 들어 있음
  // * -------------
  // * State
  // * -------------
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(0);
  // ? 2) 탭 상태 저장해둘 state 필요
  let [tab, setTab] = useState(0);
  // ? 임시데이터
  // Detail, TabContent에서 사용하고 싶음
  let [재고] = useState([10, 11, 12]);

  // * -------------
  // * Render
  // * -------------
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
            <Nav.Link
              onClick={() => {
                navigate("/event");
                // navigate 함수 실행하면, 페이지 이동됨.
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
                // navigate 함수 실행하면, 페이지 이동됨.
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/detail/:id"
          //? Context API
          element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Detail shoes={shoes} />
              {/* 여기 안의 모든 컴포넌트는 '재고, shoes' 라는 props 사용가능 */}
              {/* Detail 뿐만 아니라, 그 자식들도 (TabContent) props 없이 사용가능 */}
            </Context1.Provider>
          }
        >
          상세페이지
        </Route>
        <Route path="*" element={<div>404</div>} />
        {/* * : 이외의 모든 것 */}

        <Route path="/cart" element={<Cart />} />

        {/* Nested Routes */}
        <Route path="/event" element={<Event />}>
          <Route path="1" element={<div>양배추즙 증정</div>} />
          {/* <Route path="/about/member" element={<About />} /> */}
          {/* Nested Routes 사용 시 : <About> & <div> 둘다 보임 */}
          {/* <div> 어디에 보여줄지 자리 작성해야함 = Outlet (구멍) */}
          <Route path="2" element={<div>생일 쿠폰</div>} />
          {/* <Route path="/about/location" element={<About />} /> */}
        </Route>
      </Routes>

      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + 변수 + ")" }}
      ></div>
      <div className="container">
        <div className="row">
          {shoes.map((v, i) => {
            return <Modal shoes={shoes[i]} i={i} key={i} />;
          })}
        </div>
      </div>
      <button
        onClick={() => {
          setCount(count++);
          // 로딩 중 UI 띄우기
          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((결과) => {
              let copy = [...shoes, ...결과.data];
              //        [  {} {} {}   {} {} {}  ]
              setShoes(copy);
              // shoes에 가져온 데이터 추가한걸로 변경해주세요
              // 로딩 중 UI 숨기기
            })
            .catch(() => {
              console.log("실패함");
              // 로딩 중 UI 숨기기
            });

          // 서버로 데이터 전송하는 POST 요청
          // axios.post("/", { name: "kim" });
          console.log(count);
        }}
      >
        더보기
      </button>

      {/* 리액트에서 탭 UI 만들기 */}
      {/* 1) html css로 미리 디자인 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        {/*  defaultActiveKey : 기본으로 눌려 있을 버튼 */}
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={shoes} />
      {/* 3) state에 따라서 UI가 어떻게 보일지 작성 */}
      {
        // state가 0이면 ==> 내용 0 보이기
        // state가 1이면 ==> 내용 1 보이기
        // state가 2이면 ==> 내용 2 보이기
      }
      {/* 탭 상태 저장해둘 state 필요 */}
    </div>
  );
}

// html 안에서는 if 조건문 사용불가
// if (tab == 0) {
//   <div> 내용0 </div>;
// } else if (tab == 1) {
//   <div> 내용0 </div>;
// } else if (tab == 2) {
//   <div> 내용0 </div>;
// }

// * -------------
// * Handlers
// * -------------

function Event() {
  return (
    <div>
      <h4>Today's Event</h4>
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

function TabContent({ tab, shoes }) {
  //? CSS 효과
  let [fade, setFade] = useState("");
  //? Context API
  // let { 재고 } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>{shoes[0].title}</div>, <div>내용 1</div>, <div>내용 2</div>][tab]}
    </div>
  );
}

export default App;
