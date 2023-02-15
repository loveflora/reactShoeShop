import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
// 장바구니 데이터를 state에 보관해두고, 데이터 바인딩
import { changeName, changeAge } from "./../store/userSlice";

function Cart() {
  let state = useSelector(
    (state) =>
      // state : store 안에 있던 모든 state
      state,
  );

  let dispatch = useDispatch();
  // dispatch 함수 : store.js 로 요청보내주는 함수

  return (
    <>
      <h6>{state.작명.name}의 장바구니</h6>
      <h6>{state.작명.age}</h6>
      <button
        onClick={() => {
          dispatch(changeAge(10));
        }}
      >
        age
      </button>
      <Table striped>
        <thead>
          <tr>
            {/* <tr></tr> 넣으면, 가로줄(행) 생김 */}
            <th>번호</th>
            {/* <th></th>, <td></td> 넣으면, 세로줄(열) 생김 */}
            <th>상품명</th>
            <th>갯수</th>
            <th>Username</th>
          </tr>
        </thead>
        {state.cart.map((v, i) => (
          <tbody>
            <tr key={i}>
              {/* 가로줄 1 */}
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeName());
                  }}
                >
                  +
                </button>
              </td>
              {/* 세로줄 4 */}
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
}

export default Cart;
