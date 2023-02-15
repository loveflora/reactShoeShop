//? 함수 너무 길어서 분할

import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "이름",
  initialState: { name: "kim", age: 20 }, // 로그인된 유저 이름

  //! state 변경하는 법
  //? 1) state 수정해주는 함수 만들기 ("lee"로 변경)
  reducers: {
    changeName(state) {
      // return { name: "park", age: 20 };
      state.name = "park";
      // state를 직접 수정
      // Immer.js 도움
    },
    changeAge(state, a) {
      state.age += a.payload;
    },
    // 함수 추가생성 가능
  },
});

//? 2) 만든 함수 export해야 함
export let { changeName, changeAge } = user.actions;
// state 변경함수들(changeName, 함수2)남음

// 원할 때 그 함수 실행해달라고 store.js에 요청
//? 3) 만든 함수 import해서 사용

export default user;
