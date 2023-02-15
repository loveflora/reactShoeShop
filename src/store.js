import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

//? Redux store에 state 보관하는 법
// createSlice({}) : useState 역할임
// state 하나를 slice 라고 부름
// createSlice({
//   name: "state명",
//   initialState: "값",
// });

let stock = createSlice({
  name: "재고",
  initialState: [10, 11, 12], // 로그인된 유저 이름
});

let item = createSlice({
  name: "data",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

//? 1. 재고 + 1
// + 버튼 누르면, id 와 동일한 id 가진 상품을 + 1

export default configureStore({
  reducer: {
    // (중요) 여기에 등록해야 사용가능
    작명: user.reducer,
    재고: stock.reducer,
    cart: item.reducer,
  },
});

//? 2. 주문하기 버튼 누르면, 장바구니에 상품 추가
